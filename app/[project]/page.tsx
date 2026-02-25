import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections/footer";
import { ArrowLeft, Github, ExternalLink, Package, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    project: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.project);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Aung Myint Oo`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

const statusConfig = {
  production: { label: "Production", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  active: { label: "Active", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  complete: { label: "Complete", className: "bg-muted text-muted-foreground border-border" },
  thesis: { label: "Thesis", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
} as const;

function StatusBadge({ status }: { status: Project["status"] }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      {config.label}
    </span>
  );
}

const artifactIcons = {
  repo: Github,
  package: Package,
  demo: ExternalLink,
  docs: BookOpen,
} as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.project);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Header: Title + Status + Timeline */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={project.status} />
                <span className="text-sm text-muted-foreground">{project.timeline}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">{project.title}</h1>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

            {/* Artifact links (CTA row) */}
            {project.artifacts.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12">
                {project.artifacts.map((artifact) => {
                  const Icon = artifactIcons[artifact.type];
                  return (
                    <a
                      key={artifact.url}
                      href={artifact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg font-medium text-sm hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300"
                    >
                      <Icon className="h-4 w-4" />
                      {artifact.label}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Outcomes strip */}
            {project.outcomes.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {project.outcomes.map((outcome) => (
                  <div
                    key={outcome.label}
                    className="bg-card border border-border rounded-xl p-4 text-center"
                  >
                    <div className="text-xl md:text-2xl font-bold text-orange-500 mb-1">
                      {outcome.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{outcome.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture */}
            {project.architecture.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Architecture</h2>
                <ul className="space-y-3">
                  {project.architecture.map((point, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="text-orange-500 mt-1.5 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Decisions */}
            {project.decisions.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Key Decisions</h2>
                <div className="space-y-4">
                  {project.decisions.map((d, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <p className="font-semibold text-foreground mb-2">{d.decision}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="text-foreground/70 font-medium">Why:</span> {d.why}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground/70 font-medium">Tradeoff:</span> {d.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-secondary border border-border text-muted-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons */}
            {project.lessons.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">What I Learned</h2>
                <ul className="space-y-3">
                  {project.lessons.map((lesson, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="text-orange-500 mt-1.5 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                      </span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back to portfolio */}
            <div className="pt-8 border-t border-border">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
