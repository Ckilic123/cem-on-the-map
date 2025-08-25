import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import projectCarfax from '@/assets/project-carfax.jpg';
import projectAuto1 from '@/assets/project-auto1.jpg';
import projectIng from '@/assets/project-ing.jpg';

const projects = [
  {
    id: 'ing-advisory',
    title: 'Remote Advisory @ ING',
    description:
      'Launched Remote Advisory Service for investment products boosting investment products revenue by 40%, achieving 90+% app adoption.',
    image: projectIng,
    tech: ['Scrum', 'A/B Testing', 'B2C', 'Mobile App', 'Product Strategy'],
  },
  {
    id: 'auto1-delivery',
    title: 'Last Mile Delivery Appointments @ AUTO1',
    description:
      'Shipped a self-service tool that automated last mile delivery scheduling and reduced manual coordination.',
    image: projectAuto1,
    tech: ['Microservices', 'Customer Journey Mapping', 'B2C', 'API Integration', 'Process Automation'],
  },
  {
    id: 'ing-fx',
    title: 'FX Rate Protected Time Deposit Account @ ING',
    description:
      'Launched FX-protected time deposit product MVP from 0 to 1 on mobile app and branches.',
    image: projectCarfax,
    tech: ['MVP', 'Go-to-Market', 'API Integration', 'Financial Products', 'Risk Management'],
  },
];

const ProjectSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<typeof projects[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <section id="projects" className="pt-4 md:pt-8 pb-20 hero-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-6xl lg:text-7xl font-bold tracking-tight text-center leading-tight mb-6">
              Product <span className="text-[hsl(var(--secondary))]">Highlights</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
              Fast, focused, and validated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTimeout(() => setHoveredProject(null), 150)}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs rounded-full border border-orange-400/50 font-medium shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">View Details</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-primary-foreground group-hover:text-secondary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-primary-foreground/80 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Preview Card */}
      {hoveredProject && (
        <div
          className="fixed z-50 w-80 p-4 rounded-xl bg-background border border-border shadow-xl transition-opacity duration-300"
          style={{
            top: `${mousePos.y + 20}px`,
            left: `${mousePos.x + 20}px`,
            pointerEvents: 'none',
          }}
        >
          <h3 className="text-lg font-semibold mb-2 text-primary">{hoveredProject.title}</h3>
          <p className="text-sm text-muted-foreground">{hoveredProject.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hoveredProject.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-orange-500/90 text-white rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSection;
