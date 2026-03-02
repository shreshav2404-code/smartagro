import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getWeather, getNews, getAIResponse } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';
import ChatWidget from '../components/ChatWidget';
import NewsWidget from '../components/NewsWidget';
import '../styles/Dashboard.css';

function Dashboard({ user, setUser }: { user: any; setUser: (user: any) => void }) {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetchWeather('Delhi');
    fetchNews();
  }, []);

  const fetchWeather = async (city: string) => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data.news || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>SmartAgro Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <section className="widget-section">
            <WeatherWidget weather={weather} onCityChange={fetchWeather} />
          </section>

          <section className="widget-section">
            <ChatWidget onSendMessage={getAIResponse} />
          </section>

          <section className="widget-section">
            <NewsWidget news={news} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
