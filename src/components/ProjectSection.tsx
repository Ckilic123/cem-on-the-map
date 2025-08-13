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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the impactful products and solutions I've built across different industries and markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group card-elegant overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  {project.isActive ? (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      <a href={project.link} className="flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="w-full cursor-not-allowed opacity-60"
                      onClick={scrollToContact}
                    >
                      Coming Soon
                    </Button>
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