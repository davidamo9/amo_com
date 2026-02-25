"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const ventures = [
  {
    company: "Salesbugle",
    role: "Founding Engineer & Technical Lead",
    period: "Oct 2025 – Present",
    summary: "Built the backend and AI pipeline for a sales coaching SaaS — from empty repo to production with paying customers.",
    bullets: [
      "Backend: FastAPI, PostgreSQL, AWS ECS with multi-tenant data isolation",
      "AI pipeline: LLM-based conversation analysis with structured memory (vector + relational)",
      "Sole engineer on infrastructure, CI/CD, cost tracking, and production ops",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "AWS", "Next.js", "TypeScript", "LLM", "RAG"],
    link: "https://salesbugle.com",
  },
  {
    company: "Air Quality Monitoring Platform",
    role: "Solo Engineer",
    period: "Jan 2026 – Present",
    summary: "Building the MVP for an air quality monitoring platform — ingesting sensor data, running predictions, serving a dashboard.",
    bullets: [
      "Sensor ingestion pipeline with time-series storage and anomaly detection",
      "Predictive maintenance models trained on real air quality operational data",
      "Backend, infrastructure, and deployment — shipping solo",
    ],
    tags: ["Python", "AI/ML", "IoT", "Time-Series", "Cloud Infrastructure"],
  },
];

const previousRole = {
  company: "Mozark PTE LTD",
  role: "Robotics & Vision Engineer",
  period: "Aug 2023 – Sep 2025",
  summary: "Led development of robotic mobile testing systems deployed across Singapore, Philippines, Thailand, and India.",
  bullets: [
    "Designed delta-robot automation framework for mobile device testing",
    "Built computer vision and OCR pipelines for UI detection and interaction",
    "Deployed robotic testing systems across 4 countries (SG, PH, TH, IN)",
    "Created agentic LLM system exposing internal APIs as tools for natural-language test execution",
    "Built no-code automation framework (Optics) published on PyPI",
  ],
};

export function Ventures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ventures" className="py-24 md:py-32 bg-background relative">
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
              Ventures
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Where I&apos;m building.
            </motion.h2>
          </div>

          {/* Venture Cards */}
          <div className="max-w-4xl mx-auto space-y-8">
            {ventures.map((venture, index) => (
              <motion.div
                key={venture.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-orange-500/20 transition-all duration-300"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {venture.company}
                      </h3>
                      {venture.link && (
                        <a
                          href={venture.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-orange-500 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-orange-500 font-medium font-body mt-1">{venture.role}</p>
                  </div>
                  <span className="text-muted-foreground text-sm font-body shrink-0">{venture.period}</span>
                </div>

                {/* Summary */}
                <p className="text-muted-foreground font-body mb-6">{venture.summary}</p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {venture.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-muted-foreground font-body text-sm">
                      <span className="text-orange-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {venture.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Previously */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-body">Previously</span>
                  <h4 className="font-display text-lg font-semibold text-foreground mt-1">{previousRole.company}</h4>
                  <p className="text-muted-foreground text-sm font-body">{previousRole.role}</p>
                </div>
                <span className="text-muted-foreground text-sm font-body shrink-0">{previousRole.period}</span>
              </div>
              <p className="text-muted-foreground text-sm font-body mt-3">{previousRole.summary}</p>
              <ul className="space-y-1.5 mt-4">
                {previousRole.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-muted-foreground font-body text-sm">
                    <span className="text-orange-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
