"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, Download, RotateCcw } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [25, -25]);
  const rotateY = useTransform(x, [-300, 300], [-25, 25]);
  
  const sheenX = useTransform(x, [-300, 300], [-50, 50]);
  const sheenY = useTransform(y, [-300, 300], [-50, 50]);

  // Desktop Mouse Physics
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  // Mobile Touch Physics! 📱
  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    const touchX = touch.clientX - rect.left - rect.width / 2;
    const touchY = touch.clientY - rect.top - rect.height / 2;
    x.set(touchX);
    y.set(touchY);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md cursor-pointer"
          />

          <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors shadow-lg">
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative w-full max-w-[450px] h-[600px] perspective-[2000px]"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove} // Added Touch Support!
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              className="w-full h-full relative"
            >
              {/* FRONT OF THE CARD */}
              <div 
                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-zinc-900 to-[#0a0a0a] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-8 flex flex-col"
                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.4) 0%, transparent 60%)",
                    x: sheenX, y: sheenY,
                  }}
                />
                
                <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full pointer-events-none">
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-wide drop-shadow-xl pointer-events-auto">Aditya Chourasia</h2>
                  <p className="text-orange-500 font-mono text-sm mb-6 drop-shadow-md pointer-events-auto">AI/ML Software Engineer</p>
                  
                  <div className="space-y-4 text-zinc-300 text-sm flex-1 pointer-events-auto">
                    <div>
                      <h3 className="text-white font-medium mb-1 border-b border-white/10 pb-1">Experience Highlights</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ISRO Antariksh Hackathon Lead ML Eng</li>
                        <li>Smart India Hackathon Grand Finalist</li>
                        <li>Architected ProximaMonitor & Arelia</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1 border-b border-white/10 pb-1">Core Tech</h3>
                      <p>Python, C++, Next.js, TensorFlow, PostgreSQL</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 pointer-events-auto">
                    <a href="/resume.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg">
                      <Download className="w-4 h-4" /> Download
                    </a>
                    <button onClick={() => setIsFlipped(true)} className="p-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors shadow-lg cursor-pointer">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK OF THE CARD */}
              <div 
                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-bl from-orange-950/40 to-[#0a0a0a] border border-orange-500/30 shadow-[0_30px_60px_rgba(249,115,22,0.15)] p-8 flex flex-col"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(80px)" }} className="flex flex-col h-full pointer-events-none">
                  <h2 className="text-2xl font-bold text-white mb-6 pointer-events-auto">Education & Details</h2>
                  
                  <div className="space-y-6 text-zinc-300 text-sm flex-1 pointer-events-auto">
                    <div>
                      <h3 className="text-orange-400 font-medium mb-1">B.Tech Computer Science</h3>
                      <p className="text-xs text-zinc-500 mb-1">2022 - 2026</p>
                      <p>Core focus on Artificial Intelligence, Data Structures, and Systems Architecture.</p>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-medium mb-1">Soft Skills</h3>
                      <p>Leadership (Team SPARK, Team XOR), Public Speaking, Creative Problem Solving.</p>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-medium mb-1">Hobbies</h3>
                      <p>Flute, Dramatics & Theatre.</p>
                    </div>
                  </div>

                  <button onClick={() => setIsFlipped(false)} className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors mt-6 shadow-lg pointer-events-auto cursor-pointer">
                    <RotateCcw className="w-4 h-4" /> Flip Back
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}