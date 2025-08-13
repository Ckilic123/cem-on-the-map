import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import projectCarfax from '@/assets/project-carfax.jpg';
import projectAuto1 from '@/assets/project-auto1.jpg';
import projectIng from '@/assets/project-ing.jpg';
import projectMetro from '@/assets/project-metro.jpg';

const projects = [
  {
    id: 'carfax',
    title: 'Data Quality Platform',
    description: 'Led global SaaS product teams to build advanced data quality and UX solutions, achieving 24% YoY customer satisfaction increase through data-driven insights.',
    image: projectCarfax,
    link: '/projects/carfax',
    isActive: true,
    tech: ['Product Strategy', 'Data Analytics', 'UX Research']
  },
  {
    id: 'auto1',
    title: 'Last Mile Delivery',
    description: 'Developed self-service delivery tools achieving 87% adoption rate and 11% speed improvement across European markets with pay-on-delivery MVP.',
    image: projectAuto1,
    link: '/projects/auto1',
    isActive: true,
    tech: ['Product Management', 'Operations', 'International Markets']
  },
  {
    id: 'ing',
    title: 'Investment Platform',
    description: 'Launched Remote Advisory Service boosting investment revenue by 40% and generating €300M+ in deposits through digital transformation.',
    image: projectIng,
    link: '/projects/ing',
    isActive: false,
    tech: ['FinTech', 'Investment Advisory', 'Digital Banking']
  },
  {
    id: 'metro',
    title: 'Global CRM System',
    description: 'Managed NPS rollout to 40,000+ users across 24 countries, leading tours showcasing AI applications in food wholesale industry.',
    image: projectMetro,
    link: '/projects/metro',
    isActive: false,
    tech: ['CRM', 'AI Applications', 'B2B']
  },
];

const ProjectSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-reveal flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image - Independent and rounded */}
              <div className="relative overflow-hidden h-56 rounded-2xl shadow-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl" />
              </div>
              
              {/* Content - Flexible height */}
              <div className="flex flex-col flex-1 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* CTA - Always at bottom */}
                <div className="mt-auto pt-4">
                  {project.isActive ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="space-y-2">
                      <div className="inline-flex items-center justify-center gap-2 w-full bg-muted text-muted-foreground font-medium py-3 px-6 rounded-lg">
                        Coming Soon
                      </div>
                      <button
                        onClick={scrollToContact}
                        className="text-primary hover:text-primary/80 text-sm underline w-full text-center transition-colors"
                      >
                        Get in touch for details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;