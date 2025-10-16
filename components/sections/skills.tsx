"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Eye,
  Cpu,
  Terminal,
  Brain,
  GraduationCap,
} from "lucide-react";

const skillCategories = [
  {
    title: "AI & LLM Integration",
    icon: Brain,
    skills: ["RAG Pipelines", "Vector Databases", "Prompt Engineering", "Multi-Agent Systems", "LangChain", "OpenAI API"],
  },
  {
    title: "Vector & Graph Databases",
    icon: Cpu,
    skills: ["FAISS", "ChromaDB", "Pinecone", "NetworkX", "BM25", "Hybrid Search"],
  },
  {
    title: "Backend Development",
    icon: Code2,
    skills: ["FastAPI", "Flask", "PostgreSQL", "SQLite", "RESTful APIs", "WebSockets"],
  },
  {
    title: "Frontend Development",
    icon: Terminal,
    skills: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    title: "DevOps & Infrastructure",
    icon: Eye,
    skills: ["AWS", "Docker", "Terraform", "Railway", "Vercel", "CI/CD", "GitHub Actions"],
  },
  {
    title: "Specialized Technologies",
    icon: GraduationCap,
    skills: ["MCP Servers", "Tree-sitter AST", "Chrome Extensions", "Privacy Engineering", "JWT Auth", "Alembic Migrations"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            Skills & <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-background text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
