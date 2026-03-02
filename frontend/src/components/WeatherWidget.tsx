import React, { useState, useEffect } from 'react';
import { dataAPI, WeatherData } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await dataAPI.getWeather(searchCity);
      setWeather(data);
      setCity(searchCity);
    } catch (err) {
      setError('Failed to fetch weather');
      console.error('Weather error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchCity = formData.get('city') as string;
    fetchWeather(searchCity);
  };

  return (
    <div className="weather-widget">
      <h3 className="mb-4">🌤️ {t('weather')}</h3>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder={t('search_city')}
            defaultValue={city}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading && <div className="alert alert-info">Loading weather data...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <div>
          <h5 className="mb-3">{weather.city}</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="weather-item">
                <span className="weather-label">{t('temperature')}:</span>
                <span className="fw-bold">{weather.temperature}°C</span>
              </div>
              <div className="weather-item">
                <span className="weather-label">{t('wind')}:</span>
                <span className="fw-bold">{weather.wind_speed} km/h</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="weather-item">
                <span className="weather-label">{t('humidity')}:</span>
                <span className="fw-bold">{weather.humidity}%</span>
              </div>
              <div className="weather-item">
                <span className="weather-label">{t('aqi')}:</span>
                <span className="fw-bold">{weather.aqi}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
