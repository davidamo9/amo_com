"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Map,
  Scale,
  Eye,
  GitBranch,
  Layers,
  FileCode,
  Sparkles
} from "lucide-react";

const evolutionStages = [
  {
    stage: 1,
    title: "Coordinates G-code",
    description: "One script per device per test",
    icon: Map,
    color: "from-gray-500 to-gray-600",
  },
  {
    stage: 2,
    title: "RobotSDK",
    description: "Script reusability with scaling & transformation",
    icon: Scale,
    color: "from-blue-500 to-blue-600",
  },
  {
    stage: 3,
    title: "Vision-Based Scripts",
    description: "Text and image locators for flexibility",
    icon: Eye,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    stage: 4,
    title: "Robot Framework",
    description: "Loops, branches, and conditionals",
    icon: GitBranch,
    color: "from-green-500 to-green-600",
  },
  {
    stage: 5,
    title: "Appium + Vision",
    description: "Multiple locator strategies with fallback",
    icon: Layers,
    color: "from-purple-500 to-purple-600",
  },
  {
    stage: 6,
    title: "Optics Framework",
    description: "No-code keyword-based scripting",
    icon: FileCode,
    color: "from-orange-500 to-orange-600",
  },
  {
    stage: 7,
    title: "AI-Agentic",
    description: "Natural language test creation",
    icon: Sparkles,
    color: "from-pink-500 to-pink-600",
  },
];

export function AutomationTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evolution" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            Automation{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Evolution
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            The journey from coordinates-based scripts to AI-powered natural language test creation
          </p>

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-purple-500 to-pink-500 rounded-full" />

              <div className="grid grid-cols-7 gap-4">
                {evolutionStages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex flex-col items-center"
                    >
                      {/* Stage Number Badge */}
                      <div className="text-sm font-bold text-muted-foreground mb-4">
                        Stage {stage.stage}
                      </div>

                      {/* Icon Circle */}
                      <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content Card */}
                      <div className="glass rounded-xl p-4 text-center min-h-[120px] flex flex-col justify-center">
                        <h3 className="font-semibold text-sm mb-2">{stage.title}</h3>
                        <p className="text-xs text-muted-foreground">{stage.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Timeline - Vertical */}
          <div className="lg:hidden space-y-6">
            {evolutionStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-4 items-start"
                >
                  {/* Timeline Line */}
                  {index < evolutionStages.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-1 bg-gradient-to-b from-current to-transparent opacity-20" />
                  )}

                  {/* Icon Circle */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass rounded-xl p-4 mt-2">
                    <div className="text-xs font-bold text-muted-foreground mb-1">
                      Stage {stage.stage}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
