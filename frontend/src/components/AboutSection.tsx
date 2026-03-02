import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2>{t('about_title')}</h2>
          <p>{t('about_text')}</p>
          <ul>
            <li>{t('about_list_1')}</li>
            <li>{t('about_list_2')}</li>
            <li>{t('about_list_3')}</li>
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
            alt="Agriculture"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </section>
  );
};
