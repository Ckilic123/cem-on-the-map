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
      <section id="hero" className="hero-section min-h-screen pt-0">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-[85vh] scroll-reveal">
              <div className="h-full rounded-xl overflow-hidden shadow-2xl">
                <EuropeCareerMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="hero-section min-h-screen pt-0 flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-12 scroll-reveal">
          {/* Location */}
          <div className="flex items-center justify-center gap-3 text-primary-foreground/80">
            <MapPin className="w-5 h-5" />
            <span className="text-lg font-medium">Munich, Germany</span>
          </div>
          
          {/* Photo and Main Content */}
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="w-48 h-56 rounded-2xl overflow-hidden border border-primary-foreground/20 shadow-xl">
                <img
                  src={cemHeadshot}
                  alt="Cem Kilic - Product Manager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                Hi! I'm Cem.
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-light text-primary-foreground/90">
                Product Manager
              </h2>
              
              <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="min-w-[160px]"
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
              className="min-w-[160px]"
            >
              <a
                href={cemCV}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Resume
              </a>
            </Button>
          </div>
          
          {/* Journey CTA */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={() => setShowMap(true)}
              className="min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              <Map className="w-5 h-5 mr-2" />
              Have a look at my journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;