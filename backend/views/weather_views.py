# Weather views for GreenIQ
from django.http import JsonResponse
from django.views.decorators.http import require_GET
import json

# Import the weather API module
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import weather_api

@require_GET
def get_weather(request):
    """
    Get weather data for a specific location
    """
    city = request.GET.get('city', 'London')  # Default to London if no city provided
    
    # Get current weather data
    weather_data = weather_api.get_current_weather(city)
    
    return JsonResponse(weather_data)

@require_GET
def get_forecast(request):
    """
    Get weather forecast for a specific location
    """
    city = request.GET.get('city', 'London')  # Default to London if no city provided
    days = int(request.GET.get('days', 5))  # Default to 5 days forecast
    
    # Get forecast data
    forecast_data = weather_api.get_weather_forecast(city, days)
    
    return JsonResponse(forecast_data)

@require_GET
def get_air_quality(request):
    """
    Get air quality information for a specific location
    """
    try:
        lat = float(request.GET.get('lat', 51.5074))  # Default to London coordinates
        lon = float(request.GET.get('lon', -0.1278))
        
        # Get air quality data
        air_quality_data = weather_api.get_air_quality(lat, lon)
        
        return JsonResponse(air_quality_data)
    except ValueError:
        return JsonResponse({
            "status": "error",
            "message": "Invalid latitude or longitude values"
        }, status=400)