"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Globe, Database } from "lucide-react";

// Tech stack data
const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: <Cpu className="w-5 h-5 text-orange-400" />,
    skills: ["TensorFlow", "PyTorch", "XGBoost", "Scikit-Learn", "OpenCV", "LLMs (Groq, LLaMA)"],
  },
  {
    title: "Languages & Core",
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
    skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Web Technologies",
    icon: <Globe className="w-5 h-5 text-blue-400" />,
    skills: ["Next.js", "React", "Tailwind CSS", "Node.js", "Django", "WebSockets"],
  },
  {
    title: "Architecture & Tools",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    skills: ["Supabase", "PostgreSQL", "Prisma", "Git", "Cloudflare", "Linux"],
  },
];

export default function About() {
  return (
    <section id="about" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Code.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            A blend of analytical problem-solving, advanced machine learning, and creative intuition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: The Hacker Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col"
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <p className="ml-4 text-xs font-mono text-zinc-500">aditya_bio.py</p>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base overflow-x-auto">
              <p className="text-pink-500">class <span className="text-green-400">AdityaChourasia</span><span className="text-zinc-300">(Engineer):</span></p>
              
              <div className="pl-6 mt-2">
                <p className="text-pink-500">def <span className="text-blue-400">__init__</span><span className="text-zinc-300">(self):</span></p>
                <p className="pl-6 text-zinc-300">self.role = <span className="text-amber-300">&quot;AI/ML Software Engineer&quot;</span></p>
                <p className="pl-6 text-zinc-300">self.education = <span className="text-amber-300">&quot;B.Tech Computer Science&quot;</span></p>
                <p className="pl-6 text-zinc-300">self.passion = <span className="text-amber-300">&quot;Building intelligent solutions&quot;</span></p>
              </div>

              <div className="pl-6 mt-4">
                <p className="text-pink-500">def <span className="text-blue-400">get_hobbies</span><span className="text-zinc-300">(self):</span></p>
                <p className="pl-6 text-zinc-400 italic"># A creative balance to analytical thinking</p>
                <p className="pl-6 text-zinc-300">return [<span className="text-amber-300">&quot;Playing Flute&quot;</span>, <span className="text-amber-300">&quot;Dramatics / Theatre&quot;</span>]</p>
              </div>

              <div className="pl-6 mt-4">
                <p className="text-pink-500">def <span className="text-blue-400">execute_mission</span><span className="text-zinc-300">(self):</span></p>
                <p className="pl-6 text-zinc-300">if self.has_coffee():</p>
                <p className="pl-12 text-zinc-300">return <span className="text-amber-300">&quot;Optimize ML models & deploy scaleable web apps&quot;</span></p>
              </div>

              <p className="mt-4 text-zinc-500 animate-pulse">_</p>
            </div>
          </motion.div>

          {/* RIGHT: Bento Box Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {skillCategories.map((category, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-sm text-zinc-400 bg-[#050505] border border-white/10 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}