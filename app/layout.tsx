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
    default: "Aung Myint Oo - AI Systems Architect | Founding Engineer",
    template: "%s | Aung Myint Oo",
  },
  description: "Founding engineer building AI-powered SaaS products. Currently at Salesbugle (sales coaching) and Aeritas (HVAC intelligence). Background in robotics, computer vision, and full-stack systems. MSc NUS.",
  keywords: [
    "Aung Myint Oo",
    "Founding Engineer",
    "Full-Stack Engineer",
    "AI SaaS",
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
    title: "Aung Myint Oo - AI Systems Architect | Founding Engineer",
    description: "Founding engineer building AI-powered SaaS products. Currently at Salesbugle and Aeritas. Background in robotics, computer vision, and full-stack systems.",
    siteName: "Aung Myint Oo - Founding Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myint Oo - AI Systems Architect | Founding Engineer",
    description: "Founding engineer building AI-powered SaaS products. Currently at Salesbugle and Aeritas.",
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
    url: "https://aungmyintoo.com",
    sameAs: [
      "https://github.com/davidamo9",
      "https://www.linkedin.com/in/aung-myint-oo99/",
    ],
    jobTitle: "Founding Engineer",
    description: "Founding engineer building AI-powered SaaS products. Previously robotics and computer vision at Mozark, deployed across 4 countries. MSc Robotics from NUS.",
    worksFor: [
      {
        "@type": "Organization",
        name: "Salesbugle",
        url: "https://salesbugle.com",
      },
      {
        "@type": "Organization",
        name: "Aeritas",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "National University of Singapore",
    },
    knowsAbout: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "LLM Integration",
      "RAG Pipelines",
      "Computer Vision",
      "Robotics",
    ],
    email: "aungmyintoo.david@gmail.com",
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
