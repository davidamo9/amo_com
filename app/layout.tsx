import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aung Myint Oo - Full Stack Developer",
  description: "Portfolio of Aung Myint Oo - Full Stack Developer, showcasing projects and skills in web development, software engineering, and more.",
  keywords: ["Aung Myint Oo", "Full Stack Developer", "Web Developer", "Portfolio", "Software Engineer"],
  authors: [{ name: "Aung Myint Oo" }],
  openGraph: {
    title: "Aung Myint Oo - Full Stack Developer",
    description: "Portfolio of Aung Myint Oo - Full Stack Developer",
    url: "https://aungmyintoo.com",
    siteName: "Aung Myint Oo Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myint Oo - Full Stack Developer",
    description: "Portfolio of Aung Myint Oo - Full Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
