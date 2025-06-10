import React from 'react';

interface Project {
  title: string;
  linkDemo: string;
  linkRepo: string;
  description: string;
}

const projects: Project[] = [
  {
    title: 'AURA – Foo Talent Group',
    linkDemo: 'https://aura-web.netlify.app/',
    linkRepo: 'https://github.com/FooTalentGroup/AURA',
    description: 'Front‑end dev & team lead: React + TypeScript + Tailwind + custom hooks. Reduced blockers 30%.',
  },
  {
    title: 'Fitness Shop – Pedro Lamanna',
    linkDemo: 'https://pedrolamanna.com/',
    linkRepo: 'https://github.com/adrian161103/ShopPedro',
    description: 'Full‑stack: React.js, Node.js, MongoDB, JWT auth. +20% perf gain.' ,
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(p => (
          <div key={p.title} className="border p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
            <p className="mb-4">{p.description}</p>
            <div className="space-x-4">
              <a href={p.linkDemo} target="_blank" rel="noopener" className="underline">Live Demo</a>
              <a href={p.linkRepo} target="_blank" rel="noopener" className="underline">Repo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;