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
              I&apos;m a Robotics Engineer with a Master&apos;s degree in Robotics, specializing in
              building AI systems for autonomous perception and decision-making. My work focuses
              on creating intelligent systems that can understand, reason, and act in complex
              environments.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              My expertise spans agentic workflows, RAG (Retrieval-Augmented Generation) pipelines,
              and semantic search systems. I combine deep learning, computer vision, and natural
              language processing to build cutting-edge AI solutions that push the boundaries of
              what&apos;s possible in autonomous systems.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              When I&apos;m not developing AI systems, you&apos;ll find me exploring the latest research
              in machine learning, contributing to open-source robotics projects, and sharing insights
              with the AI and robotics community. I believe in continuous innovation and staying at
              the forefront of autonomous technology.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">30+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
