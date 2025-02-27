from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Instructor, InstructorReview

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'bio', 'avatar', 'is_instructor')
        read_only_fields = ('id', 'is_instructor')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'password_confirm')
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class InstructorReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = InstructorReview
        fields = ('id', 'user', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class InstructorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    reviews = InstructorReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Instructor
        fields = ('id', 'user', 'occupation', 'website', 'twitter', 'github', 'linkedin', 'reviews', 'average_rating', 'review_count')
        read_only_fields = ('id', 'user')
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.count()

class InstructorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('occupation', 'website', 'twitter', 'github', 'linkedin')
    
    def create(self, validated_data):
        user = self.context['request'].user
        user.is_instructor = True
        user.save()
        instructor = Instructor.objects.create(user=user, **validated_data)
        return instructor

