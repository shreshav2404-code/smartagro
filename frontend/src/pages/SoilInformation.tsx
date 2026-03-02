import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SoilInformation: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <h1>{t('soil_info')}</h1>
      <p className="lead">Complete information about soil management and soil quality for optimal crop growth.</p>
      {/* Placeholder content */}
    </div>
  );
};
