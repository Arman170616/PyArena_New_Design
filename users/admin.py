from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Instructor, InstructorReview

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_instructor')
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('bio', 'avatar', 'is_instructor')}),
    )

class InstructorAdmin(admin.ModelAdmin):
    list_display = ('user', 'occupation')
    search_fields = ('user__email', 'user__username', 'occupation')

class InstructorReviewAdmin(admin.ModelAdmin):
    list_display = ('instructor', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('instructor__user__username', 'user__username', 'comment')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Instructor, InstructorAdmin)
admin.site.register(InstructorReview, InstructorReviewAdmin)

