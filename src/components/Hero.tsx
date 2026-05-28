"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-sm font-medium text-zinc-300 tracking-wide">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          Engineering <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
            Intelligence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 font-light leading-relaxed"
        >
          Hi, I&apos;m <span className="text-white font-medium">Aditya Chourasia</span>. I build advanced Machine Learning models, scalable software, and intelligent web applications that solve real-world problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium transition-transform hover:scale-105 active:scale-95">
            Explore My Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95">
            View Resume
          </button>
        </motion.div>
      </div>

      {/* Bottom fade gradient to blend into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}