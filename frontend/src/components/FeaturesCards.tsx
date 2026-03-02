import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const FeaturesCards: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="container my-5">
      <h2 className="text-center mb-4">{t('platform_features')}</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="feature-icon">🤖</div>
              <h5 className="card-title">{t('ai_assistant')}</h5>
              <p className="card-text">{t('ai_assistant_desc')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="feature-icon">🛒</div>
              <h5 className="card-title">{t('marketplace_title')}</h5>
              <p className="card-text">{t('marketplace_desc')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="feature-icon">🌾</div>
              <h5 className="card-title">{t('farming_techniques')}</h5>
              <p className="card-text">Learn sustainable and modern farming techniques to maximize your harvest.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
