import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsRobot, BsCart3, BsFlower1 } from 'react-icons/bs';

export const FeaturesCards: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { Icon: BsRobot, title: t('ai_assistant'), desc: t('ai_assistant_desc'), gradient: 'linear-gradient(135deg, #1b5e20, #4caf50)' },
    { Icon: BsCart3, title: t('marketplace_title'), desc: t('marketplace_desc'), gradient: 'linear-gradient(135deg, #4e342e, #8d6e63)' },
    { Icon: BsFlower1, title: t('farming_techniques'), desc: 'Learn sustainable and modern farming techniques to maximize your harvest.', gradient: 'linear-gradient(135deg, #0277bd, #4fc3f7)' },
  ];

  return (
    <section id="features" className="container my-5">
      <h2 className="text-center mb-4 gradient-text fw-bold">{t('platform_features')}</h2>
      <div className="row">
        {features.map((f, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card text-center h-100 card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: 'none' }}>
              <div style={{ background: f.gradient, padding: '30px', color: '#fff' }}>
                <f.Icon style={{ fontSize: '48px' }} />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">{f.title}</h5>
                <p className="card-text text-muted">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
