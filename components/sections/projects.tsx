"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import Link from "next/link";

const statusConfig = {
  production: { label: "Production", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  active: { label: "Active", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  complete: { label: "Complete", className: "bg-muted text-muted-foreground border-border" },
  thesis: { label: "Thesis", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
} as const;

function StatusBadge({ status }: { status: Project["status"] }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${config.className}`}>
      {config.label}
    </span>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Technical projects &{" "}
              <span className="text-orange-500">open source.</span>
            </motion.h2>
          </div>

          {/* 2x2+ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Link href={`/${project.id}`} className="block h-full">
                  <div className="group h-full bg-card border border-border rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300">
                    {/* Status + Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <StatusBadge status={project.status} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3 text-foreground group-hover:text-orange-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 font-body text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Top 2 outcomes */}
                    {project.outcomes.length >= 2 && (
                      <div className="flex items-center gap-4 mb-5 text-sm">
                        <div>
                          <span className="font-semibold text-orange-500">{project.outcomes[0].value}</span>
                          <span className="text-muted-foreground ml-1.5">{project.outcomes[0].label}</span>
                        </div>
                        <span className="text-border">|</span>
                        <div>
                          <span className="font-semibold text-orange-500">{project.outcomes[1].value}</span>
                          <span className="text-muted-foreground ml-1.5">{project.outcomes[1].label}</span>
                        </div>
                      </div>
                    )}

                    {/* Tags (max 4) */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground font-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-orange-500 transition-colors duration-300">
                      View case study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
