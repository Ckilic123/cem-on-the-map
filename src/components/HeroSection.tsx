import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, FileText, MapPin, Map } from 'lucide-react';
import cemHeadshot from '@/assets/pic.jpg';
import cemCV from '@/assets/Cem_Kilic_CV.pdf';
import EuropeCareerMap from './EuropeCareerMap';

const HeroSection = () => {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <section id="hero" className="hero-section min-h-screen pt-0 pb-0">
        <div className="container mx-auto px-6 py-8">
          {/* Move map down by 15% */}
          <div className="pt-[15vh]">
            <div className="max-w-7xl mx-auto h-[70vh]">
              <div className="h-full rounded-xl overflow-hidden shadow-2xl">
                <EuropeCareerMap key="career-map" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowMap(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm underline"
              >
                ← Back to profile
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="hero-section min-h-screen pt-0 pb-0 flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Text Left, Photo Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Location (moved here) */}
              <div className="flex items-center gap-3 text-primary-foreground/80 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">Munich, Germany</span>
              </div>

              <div class
