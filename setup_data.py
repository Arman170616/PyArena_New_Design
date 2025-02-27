"""
Script to set up initial data for the PYARENA platform.
Run this after migrations to populate the database with sample data.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pyarena.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.utils.text import slugify
from users.models import Instructor
from courses.models import Category, SubCategory, Course, Section, Lesson

User = get_user_model()

def create_users_and_instructors():
    # Create admin user
    admin, created = User.objects.get_or_create(
        username='admin',
        email='admin@pyarena.com',
        defaults={
            'is_staff': True,
            'is_superuser': True,
        }
    )
    if created:
        admin.set_password('admin123')
        admin.save()
        print("Admin user created")
    
    # Create instructors
    instructors_data = [
        {
            'username': 'johndoe',
            'email': 'john.doe@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'password123',
            'bio': 'Python expert with 10 years of experience',
            'occupation': 'Senior Python Developer',
            'website': 'https://johndoe.example.com',
        },
        {
            'username': 'janesmith',
            'email': 'jane.smith@example.com',
            'first_name': 'Jane',
            'last_name': 'Smith',
            'password': 'password123',
            'bio': 'Data scientist with a PhD in Computer Science',
            'occupation': 'Data Scientist',
            'website': 'https://janesmith.example.com',
        },
        {
            'username': 'alexjohnson',
            'email': 'alex.johnson@example.com',
            'first_name': 'Alex',
            'last_name': 'Johnson',
            'password': 'password123',
            'bio': 'Full stack developer with expertise in modern web technologies',
            'occupation': 'Full Stack Developer',
            'website': 'https://alexjohnson.example.com',
        },
    ]
    
    created_instructors = []
    for data in instructors_data:
        occupation = data.pop('occupation')
        website = data.pop('website')
        
        user, created = User.objects.get_or_create(
            username=data['username'],
            email=data['email'],
            defaults={
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'bio': data['bio'],
                'is_instructor': True,
            }
        )
        
        if created:
            user.set_password(data['password'])
            user.save()
            print(f"User {user.username} created")
        
        instructor, created = Instructor.objects.get_or_create(
            user=user,
            defaults={
                'occupation': occupation,
                'website': website,
            }
        )
        
        if created:
            print(f"Instructor {instructor.user.get_full_name()} created")
        
        created_instructors.append(instructor)
    
    return created_instructors

def create_categories_and_courses(instructors):
    # Create categories and subcategories
    categories_data = [
        {
            'name': 'Programming',
            'description': 'Learn programming languages and software development',
            'subcategories': [
                {'name': 'Python', 'description': 'Python programming language'},
                {'name': 'JavaScript', 'description': 'JavaScript programming language'},
                {'name': 'Java', 'description': 'Java programming language'},
            ]
        },
        {
            'name': 'Web Development',
            'description': 'Learn web development technologies and frameworks',
            'subcategories': [
                {'name': 'Frontend', 'description': 'Frontend web development'},
                {'name': 'Backend', 'description': 'Backend web development'},
                {'name': 'Full Stack', 'description': 'Full stack web development'},
            ]
        },
        {
            'name': 'Data Science',
            'description': 'Learn data science, machine learning, and AI',
            'subcategories': [
                {'name': 'Machine Learning', 'description': 'Machine learning algorithms and applications'},
                {'name': 'Data Analysis', 'description': 'Data analysis and visualization'},
                {'name': 'Big Data', 'description': 'Big data technologies and frameworks'},
            ]
        },
    ]
    
    created_categories = {}
    for cat_data in categories_data:
        subcategories_data = cat_data.pop('subcategories')
        
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        
        if created:
            print(f"Category {category.name} created")
        
        created_subcategories = []
        for subcat_data in subcategories_data:
            subcategory, created = SubCategory.objects.get_or_create(
                category=category,
                name=subcat_data['name'],
                defaults={'description': subcat_data['description']}
            )
            
            if created:
                print(f"SubCategory {subcategory.name} created")
            
            created_subcategories.append(subcategory)
        
        created_categories[category] = created_subcategories
    
    # Create courses
    courses_data = [
        {
            'title': 'Python for Beginners',
            'description': 'Learn Python programming from scratch with hands-on projects.',
            'category': 'Programming',
            'subcategory': 'Python',
            'price': 49.99,
            'level': 'beginner',
            'duration': '10 weeks',
            'instructors': [0, 1],  # Indices in the instructors list
            'sections': [
                {
                    'title': 'Getting Started with Python',
                    'lessons': [
                        {'title': 'Introduction to Python', 'content': 'Overview of Python and its applications.'},
                        {'title': 'Setting Up Your Environment', 'content': 'Installing Python and setting up your development environment.'},
                        {'title': 'Basic Syntax', 'content': 'Learning the basic syntax of Python.'},
                    ]
                },
                {
                    'title': 'Python Data Structures',
                    'lessons': [
                        {'title': 'Lists and Tuples', 'content': 'Working with lists and tuples in Python.'},
                        {'title': 'Dictionaries', 'content': 'Using dictionaries for key-value storage.'},
                        {'title': 'Sets', 'content': 'Working with sets in Python.'},
                    ]
                }
            ]
        },
        {
            'title': 'Web Development Bootcamp',
            'description': 'Master HTML, CSS, JavaScript and modern frameworks.',
            'category': 'Web Development',
            'subcategory': 'Full Stack',
            'price': 79.99,
            'level': 'intermediate',
            'duration': '12 weeks',
            'instructors': [2],  # Indices in the instructors list
            'sections': [
                {
                    'title': 'HTML & CSS Fundamentals',
                    'lessons': [
                        {'title': 'HTML Basics', 'content': 'Learning the basics of HTML.'},
                        {'title': 'CSS Styling', 'content': 'Styling web pages with CSS.'},
                        {'title': 'Responsive Design', 'content': 'Making websites responsive with media queries.'},
                    ]
                },
                {
                    'title': 'JavaScript Essentials',
                    'lessons': [
                        {'title': 'JavaScript Syntax', 'content': 'Learning the basics of JavaScript.'},
                        {'title': 'DOM Manipulation', 'content': 'Manipulating the Document Object Model.'},
                        {'title': 'Event Handling', 'content': 'Handling user events in JavaScript.'},
                    ]
                }
            ]
        },
        {
            'title': 'Data Science Fundamentals',
            'description': 'Learn data analysis, visualization and machine learning basics.',
            'category': 'Data Science',
            'subcategory': 'Data Analysis',
            'price': 69.99,
            'level': 'intermediate',
            'duration': '8 weeks',
            'instructors': [1],  # Indices in the instructors list
            'sections': [
                {
                    'title': 'Introduction to Data Analysis',
                    'lessons': [
                        {'title': 'Data Analysis Overview', 'content': 'Introduction to data analysis concepts.'},
                        {'title': 'Statistical Concepts', 'content': 'Basic statistical concepts for data analysis.'},
                        {'title': 'Data Cleaning', 'content': 'Techniques for cleaning and preprocessing data.'},
                    ]
                },
                {
                    'title': 'Data Visualization',
                    'lessons': [
                        {'title': 'Visualization Principles', 'content': 'Principles of effective data visualization.'},
                        {'title': 'Matplotlib', 'content': 'Creating visualizations with Matplotlib.'},
                        {'title': 'Seaborn', 'content': 'Advanced visualizations with Seaborn.'},
                    ]
                }
            ]
        }
    ]
    
    for course_data in courses_data:
        # Get category and subcategory
        category = Category.objects.get(name=course_data['category'])
        subcategory = SubCategory.objects.get(name=course_data['subcategory'], category=category)
        
        # Create course
        course, created = Course.objects.get_or_create(
            title=course_data['title'],
            defaults={
                'slug': slugify(course_data['title']),
                'description': course_data['description'],
                'category': category,
                'subcategory': subcategory,
                'price': course_data['price'],
                'level': course_data['level'],
                'duration': course_data['duration'],
            }
        )
        
        if created:
            print(f"Course {course.title} created")
            
            # Add instructors
            for idx in course_data['instructors']:
                course.instructors.add(instructors[idx])
            
            # Create sections and lessons
            for i, section_data in enumerate(course_data['sections']):
                section = Section.objects.create(
                    course=course,
                    title=section_data['title'],
                    order=i+1
                )
                
                for j, lesson_data in enumerate(section_data['lessons']):
                    Lesson.objects.create(
                        section=section,
                        title=lesson_data['title'],
                        content=lesson_data['content'],
                        order=j+1
                    )

if __name__ == '__main__':
    print("Setting up initial data for PYARENA...")
    instructors = create_users_and_instructors()
    create_categories_and_courses(instructors)
    print("Initial data setup complete!")

