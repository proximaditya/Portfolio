"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-[#050505] text-center z-10 relative">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-2 text-zinc-400 text-sm md:text-base">
          Crafted with 
          <Heart className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" /> 
          by <span className="text-white font-medium">Aditya Chourasia</span>
        </p>
        <p className="text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}