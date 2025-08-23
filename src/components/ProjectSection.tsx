import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ExternalLink, X, Calendar, Target, TrendingUp, Users, Award
} from 'lucide-react';
import projectCarfax from '@/assets/project-carfax.jpg';
import projectAuto1 from '@/assets/project-auto1.jpg';
import projectIng from '@/assets/project-ing.jpg';
import projectMetro from '@/assets/project-metro.jpg';

const projects = [
  {
    id: 'ing-advisory',
    title: 'Remote Advisory @ ING',
    description:
      'Launched Remote Advisory Service for investment products boosting investment products revenue by 40%, achieving 90+% app adoption.',
    image: projectIng,
    tech: [
      'Scrum',
      'A/B Testing',
      'B2C',
      'Mobile App',
      'Product Strategy',
    ],
    details: {
      company: 'ING Bank',
      duration: '2020 - 2021',
      role: 'Customer Journey Expert',
      impact: '40% revenue boost',
      challenge:
        'Traditional advisory services were limited to high-net-worth clients, leaving mass and mass affluent segments underserved.',
      solution:
        'Developed a digital remote advisory solution on the mobile app for investment products such as stocks and ETFs, combining technology with human expertise.',
      results: [
        'Boosted investment revenue by 40%',
        'Increased mobile app adoption rate over 90%',
      ],
    },
  },
  // … other projects stay the same
];

const ProjectSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredProject, setHoveredProject] = useState<any>(null);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card image */}
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover"
                />
              </div>

              {/* Floating tech badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {project.tech.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                <div className="flex items-center justify-center h-12 w-12 bg-primary text-primary-foreground rounded-full transform transition-all duration-300 group-hover:scale-100">
                  <ExternalLink className="w-6 h-6" />
                </div>
              </div>

              {/* Card content */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-primary-foreground/80 text-sm">
                  {project.description}
                </p>
                {/* Impact metrics */}
                <div className="mt-2 text-primary-foreground/70 text-sm">
                  {project.details.impact.split(',')[0]}
                </div>
              </div>

              {/* Hover Popup */}
              {hoveredProject?.id === project.id && (
                <div className="absolute top-0 left-0 right-0 z-50 mt-4 mx-4 p-5 bg-gradient-to-b from-background/95 via-background/90 to-background/95 rounded-2xl shadow-2xl border border-border/50 space-y-4 pointer-events-none backdrop-blur-xl animate-fade-in">
                  {/* Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center mr-2">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Company</div>
                        <div className="text-xs text-primary-foreground/70">
                          {project.details.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center mr-2">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Duration</div>
                        <div className="text-xs text-primary-foreground/70">
                          {project.details.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center mr-2">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Role</div>
                        <div className="text-xs text-primary-foreground/70">
                          {project.details.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center mr-2">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Impact</div>
                        <div className="text-xs text-primary-foreground/70">
                          {project.details.impact}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-bold mb-1">Challenge</div>
                      <div className="text-xs text-primary-foreground/70 leading-snug">
                        {project.details.challenge}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1">Solution</div>
                      <div className="text-xs text-primary-foreground/70 leading-snug">
                        {project.details.solution}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="text-sm font-bold mb-1">Key Results</div>
                    <ul className="list-disc pl-4 text-xs text-primary-foreground/70 space-y-1">
                      {project.details.results.slice(0, 2).map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-background rounded-xl shadow-lg overflow-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal content */}
              <div className="p-6 space-y-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-muted text-foreground/70 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Overview section */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold">Company</div>
                    <div className="text-xs text-primary-foreground/70">
                      {selectedProject.details.company}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Duration</div>
                    <div className="text-xs text-primary-foreground/70">
                      {selectedProject.details.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Role</div>
                    <div className="text-xs text-primary-foreground/70">
                      {selectedProject.details.role}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Impact</div>
                    <div className="text-xs text-primary-foreground/70">
                      {selectedProject.details.impact}
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div>
                  <div className="text-sm font-bold mb-1">Challenge</div>
                  <p className="text-xs text-primary-foreground/70 leading-relaxed">
                    {selectedProject.details.challenge}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Solution</div>
                  <p className="text-xs text-primary-foreground/70 leading-relaxed">
                    {selectedProject.details.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <div className="text-sm font-bold mb-1">Key Results</div>
                  <ul className="list-disc pl-4 text-xs text-primary-foreground/70 space-y-1">
                    {selectedProject.details.results.map(
                      (result: string, index: number) => (
                        <li key={index}>{result}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
