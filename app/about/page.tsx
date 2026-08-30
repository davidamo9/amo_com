import Link from "next/link";
import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections/footer";
import { CONTENT_UPDATED, DESCRIPTOR, LINKS, PERSON_ID, SITE_URL } from "@/lib/site";

const ABOUT_TITLE = "About Aung Myint Oo - AI & Robotics Engineer in Singapore";
const ABOUT_DESCRIPTION = `${DESCRIPTOR} Founding engineer at Salesbugle, formerly robotics and vision engineer at Mozark, NUS MSc Robotics.`;

export const metadata: Metadata = {
  title: { absolute: ABOUT_TITLE },
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
  twitter: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
};

const timeline = [
  {
    period: "Oct 2025 – present",
    role: "Founding Engineer & Technical Lead",
    org: "Salesbugle, Singapore",
    detail:
      "AI sales coaching SaaS, built from an empty repository to production with paying customers as the sole engineer.",
  },
  {
    period: "2026 – present",
    role: "Founding AI Architect (contract)",
    org: "Climate-tech intelligence platform, United States",
    detail:
      "Architecture and end-to-end MVP: sensor ingestion, time-series processing, anomaly detection, analytics. Shipped solo.",
  },
  {
    period: "Aug 2023 – Sep 2025",
    role: "Robotics & Vision Engineer",
    org: "Mozark, Singapore",
    detail:
      "Led development of robotic mobile-device testing systems deployed in Singapore, Philippines, Thailand, and India.",
  },
  {
    period: "2023 – 2026",
    role: "MSc Robotics (part-time)",
    org: "National University of Singapore",
    detail:
      "Thesis: natural-language control of a robot interacting with mobile devices through computer vision.",
  },
  {
    period: "2019 – 2023",
    role: "B.Eng Electrical Engineering (Honours)",
    org: "Specialisation in Robotics; second major in Innovation & Design",
    detail:
      "Projects included a 2-DOF pick-and-place arm trained with deep Q-learning, an autonomous facade-cleaning robot, and a VR haptic glove.",
  },
];

const headingClass = "font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-4";
const bodyClass = "text-muted-foreground font-body leading-relaxed text-lg";
const listClass = "list-disc pl-6 space-y-2 text-muted-foreground font-body leading-relaxed";

