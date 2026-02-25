import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { About } from "@/components/sections/about";
import { Ventures } from "@/components/sections/ventures";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ProofBar />
      <About />
      <Ventures />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
