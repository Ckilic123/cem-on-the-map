import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import projectCarfax from '@/assets/project-carfax.jpg';
import projectAuto1 from '@/assets/project-auto1.jpg';
import projectIng from '@/assets/project-ing.jpg';
import projectMetro from '@/assets/project-metro.jpg';

const projects = [{
  id: 'carfax',
  title: 'Data Quality Platform',
  description: 'Led global SaaS product teams to build advanced data quality and UX solutions, achieving 24% YoY customer satisfaction increase through data-driven insights.',
  image: projectCarfax,
  link: '/projects/carfax',
  isActive: true,
  tech: ['Product Strategy', 'Data Analytics', 'UX Research']
}, {
  id: 'auto1',
  title: 'Last Mile Delivery',
  description: 'Developed self-service delivery tools achieving 87% adoption rate and 11% speed improvement across European markets with pay-on-delivery MVP.',
  image: projectAuto1,
  link: '/projects/auto1',
  isActive: true,
  tech: ['Product Management', 'Operations', 'International Markets']
}, {
  id: 'ing',
  title: 'Investment Platform',
  description: 'Launched Remote Advisory Service boosting investment revenue by 40% and generating €300M+ in deposits through digital transformation.',
  image: projectIng,
  link: '/projects/ing',
  isActive: false,
  tech: ['FinTech', 'Investment Advisory', 'Digital Banking']
}].slice(0, 3); // Only show 3 projects

const ProjectSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="pt-8 md:pt-12 pb-20 bg-subtle-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-10 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-reveal group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image - Fancy rounded independent item */}
              <div className="relative overflow-hidden h-64 rounded-3xl shadow-xl mb-8 group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content - Separate from image */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* CTA - Always positioned consistently */}
                <div className="flex">
                  {project.isActive ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="w-full">
                      <div className="inline-flex items-center justify-center gap-2 w-full bg-muted text-muted-foreground font-medium py-3 px-6 rounded-xl">
                        Coming Soon
                      </div>
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
