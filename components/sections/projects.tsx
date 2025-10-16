"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Brain,
  GraduationCap,
  TrendingUp,
  Bot,
  Bookmark,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";

// Map project IDs to their icons
const projectIcons: Record<string, LucideIcon> = {
  "optics-framework": Eye,
  "atlas": Brain,
  "secondbrain": GraduationCap,
  "ai-sales-buddy": TrendingUp,
  "streamflow": Bot,
  "refstash": Bookmark,
};

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            Featured <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Check out some of my recent work and side projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const IconComponent = projectIcons[project.id] || Brain;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group glass rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-8">
                    {/* Icon + Title Section */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <Button size="sm" variant="default" asChild className="flex-1">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild className="flex-1">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
