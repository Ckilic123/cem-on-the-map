import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss product strategy, innovation, or potential collaborations? 
              I'm always excited to connect with fellow product enthusiasts and explore new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card-elegant p-6 text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">cem.klc@yahoo.com</p>
            </div>

            <div className="card-elegant p-6 text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+49 157 53116803</p>
            </div>

            <div className="card-elegant p-6 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Munich, Germany</p>
            </div>

            <div className="card-elegant p-6 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-8 h-8 text-primary mx-auto mb-3 flex items-center justify-center">
                🇩🇪
              </div>
              <h3 className="font-semibold mb-2">Status</h3>
              <p className="text-sm text-muted-foreground">Settlement Permit</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a
                href="mailto:cem.klc@yahoo.com"
                className="flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
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

            <Button
              variant="outline"
              size="lg"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;