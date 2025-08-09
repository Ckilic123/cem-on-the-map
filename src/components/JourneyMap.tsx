import React, { useState } from 'react';
import europeMap from '@/assets/europe-map.jpg';

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
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            My European Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my career path across Europe, from student exchanges to leading product teams in major cities.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative animate-scale-in">
            <img
              src={europeMap}
              alt="Europe Map showing Cem's career journey"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="absolute location-marker animate-fade-in"
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`,
                  animationDelay: `${index * 0.2}s`
                }}
                onMouseEnter={() => setSelectedLocation(location.id)}
                onMouseLeave={() => setSelectedLocation(null)}
              >
                <div className="location-marker" />
                
                {/* Tooltip */}
                {selectedLocation === location.id && (
                  <div className="absolute z-20 bottom-full mb-4 left-1/2 transform -translate-x-1/2 animate-fade-in">
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

          {/* Location Cards for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:hidden">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="card-elegant p-6 animate-fade-in"
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