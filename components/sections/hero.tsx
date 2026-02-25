"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Subtle gradient blob */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] hidden md:block" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2.5 border border-orange-500/30 rounded-full text-orange-500 text-sm tracking-[0.2em] uppercase font-body">
              Founding Engineer
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
          >
            <TextReveal className="block text-foreground" delay={0.5}>
              I build the backend,
            </TextReveal>
            <TextReveal className="block text-foreground" delay={0.8}>
              the AI pipeline, and
            </TextReveal>
            <TextReveal className="block text-orange-500" delay={1.1}>
              the infrastructure.
            </TextReveal>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 font-body max-w-2xl"
          >
            Founding engineer based in Singapore. Currently building at{" "}
            <a href="https://salesbugle.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">Salesbugle</a>{" "}
            and Aeritas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <MagneticButton>
              <a
                href="#ventures"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-background font-semibold rounded-full hover:bg-orange-400 transition-all duration-300"
              >
                See My Work
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border border-orange-500/50 text-orange-500 font-semibold rounded-full hover:bg-orange-500/10 transition-all duration-300"
              >
                Let&apos;s Talk
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/davidamo9", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/aung-myint-oo99/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:aungmyintoo.david@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group p-3 rounded-full border border-border hover:border-orange-500/50 text-muted-foreground hover:text-orange-500 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="#what-i-do"
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-body">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </a>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
