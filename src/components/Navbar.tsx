import React from 'react';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side: Name */}
        <div className="text-xl font-semibold text-primary-foreground">
          Cem Kilic
        </div>

        {/* Right Side: Links */}
        <div className="flex items-center space-x-6">
          {/* Buttons */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors"
          >
            Home
          </Link>

          <Link
            to="portfolio"
            smooth={true}
            duration={500}
            className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors"
          >
            Portfolio
          </Link>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/cem-kilic-pm/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
