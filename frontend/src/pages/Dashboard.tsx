import React from 'react';
import { NewsMarquee } from '../components/NewsMarquee';
import { HeroSection } from '../components/HeroSection';
import { WeatherWidget } from '../components/WeatherWidget';
import { AboutSection } from '../components/AboutSection';
import { FeaturesCards } from '../components/FeaturesCards';
import { ContactForm } from '../components/ContactForm';
import { ScrollReveal } from '../hooks/useScrollAnimation';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <NewsMarquee />
      <div className="container my-5">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal className="animate-on-scroll">
          <div className="row my-5">
            <div className="col-md-8 offset-md-2">
              <WeatherWidget />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal className="animate-slide-left">
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal className="animate-scale">
          <FeaturesCards />
        </ScrollReveal>
        <ScrollReveal className="animate-on-scroll">
          <ContactForm />
        </ScrollReveal>
      </div>
    </div>
  );
};
