import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, FileText, MapPin } from 'lucide-react';
import cemHeadshot from '@/assets/pic.jpg';
import EuropeCareerMap from './EuropeCareerMap';

// Force refresh to clear Github reference cache
const HeroSection = () => {
  return (
    <section id="hero" className="hero-section min-h-screen pt-16">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* 1. Intro and Links */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Based in Munich, Germany</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Hi! I'm Cem.
                </h1>
                
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-light text-primary-foreground/90">
                    Product Manager
                  </h2>
                  
                  <p className="text-base text-primary-foreground/80 leading-relaxed">
                    I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <a
                    href="https://linkedin.com/in/cem-kilic-pm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* 2. Photo */}
            <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-primary-foreground/20 shadow-2xl">
                  <img
                    src={cemHeadshot}
                    alt="Cem Kilic - Product Manager"
                    className="w-full h-full object-cover grayscale-0 hover:saturate-150 hover:contrast-125 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-primary-foreground/10 animate-pulse-glow" />
              </div>
            </div>

            {/* 3. Interactive Map */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary-foreground">
                  My European Journey
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  Click to explore my career progression across Europe.
                </p>
              </div>
              <div className="h-96 lg:h-[500px]">
                <EuropeCareerMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;