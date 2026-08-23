"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Users, Wrench } from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Product, 0 to 1",
    description: "From ambiguous idea to shipped product: scoping, architecture, build, launch. Done for sales tech, climate tech, and my own products.",
  },
  {
    icon: Brain,
    title: "AI & Agentic Systems",
    description: "RAG systems, multi-agent orchestration, AI agent fleets, vector search, and LLM pipelines that hold up under real production usage.",
  },
  {
    icon: Wrench,
    title: "Infrastructure & Operations",
    description: "Cloud architecture, CI/CD, observability, and cost control, plus the unglamorous production ops that keep products alive after launch.",
  },
  {
    icon: Users,
    title: "Founder & Domain-Expert Partnership",
    description: "I translate deep industry knowledge into product decisions. You stay the expert. Technology stops being your bottleneck.",
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
              More than an engineer,
              <br className="hidden md:block" />
              <span className="text-orange-500"> an end-to-end product partner.</span>
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
            I partner with founders and domain experts who know their industry deeply but need one
            person to own everything technical. My job is to unblock you: turn what you know into a
            product people can buy, and keep it running while you grow the business.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
