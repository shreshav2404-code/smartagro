from weather_api import get_current_weather, get_weather_forecast
import json

def test():
    print("Testing get_current_weather('Madhubani')...")
    current = get_current_weather("Madhubani")
    print(json.dumps(current, indent=2))
    
    print("\nTesting get_weather_forecast('Madhubani')...")
    forecast = get_weather_forecast("Madhubani")
    print(json.dumps(forecast, indent=2))

if __name__ == "__main__":
    test()
