import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, FileText, MapPin } from 'lucide-react';
import cemHeadshot from '@/assets/pic.jpg';
import cemCV from '@/assets/Cem_Kilic_CV.pdf';
import EuropeCareerMap from './EuropeCareerMap';

// Force refresh to clear Github reference cache
const HeroSection = () => {
  return (
    <section id="hero" className="hero-section min-h-screen pt-0">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[85vh]">
            {/* Left Panel - Redesigned Text and Photo */}
            <div className="lg:w-1/5 space-y-6 scroll-reveal">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Munich, Germany</span>
              </div>
              
              {/* Photo positioned above text */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-40 lg:w-36 lg:h-44 rounded-lg overflow-hidden border border-primary-foreground/20 shadow-lg">
                  <img
                    src={cemHeadshot}
                    alt="Cem Kilic - Product Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  Hi! I'm Cem.
                </h1>
                
                <h2 className="text-lg lg:text-xl font-light text-primary-foreground/90">
                  Product Manager
                </h2>
                
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  className="w-full"
                >
                  <a
                    href="https://linkedin.com/in/cem-kilic-pm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  className="w-full"
                >
                  <a
                    href={cemCV}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Panel - Expanded Interactive Map */}
            <div className="lg:w-4/5 scroll-reveal">
              <div className="h-[500px] lg:h-[700px] rounded-xl overflow-hidden shadow-2xl">
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