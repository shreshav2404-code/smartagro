import React from 'react';
import '../styles/NewsWidget.css';

function NewsWidget({ news }: { news: any[] }) {
  return (
    <div className="news-widget">
      <h3>Agriculture News</h3>
      <div className="news-list">
        {news.length === 0 ? (
          <p className="loading">Loading news...</p>
        ) : (
          news.slice(0, 5).map((item, index) => (
            <article key={index} className="news-item">
              <h4>{item.title}</h4>
              <p className="news-source">{item.source}</p>
              {item.body && <p className="news-body">{item.body.substring(0, 150)}...</p>}
              {item.url && item.url !== '#' && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                  Read more →
                </a>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsWidget;
