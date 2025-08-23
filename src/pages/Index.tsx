import Navigation from '@/components/Navigation';
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';

export default function IndexPage() {
  return (
    <>
      <Navigation />
      <div className="page-scale pt-16">
        <HeroSection />
        <ProjectSection />
      </div>
    </>
  );
}
