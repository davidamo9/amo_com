"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/animations/CountUp";

const stats = [
  { value: 7, label: "Production Projects", suffix: "" },
  { value: 6, label: "RAG Systems Built", suffix: "" },
  { value: 3, label: "Cloud Platforms", suffix: "" },
  { value: 12, label: "AI Agents", suffix: "+" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
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
              className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              About
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold"
            >
              Crafting{" "}
              <span className="text-gold-500">Intelligent</span> Systems
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed font-body">
                As <span className="text-gold-500 font-medium">Founding Engineer & Technical Lead</span> at{" "}
                <a href="https://salesbugle.com" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-400 transition-colors">SalesBugle</a>,
                I&apos;m building an agentic AI coaching platform that delivers just-in-time
                guidance for B2B sales teams. Leading the full technical vision from architecture
                to deployment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-body">
                Currently pursuing my Master&apos;s in Robotics at NUS, I bring deep expertise
                in RAG pipelines, multi-agent systems, and production AI deployments.
                I&apos;ve built MCP servers for LLM persistent memory, enterprise platforms
                with complex AI architectures, and privacy-first systems across industries.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-body">
                My approach combines technical leadership with hands-on engineering—designing
                scalable architectures, shipping production-grade code, and driving innovation
                in modern AI-powered products.
              </p>

              {/* Highlight box */}
              <div className="mt-8 p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-full min-h-[80px] bg-gradient-to-b from-gold-500 to-amber-500 rounded-full" />
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-foreground">Technical Focus</h3>
                    <p className="text-muted-foreground font-body text-sm">
                      Vector databases (FAISS, ChromaDB) · Modern frameworks (FastAPI, React, Next.js) ·
                      Cloud infrastructure (AWS, Railway, Vercel) · AI/ML pipelines · Enterprise deployments
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-gold-500/30 transition-all duration-300"
                  >
                    <div className="font-display text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-sm text-muted-foreground font-body">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Education card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-4 bg-card border border-border rounded-2xl p-6"
              >
                <h4 className="font-display text-lg font-semibold mb-3 text-foreground">Education</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gold-500 font-medium font-body">MSc Robotics</p>
                    <p className="text-muted-foreground text-sm font-body">National University of Singapore · 2023-2026</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium font-body">BEng Electrical Engineering</p>
                    <p className="text-muted-foreground text-sm font-body">Completed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
