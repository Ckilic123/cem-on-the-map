import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-primary-glow/5">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center gap-6 animate-fade-in">
            <a
              href="mailto:cem.klc@yahoo.com"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
              title="Send Email"
            >
              <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://linkedin.com/in/cemkilic"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://github.com/cemkilic"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
              title="GitHub Profile"
            >
              <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </a>

            <div
              className="p-3 rounded-full bg-primary/10"
              title="Location: Munich, Germany"
            >
              <MapPin className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;