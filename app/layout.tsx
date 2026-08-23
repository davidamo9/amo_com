import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aungmyintoo.com"),
  title: {
    default: "Aung Myint Oo - AI Product Architect | Founding Engineer",
    template: "%s | Aung Myint Oo",
  },
  description: "I take AI products from idea to production, end to end — architecture, AI systems, infrastructure, and operations. Founding engineer at Salesbugle. I partner with founders and domain experts to turn industry expertise into AI-native products.",
  keywords: [
    "Aung Myint Oo",
    "Founding Engineer",
    "AI Product Architect",
    "Fractional Technical Co-Founder",
    "Fractional CTO",
    "AI SaaS",
    "AI Agents",
    "AI Agent Engineer",
    "Agentic Systems Engineer",
    "AI Automation Consultant",
    "MCP",
    "FastAPI",
    "Next.js",
    "Python",
    "LLM",
    "RAG",
    "Computer Vision",
    "Robotics",
    "Singapore",
  ],
  authors: [{ name: "Aung Myint Oo", url: "https://aungmyintoo.com" }],
  creator: "Aung Myint Oo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aungmyintoo.com",
    title: "Aung Myint Oo - AI Product Architect | Founding Engineer",
    description: "I take AI products from idea to production, end to end. Founding engineer at Salesbugle. I partner with founders and domain experts to turn industry expertise into AI-native products.",
    siteName: "Aung Myint Oo - AI Product Architect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myint Oo - AI Product Architect | Founding Engineer",
    description: "I take AI products from idea to production, end to end. Founding engineer at Salesbugle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aung Myint Oo",
    alternateName: ["David Aung Myint Oo", "David Amo"],
    url: "https://aungmyintoo.com",
    sameAs: [
      "https://github.com/davidamo9",
      "https://www.linkedin.com/in/aung-myint-oo99/",
    ],
    jobTitle: "AI Product Architect & Founding Engineer",
    description: "AI product architect and founding engineer in Singapore who takes AI products from idea to production end to end — architecture, agentic systems, infrastructure, and operations. Builds with AI agent fleets and partners with founders and domain experts to solve problems with modern AI solutions.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    worksFor: [
      {
        "@type": "Organization",
        name: "Salesbugle",
        url: "https://salesbugle.com",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "National University of Singapore",
    },
    knowsAbout: [
      "AI Agents",
      "AI Agent Orchestration",
      "Agentic Systems",
      "Multi-Agent Systems",
      "Model Context Protocol",
      "LLM Integration",
      "RAG Pipelines",
      "AI Automation",
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Computer Vision",
      "Robotics",
    ],
    email: "aungmyintoo.david@gmail.com",
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aung Myint Oo — AI Product Engineering",
    url: "https://aungmyintoo.com",
    areaServed: ["Singapore", "Remote"],
    founder: { "@type": "Person", name: "Aung Myint Oo" },
    description: "End-to-end AI product engineering: taking ideas to production, modernizing workflows with AI and agentic automation, and long-term technical partnership for domain experts. The first conversation is free.",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "End-to-End Product Build",
          description: "From idea to production: scoping, architecture, build, deployment, and handover of a working AI product.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Agentic Automation",
          description: "Modernizing manual processes and disconnected tools with AI agents and automation, built around one high-leverage problem.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Partnership",
          description: "Long-term, equity-aligned technical partnership for domain experts building a venture.",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {/* Grain Overlay */}
            <div className="grain-overlay grain-animated" aria-hidden="true" />

            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
