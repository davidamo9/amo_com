"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Handshake, Package, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Founding Engineer",
    description:
      "Join an early-stage team and own the entire technical foundation — architecture, AI systems, infrastructure, and the road to the first paying customers.",
    fit: "For funded teams that need their first (or only) engineer to act like an owner.",
  },
  {
    icon: Handshake,
    title: "Fractional Technical Co-Founder",
    description:
      "You have the industry depth and the network; I bring the product and technology side. Long-term, equity-aligned partnership — not an agency relationship.",
    fit: "For domain experts sitting on a venture they can't build alone.",
  },
  {
    icon: Package,
    title: "End-to-End MVP Build",
    description:
      "A contract engagement with one deliverable: your idea running in production — designed, architected, built, deployed, and handed over or kept running.",
    fit: "For founders who need a real product, not a prototype that dies in a demo.",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative">
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
              Work With Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Three ways to get me{" "}
              <span className="text-orange-500">on your side.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-body"
            >
              Every engagement is end to end. I don&apos;t hand off half-finished systems —
              I ship products and stand behind them in production.
            </motion.p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex flex-col bg-card border border-border rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="inline-flex self-start p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-6">
                  <service.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-muted-foreground/70 font-body text-xs leading-relaxed mb-6">
                  {service.fit}
                </p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  Tell me what you&apos;re building
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
