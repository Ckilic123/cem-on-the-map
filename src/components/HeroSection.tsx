import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, MapPin } from 'lucide-react';
import cemHeadshot from '@/assets/pic.jpg';

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Based in Munich, Germany</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi! I’m Cem.
                </h1>
                
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-light text-primary-foreground/90">
                    Product Manager
                  </h2>
                  
                  <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                    I’m a Product Manager based in Munich, Germany. I have over 5 years’ blended experience in product roles across B2C and B2B. Fluent in English and German.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <a
                    href="https://github.com/cemkilic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
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
                    href="https://linkedin.com/in/cem-kilic-pm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-primary-foreground/20 shadow-2xl">
                  <img
                    src={cemHeadshot}
                    alt="Cem Kilic - Product Manager"
                    className="w-full h-full object-cover grayscale-0 hover:saturate-150 hover:contrast-125 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-primary-foreground/10 animate-pulse-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
