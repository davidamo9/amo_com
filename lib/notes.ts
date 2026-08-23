export interface Note {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. "2026-08-23"
  summary: string;
  tags: string[];
  paragraphs: string[];
}

export const notes: Note[] = [
  {
    slug: "personal-software-factory",
    title: "I built myself a software factory",
    date: "2026-08-23",
    summary:
      "amoOS started as a second brain. It became something stranger: a system where AI agents do the building and my job is to plan, dispatch, and verify.",
    tags: ["amoOS", "AI Agents", "Build in Public"],
    paragraphs: [
      "Late last year I started building amoOS as a personal knowledge base — a place to forward links, capture notes, and search everything I'd ever learned. That part still exists. But somewhere along the way the project inverted, and the inversion is the interesting part.",
      "The realization was this: once AI agents can write most of the code, the scarce resource stops being engineering hours. It becomes deciding what to build, verifying that what got built actually works, and remembering everything the process learned. So that's what I optimized. Today amoOS runs every project I own — eleven of them at last count. A fleet of AI coding agents does the building. I plan the work, dispatch it, and verify the results. The system keeps the memory: every session, decision, and forwarded link gets distilled into a living knowledge base that currently holds over four hundred compiled pages.",
      "It reports to me through three surfaces: a native macOS cockpit for deep work, Telegram when I'm away from the desk, and a web view for reference. And it measures itself — utilization, yield, attention cost, and how fast it can produce a stakeholder-ready brief on any project. If the factory can't account for what it shipped this week, that's a bug.",
      "The rule that makes it all work is boring: nothing ships without human verification. Autonomous output without trust is worthless. 'Verified done, with evidence' is the only unit of progress that counts.",
      "Why does a solo builder need all this? Leverage. Salesbugle, client MVPs, this website, and amoOS itself all run through the same machine, and every lesson learned in one product immediately benefits the next. I'll be sharing what I learn as I push this further — the wins and the failures.",
    ],
  },
  {
    slug: "end-to-end-is-the-job",
    title: "End to end is the job",
    date: "2026-08-23",
    summary:
      "Most engineers ship code. The job I actually do starts earlier and ends much later — and that difference is what unblocks domain experts.",
    tags: ["Positioning", "Product", "Founding Engineer"],
    paragraphs: [
      "There's a version of engineering where the job is a ticket: someone decides what to build, you build it, someone else runs it. That's a fine job. It isn't mine.",
      "The work I do starts before there's anything to build — sitting with a founder or a domain expert, understanding what they actually know that the market doesn't, and turning that into product scope. It continues through architecture, the build itself, and launch. And then it keeps going, because a product that nobody operates dies quietly in production: monitoring, costs, incidents, iteration. Owning that whole arc is the job.",
      "I've done it as a founding engineer at a sales coaching SaaS, taking it from an empty repository to production with paying customers as the sole engineer. I've done it as an independent architect shipping an intelligence platform MVP solo. I've done it for a client's content business — CMS, lead capture, launch. Different domains, same shape: one person accountable for the outcome, not the output.",
      "The people I work best with are experts in something that isn't software. They don't need another engineer asking for a spec. They need someone who can absorb how their industry works, make the technology decisions they shouldn't have to care about, and hand them back a running business asset. That's the trade: you bring the domain expertise, I build the product — end to end.",
    ],
  },
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

export function getAllNotes(): Note[] {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date));
}
