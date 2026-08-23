import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections/footer";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const note = getNoteBySlug(resolvedParams.slug);

  if (!note) {
    return {
      title: "Note Not Found",
    };
  }

  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      publishedTime: note.date,
    },
  };
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const note = getNoteBySlug(resolvedParams.slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Notes
            </Link>

            {/* Header */}
            <header className="mb-10">
              <time className="text-sm text-muted-foreground font-body" dateTime={note.date}>
                {formatDate(note.date)}
              </time>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
                {note.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-secondary border border-border text-muted-foreground font-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Body */}
            <article className="space-y-6">
              {note.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* CTA */}
            <div className="mt-14 pt-8 border-t border-border">
              <p className="text-muted-foreground font-body mb-4">
                Building something in your domain and want a technical partner who owns it end to end?
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-background font-semibold rounded-full hover:bg-orange-400 transition-all duration-300"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
