const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  aqi: number;
  city: string;
}

export interface NewsItem {
  title: string;
  source: string;
  description?: string;
}

export interface ChatResponse {
  reply: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  occupation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  occupation: string;
}

// Auth APIs
export const authAPI = {
  register: async (data: RegisterData): Promise<UserData> => {
    const res = await fetch(`${API_BASE}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  login: async (data: LoginData): Promise<UserData> => {
    const res = await fetch(`${API_BASE}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
};

// Data APIs
export const dataAPI = {
  getWeather: async (city: string): Promise<WeatherData> => {
    try {
      const res = await fetch(`${API_BASE}/api/weather/?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      // Map backend response to our interface
      return {
        temperature: data.temperature?.current ?? data.temperature ?? 28,
        humidity: data.humidity ?? 65,
        wind_speed: data.wind?.speed ?? data.wind_speed ?? 12,
        aqi: data.aqi ?? 75,
        city: data.location ?? city,
      };
    } catch (error) {
      console.error('Weather API error:', error);
      // Fallback weather data
      return {
        temperature: 28,
        humidity: 65,
        wind_speed: 12,
        aqi: 75,
        city: city,
      };
    }
  },

  getNews: async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/api/news/`);
      if (!res.ok) throw new Error('News fetch failed');
      const data = await res.json();
      // Backend returns {status, news: [{title, source, ...}]}
      const items = data.news || data;
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.error('News API error:', error);
      // Fallback news data
      return [
        {
          title: 'Government announces new subsidy program for farmers',
          source: 'News',
          description: 'Enhanced support for sustainable agriculture',
        },
        {
          title: 'Crop disease identified in northern regions',
          source: 'Alert',
          description: 'Early warning system activated',
        },
      ];
    }
  },

  getChat: async (message: string): Promise<ChatResponse> => {
    try {
      const res = await fetch(`${API_BASE}/api/ai_assistant/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Chat API failed');
      return res.json();
    } catch (error) {
      console.error('Chat API error:', error);
      return {
        reply: 'I am currently unavailable. Please try again later.',
      };
    }
  },

  getMarketplace: async () => {
    try {
      const res = await fetch(`${API_BASE}/api/market/`);
      if (!res.ok) throw new Error('Marketplace fetch failed');
      return res.json();
    } catch (error) {
      console.error('Marketplace API error:', error);
      return { products: [] };
    }
  },

  getSoilInfo: async () => {
    try {
      const res = await fetch(`${API_BASE}/api/soil/`);
      if (!res.ok) throw new Error('Soil info fetch failed');
      return res.json();
    } catch (error) {
      console.error('Soil API error:', error);
      return { info: 'Soil information unavailable' };
    }
  },
};
