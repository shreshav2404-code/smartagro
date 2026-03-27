import React, { useState, useEffect } from 'react';
import { dataAPI, NewsItem } from '../services/api';

export const NewsMarquee: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([
    { title: 'Government announces new subsidy program for farmers', source: 'System', url: '#' },
    { title: 'Crop disease identified in northern regions - early warning active', source: 'System', url: '#' },
    { title: 'New drought-resistant seeds available for farmers', source: 'System', url: '#' },
    { title: 'Soil conservation techniques boost yields by 30%', source: 'System', url: '#' },
  ]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await dataAPI.getNews();
        if (newsData && newsData.length > 0) {
          setNews(newsData);
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
              <span className="badge">Agri News</span>{' '}
              <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                {item.title}
              </a>
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
