export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "refstash",
    title: "RefStash",
    description: "A powerful reference management tool for developers to organize and access code snippets, documentation, and resources.",
    longDescription: "RefStash is a comprehensive reference management system that helps developers organize their code snippets, documentation links, and learning resources. Built with modern web technologies, it features a clean interface, powerful search, and tagging system.",
    image: "/images/projects/refstash.jpg",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    demoUrl: "https://aungmyintoo.com/refstash",
    githubUrl: "https://github.com/aungmyintoo/refstash",
    featured: true,
  },
  // Add more projects here as you build them
  {
    id: "project-two",
    title: "Project Two",
    description: "A brief description of your second project and what problems it solves.",
    image: "/images/projects/placeholder.jpg",
    tags: ["Node.js", "Express", "MongoDB"],
    featured: true,
  },
  {
    id: "project-three",
    title: "Project Three",
    description: "A brief description of your third project and its key features.",
    image: "/images/projects/placeholder.jpg",
    tags: ["Python", "Django", "PostgreSQL"],
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}
