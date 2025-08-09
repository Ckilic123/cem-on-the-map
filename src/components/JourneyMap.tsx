import React, { useState, useEffect, useRef } from 'react';

const locations = [
  {
    id: 'deggendorf',
    name: 'Deggendorf, Germany',
    period: '2016-2017',
    role: 'Exchange Student',
    description: 'Studied at Bavaria Deggendorf Institute of Technology during my Industrial Engineering degree.',
    position: { x: 47, y: 35 }
  },
  {
    id: 'dusseldorf', 
    name: 'Düsseldorf, Germany',
    period: 'Dec 2018 - May 2019',
    role: 'Product Owner Intern',
    description: 'Managed global CRM rollout at METRO, leading tours showcasing AI applications in food wholesale.',
    position: { x: 42, y: 28 }
  },
  {
    id: 'istanbul',
    name: 'Istanbul, Turkey',
    period: 'Sep 2020 - Mar 2022',
    role: 'Product Owner',
    description: 'Launched Remote Advisory Service at ING, boosting investment revenue by 40% and generating €300M+ in deposits.',
    position: { x: 75, y: 65 }
  },
  {
    id: 'berlin',
    name: 'Berlin, Germany', 
    period: 'May 2022 - Oct 2023',
    role: 'Product Manager',
    description: 'Led global delivery strategy at AUTO1, shipped self-service tools achieving 87% adoption and 11% speed boost.',
    position: { x: 48, y: 25 }
  },
  {
    id: 'munich',
    name: 'Munich, Germany',
    period: 'Nov 2023 - Present',
    role: 'Product Manager',
    description: 'Leading SaaS product teams at CARFAX Europe, driving 24% YoY customer satisfaction increase through data-driven insights.',
    position: { x: 46, y: 38 }
  }
];

const JourneyMap = () => {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [travelerPosition, setTravelerPosition] = useState(locations[0].position);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (isPaused) return;
    
    setIsAnimating(true);
    
    const animateToNextLocation = () => {
      if (isPaused) return;
      
      const nextIndex = (currentLocationIndex + 1) % locations.length;
      const nextLocation = locations[nextIndex];
      
      // Animate to next position
      setTravelerPosition(nextLocation.position);
      setCurrentLocationIndex(nextIndex);
      
      // Wait 5 seconds at location, then move to next
      timeoutRef.current = setTimeout(() => {
        if (!isPaused) {
          animateToNextLocation();
        }
      }, 5000);
    };

    // Start the animation loop
    animateToNextLocation();
  };

  const pauseAnimation = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resumeAnimation = () => {
    setIsPaused(false);
    startAnimation();
  };

  useEffect(() => {
    // Auto-start animation after component mounts
    const startTimer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused, currentLocationIndex]);

  return (
    <section id="journey" className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            My European Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch my career progression across Europe, from student exchanges to leading product teams in major cities.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            className="relative animate-scale-in"
            onMouseEnter={pauseAnimation}
            onMouseLeave={resumeAnimation}
          >
            {/* Enhanced Europe Map with better contrast */}
            <div className="relative w-full h-auto">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-auto rounded-2xl shadow-2xl bg-muted border-2 border-border"
              >
                {/* Background */}
                <rect width="1000" height="600" fill="hsl(var(--muted))" />
                
                {/* Country borders - simplified Europe outline */}
                <g stroke="hsl(var(--border))" strokeWidth="2" fill="hsl(var(--card))">
                  {/* Germany */}
                  <path d="M400 150 L480 140 L490 200 L470 250 L420 240 L380 200 Z" />
                  {/* Turkey */}
                  <path d="M650 300 L800 290 L820 350 L750 380 L680 360 Z" />
                  {/* Other European countries - simplified shapes */}
                  <path d="M200 100 L350 90 L360 180 L300 200 L250 150 Z" /> {/* France */}
                  <path d="M350 200 L400 180 L450 220 L400 280 L320 260 Z" /> {/* Switzerland/Austria */}
                  <path d="M450 280 L550 270 L580 350 L480 360 Z" /> {/* Italy */}
                  <path d="M300 50 L500 40 L520 120 L480 140 L400 130 L350 90 Z" /> {/* Scandinavia */}
                </g>
                
                {/* Country labels */}
                <text x="440" y="200" textAnchor="middle" className="fill-muted-foreground text-sm font-medium">Germany</text>
                <text x="720" y="330" textAnchor="middle" className="fill-muted-foreground text-sm font-medium">Turkey</text>
                
                {/* Grid lines for reference */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="1000" height="600" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Animated Traveler */}
            <div
              className={`animated-traveler ${isPaused ? 'paused' : ''}`}
              style={{
                left: `${travelerPosition.x}%`,
                top: `${travelerPosition.y}%`,
                transition: isPaused ? 'none' : 'all 2s ease-in-out',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="absolute location-marker animate-fade-in"
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`,
                  animationDelay: `${index * 0.2}s`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="location-marker" />
                
                {/* Current Location Info */}
                {currentLocationIndex === index && isAnimating && (
                  <div className="absolute z-30 bottom-full mb-4 left-1/2 transform -translate-x-1/2 animate-fade-in">
                    <div className="card-elegant p-4 w-80 border border-border/60">
                      <h3 className="font-semibold text-lg mb-2 text-primary">
                        {location.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {location.period} • {location.role}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {location.description}
                      </p>
                    </div>
                    <div className="w-3 h-3 bg-card border border-border/60 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animation Controls */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              {isPaused ? 'Animation paused - hover over the map to explore' : 'Hover over the map to pause animation'}
            </p>
          </div>

          {/* Location Cards for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:hidden">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`card-elegant p-6 animate-fade-in ${
                  currentLocationIndex === index ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-lg mb-2 text-primary">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {location.period} • {location.role}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {location.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyMap;
