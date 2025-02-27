from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Category, 
    SubCategory, 
    Course, 
    CourseReview, 
    Enrollment
)
from .serializers import (
    CategorySerializer,
    SubCategorySerializer,
    CourseListSerializer,
    CourseDetailSerializer,
    CourseCreateUpdateSerializer,
    CourseReviewSerializer,
    EnrollmentSerializer
)
from .permissions import IsInstructorOrReadOnly, IsEnrollmentOwnerOrAdmin

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class SubCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['category']

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = [IsInstructorOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'subcategory', 'level', 'instructors']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return CourseCreateUpdateSerializer
        return CourseDetailSerializer
    
    def get_queryset(self):
        queryset = Course.objects.all()
        if self.action == 'list':
            return queryset.select_related('category', 'subcategory').prefetch_related('instructors', 'reviews')
        return queryset
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def review(self, request, slug=None):
        course = self.get_object()
        user = request.user
        
        # Check if user already reviewed this course
        if CourseReview.objects.filter(course=course, user=user).exists():
            return Response(
                {"detail": "You have already reviewed this course"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = CourseReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course=course, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsEnrollmentOwnerOrAdmin]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Enrollment.objects.all()
        return Enrollment.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CourseEnrollmentView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        # For anonymous users, just create the enrollment
        # For authenticated users, associate with their account
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)

