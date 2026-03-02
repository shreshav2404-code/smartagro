import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const FarmingTechniques: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <h1>{t('farming_techniques')}</h1>
      <p className="lead">Learn the best farming techniques to maximize your harvest and sustainability.</p>
      {/* Placeholder content */}
    </div>
  );
};
