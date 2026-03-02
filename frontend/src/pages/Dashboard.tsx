import React from 'react';
import { NewsMarquee } from '../components/NewsMarquee';
import { HeroSection } from '../components/HeroSection';
import { WeatherWidget } from '../components/WeatherWidget';
import { AboutSection } from '../components/AboutSection';
import { FeaturesCards } from '../components/FeaturesCards';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <NewsMarquee />
      <div className="container my-5">
        <HeroSection />
        <div className="row my-5">
          <div className="col-md-8 offset-md-2">
            <WeatherWidget />
          </div>
        </div>
        <AboutSection />
        <FeaturesCards />
      </div>
    </div>
  );
};
