import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <footer className="py-12 border-t border-primary/20 bg-gradient-to-t from-primary/5 to-transparent mt-auto">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-6">
            <a
              href="mailto:cem.klc@yahoo.com"
              className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group shadow-lg hover:shadow-xl border border-primary/10"
              title="Send Email"
            >
              <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </a>
            
            <a
              href="https://linkedin.com/in/cem-kilic-pm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group shadow-lg hover:shadow-xl border border-primary/10"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </a>
          </div>
          
          <div className="text-primary-foreground/60 text-sm">
            <p>Let's connect and build something amazing together</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;