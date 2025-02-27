"""
ASGI config for pyarena project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pyarena.settings')

application = get_asgi_application()

