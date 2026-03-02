import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="hero-section text-center">
      <div className="container">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Green field"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '320px', objectFit: 'cover', width: '100%' }}
        />
        <h1>{t('hero_title')}</h1>
        <p className="lead">{t('hero_subtitle')}</p>
        <a href="#features" className="btn btn-primary btn-lg">
          {t('learn_more')}
        </a>
      </div>
    </div>
  );
};
