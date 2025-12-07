"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Brain,
  GraduationCap,
  TrendingUp,
  Radio,
  Newspaper,
  Database,
  Heart,
  Bookmark,
  LucideIcon,
} from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";

// 3D Tilt Card Component
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setTransform({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

const projectIcons: Record<string, LucideIcon> = {
  salesbugle: TrendingUp,
  "optics-framework": Eye,
  atlas: Brain,
  secondbrain: GraduationCap,
  "sql-playground": Database,
  asr: Radio,
  telegrambot: Heart,
  refstash: Bookmark,
  lybrary: Newspaper,
};

// Bento grid sizing - creates visual interest with varied sizes
// Order: SalesBugle, Optics, Atlas, SecondBrain, SQL Playground, ASR, Telegrambot, RefStash, Lybrary
const bentoSizes = [
  "md:col-span-2 md:row-span-2", // Large featured (SalesBugle)
  "md:col-span-1 md:row-span-1", // Small (Optics)
  "md:col-span-1 md:row-span-1", // Small (Atlas)
  "md:col-span-1 md:row-span-2", // Tall (SecondBrain)
  "md:col-span-2 md:row-span-1", // Wide (SQL Playground)
  "md:col-span-1 md:row-span-1", // Small (ASR)
  "md:col-span-1 md:row-span-1", // Small (Telegrambot)
  "md:col-span-1 md:row-span-1", // Small (RefStash)
  "md:col-span-2 md:row-span-1", // Wide (Lybrary) - last item, spans 2 columns
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="py-24 md:py-32 bg-background relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent pointer-events-none" />

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
              className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Featured{" "}
              <span className="text-gradient-gold">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-body"
            >
              Production-ready AI systems and developer tools
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto auto-rows-[minmax(280px,auto)]">
            {projects.map((project, index) => {
              const IconComponent = projectIcons[project.id] || Brain;
              const sizeClass = bentoSizes[index % bentoSizes.length];
              const isLarge = sizeClass.includes("col-span-2") && sizeClass.includes("row-span-2");

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className={sizeClass}
                >
                  <TiltCard className="h-full">
                    <div className="group relative h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Glow effect */}
                      <div className="absolute -inset-px bg-gradient-to-br from-gold-500/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                      <div className="relative p-8 h-full flex flex-col">
                        {/* Icon */}
                        <div className="mb-6">
                          <div className="inline-flex p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/30 transition-all duration-300">
                            <IconComponent className="h-8 w-8 text-gold-500" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`font-display font-bold mb-3 group-hover:text-gold-500 transition-colors duration-300 ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-muted-foreground mb-6 flex-grow font-body ${isLarge ? "line-clamp-4" : "line-clamp-2"}`}>
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.slice(0, isLarge ? 6 : 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground font-body hover:border-gold-500/30 hover:text-foreground transition-all duration-300 cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > (isLarge ? 6 : 3) && (
                            <span className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground font-body hover:border-gold-500/30 hover:text-foreground transition-all duration-300 cursor-default">
                              +{project.tags.length - (isLarge ? 6 : 3)}
                            </span>
                          )}
                        </div>

                        {/* Action Links */}
                        <div className="flex gap-3 mt-auto">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
                              rel={project.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="flex items-center gap-2 px-4 py-2.5 bg-gold-500 text-background rounded-lg font-medium text-sm hover:bg-gold-400 transition-all duration-300 hover:shadow-glow-gold shimmer-hover"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Demo
                            </a>
                          )}
                          <a
                            href={project.githubUrl || "https://github.com/davidamo9"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg font-medium text-sm hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Glowing divider */}
          <div className="glow-divider mt-16 max-w-xl mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
