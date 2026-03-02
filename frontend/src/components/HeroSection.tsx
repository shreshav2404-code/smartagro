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
        <p className="lead" style={{ color: '#7a8a95', maxWidth: '600px', margin: '0 auto 1.5rem' }}>{t('hero_subtitle')}</p>
        <a href="#features"
          className="btn btn-lg btn-animate"
          style={{
            background: 'linear-gradient(135deg, #5a9e6f, #7bb88a)',
            color: '#fff', border: 'none', borderRadius: '25px',
            padding: '11px 36px', fontWeight: '600', fontSize: '16px',
            boxShadow: '0 3px 12px rgba(90, 158, 111, 0.25)',
          }}>
          {t('learn_more')}
        </a>
      </div>
    </div>
  );
};
