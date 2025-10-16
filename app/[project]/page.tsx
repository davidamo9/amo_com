import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/lib/projects";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
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
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {project.demoUrl && (
                <Button size="lg" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button size="lg" variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>

            {/* Project Image Placeholder */}
            <div className="rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Project Screenshot</span>
            </div>

            {/* Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-muted text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Long Description */}
            {project.longDescription && (
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {/* Placeholder for additional content */}
            <div className="mt-12 space-y-8">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Feature 1: Add your project features here</li>
                  <li>• Feature 2: Describe the main functionality</li>
                  <li>• Feature 3: Highlight what makes it special</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
                <p className="text-muted-foreground">
                  Describe the challenges you faced during development and how you solved them.
                  This helps showcase your problem-solving skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
