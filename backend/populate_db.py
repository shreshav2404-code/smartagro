import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from crops.models import Crop

Crop.objects.create(name='Tomato', description='A red fruit often used in salads.')
Crop.objects.create(name='Potato', description='A starchy tuber.')
Crop.objects.create(name='Carrot', description='A root vegetable, typically orange in color.')
