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
          <div className="grid lg:grid-cols-5 gap-8 items-center min-h-[70vh]">
            {/* Left Panel - Text and Photo (1/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Text Content */}
              <div className="space-y-6 scroll-reveal">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Based in Munich, Germany</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  Hi! I'm Cem.
                </h1>
                
                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-light text-primary-foreground/90">
                    Product Manager
                  </h2>
                  
                  <p className="text-lg text-primary-foreground/80 leading-relaxed">
                    I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 pt-4">
                  <Button
                    size="lg"
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
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </Button>
                  
                  <Button
                    size="lg"
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
                      <FileText className="w-5 h-5" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>

              {/* Photo */}
              <div className="flex justify-center lg:justify-start scroll-reveal">
                <div className="relative">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary-foreground/20 shadow-xl">
                    <img
                      src={cemHeadshot}
                      alt="Cem Kilic - Product Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Interactive Map (2/3 width) */}
            <div className="lg:col-span-3 scroll-reveal">
              <div className="text-center mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-primary-foreground">
                  My European Journey
                </h3>
                <p className="text-base text-primary-foreground/80">
                  Click to explore my career progression across Europe.
                </p>
              </div>
              <div className="h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl">
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