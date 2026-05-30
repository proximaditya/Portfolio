"use client";

import { motion } from "framer-motion";

// Enhanced Email Link with pre-filled Subject and Body
const EMAIL = "aditya.chourasia.work@gmail.com";
const SUBJECT = encodeURIComponent("Hello Aditya! Let's connect.");
const BODY = encodeURIComponent("Hi Aditya,\n\nI saw your portfolio and would love to chat about...");
const MAILTO_LINK = `mailto:${EMAIL}?subject=${SUBJECT}&body=${BODY}`;

const socialLinks = [
  {
    name: "GitHub",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    url: "https://github.com/proximaditya",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    url: "https://linkedin.com/in/aditya-chourasia09",
  },
  {
    name: "Email",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    url: MAILTO_LINK,
  },
  {
    name: "LeetCode",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.543l4.359 4.159c.88.841 2.37.841 3.25 0 .87-.83.87-2.18 0-3.01l-2.606-2.486a.434.434 0 0 1 0-.613l2.606-2.486c.88-.84 2.37-.84 3.25 0 .87.83.87 2.18 0 3.01l-2.606 2.486a.434.434 0 0 1 0 .613l4.359 4.159c.88.841 2.37.841 3.25 0 .87-.83.87-2.18 0-3.01l-7.608-7.262a.434.434 0 0 1 0-.613l5.408-5.163c.88-.84 2.37-.84 3.25 0 .87.83.87 2.18 0 3.01l-2.606 2.486a.434.434 0 0 1 0 .613l2.606 2.486c.88.84 2.37.84 3.25 0 .87-.83.87-2.18 0-3.01l-4.359-4.159a5.939 5.939 0 0 0-1.271-1.543 5.83 5.83 0 0 0-.349-1.017 5.527 5.527 0 0 0-.062-2.362 5.35 5.35 0 0 0 .125-.513 5.266 5.266 0 0 0 1.209-2.104l3.854-4.126L14.444.438A1.374 1.374 0 0 0 13.483 0zm0 2.756l5.408 5.163a.434.434 0 0 1 0 .613l-2.606 2.486c-.88.84-2.37.84-3.25 0-.87-.83-.87-2.18 0-3.01l2.606-2.486a.434.434 0 0 1 0-.613l-5.408-5.163c-.88-.84-2.37-.84-3.25 0-.87.83-.87 2.18 0 3.01l7.608 7.262a.434.434 0 0 1 0 .613l-4.359 4.159c-.88.841-2.37.841-3.25 0-.87-.83-.87-2.18 0-3.01l2.606-2.486a.434.434 0 0 1 0-.613l-2.606-2.486c-.88-.84-2.37-.84-3.25 0-.87.83-.87 2.18 0 3.01l2.606 2.486a.434.434 0 0 1 0 .613l-4.359 4.159c-.88.841-2.37.841-3.25 0-.87-.83-.87-2.18 0-3.01l3.854-4.126a2.535 2.535 0 0 1 .582-1.011 2.597 2.597 0 0 1 .059-1.127 2.659 2.659 0 0 1-.168-.487 2.85 2.85 0 0 1-.611-.741l-4.359-4.159c-.88-.841-2.37-.841-3.25 0-.87.83-.87 2.18 0 3.01l2.606 2.486a.434.434 0 0 1 0 .613l-2.606 2.486c-.88.84-2.37.84-3.25 0-.87-.83-.87-2.18 0-3.01l5.408-5.163a.434.434 0 0 1 0-.613z" />
      </svg>
    ),
    url: "https://leetcode.com/u/proximaditya/",
  },
  {
    name: "Kaggle",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.009-2.25 2.155v3.743c0 .167-.091.282-.247.319H4.246c-.164 0-.246-.105-.246-.319V.431c0-.163.082-.268.246-.318h2.992c.156.05.247.155.247.318v15.03l7.006-6.596c.164-.141.328-.212.492-.212h3.28c.187 0 .281.071.281.212 0 .047-.023.094-.07.141l-5.389 5.034 5.928 6.551c.141.141.164.234.07.319v2.949z" />
      </svg>
    ),
    url: "https://www.kaggle.com/adityachourasia1",
  }
];

export default function Contact() {
  return (
    <section id="contact" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10 overflow-hidden">
      
      {/* Dynamic Animated Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-400/20 blur-[100px] rounded-full pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            Let&apos;s build something <br />
            <span className="relative inline-block mt-2">
              {/* Perfectly contoured blur layer behind the text to create a true glow */}
              <span className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300 blur-xl opacity-70 select-none">
                extraordinary.
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                extraordinary.
              </span>
            </span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Whether you have a challenging project in mind, a unique opportunity, or are simply passionate about the future of AI and technology, I&apos;m eager to connect.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-20 flex justify-center">
          <div className="relative inline-flex group">
            {/* Rich Animated Gradient Glow behind the button */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600 to-amber-400 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200"></div>
            <a
              href={MAILTO_LINK}
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Say Hello
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link, idx) => {
            const isEmail = link.url.startsWith("mailto:");
            return (
              <a
                key={idx}
                href={link.url}
                target={isEmail ? "_self" : "_blank"}
                rel={isEmail ? "" : "noreferrer"}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:bg-orange-500/20 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}