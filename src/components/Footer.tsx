import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background py-2">
      <div className="container mx-auto px-6 flex justify-center items-center gap-4 text-sm text-primary-foreground/80">
        <a
          href="mailto:cem.klc@yahoo.com"
          className="hover:text-primary transition-colors"
        >
          cem.klc@yahoo.com
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://www.linkedin.com/in/cem-kilic-pm/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
