import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import TechShowcase from "@/components/TechShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-[#050505]">
      <Hero />
      <Projects />
      <About />
      <TechShowcase />
      <Guestbook /> {/* <--- Added here! */}
      <Contact />
      <Footer />
    </main>
  );
}