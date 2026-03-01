import os
import requests
from datetime import datetime

API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

def get_current_weather(city):
    try:
        # Step 1: Try to get coordinates for the place
        geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_resp = requests.get(geo_url)
        geo_data = geo_resp.json()
        
        if geo_data:
            lat = geo_data[0]['lat']
            lon = geo_data[0]['lon']
            # Step 2: Fetch weather using coordinates (more accurate for small towns)
            url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        else:
            # Fallback to name search if geocoding fails
            url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
            
        response = requests.get(url)
        response.raise_for_status()
        data_json = response.json()
        
        weather = data_json['weather'][0]
        main = data_json['main']
        wind = data_json['wind']
        sys = data_json['sys']
        
        data = {
            "status": "success",
            "location": city,
            "description": weather['description'],
            "temperature": {
                "current": main['temp'],
                "min": main['temp_min'],
                "max": main['temp_max']
            },
            "humidity": main['humidity'],
            "wind": {
                "speed": wind.get('speed'),
                "direction": wind.get('deg')
            },
            "clouds": data_json.get('clouds', {}).get('all'),
            "rain": data_json.get('rain'),
            "sunrise": datetime.fromtimestamp(sys['sunrise']).strftime('%H:%M'),
            "sunset": datetime.fromtimestamp(sys['sunset']).strftime('%H:%M'),
            "icon": weather['icon']
        }
        return data
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_weather_forecast(city, days=5):
    try:
        # Step 1: Geocode
        geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_data = requests.get(geo_url).json()
        
        if geo_data:
            lat, lon = geo_data[0]['lat'], geo_data[0]['lon']
            url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        else:
            url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
            
        response = requests.get(url)
        response.raise_for_status()
        data_json = response.json()
        
        forecast_data = []
        # The API returns 3-hour intervals. 8 intervals = 1 day.
        for item in data_json['list'][:days*8]:
            weather = item['weather'][0]
            main = item['main']
            data = {
                "reference_time": datetime.fromtimestamp(item['dt']).strftime('%Y-%m-%d %H:%M'),
                "description": weather['description'],
                "temperature": main['temp'],
                "humidity": main['humidity'],
                "wind_speed": item['wind'].get('speed'),
                "clouds": item.get('clouds', {}).get('all'),
                "icon": weather['icon']
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
