"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Eye,
  Cpu,
  Terminal,
  Brain,
  GraduationCap,
  Radio,
  Wrench,
  ScanEye,
  LucideIcon,
} from "lucide-react";

const skillCategories = [
  {
    title: "AI & LLM Integration",
    icon: Brain,
    skills: ["RAG Pipelines", "Vector Databases", "Prompt Engineering", "Multi-Agent Systems", "LangChain", "OpenAI API", "Anthropic Claude", "Groq", "FastEmbed", "litellm"],
  },
  {
    title: "Vector & Graph Databases",
    icon: Cpu,
    skills: ["FAISS", "ChromaDB", "pgvector", "Neo4j", "NetworkX", "BM25", "Hybrid Search"],
  },
  {
    title: "Backend Development",
    icon: Code2,
    skills: ["FastAPI", "Flask", "PostgreSQL", "SQLite", "Redis", "SQLAlchemy", "Alembic", "WebSockets"],
  },
  {
    title: "Frontend Development",
    icon: Terminal,
    skills: ["React 18/19", "TypeScript", "Next.js 14+", "Tailwind CSS", "Vite", "Framer Motion", "Zustand", "TanStack Query"],
  },
  {
    title: "Audio & Speech Processing",
    icon: Radio,
    skills: ["faster-whisper", "Whisper ASR", "pyannote.audio", "Speaker Diarization", "VAD", "FFmpeg", "librosa"],
  },
  {
    title: "Computer Vision & Robotics",
    icon: ScanEye,
    skills: ["OpenCV", "YOLO", "3D Vision", "Point Clouds", "SLAM", "Depth Estimation", "CNNs", "Semantic Segmentation", "Pose Estimation"],
  },
  {
    title: "DevOps & Tools",
    icon: Eye,
    skills: ["Docker", "Railway", "Vercel", "CI/CD", "GitHub Actions", "MCP Servers", "Tree-sitter"],
  },
  {
    title: "Specialized",
    icon: Wrench,
    skills: ["Chrome Extensions", "Telegram Bot API", "Stripe", "OAuth 2.0", "JWT Auth", "Monaco Editor", "Typer CLI"],
  },
];

// 3D Tilt Card for Skills
function SkillTiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

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
              className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Skills &{" "}
              <span className="text-gradient-gold">Technologies</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-body"
            >
              The technologies and tools I use to bring ideas to life
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <SkillTiltCard className="h-full">
                  <div className="group h-full bg-card border border-border rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-px bg-gradient-to-br from-gold-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/30 group-hover:shadow-glow-gold transition-all duration-300">
                          <category.icon className="h-6 w-6 text-gold-500" />
                        </div>
                        <h3 className="font-display text-lg font-semibold group-hover:text-gold-500 transition-colors duration-300">
                          {category.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-secondary border border-border text-sm text-muted-foreground font-body hover:border-gold-500/30 hover:text-foreground transition-all duration-300 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SkillTiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
