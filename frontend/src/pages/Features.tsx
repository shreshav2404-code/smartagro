import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsRobot, BsCloudSun, BsNewspaper, BsShop, BsFlower1, BsGlobeAmericas, BsImage, BsChatDotsFill, BsShieldCheck, BsTranslate, BsPalette, BsPhone } from 'react-icons/bs';
import { ScrollReveal } from '../hooks/useScrollAnimation';

const features = [
  { Icon: BsRobot, title: 'AI Farming Assistant', desc: 'Get instant answers to your agriculture questions powered by advanced AI.', gradient: 'linear-gradient(135deg, #5a9e6f, #7bb88a)' },
  { Icon: BsCloudSun, title: 'Real-Time Weather', desc: 'Live weather data for any city — temperature, humidity, wind speed, and AQI.', gradient: 'linear-gradient(135deg, #6b9ec2, #9ec5de)' },
  { Icon: BsNewspaper, title: 'Agriculture News', desc: 'Stay updated with the latest agricultural news, government schemes, and market trends.', gradient: 'linear-gradient(135deg, #d4956a, #e4b896)' },
  { Icon: BsShop, title: 'AgriMarketplace', desc: '16+ products across 8 categories with verified sellers and fair pricing.', gradient: 'linear-gradient(135deg, #9e8a78, #c4b5a7)' },
  { Icon: BsFlower1, title: 'Farming Techniques', desc: '8 modern farming methods with step-by-step implementation guides.', gradient: 'linear-gradient(135deg, #6ba8a0, #98ccc4)' },
  { Icon: BsGlobeAmericas, title: 'Soil Information', desc: 'Detailed profiles of 6 major Indian soil types with management practices.', gradient: 'linear-gradient(135deg, #8a7a6a, #b5a898)' },
  { Icon: BsImage, title: 'Crop Image Analysis', desc: 'Upload crop photos for AI-powered disease detection and pest identification.', gradient: 'linear-gradient(135deg, #9b8ab8, #bfb0d4)' },
  { Icon: BsChatDotsFill, title: 'Smart Chatbot', desc: 'Floating AI assistant on every page. Ask questions in natural language.', gradient: 'linear-gradient(135deg, #6ba8a0, #8ec4bc)' },
  { Icon: BsShieldCheck, title: 'Secure & Private', desc: 'Protected with secure authentication, encrypted sessions, and strict privacy.', gradient: 'linear-gradient(135deg, #5a6a7a, #8a9aaa)' },
  { Icon: BsTranslate, title: '6 Languages', desc: 'English, Spanish, French, Hindi, Tamil, and Maithili. Farm in your language.', gradient: 'linear-gradient(135deg, #c47a7a, #daa0a0)' },
  { Icon: BsPalette, title: '3 Theme Modes', desc: 'Light, Dark, and Night Light for comfortable viewing any time of day.', gradient: 'linear-gradient(135deg, #7a8ab8, #a0aed4)' },
  { Icon: BsPhone, title: 'Fully Responsive', desc: 'Works seamlessly on mobile, tablet, and desktop.', gradient: 'linear-gradient(135deg, #6b9ec2, #8ebad8)' },
];

export const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <ScrollReveal>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold gradient-text">{t('platform_features')}</h1>
          <p className="lead" style={{ color: '#7a8a95', maxWidth: '700px', margin: '0 auto' }}>
            Everything you need to modernize your farming — AI, weather, marketplace, and more.
          </p>
        </div>
      </ScrollReveal>

      <div className="row g-4">
        {features.map((f, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <ScrollReveal className="animate-on-scroll">
              <div className="card h-100 card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: 'none' }}>
                <div style={{ background: f.gradient, padding: '22px', color: '#fff' }}>
                  <f.Icon style={{ fontSize: '32px', marginBottom: '6px' }} />
                  <h5 className="fw-bold mb-0">{f.title}</h5>
                </div>
                <div className="card-body">
                  <p style={{ color: '#7a8a95' }} className="mb-0">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
};
