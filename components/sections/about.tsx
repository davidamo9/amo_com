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
              I&apos;m a passionate Full Stack Developer with a love for creating
              beautiful, functional, and user-centered digital experiences. With
              expertise in modern web technologies, I specialize in building
              responsive web applications that solve real-world problems.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              My journey in software development started with a curiosity about
              how things work on the web. Since then, I&apos;ve worked on various
              projects ranging from small business websites to complex web
              applications, always striving to write clean, maintainable code.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community. I believe in continuous learning and always
              staying up-to-date with the latest industry trends.
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
