import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type Project = {
  id: string;
  title: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Portfolio / Map Experience',
    description:
      'Interactive career map across Europe with smooth transitions and city tooltips.',
  },
  {
    id: 'p2',
    title: 'Insights-as-a-Service (Case Study)',
    description:
      'CRE insights MVP for institutional buyers and asset managers: comps, pricing trends, underwriting tools.',
  },
];

const ProjectSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId(null);

  const selected = PROJECTS.find((p) => p.id === openId) || null;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-semibold mb-8">Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-border p-6 bg-card shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-xl font-medium mb-2">{p.title}</h4>
              <p className="text-primary-foreground/80 mb-4">{p.description}</p>
              <Button variant="secondary" onClick={() => open(p.id)}>
                View details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Centered modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-background rounded-lg max-w-lg w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h5 className="text-2xl font-semibold mb-3">{selected.title}</h5>
              <p className="text-primary-foreground/80">{selected.description}</p>
            </div>

            <div className="p-4 border-t border-border flex justify-end">
              <Button onClick={close}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
