import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <h1>{t('platform_features')}</h1>
      <p className="lead">Explore all the amazing features of GreenIQ platform designed for modern farmers.</p>
      {/* Placeholder content */}
    </div>
  );
};
