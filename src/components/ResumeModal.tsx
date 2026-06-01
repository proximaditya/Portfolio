"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { X, Download, RotateCcw } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🚀 FIXED: Added useSpring so the tilt is buttery smooth and NEVER lags!
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  // Incredible 25-degree tilt for max 3D effect
  const rotateX = useTransform(smoothY, [-300, 300], [25, -25]);
  const rotateY = useTransform(smoothX, [-300, 300], [-25, 25]);
  const sheenX = useTransform(smoothX, [-300, 300], [-50, 50]);
  const sheenY = useTransform(smoothY, [-300, 300], [-50, 50]);

  useEffect(() => {
    // Detect mobile to turn off tilt (which prevents the flip bug on touch screens)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
    }
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return; 
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    // By NOT resetting x and y here, the card stays tilted right where you left it!
  }

  // 🚀 FIXED: Stop propagation so clicking flip doesn't close the modal
  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10 perspective-[2000px]">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md cursor-pointer"
          />

          <button onClick={onClose} className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors shadow-lg">
            <X className="w-6 h-6" />
          </button>

          {/* PARALLAX WRAPPER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX: isMobile ? 0 : rotateX, 
              rotateY: isMobile ? 0 : rotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="relative w-full max-w-[420px] h-[600px] z-10"
          >
            {/* FLIP WRAPPER */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 15 }}
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* FRONT OF CARD */}
              <div 
                className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-zinc-900 to-[#0a0a0a] border border-white/10 shadow-2xl p-8 flex flex-col backface-hidden"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              >
                {!isMobile && (
                  <motion.div 
                    className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.4) 0%, transparent 60%)", x: sheenX, y: sheenY }}
                  />
                )}
                
                {/* 3D FLOATING TEXT */}
                <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full pointer-events-none">
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-wide drop-shadow-xl pointer-events-auto">Aditya Chourasia</h2>
                  <p className="text-orange-500 font-mono text-sm mb-8 drop-shadow-md pointer-events-auto">AI/ML Software Engineer</p>
                  
                  <div className="space-y-6 text-zinc-300 text-sm flex-1 pointer-events-auto">
                    <div>
                      <h3 className="text-white font-semibold mb-2 border-b border-white/10 pb-2">Experience Highlights</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>ISRO Antariksh Hackathon Lead ML Eng</li>
                        <li>Smart India Hackathon UniversityFinalist</li>
                        <li>Developed ProximaMonitor & Arelia</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2 border-b border-white/10 pb-2">Core Tech Stack</h3>
                      <p className="leading-relaxed">Python, C++, Next.js, TensorFlow, PostgreSQL, LLMs</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 pointer-events-auto">
                    <a href="/resume.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-black py-3.5 rounded-xl font-bold hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20">
                      <Download className="w-4 h-4" /> Download
                    </a>
                    <button onClick={handleFlip} className="p-3.5 bg-white/10 text-white border border-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div 
                className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-bl from-orange-950/40 to-[#0a0a0a] border border-orange-500/30 shadow-2xl p-8 flex flex-col backface-hidden"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", transformStyle: "preserve-3d" }}
              >
                {/* 🚀 3D FLOATING TEXT ON THE BACK */}
                <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full pointer-events-none">
                  <h2 className="text-2xl font-bold text-white mb-8 drop-shadow-xl pointer-events-auto">Education & Details</h2>
                  
                  <div className="space-y-6 text-zinc-300 text-sm flex-1 pointer-events-auto">
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">B.Tech Computer Science</h3>
                      <p className="text-xs text-zinc-500 mb-2">2024 - 2028</p>
                      <p className="leading-relaxed">Core focus on Artificial Intelligence, Data Structures, and Systems Architecture.</p>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">Soft Skills</h3>
                      <p className="leading-relaxed">Leadership (Team SPARK, Team XOR), Public Speaking, Creative Problem Solving.</p>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">Hobbies</h3>
                      <p className="leading-relaxed">Flute, Dramatics & Theatre.</p>
                    </div>
                  </div>

                  <button onClick={handleFlip} className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3.5 rounded-xl font-medium hover:bg-white/20 transition-colors mt-6 cursor-pointer pointer-events-auto">
                    <RotateCcw className="w-4 h-4" /> Flip Back
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}