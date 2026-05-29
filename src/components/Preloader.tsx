"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    // Fast counter from 0 to 100
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Randomize jumps so it feels like real processing
        return prev + Math.floor(Math.random() * 15) + 5; 
      });
    }, 150);

    // Wait 2.8 seconds, then trigger the curtain reveal
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          // This is the magic "Curtain Reveal" animation
          initial={{ y: 0 }}
          exit={{ 
            y: "-100vh", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Animated AI Neural HUD */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.svg 
              viewBox="0 0 100 100" 
              className="w-32 h-32 overflow-visible"
            >
              {/* Static faint outer ring */}
              <circle cx="50" cy="50" r="45" stroke="rgba(249,115,22,0.1)" strokeWidth="1" fill="none" />
              
              {/* Dashed rotating middle ring */}
              <motion.circle 
                cx="50" cy="50" r="45" 
                stroke="url(#orangeGradient)" 
                strokeWidth="2" 
                strokeDasharray="30 10 5 10" 
                fill="none" 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                style={{ originX: "50px", originY: "50px" }} // Rotate around center
              />
              
              {/* Inner fast counter-rotating ring */}
              <motion.circle 
                cx="50" cy="50" r="30" 
                stroke="#fbbf24" 
                strokeWidth="1" 
                strokeDasharray="15 15" 
                fill="none" 
                animate={{ rotate: -360 }} 
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
                style={{ originX: "50px", originY: "50px" }} 
              />

              {/* Glowing Core */}
              <motion.circle 
                cx="50" cy="50" r="8" 
                fill="#f97316" 
                className="drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
              />

              {/* Def defining the gradient */}
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Loading Data */}
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              className="text-4xl font-mono font-light text-white tracking-wider"
              animate={{ opacity: counter === 100 ? [1, 0] : 1 }}
              transition={{ delay: 0.2 }}
            >
              {counter >= 100 ? 100 : counter}<span className="text-orange-500">%</span>
            </motion.div>
            
            <motion.div 
              className="font-mono text-xs tracking-[0.4em] uppercase"
              animate={{ opacity: counter === 100 ? [1, 0] : 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-zinc-500">
                {counter < 40 ? "Initializing Kernel..." 
                : counter < 80 ? "Loading Neural Models..." 
                : "System Online"}
              </span>
            </motion.div>
          </div>

          {/* Bottom Progress Bar Line */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${counter}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}