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
          <div className="flex flex-col lg:flex-row gap-12 items-start min-h-[80vh]">
            {/* Left Panel - Compact Text and Photo */}
            <div className="lg:w-1/3 space-y-8 scroll-reveal">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Munich, Germany</span>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-1 space-y-4">
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                      Hi! I'm Cem.
                    </h1>
                    
                    <h2 className="text-xl lg:text-2xl font-light text-primary-foreground/90">
                      Product Manager
                    </h2>
                    
                    <p className="text-base text-primary-foreground/80 leading-relaxed">
                      I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
                    </p>
                  </div>
                  
                  {/* Compact Photo - Next to text */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-3 border-primary-foreground/20 shadow-lg">
                      <img
                        src={cemHeadshot}
                        alt="Cem Kilic - Product Manager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    size="default"
                    variant="secondary"
                    asChild
                    className="w-full max-w-xs"
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
                    size="default"
                    variant="secondary"
                    asChild
                    className="w-full max-w-xs"
                  >
                    <a
                      href="/resume.pdf"
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
            </div>

            {/* Right Panel - Expanded Interactive Map */}
            <div className="lg:w-2/3 scroll-reveal">
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