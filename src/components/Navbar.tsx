"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        
        {/* Logo */}
        <Link href="/" className="relative group">
          <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-l from-orange-500 via-amber-400 to-yellow-300">
            Aditya.
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all group-hover:w-full"></span>
        </Link>

        {/* Links (Hidden on small mobile screens) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Profile/Auth Icon */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}