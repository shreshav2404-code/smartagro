import React, { useState } from 'react';
import { getAirQuality } from '../services/api';
import '../styles/WeatherWidget.css';

function WeatherWidget({ weather, onCityChange }: { weather: any; onCityChange: (city: string) => void }) {
  const [city, setCity] = useState('Delhi');
  const [aqi, setAqi] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      onCityChange(city);
      // For AQI, using default coordinates for now
      const aqiData = await getAirQuality(28.6139, 77.209);
      setAqi(aqiData);
    } catch (err) {
      console.error('Failed to fetch AQI:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!weather) {
    return <div className="weather-widget loading">Loading weather...</div>;
  }

  return (
    <div className="weather-widget">
      <h3>Weather Information</h3>

      <form onSubmit={handleSearch} className="weather-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      <div className="weather-current">
        <h4>{weather.location}</h4>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>
        <div className="weather-temp">{Math.round(weather.temperature.current)}°C</div>
        <div className="weather-desc">{weather.description}</div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind</span>
          <span className="value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span className="label">Sunrise</span>
          <span className="value">{weather.sunrise}</span>
        </div>
        <div className="detail">
          <span className="label">Sunset</span>
          <span className="value">{weather.sunset}</span>
        </div>
      </div>

      {aqi && (
        <div className="aqi-info">
          <h5>Air Quality</h5>
          <p>{aqi.aqi_description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
