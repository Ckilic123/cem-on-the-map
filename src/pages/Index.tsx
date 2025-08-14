
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import ContactForm from '@/components/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="mt-24">
        <ProjectSection />
      </div>
      <div className="-mt-8">
        <ContactForm />
      </div>
    </div>
  );
};

export default Index;
