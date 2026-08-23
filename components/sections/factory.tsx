"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * A condensed replay of a real amoOS dispatch (the HubSpot email sync task
 * that shipped as PR #385), auto-playing when scrolled into view. This is
 * the factory doing what it actually does: an AI worker takes the task,
 * loads compiled context, writes the code, and nothing ships until the one
 * human in the loop verifies it.
 */

type LineTone = "command" | "info" | "action" | "success";

interface ConsoleLine {
  text: string;
  tone: LineTone;
  delayMs: number;
}

const LINES: ConsoleLine[] = [
  { text: '$ amoos dispatch "Ship HubSpot email sync, phase 2C: email pull"', tone: "command", delayMs: 400 },
  { text: "  task scoped by AMO: architecture, constraints, acceptance criteria", tone: "info", delayMs: 600 },
  { text: "→ worker claude-code@macmini accepted task #385", tone: "action", delayMs: 700 },
  { text: "  context loaded: compiled brain pages for hubspot-full-email-sync", tone: "info", delayMs: 550 },
  { text: "  plan submitted · reviewed and approved by AMO", tone: "info", delayMs: 550 },
  { text: "  writing code: integrations/hubspot, sync services, migrations", tone: "info", delayMs: 650 },
  { text: "  tests passing · CI green · PR #385 opened", tone: "info", delayMs: 650 },
  { text: "→ verification queue: evidence attached (diff, tests, logs)", tone: "action", delayMs: 700 },
  { text: "✓ code reviewed and verified by AMO · merged · deployed", tone: "success", delayMs: 800 },
  { text: "  brain recompiled: lessons captured for the next task", tone: "info", delayMs: 550 },
];

const toneClasses: Record<LineTone, string> = {
  command: "text-foreground",
  info: "text-muted-foreground",
  action: "text-orange-400",
  success: "text-green-400",
};

export function Factory() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setVisibleCount(LINES.length);
      return;
    }
    if (visibleCount >= LINES.length) return;
    const timer = window.setTimeout(
      () => setVisibleCount((count) => count + 1),
      LINES[visibleCount].delayMs
    );
    return () => window.clearTimeout(timer);
  }, [isInView, visibleCount, reducedMotion]);

  const done = visibleCount >= LINES.length;

  return (
    <section id="factory" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
              The Factory
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              I don&apos;t just use AI.{" "}
              <span className="text-orange-500">I run a fleet.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              To be clear: you&apos;re not hiring the fleet, you&apos;re hiring the engineer
              who built it. I scope the problem, design the architecture, make the hard
              calls, and verify every result. The fleet is proof of what I can build, and
              it multiplies how fast my decisions become production code. Below is a real
              dispatch, condensed.
            </p>
          </div>

          {/* Console */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border bg-[#0D0D0D]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.06)]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/60">
                <span className="w-3 h-3 rounded-full bg-border" />
                <span className="w-3 h-3 rounded-full bg-border" />
                <span className="w-3 h-3 rounded-full bg-border" />
                <span className="ml-3 text-xs font-mono text-muted-foreground tracking-wider">
                  amoos · fleet console
                </span>
              </div>

              {/* Log */}
              <div className="px-5 py-5 font-mono text-xs sm:text-sm leading-relaxed min-h-[16rem]">
                {LINES.slice(0, visibleCount).map((line, index) => (
                  <div key={index} className={`${toneClasses[line.tone]} whitespace-pre-wrap`}>
                    {line.text}
                  </div>
                ))}
                <div className="text-foreground">
                  {done && <span>$ awaiting next dispatch</span>}
                  <span className="inline-block w-2 h-4 ml-1 align-middle bg-orange-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <p className="text-muted-foreground font-body mb-5">
                I scope it, I architect it, I verify it. The fleet just types faster than I do.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-background font-semibold rounded-full hover:bg-orange-400 transition-all duration-300"
              >
                Bring me your problem
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
