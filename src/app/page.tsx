import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-[#050505]">
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}