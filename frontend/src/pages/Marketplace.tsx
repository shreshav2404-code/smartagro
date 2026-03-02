import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Marketplace: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <h1>{t('marketplace_title')}</h1>
      <p className="lead">Buy and sell your agricultural products directly to consumers and businesses.</p>
      {/* Placeholder content */}
    </div>
  );
};
