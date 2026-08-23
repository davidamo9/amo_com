import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections/footer";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Build-in-public notes on AI agents, product engineering, and running a personal software factory — by Aung Myint Oo.",
};

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <span className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body">
                Notes
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Building <span className="text-orange-500">in public.</span>
              </h1>
              <p className="text-muted-foreground font-body max-w-2xl">
                Working notes on AI agents, end-to-end product engineering, and running a
                personal software factory. Shipped lessons, not theory.
              </p>
            </div>

            {/* Note list */}
            <div className="space-y-6">
              {notes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`} className="block">
                  <article className="group bg-card border border-border rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300">
                    <time className="text-xs text-muted-foreground font-body" dateTime={note.date}>
                      {formatDate(note.date)}
                    </time>
                    <h2 className="font-display text-2xl font-bold mt-2 mb-3 text-foreground group-hover:text-orange-500 transition-colors duration-300">
                      {note.title}
                    </h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">
                      {note.summary}
                    </p>
                    <div className="flex items-center justify-between">
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
                      <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-orange-500 transition-colors duration-300">
                        Read
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
