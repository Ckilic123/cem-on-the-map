import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Calendar, Target, TrendingUp, Users, Award } from 'lucide-react';
import projectCarfax from '@/assets/project-carfax.jpg';
import projectAuto1 from '@/assets/project-auto1.jpg';
import projectIng from '@/assets/project-ing.jpg';
import projectMetro from '@/assets/project-metro.jpg';

const projects = [{
  id: 'ing-advisory',
  title: 'Remote Advisory @ ING',
  description: 'Launched Remote Advisory Service for investment products boosting investment products revenue by 40%, achieving 90+% app adoption.',
  image: projectIng,
  tech: ['Scrum', 'A/B Testing', 'B2C'],
  details: {
    company: 'ING Bank',
    duration: '2020 - 2021',
    role: 'Customer Journey Expert',
    impact: '40% revenue boost',
    challenge: 'Traditional advisory services were limited to high-net-worth clients, leaving mass and mass affluent segments underserved.',
    solution: 'Developed a digital remote advisory solution on the mobile app for investment products such as stocks and ETFs, combining technology with human expertise.',
    results: [
      'Boosted investment revenue by 40%',
      'Increased mobile app adoption rate over 90%'
    ]
  }
}, {
  id: 'auto1-delivery',
  title: 'Last Mile Delivery Appointments @ AUTO1',
  description: 'Shipped a self-service tool that automated last mile delivery scheduling and reduced manual coordination.',
  image: projectAuto1,
  tech: ['Microservices', 'Customer Journey Mapping', 'B2C'],
  details: {
    company: 'AUTO1 Group',
    duration: '2021 - 2022',
    role: 'Product Manager',
    impact: '87% adoption, 11% speed improvement',
    challenge: 'Manual delivery scheduling resulted in delays, wrong bookings, and misallocation of the branches and home delivery driver capacity, forcing customer service employees to handle more workload.',
    solution: 'Built a self-service scheduling tool enabling customers to book delivery appointments in optimized slots, while drivers automatically received calendar invites with full delivery instructions.',
    results: [
      '11% improvement in delivery speed',
      'Reduced customer service calls by 20%'
    ]
  }
}, {
  id: 'ing-fx',
  title: 'FX Rate Protected Time Deposit Account @ ING',
  description: 'Launched FX-protected time deposit product MVP from 0 to 1 on mobile app and branches.',
  image: projectCarfax,
  tech: ['MVP', 'Go-to-Market', 'API Integration'],
  details: {
    company: 'ING Bank',
    duration: '2021 - 2022',
    role: 'Product Owner',
    impact: '€300M+ deposits',
    challenge: 'Currency instability was driving customers away from local-currency savings products.',
    solution: 'Launched MVP of FX-protected time deposit across mobile banking and branches, enabling customers to earn high yields without currency risk.',
    results: [
      '€300M+ in protected deposits'
    ]
  }
}];

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="projects" className="pt-4 md:pt-8 pb-20 hero-section">
        <div className="container mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-6xl lg:text-7xl font-bold tracking-tight text-center leading-tight mb-6">
              My <span className="text-[hsl(var(--secondary))]">Product Highlights</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
              Fast, focused, and validated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating tech badges */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-white text-xs rounded-full border border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">View Details</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-primary-foreground group-hover:text-secondary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-primary-foreground/80 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact metrics */}
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
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl my-8">
            <div className="bg-gradient-to-br from-background to-background/95 rounded-3xl shadow-2xl border border-border/50 animate-scale-in max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-4xl font-bold mb-2">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-semibold">{selectedProject.details.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{selectedProject.details.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-semibold">{selectedProject.details.role}</p>
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Challenge
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.details.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Solution
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.details.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Key Results
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.details.results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <p className="text-foreground">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSection;