export default function AboutPage() {
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about`,
    url: `${SITE_URL}/about`,
    name: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    dateModified: CONTENT_UPDATED,
    mainEntity: { "@id": PERSON_ID },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <header className="mb-10">
              <span className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
                About
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Aung Myint Oo
              </h1>
              <p className="text-xl md:text-2xl text-foreground font-body leading-relaxed">
                {DESCRIPTOR}
              </p>
            </header>

            <p className={bodyClass}>
              I&apos;m the founding engineer and technical lead at{" "}
              <a href={LINKS.salesbugle} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">Salesbugle</a>,
              an AI sales coaching SaaS I built from an empty repository to production with paying
              customers, as the sole engineer. Before that I spent two years as a robotics and vision
              engineer at Mozark, building robotic mobile-device testing systems that run in four
              countries. I hold an MSc in Robotics from the National University of Singapore and a
              B.Eng in Electrical Engineering with a specialisation in robotics.
            </p>

            <h2 className={headingClass}>What I do</h2>
            <p className={bodyClass}>
              I take AI products from idea to production, end to end: scoping, architecture, the AI
              systems, infrastructure, launch, and the operations that keep a product alive
              afterwards. I work with founders and domain experts who know their industry deeply and
              need one person to own everything technical, as a founding engineer, a contract
              technical co-founder, or a long-term, equity-aligned technical partner.
            </p>

            <h2 className={headingClass}>Robotics and perception</h2>
            <p className={bodyClass}>
              At Mozark I led the robotics and computer vision work behind a robotic mobile-app
              testing platform: physical Delta robots interacting with real phones, driven by vision
              rather than device hooks, for fintech apps where native automation frameworks are
              blocked by security controls.
            </p>
            <ul className={listClass}>
              <li>Delta-robot automation framework for mobile-device interaction, including G-code generation and a scale-and-shift coordinate system; I also designed and fabricated the device mounts and casings.</li>
              <li>Computer vision and OCR pipelines for UI detection and visual assertions: OpenCV, SIFT/FLANN template matching, image segmentation, edge-detection auto-deskew, video quality analysis, and ML UI detection with Omniparser.</li>
              <li>Video processing for latency KPIs (ffmpeg, GStreamer), asynchronous pipelines at sub-100 ms latency.</li>
              <li>Deployment, maintenance, and repair of the systems across Singapore, Philippines, Thailand, and India.</li>
              <li><a href={LINKS.optics} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">Optics Framework</a>, an open-source no-code test automation framework on PyPI that unifies Appium, vision-based matching, and the robot backend, with an agentic LLM layer that turns natural-language instructions into executable tests.</li>
            </ul>
            <p className={`${bodyClass} mt-6`}>
              My NUS MSc thesis extended the same stack into a three-stage pipeline: natural language
              → computer vision → robotic motion, using ROS and OpenCV, so a robot can act on a phone
              screen from a plain-English instruction. Coursework included Robot Perception, Deep
              Learning for Robotics, Autonomous Robot Systems, Human-Robot Interaction, and
              Fuzzy/Neural Systems for Intelligent Robotics. As an undergraduate I trained a 2-DOF
              pick-and-place arm with deep Q-learning, built an autonomous facade-cleaning robot, and
              built a VR haptic glove with its own Unity environment.
            </p>

            <h2 className={headingClass}>Voice, vision, and language in one system</h2>
            <p className={bodyClass}>
              Perception is more than one modality. At Salesbugle I built a real-time meeting AI that
              joins live video calls as a participant, presents a deck as its camera tile, listens
              to the room through a streaming speech pipeline (VAD, sliding-window Whisper
              transcription, speaker diarization, multi-layer hallucination filtering), and answers
              grounded questions when addressed by name. Alongside it sit agentic chat systems that
              call tools over live business data, propose writes, and execute them only after
              confirmation, with a full audit trail. The interesting systems combine vision, audio,
              and language with action.
            </p>

            <h2 className={headingClass}>Learning systems that compound over time</h2>
            <p className={bodyClass}>
              The question I keep building around is how a system gets better from its own
              experience instead of starting from zero every session. amoOS is my working answer: a
              personal AI operating system where a fleet of AI coding agents does the building across
              eleven projects while I plan, dispatch, and verify. Every session, decision, and lesson
              is distilled into a compiled knowledge base, currently over four hundred pages, that
              the agents load as context for the next task. A lesson learned in one product
              immediately benefits the next, and the system measures its own utilization, yield, and
              attention cost. At Salesbugle the same idea runs in production as layered memory
              (semantic, episodic, procedural) over vector and relational storage.
            </p>
            <p className={`${bodyClass} mt-6`}>
              To be precise about what this is and isn&apos;t: it is knowledge and memory
              infrastructure that makes agents measurably more capable with every task, with a human
              verifying every result. It is not online policy learning or reinforcement learning from
              physical experience. Closing that same loop on physical systems, robots that improve
              from their own operating experience, is the problem I most want to work on next.
            </p>

            <h2 className={headingClass}>AI agents in production</h2>
            <ul className={listClass}>
              <li>Salesbugle: multi-tenant FastAPI and PostgreSQL backend on AWS ECS, LLM pipelines for sales-conversation intelligence, model-agnostic orchestration, and sole ownership of CI/CD, observability, cost tracking, and production operations.</li>
              <li>amoOS MCP: a hosted remote Model Context Protocol server exposing the whole factory as 86 tools to any MCP-capable agent (Claude Code, Codex, or anything that speaks the protocol).</li>
              <li>A climate-tech intelligence platform MVP shipped solo: sensor ingestion, time-series processing, anomaly detection, and an analytics dashboard.</li>
            </ul>

            <h2 className={headingClass}>Background</h2>
            <dl className="space-y-6">
              {timeline.map((item) => (
                <div key={`${item.period}-${item.role}`} className="border-l-2 border-orange-500/30 pl-5">
                  <dt className="font-display text-lg font-semibold text-foreground">
                    {item.role}
                    <span className="block text-sm font-body font-normal text-muted-foreground mt-1">
                      {item.org} · {item.period}
                    </span>
                  </dt>
                  <dd className="text-muted-foreground font-body leading-relaxed mt-2">{item.detail}</dd>
                </div>
              ))}
            </dl>

            <h2 className={headingClass}>Based in Singapore</h2>
            <p className={bodyClass}>
              I live and work in Singapore, and work with founders in Singapore, the United States,
              and remotely. The systems I have shipped run in Singapore, the Philippines, Thailand,
              India, and the US.
            </p>

            <h2 className={headingClass}>Not to be confused with</h2>
            <p className={bodyClass}>
              Several people share the name Aung Myint Oo, including a general surgeon in Singapore
              and public figures in Myanmar. This site,{" "}
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">github.com/davidamo9</a>, and{" "}
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">linkedin.com/in/aung-myint-oo99</a>{" "}
              all refer to the engineer described on this page. I also go by AMO.
            </p>

            <h2 className={headingClass}>Get in touch</h2>
            <p className={bodyClass}>
              Sitting on an idea you don&apos;t know how to build, a workflow that needs a modern
              solution, or a robotics or AI problem you want a second pair of hands on? The first
              conversation is free.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-background font-semibold rounded-full hover:bg-orange-400 transition-all duration-300"
              >
                Let&apos;s Talk
              </Link>
              {[
                { icon: Github, href: LINKS.github, label: "GitHub" },
                { icon: Linkedin, href: LINKS.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${LINKS.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-full border border-border hover:border-orange-500/50 text-muted-foreground hover:text-orange-500 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <p className="text-xs text-muted-foreground font-body mt-14">
              Last updated <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED}</time>.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
