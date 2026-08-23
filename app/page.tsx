import { Navigation } from "@/components/navigation";
import { StreamBackdrop } from "@/components/three/StreamBackdrop";
import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { About } from "@/components/sections/about";
import { Ventures } from "@/components/sections/ventures";
import { Projects } from "@/components/sections/projects";
import { Factory } from "@/components/sections/factory";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StreamBackdrop />
      <Navigation />
      <Hero />
      <ProofBar />
      <About />
      <Ventures />
      <Projects />
      <Factory />
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
