"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Users, Wrench } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "AI Product Architecture",
    description: "RAG systems, multi-agent orchestration, vector databases, layered memory systems, and model-agnostic LLM pipelines.",
  },
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description: "Next.js, FastAPI, PostgreSQL, AWS, CI/CD pipelines, and cloud-native deployment infrastructure.",
  },
  {
    icon: Users,
    title: "Technical Leadership",
    description: "Architecture decisions, hiring foundations, production operations, and end-to-end product ownership.",
  },
  {
    icon: Wrench,
    title: "Developer Tooling & Automation",
    description: "MCP servers, CLI tools, PyPI packages, Chrome extensions, CI/CD pipelines, and workflow automation.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-i-do" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              What I Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              I build the technical foundation
              <br className="hidden md:block" />
              <span className="text-orange-500"> for AI-native companies.</span>
            </motion.h2>
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-6">
                  <cap.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {cap.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Summary Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-lg text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed"
          >
            I partner with domain founders who have deep industry expertise but need a technical co-founder
            to transform their vision into scalable, AI-powered products with real-world traction.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
