from rest_framework import serializers
from .models import (
    Category, 
    SubCategory, 
    Course, 
    Section, 
    Lesson, 
    CourseReview, 
    Enrollment
)
from users.serializers import InstructorSerializer, UserSerializer

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('id', 'name', 'description')

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'subcategories')

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ('id', 'title', 'content', 'order')

class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Section
        fields = ('id', 'title', 'order', 'lessons')

class CourseReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CourseReview
        fields = ('id', 'user', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class CourseListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    instructors = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = (
            'id', 'title', 'slug', 'description', 'image', 'price', 
            'level', 'duration', 'category_name', 'subcategory_name',
            'instructors', 'average_rating', 'review_count'
        )
    
    def get_instructors(self, obj):
        return [
            {
                'id': instructor.id,
                'name': instructor.user.get_full_name() or instructor.user.username,
                'occupation': instructor.occupation
            }
            for instructor in obj.instructors.all()
        ]
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.count()

class CourseDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    instructors = InstructorSerializer(many=True, read_only=True)
    sections = SectionSerializer(many=True, read_only=True)
    reviews = CourseReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = (
            'id', 'title', 'slug', 'description', 'image', 'price', 
            'level', 'duration', 'category', 'subcategory',
            'instructors', 'sections', 'reviews', 'average_rating', 
            'review_count', 'created_at', 'updated_at'
        )
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.count()

class CourseCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            'title', 'description', 'category', 'subcategory', 
            'instructors', 'image', 'price', 'level', 'duration'
        )
    
    def validate_subcategory(self, value):
        if value and value.category != self.initial_data.get('category'):
            raise serializers.ValidationError("Subcategory must belong to the selected category")
        return value
    
    def create(self, validated_data):
        # Generate slug from title
        from django.utils.text import slugify
        validated_data['slug'] = slugify(validated_data['title'])
        return super().create(validated_data)

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ('id', 'course', 'course_title', 'name', 'phone_number', 'email', 'comment', 'status', 'created_at')
        read_only_fields = ('id', 'status', 'created_at')

