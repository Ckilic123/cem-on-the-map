import Navigation from "@/components/Navigation";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import SimpleFooter from '@/components/SimpleFooter';

export default function IndexPage() {
  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <div className="relative z-10 mt-[100vh]">
        <ProjectSection />
        <SimpleFooter />
      </div>
    </div>
  );
}
