"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Workflow, Handshake, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "You have an idea but no way to build it",
    description:
      "I take it from first conversation to production: scoped, architected, built, deployed, and handed over working. A real product, not a prototype that dies in a demo.",
    fit: "Usually a fixed-scope build, start to finish.",
  },
  {
    icon: Workflow,
    title: "A problem that needs a modern solution",
    description:
      "Manual processes, disconnected tools, work AI should be doing by now. I find the highest-leverage fix and build it into your operation without disrupting it.",
    fit: "Usually a short, focused engagement around one problem.",
  },
  {
    icon: Handshake,
    title: "Deep industry knowledge, no technical partner",
    description:
      "You know your field; I own everything technical, long term, as a partner, not an agency. You stay the expert while technology stops being your bottleneck.",
    fit: "Usually a long-term, equity-aligned partnership.",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative">
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
              How I Can Help
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Bring me a problem{" "}
              <span className="text-orange-500">worth solving.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-body"
            >
              However we structure it, the work is the same: understand the problem, build
              the solution, run it end to end. The first conversation is always free.
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
