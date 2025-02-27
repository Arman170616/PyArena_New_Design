#!/bin/bash

# Apply migrations
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if needed
echo "Do you want to create a superuser? (y/n)"
read create_superuser
if [ "$create_superuser" = "y" ]; then
    python manage.py createsuperuser
fi

# Load initial data
echo "Do you want to load initial sample data? (y/n)"
read load_data
if [ "$load_data" = "y" ]; then
    python setup_data.py
fi

# Run server
echo "Starting development server..."
python manage.py runserver

