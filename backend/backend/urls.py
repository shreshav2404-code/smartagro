"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render

# Serve the static index.html at root


def frontend(request):
    # Check if user is authenticated by checking session cookie
    if request.COOKIES.get('sessionid'):
        return render(request, 'index.html')
    else:
        # Redirect to login page if not authenticated
        return render(request, 'login.html')


def health(request):
    return JsonResponse({"status": "ok"})

def login_view(request):
    return render(request, 'login.html')

def register_view(request):
    return render(request, 'register.html')

def farming_techniques_view(request):
    return render(request, 'farming_techniques.html')

def soil_information_view(request):
    return render(request, 'soil_information.html')

def features_view(request):
    return render(request, 'features.html')

def marketplace_view(request):
    return render(request, 'marketplace.html')
    
def image_analysis_page(request):
    return render(request, 'image_analysis.html')

# Import weather views
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from views import weather_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('crops.urls')),
    path('api/weather/', weather_views.get_weather, name='get_weather'),
    path('api/weather/forecast/', weather_views.get_forecast, name='get_forecast'),
    path('api/weather/air-quality/', weather_views.get_air_quality, name='get_air_quality'),
    path('', frontend, name='frontend'),
    path('login.html', login_view, name='login'),
    path('register.html', register_view, name='register'),
    path('index.html', frontend, name='index'),
    path('farming_techniques.html', farming_techniques_view, name='farming_techniques'),
    path('soil_information.html', soil_information_view, name='soil_information'),
    path('features.html', features_view, name='features'),
    path('marketplace.html', marketplace_view, name='marketplace'),
    path('image-analysis/', image_analysis_page, name='image_analysis_page'),
    path('health/', health, name='health'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'static')
