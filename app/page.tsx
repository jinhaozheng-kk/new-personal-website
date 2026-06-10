import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <div className="h-line mx-auto max-w-6xl" />
      <Skills />
      <Marquee reverse />
      <Experience />
      <div className="h-line mx-auto max-w-6xl" />
      <Projects />
      <Contact />
    </main>
  );
}
