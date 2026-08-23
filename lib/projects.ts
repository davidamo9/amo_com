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
    title: "amoOS: My Personal Software Factory",
    description:
      "An AI operating system where I plan, dispatch, and verify while a fleet of AI agents does the building. It runs every project I own, remembers everything it learns, and reports to me through a native macOS cockpit and Telegram.",
    status: "active",
    timeline: "Nov 2025 – Present",
    tags: ["AI Agent Fleet", "Orchestration", "Second Brain", "MCP", "FastAPI", "Next.js"],
    outcomes: [
      { label: "Projects Orchestrated", value: "11" },
      { label: "Compiled Knowledge Pages", value: "400+" },
      { label: "Command Surfaces", value: "3" },
      { label: "Factory KPIs Tracked", value: "4" },
    ],
    architecture: [
      "A fleet of AI coding agents executes the actual work across all of my projects. My role is reduced to planning, dispatching, and verifying",
      "Everything the system touches (sessions, decisions, documents, forwarded links) is distilled into a living per-project wiki plus a personal knowledge base, so context compounds instead of evaporating",
      "Multi-surface command: a native macOS cockpit for deep work, Telegram for mobile steering and approvals, and a web dashboard for reference",
      "Frictionless capture: forward a link or a note to Telegram and it lands in the knowledge base, enriched and searchable",
      "A shared project registry, sprints, kanban, and cross-project memory search that every work session plugs into",
      "Self-accounting: the factory measures its own utilization, yield, attention cost, and reporting speed, and answers for them",
    ],
    decisions: [
      {
        decision: "Human verification gates everything the fleet ships",
        why: "Autonomous output without trust is worthless. 'Verified done, with evidence' is the unit of progress",
        tradeoff: "Throughput is capped by my review attention, which forced me to design the review experience as a first-class product",
      },
      {
        decision: "One system runs every project instead of per-project tooling",
        why: "Memory compounds across projects: a lesson learned in one product immediately benefits the next",
        tradeoff: "Platform work permanently competes with product work, so scope discipline is enforced ruthlessly",
      },
      {
        decision: "The system owns the memory, not the humans or the chat logs",
        why: "An assistant that forgets is a chatbot; a system that compounds knowledge is a moat",
        tradeoff: "Knowledge upkeep is real work: curation, deduplication, and staleness detection all had to be built",
      },
    ],
    artifacts: [
      { type: "docs", label: "Build Log", url: "/notes/personal-software-factory" },
      { type: "docs", label: "amoOS MCP Case Study", url: "/amoos-mcp" },
    ],
    lessons: [
      "Once agents write the code, the bottleneck moves to deciding, verifying, and remembering, so that is what the system optimizes for.",
      "AI agents are only as good as the context you hand them; a compiled, current knowledge base beats raw history every time.",
      "Trust is the real product: slower verified output is worth more than fast unverified output.",
    ],
    featured: true,
  },
  {
    id: "amoos-mcp",
    title: "amoOS MCP: Remote Fleet Control",
    description:
      "A hosted, remote MCP server that exposes the entire amoOS factory as 86 tools to any MCP-capable agent. Claude Code, Codex, Manus, or anything that speaks the protocol can plug in and run my fleet: projects, tasks, memory, dispatch, and telemetry.",
    status: "production",
    timeline: "2026 – Present",
    tags: ["MCP", "Remote Hosted", "OAuth", "AI Agent Fleet", "Model-Agnostic", "Python"],
    outcomes: [
      { label: "MCP Tools Exposed", value: "86" },
      { label: "Agent Runtimes", value: "Any MCP client" },
      { label: "Access Modes", value: "Remote + local" },
      { label: "Fleet Workers", value: "Claude + Codex" },
    ],
    architecture: [
      "Hosted remote MCP endpoint: agents connect over the network, not just from my machine, so the factory is reachable from any device or runtime",
      "OAuth-secured for remote callers, machine tokens for local CLIs; every request is authorized as a specific caller",
      "One tool surface covers the whole operating system: project registry, tasks and sprints, compiled wiki, cross-project memory search, session dispatch, and fleet telemetry",
      "Model-agnostic by design: Claude Code and Codex workers are interchangeable on the same fleet, and any MCP-capable agent can drive it without special-casing",
      "Terse-by-default responses with opt-in detail, because agent context windows are the scarce resource",
      "Backed by live data: 11 active projects and 400+ compiled knowledge pages served through the same tools I use daily",
    ],
    decisions: [
      {
        decision: "One remote MCP server instead of per-agent integrations",
        why: "Every agent runtime speaks the same protocol, so swapping Claude for Codex (or adding a new agent) is a config change, not a migration",
        tradeoff: "The server must stay strictly model-agnostic: no runtime-specific shortcuts allowed",
      },
      {
        decision: "Host it remotely rather than run it as a local-only tool",
        why: "A personal system becomes infrastructure when any device and any agent can reach the same brain",
        tradeoff: "Real auth, uptime, and abuse surface to own, which is what makes it production work rather than a script",
      },
      {
        decision: "Terse responses by default, full detail on request",
        why: "Tools that dump context burn the calling agent's window and degrade every downstream decision",
        tradeoff: "Some workflows need a second call for depth, a price worth paying",
      },
    ],
    artifacts: [
      { type: "docs", label: "amoOS Case Study", url: "/amoos" },
      { type: "docs", label: "Build Log", url: "/notes/personal-software-factory" },
    ],
    lessons: [
      "A tool catalog is a UX for machines: naming, descriptions, and terse defaults decide whether agents use it well.",
      "Model-agnostic pays off fast. Swapping agent runtimes became a config change instead of a rewrite.",
      "Remote MCP turns a personal system into infrastructure: any device, any agent, same memory.",
    ],
    featured: true,
  },
  {
    id: "meeting-intelligence",
    title: "Real-Time Meeting Intelligence",
    description:
      "The live-meeting stack built for Salesbugle: an AI participant that joins real video calls, presents a slide deck as its camera tile, hears the room, answers grounded questions when addressed by name, and resumes where it left off. On top of a real-time transcription and diarization pipeline.",
    status: "production",
    timeline: "2025 – Present",
    tags: ["Meeting Bots", "Real-Time Voice", "faster-whisper", "Wake Word", "WebSocket", "Python"],
    outcomes: [
      { label: "Join to Recording", value: "~9s" },
      { label: "Word Accuracy", value: "85–95%" },
      { label: "Live Meeting Runs", value: "Proven" },
      { label: "Hallucination Filter", value: "90%+" },
    ],
    architecture: [
      "An AI bot joins the meeting as a real participant: it renders the prepared deck in its own camera tile, narrates it, and streams meeting audio back in",
      "Wake-word conversation flow: the presenter narrates, yields when a participant speaks, answers grounded questions when addressed by name, and resumes at the right point without talking over anyone",
      "One ordered audio queue shared by narration, clarifications, and answers; a state change invalidates queued speech so nothing stale ever plays",
      "A second lane captures meeting audio directly from the browser for operator-present sessions, sharing the same voice runtime with no bot in the room",
      "Real-time ASR pipeline underneath: streaming capture, VAD, sliding windows with overlap, Whisper transcription, speaker diarization, and four-layer hallucination filtering",
      "Full recording lifecycle handled: consent and bot identity, recording, transcript import, deal association, and retention",
    ],
    decisions: [
      {
        decision: "A real meeting participant, not a screen-share hack",
        why: "An autonomous presenter has to show media as itself with no operator in the room, which only a first-class participant can do",
        tradeoff: "The full media pipeline (deterministic video frames plus ordered audio) had to be engineered, not borrowed",
      },
      {
        decision: "Conversation discipline as explicit state, not prompt hints",
        why: "Never narrating over a participant and never double-answering requires race guards across bot callbacks, transcript events, and audio completion",
        tradeoff: "More state machine to own, but the alternative is an AI that interrupts people",
      },
      {
        decision: "Four-layer hallucination filtering on the ASR pipeline",
        why: "Whisper hallucinates aggressively on silence and background noise, so single-layer filtering is insufficient",
        tradeoff: "Added latency from multi-pass processing, but accuracy gains justify it",
      },
    ],
    artifacts: [],
    lessons: [
      "Live rehearsals beat demos: every real meeting run surfaced a genuine fault that got fixed before the stakes were real.",
      "Delivery manner is a feature. Pauses, follow-up offers, and spoken admissions decide whether an AI presenter feels human or robotic.",
      "Real-time transcription needs context: sliding windows with overlap beat fixed chunks, and recent transcript segments as prompts lift accuracy on domain terms.",
    ],
    featured: true,
  },
  {
    id: "agentic-chat",
    title: "Agentic Chat Systems",
    description:
      "Production chat assistants that do work instead of just answering: tool-calling over live business data, governed writes with one-click confirmation and audit trails, and documents generated inside the conversation. Built for Salesbugle and a climate-tech intelligence platform.",
    status: "production",
    timeline: "2025 – Present",
    tags: ["Agentic Chat", "Tool Calling", "SSE Streaming", "Multi-Model", "Audit Trails", "RAG"],
    outcomes: [
      { label: "API Tools Auto-Discovered", value: "24/24" },
      { label: "Platforms in Production", value: "2" },
      { label: "Models Routed", value: "3" },
      { label: "Write Actions", value: "Audited" },
    ],
    architecture: [
      "Bounded tool-calling loop over live business data: deals, stakeholders, meetings, products, and call intelligence, streamed over SSE",
      "A capability registry discovers backend API routes and exposes them as chat tools automatically, with writes withheld until explicitly enabled",
      "Governed write path: the assistant proposes an action, the user confirms in one click, the action executes and lands in an audit trail",
      "In-chat artifacts: server-rendered documents and slide decks with a full-screen workspace, inline editing, and PPTX/PDF export",
      "Knowledge-grounded coaching: objection rebuttals grounded in the org's playbook and each deal's product value drivers, not generic LLM advice",
      "For the climate-tech platform: an assistant grounded in live sensor telemetry, alert episodes, and household context, streaming two-layer answers (a plain answer first, technical detail on demand)",
      "Multi-model routing: a fast primary model, an automatic fallback, and a heavyweight model reserved for deep analysis",
    ],
    decisions: [
      {
        decision: "Writes require proposal, confirmation, and audit",
        why: "A chat that can touch a CRM earns trust through governance, not intelligence",
        tradeoff: "One extra click per action, which users accept because nothing surprising ever happens",
      },
      {
        decision: "Auto-discover tools from the API instead of hand-writing each one",
        why: "Every new backend endpoint becomes a chat capability without a second implementation to maintain",
        tradeoff: "Curated tools still shadow the common writes, so the registry needs deliberate curation rules",
      },
      {
        decision: "Two-layer streamed answers for mixed audiences",
        why: "A homeowner and an engineer need different depth from the same reply; the model writes both in one pass",
        tradeoff: "The split marker must parse correctly mid-stream so nothing flickers or reflows",
      },
    ],
    artifacts: [],
    lessons: [
      "Anyone can build a chatbot now. The moat is the tool surface, the grounding, and the write governance around it.",
      "Propose-confirm-audit is what makes an assistant trustworthy enough to act on real records.",
      "Streaming UX details (marker splitting, no reflow when the stream ends) are what make an assistant feel finished.",
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
        why: "Claude API costs scale with content volume, and simple heuristics reject 60–70% of irrelevant content cheaply",
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
      "Role vs. tier is a real distinction worth getting right early. Conflating 'admin' with 'enterprise tier' causes permission bugs.",
      "Reddit scraping is unreliable at scale; their API changes frequently and rate limits are aggressive.",
      "Pre-filtering content before LLM evaluation saves significant API costs: 60–70% rejection before Claude ever sees it.",
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
    githubUrl: "https://github.com/davidamo9/optics-framework-public",
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
      { type: "repo", label: "GitHub", url: "https://github.com/davidamo9/optics-framework-public" },
      { type: "package", label: "PyPI", url: "https://pypi.org/project/optics-framework/" },
    ],
    lessons: [
      "No-code doesn't mean no complexity: the keyword abstraction hides edge cases that users still encounter.",
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
        why: "MSc timeline limited scope, prioritizing a working demo over production robustness",
        tradeoff: "Not production-grade, but demonstrates the full pipeline end-to-end",
      },
    ],
    artifacts: [],
    lessons: [
      "The gap between 'works in the lab' and 'works reliably' is enormous for physical systems: lighting, camera angles, and reflections break vision pipelines.",
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
