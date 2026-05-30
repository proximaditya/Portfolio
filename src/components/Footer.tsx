"use client";

import { Heart, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-8 border-t border-white/10 bg-[#050505] z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="max-w-sm">
            <h3 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300 mb-4">
              Aditya Chourasia
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              AI/ML Software Engineer specializing in scalable architectures, real-time analytics, and intelligent web applications.
            </p>
          </div>

          {/* Quick Links / Sitemap */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-medium mb-2">Navigation</h4>
              <Link href="/#about" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">About Me</Link>
              <Link href="/#projects" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Featured Work</Link>
              <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Live Dashboard</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-medium mb-2">Connect</h4>
              <a href="https://linkedin.com/in/aditya-chourasia09" target="_blank" rel="noreferrer" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1">
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="https://github.com/proximaditya" target="_blank" rel="noreferrer" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1">
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="mailto:aditya.chourasia.work@gmail.com" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1">
                Email <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} Aditya Chourasia. All Rights Reserved.
          </p>
          <p className="flex items-center gap-2 text-zinc-500 text-xs">
            Crafted with 
            <Heart className="w-3 h-3 text-orange-500 fill-orange-500 animate-pulse" /> 
            in India
          </p>
        </div>
        
      </div>
    </footer>
  );
}