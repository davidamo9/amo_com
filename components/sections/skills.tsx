"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Server, Monitor, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "AI & LLM Systems",
    icon: Brain,
    description: "Design and ship production LLM pipelines — from RAG retrieval and multi-agent orchestration to semantic search and memory systems.",
    skills: ["LLM Orchestration", "RAG Pipelines", "Multi-Agent Systems", "Vector Databases", "Semantic Search", "Prompt Engineering", "LangChain"],
  },
  {
    title: "Backend & Cloud",
    icon: Server,
    description: "Build scalable API services and cloud infrastructure for multi-tenant workloads, async processing, and production deployments across AWS and edge platforms.",
    skills: ["FastAPI", "PostgreSQL", "AWS (ECS, RDS, S3)", "Docker", "Redis", "CI/CD", "Stripe", "OAuth 2.0"],
  },
  {
    title: "Frontend & Product",
    icon: Monitor,
    description: "Ship polished, performant interfaces — from real-time dashboards and Chrome extensions to WebSocket-driven collaborative features.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "WebSockets", "Zustand", "Playwright"],
  },
  {
    title: "Robotics & Systems",
    icon: Cpu,
    description: "Engineer low-level systems combining computer vision, speech processing, and robotic control — deployed in production across 4 countries.",
    skills: ["Computer Vision", "OpenCV", "faster-whisper", "GStreamer", "Delta Robots", "Sensor Fusion", "ROS"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Technical depth{" "}
              <span className="text-orange-500">across the stack.</span>
            </motion.h2>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <div className="h-full bg-card border border-border rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <category.icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground font-body mb-5">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-secondary border border-border text-sm text-muted-foreground font-body"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
