export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "optics-framework",
    title: "Optics Framework - No-Code Test Automation",
    description: "Open-source test automation framework enabling non-programmers to create scripts through keyword-based scripting in CSV or YAML format. Published on PyPI with comprehensive CI/CD integration.",
    longDescription: "Flexible and modular test automation framework that democratizes test scripting for non-technical users. Features multiple driver support with intelligent fallback mechanisms, seamless Appium and Vision integration for robust locator strategies, comprehensive configuration and test data management, custom loggers with annotated screenshots, and full CI/CD pipeline integration. Includes security scanning with Sonar, Bandit, and OpenSSF. Available as both CLI and SDK with extensive documentation. Designed to reduce long-term maintenance costs while improving accessibility across diverse testing applications.",
    image: "/images/projects/optics-framework.jpg",
    tags: ["Python", "PyPI", "Test Automation", "Appium", "Vision", "Robot Framework", "CI/CD", "OpenCV"],
    demoUrl: "https://pypi.org/project/optics-framework/",
    githubUrl: "https://github.com/davidamo9/optics-framework",
    featured: true,
  },
  {
    id: "atlas",
    title: "Atlas - Code Ingestion Pipeline with MCP",
    description: "Sophisticated code ingestion pipeline combining semantic embeddings with relationship graphs, plus MCP server for persistent LLM memory. Features graph-aware RAG and intelligent context assembly.",
    longDescription: "Atlas is a production-ready code understanding system with two key components: (1) Modular ingestion pipeline combining semantic vector search (ChromaDB/FAISS) with structural graph analysis (NetworkX) for hybrid retrieval, and (2) Model Context Protocol (MCP) server providing persistent memory for LLM coding assistants like Claude Code. Features Tree-sitter AST parsing, hierarchical summarization, multi-granularity code representation, hallucination detection, and token budget management. Includes web chatbot interface with conversation history. Built to handle enterprise-scale codebases with intelligent, context-aware code comprehension.",
    image: "/images/projects/atlas.jpg",
    tags: ["Python", "MCP", "FAISS", "ChromaDB", "NetworkX", "Tree-sitter", "RAG", "Flask"],
    githubUrl: "https://github.com/davidamo9/atlas",
    featured: true,
  },
  {
    id: "secondbrain",
    title: "SecondBrain - Academic Knowledge Assistant",
    description: "Local-first, privacy-focused RAG system for students to build personal knowledge bases from lectures, PDFs, and videos. Features FAISS + BM25 hybrid search with academic metadata extraction.",
    longDescription: "Privacy-focused academic knowledge management system operating 100% locally for students. Implements hybrid search combining FAISS vector similarity with BM25 keyword search for optimal retrieval. Features academic metadata extraction (course, topic, professor), SQLite for metadata management, math-friendly embeddings (intfloat/e5-small-v2), and clean modular architecture. Planned features include Whisper-based video transcription, automated flashcard generation, and citation management. Built for students prioritizing data privacy while maintaining powerful RAG capabilities for studying and research.",
    image: "/images/projects/secondbrain.jpg",
    tags: ["Python", "FAISS", "BM25", "SQLite", "RAG", "Privacy-First", "Education"],
    githubUrl: "https://github.com/davidamo9/secondbrain",
    featured: true,
  },
  {
    id: "ai-sales-buddy",
    title: "AI Sales Buddy - Enterprise Sales Platform",
    description: "Full-stack B2B sales enablement platform implementing M.A.G.I.C methodology with 12-agent AI architecture, real-time conversation analysis, and automated objection handling with Membrain CRM integration.",
    longDescription: "Comprehensive enterprise sales management platform featuring a 12-agent agentic AI architecture for intelligent sales assistance. Implements the M.A.G.I.C sales methodology with three-tier memory architecture (factual, experiential, procedural) for contextual understanding. Complete AWS deployment with Terraform IaC, Docker containerization, GitHub Actions CI/CD, bidirectional Membrain CRM sync, real-time conversation analysis, and automated startup scripts. Built with FastAPI backend and React 19 frontend, demonstrating full-stack enterprise architecture and DevOps excellence.",
    image: "/images/projects/ai-sales-buddy.jpg",
    tags: ["FastAPI", "React", "AWS", "Terraform", "OpenAI", "Docker", "CI/CD", "CRM"],
    githubUrl: "https://github.com/davidamo9/ai-sales-buddy",
    featured: true,
  },
  {
    id: "amoflow",
    title: "AMOflow - Intelligent Chatbot Platform",
    description: "Production AI chatbot platform with RAG capabilities, privacy-first lead capture, and Membrain CRM integration. Features interactive demos, document knowledge bases, and GDPR/CCPA compliance.",
    longDescription: "AMOflow is a production-ready AI chatbot platform designed for businesses to automate customer interactions with intelligent, context-aware responses. Implements RAG with FAISS vector database for document-grounded answers, supporting multiple LLM providers (OpenAI, Groq). Features privacy-first architecture with explicit user consent for data collection (GDPR/CCPA compliant), bidirectional Membrain CRM integration for automated lead capture, admin panel for document management, and multi-client deployment architecture. Built with React 19 frontend featuring Framer Motion animations and Flask backend deployed on Railway. Includes interactive demo playground, session management, rate limiting, and comprehensive security features.",
    image: "/images/projects/streamflow.jpg",
    tags: ["React", "TypeScript", "Flask", "FAISS", "RAG", "OpenAI", "Groq", "CRM", "Privacy-First"],
    demoUrl: "/amoflow",
    githubUrl: "https://github.com/davidamo9/streamflow-ai-platform",
    featured: true,
  },
  {
    id: "asr",
    title: "Real-Time Speech Analysis Platform",
    description: "Production-grade live audio transcription system with Whisper ASR, real-time WebSocket streaming, multi-layer noise filtering, and speaker diarization. Features browser audio capture, VAD filtering, and hallucination prevention.",
    longDescription: "Real-time audio transcription system built with faster-whisper ASR engine, designed for live call analysis and sales conversations. Implements sophisticated multi-layer noise filtering strategy including pre-transcription VAD (Voice Activity Detection), optimized Whisper parameters, post-transcription hallucination detection, and intelligent deduplication. Features browser audio capture supporting both tab audio and microphone input, WebSocket streaming with jitter buffering, audio windowing for optimal transcription accuracy, speaker diarization with role assignment (sales rep/prospect), and FFmpeg-based audio processing pipeline. Built with React frontend for real-time visualization, FastAPI backend with asyncio for concurrent processing, and comprehensive quality controls achieving 90%+ hallucination filtering. Production-ready with configurable thresholds, extensive logging, and support for both CPU and GPU acceleration.",
    image: "/images/projects/asr.jpg",
    tags: ["Python", "FastAPI", "React", "Whisper", "faster-whisper", "WebSocket", "FFmpeg", "VAD", "Real-time"],
    githubUrl: "https://github.com/davidamo9/ai-sales-buddy",
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}
