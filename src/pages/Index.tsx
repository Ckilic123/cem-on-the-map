
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen page-scale">
      <Navigation />
      <HeroSection />
      <div className="mt-12">
        <ProjectSection />
      </div>
    </div>
  );
};

export default Index;
