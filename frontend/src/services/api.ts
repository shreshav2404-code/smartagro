const API_BASE = process.env.REACT_APP_API_URL || 'https://smartagro-gyuc.onrender.com';

export const apiCall = async (endpoint: string, method = 'GET', data?: any) => {
  const url = `${API_BASE}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};

export const register = (email: string, password: string, name: string, occupation: string, phone_number: string) =>
  apiCall('/api/register/', 'POST', { email, password, name, occupation, phone_number });

export const login = (email: string, password: string) =>
  apiCall('/api/user_login/', 'POST', { email, password });

export const logout = () => apiCall('/api/user_logout/', 'POST');

export const getWeather = (city: string) =>
  apiCall(`/api/weather/?city=${encodeURIComponent(city)}`);

export const getWeatherForecast = (city: string, days = 5) =>
  apiCall(`/api/weather/forecast/?city=${encodeURIComponent(city)}&days=${days}`);

export const getAirQuality = (lat: number, lon: number) =>
  apiCall(`/api/weather/air-quality/?lat=${lat}&lon=${lon}`);

export const getNews = () =>
  apiCall('/api/news/');

export const getAIResponse = (message: string) =>
  apiCall('/api/ai_assistant/', 'POST', { message });

export const getAIModels = () =>
  apiCall('/api/ai_models/');
