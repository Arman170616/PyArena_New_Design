from rest_framework import permissions

class IsInstructorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow instructors to create/edit courses.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to instructors
        return request.user.is_authenticated and request.user.is_instructor
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to instructors of the course
        return request.user.is_authenticated and request.user.instructor_profile in obj.instructors.all()

class IsEnrollmentOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an enrollment or admins to view/edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Admin can do anything
        if request.user.is_staff:
            return True
        
        # Owner can view/edit their own enrollments
        return obj.user == request.user

