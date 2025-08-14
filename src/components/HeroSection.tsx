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
          {/* Location */}
          <div className="flex items-center justify-start gap-3 text-primary-foreground/80 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-lg font-medium">Munich, Germany</span>
          </div>
          
          {/* Main Content - Text Left, Photo Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-left leading-tight">
  Hi! I'm <span className="text-[hsl(var(--secondary))]">Cem</span>.
                </h1>
                
                <h2 className="text-3xl lg:text-4xl font-light text-primary-foreground/90 text-left">
                  Product Manager
                </h2>
                
                <p className="text-xl text-primary-foreground/80 leading-relaxed text-left max-w-lg">
                  I'm a Product Manager based in Munich, Germany. I have over 5 years' blended experience in product roles across B2C and B2B. Fluent in English and German.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-start pt-6">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="min-w-[160px] h-12"
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
                  className="min-w-[160px] h-12"
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
            </div>
            
            {/* Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl
                w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem]">
                  <img
                    src={cemHeadshot}
                    alt="Cem Kilic - Product Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/10 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>
          
          {/* Journey CTA */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setShowMap(true)}
              className="min-w-[220px] h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Map className="w-6 h-6 mr-3" />
              Have a look at my journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
