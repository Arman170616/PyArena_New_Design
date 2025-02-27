from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import Instructor, InstructorReview
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer,
    InstructorSerializer, 
    InstructorCreateSerializer,
    InstructorReviewSerializer
)
from .permissions import IsOwnerOrReadOnly, IsInstructorOwnerOrReadOnly

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsInstructorOwnerOrReadOnly]
    filterset_fields = ['occupation']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'occupation']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return InstructorCreateSerializer
        return InstructorSerializer
    
    def get_queryset(self):
        queryset = Instructor.objects.all()
        if self.action == 'list':
            return queryset.prefetch_related('reviews', 'user')
        return queryset
    
    @action(detail=True, methods=['post'])
    def review(self, request, pk=None):
        instructor = self.get_object()
        user = request.user
        
        # Check if user is trying to review themselves
        if instructor.user == user:
            return Response(
                {"detail": "You cannot review yourself"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user already reviewed this instructor
        if InstructorReview.objects.filter(instructor=instructor, user=user).exists():
            return Response(
                {"detail": "You have already reviewed this instructor"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = InstructorReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=instructor, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

