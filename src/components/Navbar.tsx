"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Search, Terminal } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/#contact" },
  ];

  // The Magic Mobile Trigger!
  useEffect(() => {
    if (searchQuery.toLowerCase() === "aditya") {
      setIsSearchOpen(false);
      setSearchQuery("");
      window.dispatchEvent(new Event("open-terminal"));
    }
  }, [searchQuery]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
      >
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          
          <Link href="/" className="relative group z-50">
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-l from-orange-500 via-amber-400 to-yellow-300">
              Aditya.
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 z-50">
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className="text-zinc-400 hover:text-orange-400 transition-colors"
              aria-label="Command Palette"
            >
              <Terminal className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
              }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Secret Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl flex items-center gap-3"
            >
              <Search className="w-5 h-5 text-zinc-500 ml-2" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter override code..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 font-mono"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8 text-2xl font-medium">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}