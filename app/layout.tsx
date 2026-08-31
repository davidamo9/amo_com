import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import {
  CONTENT_UPDATED,
  DESCRIPTION,
  DESCRIPTOR,
  LINKS,
  NAME,
  PERSON_ID,
  SITE_URL,
  TITLE,
} from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Aung Myint Oo",
  },
  description: DESCRIPTION,
  keywords: [
    "Aung Myint Oo",
    "AI Engineer Singapore",
    "Robotics Engineer Singapore",
    "AI and Robotics Engineer",
    "Founding Engineer",
    "Technical Co-Founder Singapore",
    "Fractional CTO",
    "Robot Perception",
    "Computer Vision",
    "Speech Processing",
    "Sensor Fusion",
    "Embodied AI",
    "Learning Systems",
    "Continual Learning",
    "AI Agents",
    "Multi-Agent Systems",
    "Agentic Systems Engineer",
    "AI Memory Systems",
    "MCP",
    "RAG",
    "LLM",
    "ROS",
    "FastAPI",
    "Next.js",
    "Python",
    "NUS MSc Robotics",
    "Singapore",
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Aung Myint Oo - AI & Robotics Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: `${DESCRIPTOR} Founding engineer at Salesbugle.`,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
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

function topic(name: string, wikipedia: string) {
  return { "@type": "Thing", name, sameAs: `https://en.wikipedia.org/wiki/${wikipedia}` };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: NAME,
    alternateName: ["AMO"],
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/about`,
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.x],
    jobTitle: ["AI & Robotics Engineer", "Founding Engineer & Technical Lead"],
    description: DESCRIPTION,
    disambiguatingDescription:
      "Singapore-based AI and robotics engineer (NUS MSc Robotics; founding engineer at Salesbugle; formerly robotics and vision engineer at Mozark). Not the Singapore general surgeon or the Myanmar public figures who share this name.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    knowsLanguage: ["en", "my", "zh"],
    email: LINKS.email,
    worksFor: [
      {
        "@type": "Organization",
        name: "Salesbugle",
        url: LINKS.salesbugle,
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "National University of Singapore",
        sameAs: "https://www.nus.edu.sg/",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "MSc Robotics",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "National University of Singapore",
        },
        about: {
          "@type": "Thing",
          name: "ML-enhanced interface for robotic telemanipulation: natural-language control of a robot interacting with mobile devices through computer vision",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "B.Eng Electrical Engineering (Honours), specialisation in Robotics, second major in Innovation & Design",
      },
    ],
    knowsAbout: [
      topic("Robotics", "Robotics"),
      topic("Robot perception", "Machine_perception"),
      topic("Computer vision", "Computer_vision"),
      topic("Speech recognition", "Speech_recognition"),
      topic("Sensor fusion", "Sensor_fusion"),
      topic("Intelligent agents", "Intelligent_agent"),
      topic("Multi-agent systems", "Multi-agent_system"),
      topic("Large language models", "Large_language_model"),
      topic("Retrieval-augmented generation", "Retrieval-augmented_generation"),
      topic("Model Context Protocol", "Model_Context_Protocol"),
      topic("Robot Operating System", "Robot_Operating_System"),
      "Embodied AI",
      "Learning systems that compound over time",
      "AI memory systems",
      "AI agent orchestration",
      "Agentic systems",
      "Real-time voice AI",
      "Delta robots",
      "OCR",
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "AWS",
      "Cloudflare Workers",
    ],
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aung Myint Oo - AI Product Engineering",
    url: SITE_URL,
    areaServed: ["Singapore", "Remote"],
    founder: { "@id": PERSON_ID },
    description:
      "End-to-end AI product engineering: taking ideas to production, modernizing workflows with AI and agentic automation, and long-term technical partnership for domain experts. The first conversation is free.",
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

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Aung Myint Oo",
    description: DESCRIPTION,
    dateModified: CONTENT_UPDATED,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-EK3N131XRB"} />
      </body>
    </html>
  );
}
