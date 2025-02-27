from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Custom user model for PYARENA"""
    email = models.EmailField(_('email address'), unique=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    is_instructor = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email

class Instructor(models.Model):
    """Model for instructors with additional information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='instructor_profile')
    occupation = models.CharField(max_length=100)
    website = models.URLField(blank=True)
    twitter = models.CharField(max_length=100, blank=True)
    github = models.CharField(max_length=100, blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.occupation}"

class InstructorReview(models.Model):
    """Model for instructor reviews"""
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('instructor', 'user')
        
    def __str__(self):
        return f"Review for {self.instructor.user.get_full_name()} by {self.user.get_full_name()}"

