"""
WSGI config for pyarena project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pyarena.settings')

application = get_wsgi_application()

