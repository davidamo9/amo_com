"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/animations/CountUp";

const proofPoints = [
  { value: 8, suffix: "", label: "Open-Source & Shipped Projects", href: "#work" },
  { value: 4, suffix: "", label: "Countries with Live Deployments", href: "#ventures" },
  { value: 3, suffix: "", label: "AI SaaS Built from Scratch", href: "#work" },
  { value: 2, suffix: "", label: "Ventures as Founding Engineer", href: "#ventures" },
];

export function ProofBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-12 md:py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {proofPoints.map((point, index) => (
            <motion.a
              key={point.label}
              href={point.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(point.href);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="text-center cursor-pointer group"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-orange-500 mb-1 group-hover:text-orange-400 transition-colors">
                <CountUp end={point.value} suffix={point.suffix} duration={2} />
              </div>
              <div className="text-sm text-muted-foreground font-body group-hover:text-foreground transition-colors">
                {point.label}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
