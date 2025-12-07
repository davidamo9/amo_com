"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";

export function Hero() {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Particle system effect
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle (gold color)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 75, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 168, 75, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[150px] animate-pulse-slow hidden md:block" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow hidden md:block" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[180px] hidden md:block" />

      {/* Floating accent dots */}
      <div className="absolute top-1/3 right-[15%] w-2 h-2 bg-gold-500/50 rounded-full animate-float hidden md:block" />
      <div className="absolute top-2/3 left-[20%] w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-float hidden md:block" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 right-[25%] w-1 h-1 bg-gold-500/60 rounded-full animate-float hidden md:block" style={{ animationDelay: "4s" }} />

      {/* Decorative corner accents */}
      <div className="absolute top-24 left-8 w-20 h-px bg-gradient-to-r from-gold-500/40 to-transparent hidden lg:block" />
      <div className="absolute top-24 left-8 w-px h-20 bg-gradient-to-b from-gold-500/40 to-transparent hidden lg:block" />
      <div className="absolute top-24 right-8 w-20 h-px bg-gradient-to-l from-gold-500/40 to-transparent hidden lg:block" />
      <div className="absolute top-24 right-8 w-px h-20 bg-gradient-to-b from-gold-500/40 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2.5 border border-gold-500/30 rounded-full text-gold-500 text-sm tracking-[0.2em] uppercase font-body shimmer-hover">
              Founding Engineer & Technical Lead
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 tracking-tight"
          >
            <TextReveal className="block text-gold-500" delay={0.5}>
              Aung Myint Oo
            </TextReveal>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 font-body max-w-3xl mx-auto"
          >
            Building{" "}
            <span className="text-gold-500">agentic AI coaching platforms</span>{" "}
            at <a href="https://salesbugle.com" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-400 transition-colors">SalesBugle</a>.
            Full-stack engineer with expertise in AI systems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-lg text-muted-foreground/70 mb-12 font-body max-w-2xl mx-auto"
          >
            Specializing in RAG pipelines, multi-agent architectures,
            and production-grade enterprise AI solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="group relative inline-flex items-center px-8 py-4 bg-gold-500 text-background font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-gold-lg"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border border-gold-500/50 text-gold-500 font-semibold rounded-full hover:bg-gold-500/10 transition-all duration-300"
              >
                Get In Touch
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex items-center justify-center gap-6"
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
                className="group p-4 rounded-full border border-border hover:border-gold-500/50 text-muted-foreground hover:text-gold-500 transition-all duration-300 hover:scale-110 hover:shadow-glow-gold"
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
          href="#about"
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-gold-500 transition-colors duration-300"
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
