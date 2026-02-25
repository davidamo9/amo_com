export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
  status: "production" | "active" | "complete" | "thesis";
  timeline: string;
  outcomes: { label: string; value: string }[];
  architecture: string[];
  decisions: { decision: string; why: string; tradeoff: string }[];
  artifacts: { type: "repo" | "package" | "demo" | "docs"; label: string; url: string }[];
  lessons: string[];
}

export const projects: Project[] = [
  {
    id: "amoos",
    title: "amoOS",
    description:
      "AI-powered personal operating system with RAG-based semantic search, distributed microservices on Cloudflare edge, and a Telegram bot for natural-language knowledge capture.",
    status: "active",
    timeline: "2025 – Present",
    tags: ["Next.js", "FastAPI", "pgvector", "Neo4j", "Cloudflare Workers", "RAG"],
    githubUrl: "https://github.com/davidamo9",
    outcomes: [
      { label: "Infra Cost", value: "~$11/mo" },
      { label: "Ingestion Pipeline", value: "10-step" },
      { label: "LLM Models", value: "4 (tiered)" },
      { label: "Embedding Dim", value: "384" },
    ],
    architecture: [
      "Cloudflare Pages (Next.js 16 + React 19) frontend, Cloudflare Workers gateway (Hono.js) with KV sessions, Railway FastAPI backend",
      "Three-layer memory model: personal KB (Layer 1), project working memory (Layer 2), episodic activity context (Layer 3)",
      "PostgreSQL + pgvector (384-dim BGE vectors) for similarity search, Neo4j for relationship traversal",
      "10-step document ingestion: upload → load → semantic chunk → embed → LLM entity extraction → hash dedup → entity consolidation → graph sync → relationship detection → 3D visualization",
      "Tiered LLM strategy: GPT-4o for PRDs, gpt-4o-mini for chat, Groq llama-3.3-70b for planning, local embeddings",
      "Content-hash caching on LLM calls reduced costs ~60% by skipping unchanged documents",
    ],
    decisions: [
      {
        decision: "Cloudflare free tier + Railway (~$10) over AWS/GCP",
        why: "Keep infrastructure under $15/month for a personal tool",
        tradeoff: "Limited compute on free tier, but sufficient for single-user workload",
      },
      {
        decision: "Local BGE-small embeddings over OpenAI ada-002",
        why: "Eliminate per-request embedding costs entirely",
        tradeoff: "384-dim vs 1536-dim — lower dimensionality, but retrieval quality is adequate for personal KB size",
      },
      {
        decision: "Semantic chunking (800 tokens, 150 overlap) with LLM boundary detection",
        why: "Produces better retrieval results than naive fixed-size chunking",
        tradeoff: "3–5x slower ingestion, but ingestion is a background task",
      },
    ],
    artifacts: [
      { type: "repo", label: "GitHub", url: "https://github.com/davidamo9" },
    ],
    lessons: [
      "SSE is better than WebSocket for LLM streaming — works through CDNs, auto-reconnects, and is simpler to implement.",
      "pgvector is sufficient for under 100K chunks; Neo4j adds value for relationship traversal but not similarity search.",
      "SQLAlchemy PostgreSQL enums are case-sensitive, which caused subtle bugs during migration.",
    ],
    featured: true,
  },
  {
    id: "atlas",
    title: "Atlas / Code Context MCP",
    description:
      "MCP server that indexes codebases via Tree-sitter AST and serves semantically relevant context to Claude Code, cutting token usage by 85–90%.",
    status: "active",
    timeline: "2025",
    tags: ["Python", "MCP", "FAISS", "Tree-sitter", "SQLite"],
    githubUrl: "https://github.com/davidamo9/atlas",
    outcomes: [
      { label: "Token Reduction", value: "85–90%" },
      { label: "Query Latency", value: "<100ms" },
      { label: "MCP Tools", value: "15+" },
      { label: "Indexing Speed", value: "~1k lines/sec" },
    ],
    architecture: [
      "SQLite storage layer for symbol index, relationship graph, and error KB",
      "Tree-sitter AST parsing for Python, TypeScript, Go, Java",
      "FAISS vector search with text fallback for semantic queries",
      "Code knowledge graph with multi-granularity traversal (Method → Class → Module)",
      "Token-aware chunking (max 500 tokens/chunk, 4000 token budget per query)",
      "Pluggable LLM layer with content-hash caching (optional, gated by env flag)",
    ],
    decisions: [
      {
        decision: "SQLite over PostgreSQL",
        why: "Zero-config, runs anywhere, no server process — matches developer tooling UX expectations",
        tradeoff: "No concurrent write support, but MCP servers are single-user",
      },
      {
        decision: "LLM features optional (ATLAS_LLM_ENABLED flag)",
        why: "Core value is AST-based context extraction, not LLM summaries",
        tradeoff: "Some features (code summarization) are degraded without LLM",
      },
    ],
    artifacts: [
      { type: "repo", label: "GitHub", url: "https://github.com/davidamo9/atlas" },
    ],
    lessons: [
      "Tree-sitter AST parsing handles edge cases (decorators, nested classes, multiline signatures) that regex misses entirely.",
      "Graph-aware retrieval (traversing call chains and imports) surfaces more relevant context than pure vector similarity.",
      "An error knowledge base that logs fixes alongside errors turned out to be surprisingly useful for recurring issues.",
    ],
    featured: true,
  },
  {
    id: "asr",
    title: "Real-Time Speech Analysis",
    description:
      "Live audio transcription with faster-whisper, pyannote speaker diarization, multi-layer noise filtering, and WebSocket streaming achieving 90%+ accuracy.",
    status: "complete",
    timeline: "2025",
    tags: ["Python", "faster-whisper", "pyannote", "WebSocket", "FastAPI"],
    githubUrl: "https://github.com/davidamo9/ai-sales-buddy",
    outcomes: [
      { label: "Word Accuracy", value: "85–95%" },
      { label: "Hallucination Filter", value: "90%+" },
      { label: "Latency", value: "2–5s" },
      { label: "Sessions/Core", value: "1–5" },
    ],
    architecture: [
      "Browser captures audio via Web Audio API, streams over WebSocket to FastAPI ingest service",
      "Jitter buffer → VAD → normalization → sliding window manager (60s windows, 15s overlap)",
      "Whisper ASR engine → speaker diarization → broadcast service pushes updates via WebSocket",
      "Three diarization modes: heuristic (fast), embeddings-based (voice characteristics), pyannote (neural)",
      "Four-layer noise filtering: pre-transcription VAD, Whisper param tuning, post-transcription hallucination detection, segment deduplication",
    ],
    decisions: [
      {
        decision: "Four-layer noise filtering pipeline",
        why: "Whisper hallucinates aggressively on silence and background noise — single-layer filtering is insufficient",
        tradeoff: "Added latency from multi-pass processing, but accuracy gains justify it",
      },
      {
        decision: "Sliding windows (60s/15s overlap) over fixed chunks",
        why: "Whisper needs context for accurate transcription, especially domain-specific terms",
        tradeoff: "Higher memory usage from overlapping audio buffers",
      },
      {
        decision: "CPU-only design (no GPU assumed)",
        why: "Target deployment environments don't guarantee GPU access",
        tradeoff: "Limited to 1–5 concurrent sessions per core",
      },
    ],
    artifacts: [
      { type: "repo", label: "GitHub", url: "https://github.com/davidamo9/ai-sales-buddy" },
    ],
    lessons: [
      "Whisper hallucinates aggressively on silence and background noise — the four-layer filtering pipeline was essential, not optional.",
      "Sliding windows with overlap give much better results than fixed non-overlapping chunks because Whisper needs context.",
      "Using the last 3 transcript segments as context prompts for subsequent windows significantly improved accuracy on domain-specific terms.",
    ],
    featured: true,
  },
  {
    id: "ai-chat",
    title: "AI Chat",
    description:
      "Production RAG chatbot with Membrain CRM integration, privacy-first architecture (GDPR/CCPA compliant), FAISS vector search, and Railway deployment.",
    status: "production",
    timeline: "2025",
    tags: ["Flask", "FAISS", "FastEmbed", "Membrain CRM", "PostgreSQL", "Railway"],
    outcomes: [
      { label: "Embedding Size", value: "33MB vs 420MB" },
      { label: "Inference Speed", value: "10x faster" },
      { label: "Doc Formats", value: "5" },
      { label: "Hosting Cost", value: "$5–20/mo" },
    ],
    architecture: [
      "Flask backend with FAISS + FastEmbed (ONNX-based) for vector search",
      "Multi-LLM support (OpenAI GPT + Groq) with automatic fallback",
      "PostgreSQL for persistent document storage surviving Railway redeployments",
      "Documents stored as BYTEA, FAISS index serialized via faiss.serialize_index(), chunks as JSONB",
      "Progressive conversation stages (Anonymous → Engaged → Qualified → Captured) control CTA timing",
      "Keyword-based CRM qualification (pricing, demo, quote — 2+ signals threshold) keeps PII local",
    ],
    decisions: [
      {
        decision: "FastEmbed (ONNX) over sentence-transformers",
        why: "33MB model vs 420MB, 10x faster inference, no PyTorch dependency",
        tradeoff: "Fewer model options, but embedding quality is sufficient for RAG",
      },
      {
        decision: "Keyword-based qualification over LLM intent detection",
        why: "Privacy requirement — no PII sent to external LLM APIs",
        tradeoff: "Less accurate intent detection, but predictable and GDPR-safe",
      },
    ],
    artifacts: [],
    lessons: [
      "FastEmbed (ONNX runtime) is a much better choice than sentence-transformers for production — smaller, faster, no PyTorch.",
      "Keyword-based qualification is crude but predictable and privacy-safe; LLM-based detection would require sending conversation content to external APIs.",
      "Railway's postgres:// to postgresql:// URL conversion is a common gotcha that needs auto-handling.",
    ],
    featured: true,
  },
  {
    id: "secondbrain",
    title: "SecondBrain",
    description:
      "Full-stack AI knowledge assistant with dual-brain architecture — personal knowledge base plus project working memory. Neo4j knowledge graph, RAG chat with SSE streaming, and pgvector.",
    status: "active",
    timeline: "2025 – Present",
    tags: ["FastAPI", "PostgreSQL", "pgvector", "Neo4j", "SSE Streaming"],
    outcomes: [
      { label: "Pipeline Steps", value: "9" },
      { label: "Vector Dim", value: "384 BGE" },
      { label: "Chunk Size", value: "800 tokens" },
      { label: "Storage", value: "PG + Neo4j" },
    ],
    architecture: [
      "FastAPI with PostgreSQL + pgvector (384-dim BGE vectors) + Neo4j",
      "9-step document pipeline: load → semantic chunk → embed → LLM entity extraction → hash dedup → entity consolidation → graph sync → relationship detection → visualization API",
      "RAG chat with SSE streaming and hybrid retrieval — pgvector for similarity, Neo4j for relationship traversal",
      "Dual brain: Layer 1 (personal KB — concepts, experiences, learnings) and Layer 2 (project memory — active projects, tasks, brainstorms)",
      "Knowledge graduation: completed project learnings auto-promote to personal KB",
    ],
    decisions: [
      {
        decision: "Hybrid storage (pgvector + Neo4j) over single DB",
        why: "Similarity search and relationship traversal serve genuinely different query patterns",
        tradeoff: "Operational complexity of two databases, Cypher queries to maintain",
      },
      {
        decision: "LLM boundary detection for semantic chunking",
        why: "Better retrieval quality than fixed-size chunking",
        tradeoff: "3–5x slower ingestion, but background task so acceptable",
      },
    ],
    artifacts: [],
    lessons: [
      "Hybrid storage (pgvector + Neo4j) is worth the complexity when you need both similarity search and relationship traversal.",
      "Semantic chunking with LLM boundary detection produces better retrieval than fixed-size chunking, but it's 3–5x slower.",
      "Entity consolidation (merging 'React', 'React.js', 'ReactJS' into one canonical entity) is harder than expected and still isn't perfect.",
    ],
    featured: true,
  },
  {
    id: "lybrary",
    title: "Lybrary",
    description:
      "Multi-source AI content curation platform aggregating Reddit, RSS, arXiv, GitHub Trending, HackerNews, and NewsAPI. Claude-powered filtering, OAuth authentication, and Stripe subscriptions.",
    status: "complete",
    timeline: "2025",
    tags: ["Next.js", "FastAPI", "Claude", "OAuth", "Stripe", "PostgreSQL"],
    outcomes: [
      { label: "Content Sources", value: "6" },
      { label: "API Endpoints", value: "15" },
      { label: "Subscription Tiers", value: "4" },
      { label: "Pre-filter Rejection", value: "60–70%" },
    ],
    architecture: [
      "FastAPI backend with SQLite (dev) / PostgreSQL (prod), OAuth 2.0 (Google + GitHub) + JWT auth",
      "Pipeline of source-specific scrapers feeding into Claude 3.5 Sonnet filtering and categorization",
      "Next.js 14 frontend with TanStack React Query + Zustand, Tailwind + shadcn/ui",
      "Four subscription tiers (Free / Pro / Max / Enterprise) via Stripe",
      "Aggressive pre-filtering (title/description heuristics) before LLM evaluation to control API costs",
    ],
    decisions: [
      {
        decision: "Pre-filter before LLM evaluation",
        why: "Claude API costs scale with content volume — simple heuristics reject 60–70% of irrelevant content cheaply",
        tradeoff: "Some edge-case relevant content may be filtered out by heuristic rules",
      },
      {
        decision: "Separate role-based access (admin) from tier-based access (features)",
        why: "Admin dashboard access and content limits are different concepts that share a user model",
        tradeoff: "More complex permission logic, but prevents conflating admin with enterprise tier",
      },
    ],
    artifacts: [],
    lessons: [
      "Role vs. tier is a real distinction worth getting right early — conflating 'admin' with 'enterprise tier' causes permission bugs.",
      "Reddit scraping is unreliable at scale; their API changes frequently and rate limits are aggressive.",
      "Pre-filtering content before LLM evaluation saves significant API costs — 60–70% rejection before Claude ever sees it.",
    ],
    featured: true,
  },
  {
    id: "optics-framework",
    title: "Optics Framework",
    description:
      "Open-source no-code test automation framework on PyPI. Keyword-based scripting in CSV/YAML with Appium, computer vision integration, and CI/CD support.",
    status: "production",
    timeline: "2022 – 2024",
    tags: ["Python", "PyPI", "Appium", "OpenCV", "Delta Robots", "CI/CD"],
    githubUrl: "https://github.com/davidamo9/optics-framework",
    demoUrl: "https://pypi.org/project/optics-framework/",
    outcomes: [
      { label: "Distribution", value: "PyPI" },
      { label: "Deployed In", value: "4 countries" },
      { label: "Backends", value: "3" },
      { label: "Test Format", value: "CSV/YAML" },
    ],
    architecture: [
      "Keyword parser reads CSV/YAML test definitions and dispatches to appropriate backend",
      "Three execution backends: Appium (mobile automation), OpenCV (vision-based element matching), robotics (Delta X 2 robot arms)",
      "G-code generation for physical robot interaction with scale-and-shift coordinate system",
      "Async processing pipeline for multi-backend coordination",
      "Agentic LLM layer exposing framework APIs as tools for natural-language test authoring",
    ],
    decisions: [
      {
        decision: "CSV/YAML keyword scripting over code-based tests",
        why: "Target users are QA engineers and ops staff, not developers",
        tradeoff: "Keyword abstraction hides edge cases (timing, device rotation, OS-specific behavior) that users still hit",
      },
      {
        decision: "Computer vision fallback for Appium",
        why: "Appium is flaky on certain device/OS combinations and can't reach custom UI elements",
        tradeoff: "Vision-based matching is slower and resolution-dependent",
      },
    ],
    artifacts: [
      { type: "repo", label: "GitHub", url: "https://github.com/davidamo9/optics-framework" },
      { type: "package", label: "PyPI", url: "https://pypi.org/project/optics-framework/" },
    ],
    lessons: [
      "No-code doesn't mean no complexity — the keyword abstraction hides edge cases that users still encounter.",
      "Physical robot calibration is the biggest operational cost; remote deployments need good documentation and self-calibration tooling.",
      "Computer vision (template matching) is more reliable than Appium for custom UI elements but slower and resolution-dependent.",
    ],
    featured: true,
  },
  {
    id: "telemanipulation",
    title: "Robotic Telemanipulation",
    description:
      "NLP-controlled robotic system for mobile device interaction using computer vision and AI. MSc thesis project at NUS.",
    status: "thesis",
    timeline: "Jan – Apr 2025",
    tags: ["Python", "Computer Vision", "NLP", "ROS", "Robotics"],
    outcomes: [
      { label: "Pipeline", value: "3-stage" },
      { label: "Interactions", value: "tap, swipe, type, read" },
      { label: "Thesis", value: "MSc @ NUS" },
      { label: "Foundation", value: "2 yrs robotics" },
    ],
    architecture: [
      "Three-stage pipeline: NLP intent parsing → computer vision UI detection → robotic motion execution",
      "ROS for robot communication, OpenCV for vision processing",
      "Natural language → structured action → G-code motor commands",
      "Camera-based screen understanding for dynamic UI element identification",
    ],
    decisions: [
      {
        decision: "Structured intermediate representation between NLP and robot",
        why: "Going directly from text to motor commands is too fragile",
        tradeoff: "Additional parsing step adds latency, but reliability is non-negotiable for physical systems",
      },
      {
        decision: "Proof-of-concept scope (4-month thesis timeline)",
        why: "MSc timeline limited scope — prioritized working demo over production robustness",
        tradeoff: "Not production-grade, but demonstrates the full pipeline end-to-end",
      },
    ],
    artifacts: [],
    lessons: [
      "The gap between 'works in the lab' and 'works reliably' is enormous for physical systems — lighting, camera angles, and reflections break vision pipelines.",
      "NLP-to-robot translation needs a structured intermediate representation; going directly from text to motor commands is too fragile.",
      "Two years of robotics experience at Mozark (delta robots, CV pipelines) was the foundation that made a 4-month thesis feasible.",
    ],
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
