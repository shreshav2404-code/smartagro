import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsRobot, BsCart3, BsFlower1 } from 'react-icons/bs';

export const FeaturesCards: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { Icon: BsRobot, title: t('ai_assistant'), desc: t('ai_assistant_desc'), gradient: 'linear-gradient(135deg, #5a9e6f, #7bb88a)' },
    { Icon: BsCart3, title: t('marketplace_title'), desc: t('marketplace_desc'), gradient: 'linear-gradient(135deg, #9e8a78, #c4b5a7)' },
    { Icon: BsFlower1, title: t('farming_techniques'), desc: 'Learn sustainable and modern farming techniques to maximize your harvest.', gradient: 'linear-gradient(135deg, #6b9ec2, #9ec5de)' },
  ];

  return (
    <section id="features" className="container my-5">
      <h2 className="text-center mb-4 gradient-text fw-bold">{t('platform_features')}</h2>
      <div className="row">
        {features.map((f, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card text-center h-100 card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: 'none' }}>
              <div style={{ background: f.gradient, padding: '28px', color: '#fff' }}>
                <f.Icon style={{ fontSize: '42px' }} />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: '#3a3a3a' }}>{f.title}</h5>
                <p className="card-text" style={{ color: '#7a8a95' }}>{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
