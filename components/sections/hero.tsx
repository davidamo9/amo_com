"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { track } from "@/lib/analytics";

/** Entrance delays in seconds; each element paints via CSS, no hydration needed. */
const enterAt = (seconds: number) => ({ "--enter-delay": `${seconds}s` } as CSSProperties);

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="hero-enter mb-8" style={enterAt(0.1)}>
            <span className="inline-block px-5 py-2.5 border border-orange-500/30 rounded-full text-sm tracking-[0.2em] uppercase font-body">
              <span className="text-foreground font-semibold">Aung Myint Oo</span>
              <span className="text-orange-500"> · AI &amp; Robotics Engineer · Founding Engineer</span>
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
          >
            <TextReveal className="block text-foreground" delay={0.3}>
              AI &amp; robotics engineer
            </TextReveal>{" "}
            <TextReveal className="block text-foreground" delay={0.55}>
              in Singapore. Idea to production,
            </TextReveal>{" "}
            <TextReveal className="block text-orange-500" delay={0.8}>
              end to end.
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-enter text-lg md:text-xl text-muted-foreground mb-12 font-body max-w-2xl"
            style={enterAt(0.9)}
          >
            I build perception, agents, and learning systems that compound over time. You bring
            the problem: an idea you can&apos;t build, a workflow stuck in the past, a venture that
            needs its technical half. I take it from first conversation to production, and run it
            after. Currently building at{" "}
            <a href="https://app.salesbugle.com/whats-new" target="_blank" rel="noopener noreferrer" onClick={() => track("salesbugle_outbound", { placement: "hero" })} className="text-orange-500 hover:text-orange-400 transition-colors">Salesbugle</a>.
          </p>

          {/* CTA Buttons */}
          <div className="hero-enter flex flex-wrap items-center gap-4 mb-16" style={enterAt(1.1)}>
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

            <a
              href="#factory"
              onClick={() => track("hero_fleet_link_click")}
              className="inline-flex items-center gap-2.5 px-2 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-orange-500 transition-colors duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-60 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              watch my AI fleet ship code
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-enter flex items-center gap-4" style={enterAt(1.3)}>
            {[
              { icon: Github, href: "https://github.com/davidamo9", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/aung-myint-oo99/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/amodev", label: "X" },
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-enter absolute bottom-10 left-1/2 -translate-x-1/2" style={enterAt(1.5)}>
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
      </div>

    </section>
  );
}
