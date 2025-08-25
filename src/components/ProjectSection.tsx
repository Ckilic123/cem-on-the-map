// ProjectSection.tsx
import React, { useState } from 'react';
import {
  ExternalLink,
  X,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react';

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
  {
    id: 'auto1-delivery',
    title: 'Last Mile Delivery Appointments @ AUTO1',
    description:
      'Shipped a self-service tool that automated last mile delivery scheduling and reduced manual coordination.',
    image: projectAuto1,
    tech: [
      'Microservices',
      'Customer Journey Mapping',
      'B2C',
      'API Integration',
      'Process Automation',
    ],
    details: {
      company: 'AUTO1 Group',
      duration: '2021 - 2022',
      role: 'Product Manager',
      impact: '87% adoption, 11% speed improvement',
      challenge:
        'Manual delivery scheduling resulted in delays, wrong bookings, and misallocation of the branches and home delivery driver capacity, forcing customer service employees to handle more workload.',
      solution:
        'Built a self-service scheduling tool enabling customers to book delivery appointments in optimized slots, while drivers automatically received calendar invites with full delivery instructions.',
      results: [
        '11% improvement in delivery speed',
        'Reduced customer service calls by 20%',
      ],
    },
  },
  {
    id: 'ing-fx',
    title: 'FX Rate Protected Time Deposit Account @ ING',
    description:
      'Launched FX-protected time deposit product MVP from 0 to 1 on mobile app and branches.',
    image: projectCarfax,
    tech: [
      'MVP',
      'Go-to-Market',
      'API Integration',
      'Financial Products',
      'Risk Management',
    ],
    details: {
      company: 'ING Bank',
      duration: '2021 - 2022',
      role: 'Product Owner',
      impact: '€300M+ deposits',
      challenge:
        'Currency instability was driving customers away from local-currency savings products.',
      solution:
        'Launched MVP of FX-protected time deposit across mobile banking and branches, enabling customers to earn high yields without currency risk.',
      results: ['€300M+ in deposits'],
    },
  },
];

const ProjectSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="pt-4 md:pt-8 pb-20 hero-section relative">
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
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 relative"
              onClick={() => handleProjectClick(project)}
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
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
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
                  <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{project.details.impact.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Modal Overlay */}
      {selectedProject && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Centered Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Modal Content - Keep original simple content */}
              <div className="p-6 space-y-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {selectedProject.details.company} • {selectedProject.details.duration}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {selectedProject.details.challenge}
                </p>
                <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    Impact: {selectedProject.details.impact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectSection;
