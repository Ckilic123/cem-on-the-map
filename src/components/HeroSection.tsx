import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Compass, Linkedin, FileText, Mail } from 'lucide-react';
import cemCV from '@/assets/Cem_Kilic_CV.pdf';
import EuropeCareerMap from './EuropeCareerMap';

const HeroSection: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <section
        id="hero"
        className="hero-section min-h-screen pt-0 pb-0 flex items-center justify-center transition-all duration-700 ease-in-out"
      >
        <div className="container mx-auto px-6 py-4">
          {/* Move map down by 5% */}
          <div className="pt-[5vh] transition-all duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto h-[80vh]">
              <div className="h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out transform scale-100">
                <EuropeCareerMap key="career-map" />
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowMap(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground underline transition-all duration-300"
            >
              ← Back to profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="hero-section h-screen pt-8 pb-0 flex items-center justify-center transition-all duration-700 ease-in-out"
    >
      <div className="container mx-auto px-6 py-8 transition-all duration-500 ease-in-out">
        {/* Main Content - Text Left, Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Location */}
            <div className="flex items-center gap-3 text-primary-foreground/80 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">Munich, Germany</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-left leading-tight">
                Hi! I’m <span className="text-[hsla(var(--secondary))]">Cem</span>.
              </h1>

              <h2 className="text-3xl lg:text-4xl font-light text-primary-foreground/90 text-left">
                Product Manager
              </h2>

              <p className="text-xl text-primary-foreground/80 leading-relaxed text-left max-w-lg">
                I build pragmatic, data-driven products. 5+ years across B2C & B2B.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start pt-6">
              <Button
                size="lg"
                onClick={() => {
                  setShowMap(true);
                  // make sure the map view starts at the top
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                }}
                className="min-w-[228px] h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg shadow-lg hover:shadow-xl transition-all animate-cta-tilt"
              >
                <Compass className="w-6 h-6 mr-3" />
                Have a look at my journey
              </Button>

              <a
                href="https://linkedin.com/in/cem-kilic-pm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-14 px-6 rounded-md border border-border hover:bg-muted transition"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>

              <a
                href={cemCV}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-14 px-6 rounded-md border border-border hover:bg-muted transition"
              >
                <FileText className="w-5 h-5" />
                Resume
              </a>

              <a
                href="mailto:hello@cemkilic.dev"
                className="flex items-center justify-center gap-2 h-14 px-6 rounded-md border border-border hover:bg-muted transition"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>
          </div>

          {/* Right column (kept empty to preserve layout spacing) */}
          <div className="lg:col-span-5" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
