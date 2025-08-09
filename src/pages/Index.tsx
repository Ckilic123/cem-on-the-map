import React from 'react';
import HeroSection from '@/components/HeroSection';
import JourneyMap from '@/components/JourneyMap';
import ProjectSection from '@/components/ProjectSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <JourneyMap />
      <ProjectSection />
      <ContactSection />
    </div>
  );
};

export default Index;
