"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
            About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>

          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg text-muted-foreground mb-6">
              I&apos;m a full-stack AI engineer specializing in building production-ready systems that leverage
              RAG pipelines, vector databases, and large language models. My work bridges cutting-edge AI research
              with practical enterprise applications, creating tools that developers and businesses actually use.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              Currently pursuing my Master&apos;s in Robotics at NUS (2023-2026) with a Bachelor&apos;s in
              Electrical Engineering, I&apos;ve developed sophisticated systems including MCP servers for LLM
              persistent memory, enterprise sales platforms with multi-agent architectures, and privacy-first
              RAG systems deployed in production across multiple industries.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              My approach combines deep technical knowledge in vector databases (FAISS, ChromaDB), modern web
              frameworks (FastAPI, React), and cloud infrastructure (AWS, Railway, Vercel) with a focus on
              modular architecture, comprehensive documentation, and production-grade code quality. I believe
              in building systems that are both technically sophisticated and genuinely useful.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">7</div>
                <div className="text-sm text-muted-foreground">Production Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">6</div>
                <div className="text-sm text-muted-foreground">RAG Systems Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Cloud Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">12</div>
                <div className="text-sm text-muted-foreground">AI Agent Architecture</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
