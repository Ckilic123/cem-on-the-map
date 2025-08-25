import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-6">
          <a
            href="mailto:cem.klc@yahoo.com"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
            title="Send Email"
          >
            <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </a>
          
          <a
            href="https://linkedin.com/in/cemkilic"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;