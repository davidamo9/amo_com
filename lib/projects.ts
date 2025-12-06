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
    id: "salesbugle",
    title: "SalesBugle - Just-in-Time B2B Sales Coaching",
    description: "Agentic AI coaching platform delivering real-time guidance for enterprise B2B sales teams. Features M.A.G.I.C methodology, multi-agent architecture, and adaptive coaching that scales with individual rep skills and deal complexity.",
    longDescription: "As Founding Engineer & Technical Lead, building the core platform for just-in-time B2B sales coaching. SalesBugle adapts to individual sales reps based on their skills, competence, and deal situation—providing real-time guidance to close complex enterprise deals. Features include M.A.G.I.C System Implementation, custom sales process design, deal guidance framework, performance tracking & analytics, and ongoing process optimization. The platform serves startups to enterprises with 'Sales as a System' and 'Sales as a Service' offerings. Built with modern full-stack architecture, multi-agent AI systems, and production-grade deployment infrastructure.",
    image: "/images/projects/salesbugle.jpg",
    tags: ["Next.js", "TypeScript", "Agentic AI", "B2B SaaS", "Real-time Coaching", "Multi-Agent", "Enterprise"],
    demoUrl: "https://salesbugle.com",
    featured: true,
  },
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
    title: "Atlas - Code Repository Memory Assistant",
    description: "Persistent memory and semantic code understanding system for LLM coding assistants. Features MCP server integration, Tree-sitter AST parsing, and graph-aware RAG with intelligent context assembly.",
    longDescription: "Atlas is a production-ready code understanding system eliminating redundant re-indexing and reducing token usage. Features MCP server integration with 13+ tools for Claude Code, Tree-sitter AST parsing for Python/JavaScript/TypeScript/Go/Java, semantic code search with symbol discovery, relationship analysis (inheritance tracking, import mapping, function call graphs), error knowledge base with smart similarity matching, and AI-powered analysis with safety guardrails. Implements content-hash based caching to prevent redundant LLM processing, multi-granularity code representation (method → class → module), and incremental updates for changed files only.",
    image: "/images/projects/atlas.jpg",
    tags: ["Python", "MCP", "Tree-sitter", "FAISS", "NetworkX", "litellm", "sentence-transformers", "FastAPI", "SQLite"],
    githubUrl: "https://github.com/davidamo9/atlas",
    featured: true,
  },
  {
    id: "secondbrain",
    title: "SecondBrain - Personal AI Knowledge Assistant",
    description: "Full-stack AI assistant with hierarchical knowledge bases, RAG chat, and brainstorming capabilities. Features dual-brain architecture separating personal knowledge from project working memory.",
    longDescription: "Personal AI assistant with dual knowledge base architecture: Personal Brain for long-term isolated concepts, and Projects KB for working memory that can query the personal brain. Built with Next.js 14 frontend and FastAPI async backend. Features RAG chat with SSE streaming, document management (PDF, DOCX, Markdown, code files), web clipping, brainstorming sessions with PRD generation, and content generation for social media. Uses PostgreSQL with pgvector for semantic search, Neo4j for knowledge graphs, and supports multiple LLM providers (OpenAI, Groq) through an abstracted model-agnostic layer.",
    image: "/images/projects/secondbrain.jpg",
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Neo4j", "OpenAI", "Groq", "Zustand", "RAG"],
    githubUrl: "https://github.com/davidamo9/secondbrain",
    featured: true,
  },
  {
    id: "sql-playground",
    title: "SQL Learning Playground",
    description: "Interactive SQL learning resource with CLI and web UI featuring Monaco editor. Comprehensive 12-section curriculum from fundamentals to production patterns with real-world examples.",
    longDescription: "Comprehensive SQL learning platform with both CLI (Typer + Rich) and web UI (Next.js + Monaco Editor). Features 12-section curriculum covering fundamentals, schema design, advanced queries, JSON data, transactions, migrations, connection pooling, multi-tenancy, performance optimization, views, soft deletes, and audit trails. Includes real-world production patterns from AI Sales Buddy (CRM sync, live analysis, repository pattern). Each section provides README overview, cheatsheet, tutorial, SQLite/PostgreSQL examples, and practice exercises with solutions. Supports both SQLite (quick setup) and PostgreSQL (production concepts).",
    image: "/images/projects/sql-playground.jpg",
    tags: ["Next.js", "TypeScript", "Python", "FastAPI", "Monaco Editor", "SQLite", "PostgreSQL", "Typer", "Rich CLI"],
    demoUrl: "https://sqlplayground.aungmyintoo.com",
    featured: true,
  },
  {
    id: "asr",
    title: "Real-Time Speech Analysis Platform",
    description: "Production-grade live audio transcription with Whisper ASR, speaker diarization, and multi-layer noise filtering. Features WebSocket streaming, VAD, and hallucination prevention achieving 90%+ accuracy.",
    longDescription: "Real-time audio transcription system built with faster-whisper ASR engine, designed for live call analysis and sales conversations. Implements sophisticated multi-layer noise filtering strategy including pre-transcription VAD (Voice Activity Detection), optimized Whisper parameters, post-transcription hallucination detection, and intelligent deduplication. Features browser audio capture supporting both tab audio and microphone input, WebSocket streaming with jitter buffering, audio windowing for optimal transcription accuracy, speaker diarization with three modes (heuristic, embeddings, pyannote), and FFmpeg-based audio processing pipeline. Built with FastAPI backend with asyncio, hybrid storage (local + S3), and Redis caching. Supports configuration presets for low-latency, high-accuracy, and noisy environments.",
    image: "/images/projects/asr.jpg",
    tags: ["Python", "FastAPI", "faster-whisper", "pyannote.audio", "WebSocket", "FFmpeg", "VAD", "librosa", "Redis"],
    githubUrl: "https://github.com/davidamo9/ai-sales-buddy",
    featured: true,
  },
  {
    id: "telegrambot",
    title: "Couples Assistant Bot",
    description: "Telegram bot for couples featuring movie/restaurant pickers with random selection, shared event reminders with automatic notifications, and partnership management for coordinated planning.",
    longDescription: "Telegram bot designed for couples to simplify planning and coordination. Features include Movie Picker (add, list, randomly pick, mark as watched), Restaurant Picker (add with categories, random selection, category filtering), Event Reminders (schedule events with automatic reminders 1 day before + event day), and Partnership Management for coupled-specific data sharing. Built with Aiogram 3 for Telegram Bot API, FastAPI for webhooks, PostgreSQL with SQLAlchemy ORM, APScheduler for reminder scheduling, and Alembic for database migrations. Includes NLP date parsing and quick reminder service.",
    image: "/images/projects/telegrambot.jpg",
    tags: ["Python", "FastAPI", "Aiogram", "PostgreSQL", "APScheduler", "Alembic", "SQLAlchemy", "Telegram API"],
    featured: true,
  },
  {
    id: "refstash",
    title: "RefStash - Reference Manager",
    description: "Full-stack reference management system with Chrome extension for one-click saving from YouTube, Vimeo, TikTok, and Pinterest. Features tagging, search, and dashboard analytics.",
    longDescription: "Comprehensive reference management platform with three components: FastAPI backend with JWT authentication, PostgreSQL database, and full CRUD operations; React 18 frontend with TypeScript, Tailwind CSS, multi-view options (grid/list), advanced search with filtering, tag management with color coding, and dashboard with statistics; Chrome extension (Manifest V3) for one-click saving from video platforms with automatic metadata extraction. Features responsive design, type-safe API integration, and real-time search results.",
    image: "/images/projects/refstash.jpg",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Chrome Extension", "JWT", "Tailwind CSS", "Vite", "SQLAlchemy"],
    featured: true,
  },
  {
    id: "lybrary",
    title: "Lybrary - AI Content Curation Platform",
    description: "Multi-source content aggregator with AI-powered filtering, auto-categorization into 20+ topics, and social media post generation. Integrates Reddit, RSS, arXiv, and GitHub with Stripe subscriptions.",
    longDescription: "AI-powered content curation platform aggregating from multiple sources (Reddit, RSS, arXiv, GitHub, Hacker News, NewsAPI) with smart AI filtering using Anthropic Claude and OpenAI. Features hierarchical topic taxonomy with 20+ categories, automated relevance scoring, manual curation tools (star, bookmark, prioritize), and social media post generation workflow. Multi-user platform with OAuth authentication (Google, GitHub), role-based access, and subscription tiers (Free, Pro) via Stripe integration. Built with Next.js 14 frontend featuring TanStack Query, Zustand state management, Framer Motion animations, and FastAPI async backend with PostgreSQL database.",
    image: "/images/projects/lybrary.jpg",
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Anthropic Claude", "OpenAI", "Stripe", "OAuth", "Zustand", "TanStack Query"],
    demoUrl: "https://lybrary.aungmyintoo.com",
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}
