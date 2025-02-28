from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    SubCategoryViewSet,
    CourseViewSet,
    EnrollmentViewSet,
    CourseEnrollmentView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'list', CourseViewSet)
router.register(r'enroll', EnrollmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
   
]

