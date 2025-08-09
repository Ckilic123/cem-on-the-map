import React from 'react';
import { ExternalLink, TrendingUp, Users, Zap, Globe } from 'lucide-react';
import carfaxProject from '@/assets/project-carfax.jpg';
import auto1Project from '@/assets/project-auto1.jpg';
import ingProject from '@/assets/project-ing.jpg';
import metroProject from '@/assets/project-metro.jpg';

const projects = [
  {
    id: 'carfax',
    title: 'CARFAX Europe',
    subtitle: 'SaaS Product Strategy & Customer Insights',
    period: 'Nov 2023 - Dec 2024',
    image: carfaxProject,
    icon: TrendingUp,
    achievements: [
      'Led global cross-functional team of 7 engineers and designers',
      'Drove 24% YoY increase in customer satisfaction through UX redesign',
      'Built real-time feedback system capturing user insights via GTM'
    ],
    color: 'text-blue-600'
  },
  {
    id: 'auto1',
    title: 'AUTO1 GROUP',
    subtitle: 'Last Mile Delivery & Operational Excellence',
    period: 'May 2022 - Oct 2023',
    image: auto1Project,
    icon: Zap,
    achievements: [
      'Shipped self-service delivery tool with 87% adoption rate',
      'Boosted delivery speed by 11% through automation',
      'Launched pay-on-delivery MVP driving 11% sales increase'
    ],
    color: 'text-green-600'
  },
  {
    id: 'ing',
    title: 'ING Bank',
    subtitle: 'Investment Products & Digital Banking',
    period: 'Sep 2020 - Mar 2022', 
    image: ingProject,
    icon: Users,
    achievements: [
      'Launched Remote Advisory Service boosting revenue by 40%',
      'Generated €300M+ in deposits within 6 months',
      'Achieved 90%+ mobile app adoption for investment products'
    ],
    color: 'text-orange-600'
  },
  {
    id: 'metro',
    title: 'METRO',
    subtitle: 'Global CRM & AI Applications',
    period: 'Dec 2018 - May 2019',
    image: metroProject,
    icon: Globe,
    achievements: [
      'Managed NPS app rollout to 40,000 users across 24 countries',
      'Zero follow-up issues during global deployment',
      'Led Future Lab tours showcasing AI in food wholesale'
    ],
    color: 'text-purple-600'
  }
];

const ProjectSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key product initiatives that drove measurable business impact across fintech, automotive, and enterprise sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            
            return (
              <div
                key={project.id}
                className="project-card animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={`${project.title} project interface`}
                    className="project-image w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`p-2 rounded-lg bg-card/90 backdrop-blur-sm ${project.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-primary font-medium mb-2">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.period}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;