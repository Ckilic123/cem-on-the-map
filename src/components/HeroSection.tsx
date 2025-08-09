import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, MapPin } from 'lucide-react';
import cemHeadshot from '@/assets/cem-headshot.jpg';

const HeroSection = () => {
  return (
    <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="mb-8 relative inline-block">
              <img
                src={cemHeadshot}
                alt="Cem Kilic - Product Manager"
                className="w-40 h-40 rounded-full border-4 border-primary-foreground/20 shadow-2xl mx-auto animate-float"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary-foreground text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Munich
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Cem Kilic
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-fade-in">
              Product Manager
            </p>
            
            <div className="prose prose-lg text-primary-foreground/80 mb-12 animate-fade-in max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">
                I'm a Product Manager based in Munich, Germany, with a passion for building impactful digital products that solve real customer problems. 
                Over the past 5+ years, I've led cross-functional teams across Europe, from fintech innovations in Istanbul to automotive solutions in Berlin and Munich. 
                I specialize in turning complex challenges into elegant product strategies that drive measurable business outcomes.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center animate-scale-in">
              <Button
                variant="outline"
                size="lg"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
                asChild
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
                variant="outline"
                size="lg"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
                asChild
              >
                <a
                  href="https://linkedin.com/in/cemkilic"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;