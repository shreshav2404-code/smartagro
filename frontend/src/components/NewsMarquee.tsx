import React, { useState, useEffect } from 'react';
import { dataAPI } from '../services/api';

export const NewsMarquee: React.FC = () => {
  const [news, setNews] = useState<string[]>([
    'Government announces new subsidy program for farmers',
    'Crop disease identified in northern regions - early warning active',
    'New drought-resistant seeds available for farmers',
    'Soil conservation techniques boost yields by 30%',
  ]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await dataAPI.getNews();
        const titles = newsData.map((item) => item.title);
        if (titles.length > 0) {
          setNews(titles);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-marquee" role="region" aria-label="Agriculture News">
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div
          style={{
            display: 'inline-block',
            animation: 'scroll 30s linear infinite',
            paddingRight: '100%',
          }}
        >
          {news.map((item, idx) => (
            <span key={idx} className="news-item">
              <span className="badge">Agri News</span> {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
