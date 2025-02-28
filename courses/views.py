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
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]  # Adjust this based on your authentication requirements
    
    def perform_create(self, serializer):
        # You can add any additional logic here before saving the enrollment
        serializer.save()

class CourseEnrollmentView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        # Get the course based on the provided course ID
        try:
            course = Course.objects.get(id=request.data.get('course'))
        except Course.DoesNotExist:
            return Response(
                {"message": "Course not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create a new data dictionary with the course object
        enrollment_data = {
            'course': course.id,
            'name': request.data.get('name'),
            'phone_number': request.data.get('phoneNumber'),
            'email': request.data.get('email'),
            'comment': request.data.get('comment'),
        }
        
        serializer = self.get_serializer(data=enrollment_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Enrollment successful"},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
    def perform_create(self, serializer):
        # For authenticated users, associate with their account
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)
