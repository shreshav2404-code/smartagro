from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    
    def __str__(self):
        return self.user.username

class Crop(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
