import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsRobot, BsCloudSun, BsNewspaper, BsShop, BsFlower1, BsGlobeAmericas, BsImage, BsChatDotsFill, BsShieldCheck, BsTranslate, BsPalette, BsPhone } from 'react-icons/bs';
import { ScrollReveal } from '../hooks/useScrollAnimation';

const features = [
  { Icon: BsRobot, title: 'AI Farming Assistant', desc: 'Get instant answers to your agriculture questions powered by advanced AI. Supports crop advice, pest identification, and best practices.', gradient: 'linear-gradient(135deg, #1b5e20, #4caf50)' },
  { Icon: BsCloudSun, title: 'Real-Time Weather', desc: 'Live weather data for any city — temperature, humidity, wind speed, and AQI. Plan your farming activities with precision.', gradient: 'linear-gradient(135deg, #0277bd, #4fc3f7)' },
  { Icon: BsNewspaper, title: 'Agriculture News', desc: 'Stay updated with the latest agricultural news, government schemes, and market trends via our live news ticker.', gradient: 'linear-gradient(135deg, #e65100, #ff9800)' },
  { Icon: BsShop, title: 'AgriMarketplace', desc: 'Buy farm inputs and sell produce directly. 16+ products across 8 categories with verified sellers and fair pricing.', gradient: 'linear-gradient(135deg, #4e342e, #8d6e63)' },
  { Icon: BsFlower1, title: 'Farming Techniques', desc: '8 modern farming methods — from crop rotation to hydroponics — with step-by-step implementation guides.', gradient: 'linear-gradient(135deg, #2e7d32, #66bb6a)' },
  { Icon: BsGlobeAmericas, title: 'Soil Information', desc: 'Detailed profiles of 6 major Indian soil types with suitable crops, characteristics, and management practices.', gradient: 'linear-gradient(135deg, #5d4037, #a1887f)' },
  { Icon: BsImage, title: 'Crop Image Analysis', desc: 'Upload crop photos for AI-powered disease detection, pest identification, and nutrient deficiency analysis.', gradient: 'linear-gradient(135deg, #6a1b9a, #ab47bc)' },
  { Icon: BsChatDotsFill, title: 'Smart Chatbot', desc: 'Floating AI chat assistant available on every page. Ask questions in natural language and get expert farming advice.', gradient: 'linear-gradient(135deg, #00695c, #4db6ac)' },
  { Icon: BsShieldCheck, title: 'Secure & Private', desc: 'Your data is protected with secure authentication, encrypted sessions, and strict privacy controls.', gradient: 'linear-gradient(135deg, #37474f, #78909c)' },
  { Icon: BsTranslate, title: '6 Languages', desc: 'Full multilingual support — English, Spanish, French, Hindi, Tamil, and Maithili. Farm in your language.', gradient: 'linear-gradient(135deg, #c62828, #ef5350)' },
  { Icon: BsPalette, title: '3 Theme Modes', desc: 'Light, Dark, and Night Light modes for comfortable viewing at any time of day. Your preference is saved.', gradient: 'linear-gradient(135deg, #283593, #7986cb)' },
  { Icon: BsPhone, title: 'Fully Responsive', desc: 'Works seamlessly on mobile, tablet, and desktop. Take GreenIQ to the field with you.', gradient: 'linear-gradient(135deg, #00838f, #4dd0e1)' },
];

export const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container my-5">
      <ScrollReveal>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold gradient-text">{t('platform_features')}</h1>
          <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Everything you need to modernize your farming — AI, weather, marketplace, and more — all in one platform.
          </p>
        </div>
      </ScrollReveal>

      <div className="row g-4">
        {features.map((f, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <ScrollReveal className="animate-on-scroll">
              <div className="card h-100 card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: 'none' }}>
                <div style={{ background: f.gradient, padding: '24px', color: '#fff' }}>
                  <f.Icon style={{ fontSize: '36px', marginBottom: '8px' }} />
                  <h5 className="fw-bold mb-0">{f.title}</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-0">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
};
