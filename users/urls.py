from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserRegistrationView, InstructorViewSet

router = DefaultRouter()
router.register(r'profile', UserViewSet)
router.register(r'instructors', InstructorViewSet)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('', include(router.urls)),
]

