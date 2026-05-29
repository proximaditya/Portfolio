"use client";

import { motion } from "framer-motion";

// 🚀 SCALABLE DATA STRUCTURE
const projects = [
  {
    id: "proximamonitor",
    title: "ProximaMonitor",
    year: "2026",
    role: "Full-Stack Developer",
    description: "A self-hosted, lightweight API & Website Health Dashboard. Features a custom ping engine that intercepts HTTP Server headers to detect hidden tech stacks, a dynamic live-mode engine updating every 30 seconds, historical sparkline charts, and database-level anti-spam rate limiting.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    image: "svg/proximaMonitor202605.png", 
    isVideo: false,
    containImage: false,
    liveLink: "https://proximaditya-project.vercel.app/",
    githubLink: "https://github.com/proximaditya/ProximaMonitor",
  },
  {
    id: "savage-commit",
    title: "Savage-Commit",
    year: "2026",
    role: "AI Tool Creator",
    description: "A lightning-fast CLI tool that analyzes git diffs using Groq's Llama-3 70B to generate perfect conventional commit messages—and then brutally roasts your code quality from the perspective of an angry Senior Developer. Features zero-compute cost BYOK architecture.",
    tags: ["Python", "LLMs", "Groq Llama-3", "CLI"],
    image: "/svg/demosavage.mp4", 
    isVideo: true, 
    containImage: false,
    liveLink: "https://github.com/proximaditya/savage-commit",
    githubLink: "https://github.com/proximaditya/savage-commit",
  },
  {
    id: "sih-combined",
    title: "Smart India Hackathons ('24 & '25)",
    year: "2024 - 2025",
    role: "Team SPARK & Team XOR",
    description: "Multi-year participation at the national level. In 2024 (University Finalist), built a Face Recognition system for MP Police. In 2025 (Team XOR Again University Finalist), engineered Arelia—an AI & Blockchain tourist safety platform featuring real-time anomaly detection, predictive safety scoring, and crowd management.",
    tags: ["AI/ML", "Computer Vision", "React", "Cloud Architecture"],
    image: "svg/Areliascreen2026.png", 
    isVideo: false,
    containImage: true, // <--- i hv to do this to zoom out
    liveLink: "https://arelia-xor.web.app/",
    githubLink: "https://github.com/proximaditya/",
  },
  {
    id: "isro-bah",
    title: "ISRO Antariksh Hackathon",
    year: "2025",
    role: "XOR Team",
    description: "State-of-the-art explainable AI model for predicting forest fires across India. Built a dynamic spread simulation system based on probabilistic ensemble weather modeling using 50+ ECMWF forecasts to mitigate worst-case scenarios.",
    tags: ["Python", "XGBoost", "TensorFlow", "Scikit-Learn"],
    image: "https://images.unsplash.com/photo-1447014421976-7fec21d26d86?q=80&w=2070&auto=format&fit=crop", 
    isVideo: false,
    containImage: false,
    liveLink: "https://team-xor.pages.dev/isro-bah-2025/forest-fire-prediction/",
    githubLink: "https://team-xor.pages.dev/",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Work.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            A selection of my recent hackathons, AI models, and scalable architectures.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-20 items-center`}
              >
                {/* Media Container */}
                <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] aspect-[4/3] md:aspect-video lg:aspect-[4/3] flex items-center justify-center">
                  
                  {project.isVideo ? (
                    <video
                      src={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-[97%] h-[97%] object-contain rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={project.title}
                      // Check if we need to contain or cover the image
                      className={`transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 ${
                        project.containImage 
                          ? "w-[99%] h-[99%] object-contain rounded-xl shadow-2xl" 
                          : "w-full h-full object-cover"
                      }`}
                    />
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-orange-500 font-mono text-sm border border-orange-500/30 bg-orange-500/10 px-3 py-1 rounded-full">
                      {project.year}
                    </span>
                    <span className="text-zinc-500 text-sm">{project.role}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-sm text-zinc-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white font-medium hover:text-orange-400 transition-colors">
                      View Project 
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                    {project.githubLink !== "#" && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}