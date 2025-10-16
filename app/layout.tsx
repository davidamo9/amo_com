import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aungmyintoo.com"),
  title: {
    default: "Aung Myint Oo - Robotics Engineer | AI Systems & Autonomous Perception",
    template: "%s | Aung Myint Oo",
  },
  description: "Robotics Engineer with MSc specializing in AI systems for autonomous perception and decision-making. Expert in agentic workflows, RAG pipelines, semantic search, computer vision, and deep learning.",
  keywords: [
    "Aung Myint Oo",
    "Robotics Engineer",
    "AI Systems",
    "Autonomous Perception",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "RAG Pipelines",
    "Agentic Workflows",
    "Semantic Search",
    "NLP",
    "MSc Robotics",
    "Artificial Intelligence",
    "Autonomous Systems",
  ],
  authors: [{ name: "Aung Myint Oo", url: "https://aungmyintoo.com" }],
  creator: "Aung Myint Oo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aungmyintoo.com",
    title: "Aung Myint Oo - Robotics Engineer | AI Systems & Autonomous Perception",
    description: "Robotics Engineer with MSc specializing in AI systems for autonomous perception and decision-making. Expert in agentic workflows, RAG pipelines, and semantic search.",
    siteName: "Aung Myint Oo - Robotics Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myint Oo - Robotics Engineer | AI Systems",
    description: "Robotics Engineer specializing in AI systems for autonomous perception and decision-making.",
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
    jobTitle: "Robotics Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Independent",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "MSc in Robotics",
    },
    knowsAbout: [
      "Robotics",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Deep Learning",
      "Autonomous Systems",
      "RAG Pipelines",
      "Agentic Workflows",
      "Semantic Search",
      "Natural Language Processing",
    ],
    email: "aungmyintoo.david@gmail.com",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
