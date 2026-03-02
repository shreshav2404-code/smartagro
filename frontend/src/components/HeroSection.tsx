import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="hero-section text-center">
      <div className="container">
        <div className="img-zoom" style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
            alt="Green field"
            className="img-fluid"
            style={{ maxHeight: '320px', objectFit: 'cover', width: '100%', transition: 'transform 0.6s ease' }}
          />
        </div>
        <h1 className="display-4 fw-bold gradient-text">{t('hero_title')}</h1>
        <p className="lead text-muted" style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>{t('hero_subtitle')}</p>
        <a href="#features"
          className="btn btn-lg btn-animate"
          style={{
            background: 'linear-gradient(135deg, #1b5e20, #4caf50)',
            color: '#fff', border: 'none', borderRadius: '30px',
            padding: '12px 40px', fontWeight: 'bold', fontSize: '18px',
          }}>
          {t('learn_more')}
        </a>
      </div>
    </div>
  );
};
