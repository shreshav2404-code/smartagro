import os
import requests
from datetime import datetime
API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"

def get_current_weather(city):
    try:
        import pyowm
        owm = pyowm.OWM(API_KEY)
        mgr = owm.weather_manager()
        observation = mgr.weather_at_place(city)
        weather = observation.weather
        data = {
            "status": "success",
            "location": city,
            "description": weather.detailed_status,
            "temperature": {
                "current": weather.temperature('celsius').get('temp'),
                "min": weather.temperature('celsius').get('temp_min'),
                "max": weather.temperature('celsius').get('temp_max')
            },
            "humidity": weather.humidity,
            "wind": {
                "speed": weather.wind().get('speed'),
                "direction": weather.wind().get('deg')
            },
            "clouds": weather.clouds,
            "rain": weather.rain,
            "sunrise": datetime.fromtimestamp(weather.sunrise_time()).strftime('%H:%M'),
            "sunset": datetime.fromtimestamp(weather.sunset_time()).strftime('%H:%M'),
            "icon": weather.weather_icon_name
        }
        return data
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_weather_forecast(city, days=5):
    try:
        import pyowm
        owm = pyowm.OWM(API_KEY)
        mgr = owm.weather_manager()
        forecaster = mgr.forecast_at_place(city, '3h')
        forecast = forecaster.forecast
        forecast_data = []
        for weather in forecast.weathers[:days*8]:
            data = {
                "reference_time": datetime.fromtimestamp(weather.reference_time()).strftime('%Y-%m-%d %H:%M'),
                "description": weather.detailed_status,
                "temperature": weather.temperature('celsius').get('temp'),
                "humidity": weather.humidity,
                "wind_speed": weather.wind().get('speed'),
                "clouds": weather.clouds,
                "icon": weather.weather_icon_name
            }
            forecast_data.append(data)
        return {
            "status": "success",
            "location": city,
            "forecast": forecast_data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_air_quality(lat, lon):
    try:
        url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if 'list' in data and len(data['list']) > 0:
            air_data = data['list'][0]
            aqi = air_data['main']['aqi']
            components = air_data['components']
            aqi_descriptions = {
                1: "Good",
                2: "Fair",
                3: "Moderate",
                4: "Poor",
                5: "Very Poor"
            }
            return {
                'status': 'success',
                'location': f"Lat: {lat}, Lon: {lon}",
                'air_quality_index': aqi,
                'aqi_description': aqi_descriptions.get(aqi, "Unknown"),
                'components': components,
                'health_recommendations': get_aqi_recommendations(aqi)
            }
        else:
            return {
                'status': 'error',
                'message': 'No air quality data available'
            }
    except requests.exceptions.RequestException as e:
        return {
            'status': 'error',
            'message': f"API request failed: {str(e)}"
        }
    except (KeyError, IndexError, ValueError) as e:
        return {
            'status': 'error',
            'message': f"Invalid data received: {str(e)}"
        }

def get_aqi_recommendations(aqi):
    recommendations = {
        1: "Air quality is good. Enjoy outdoor activities.",
        2: "Air quality is fair. Unusually sensitive people should consider reducing prolonged outdoor activities.",
        3: "Air quality is moderate. People with respiratory issues should limit prolonged outdoor activities.",
        4: "Air quality is poor. Everyone should reduce outdoor activities, especially those with respiratory conditions.",
        5: "Air quality is very poor. Avoid outdoor activities. Keep windows closed to reduce indoor pollution."
    }
    return recommendations.get(aqi, "No specific recommendations available.")
