"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "LOADING ML MODULES...",
  "ESTABLISHING NEURAL LINK...",
  "ACCESS GRANTED."
];

export default function Preloader() {
  const [stage, setStage] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    // Cycle through the boot sequence text
    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev === BOOT_SEQUENCE.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = "auto";
          }, 800); // Wait a second after "ACCESS GRANTED" before fading out
          return prev;
        }
        return prev + 1;
      });
    }, 600); // Speed of the text changing

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Cinematic easing
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
      >
        {/* Sleek Top Progress Bar */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
        />

        {/* Terminal Text Container */}
        <div className="flex flex-col items-center justify-center w-full max-w-md px-6">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`font-mono text-sm tracking-[0.3em] uppercase ${
              stage === BOOT_SEQUENCE.length - 1 ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "text-zinc-500"
            }`}
          >
            {BOOT_SEQUENCE[stage]}
          </motion.div>

          {/* Blinking cursor block */}
          {stage !== BOOT_SEQUENCE.length - 1 && (
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-4 bg-orange-500 mt-4 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}