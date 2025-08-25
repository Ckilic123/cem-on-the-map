import Navigation from "@/components/Navigation";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import SimpleFooter from '@/components/SimpleFooter';

export default function IndexPage() {
  return (
    <div className="page-scale">
      <Navigation />
      <HeroSection />
      <ProjectSection />
      <SimpleFooter />
    </div>
  );
}
