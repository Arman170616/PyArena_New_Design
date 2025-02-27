from django.contrib import admin
from .models import (
    Category, 
    SubCategory, 
    Course, 
    Section, 
    Lesson, 
    CourseReview, 
    Enrollment
)

class SubCategoryInline(admin.TabularInline):
    model = SubCategory
    extra = 1

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [SubCategoryInline]

class SectionInline(admin.TabularInline):
    model = Section
    extra = 1

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'level', 'created_at')
    list_filter = ('category', 'level', 'created_at')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SectionInline]
    filter_horizontal = ('instructors',)

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1

class SectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order')
    list_filter = ('course',)
    search_fields = ('title', 'course__title')
    inlines = [LessonInline]

class CourseReviewAdmin(admin.ModelAdmin):
    list_display = ('course', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('course__title', 'user__username', 'comment')

class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'email', 'phone_number', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'course')
    search_fields = ('name', 'email', 'phone_number', 'course__title')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(Lesson)
admin.site.register(CourseReview, CourseReviewAdmin)
admin.site.register(Enrollment, EnrollmentAdmin)

