<
  iv align="center">

# 🌌 Aditya Chourasia — Portfolio
### AI/ML Software Engineer & Full-Stack Developer

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq_Llama_3.1-F55036?style=for-the-badge&logo=ai&logoColor=white)](https://groq.com/)

**[View Live Portfolio](https://adityachourasia.vercel.app/)** • **[Report Bug](https://github.com/proximaditya/Portfolio/issues)** 

</div>

---

## 📖 Overview
Welcome to the source code of my futuristic, highly-optimized developer portfolio. 

Moving away from legacy HTML/JS and basic templating, this project was architected from the ground up to showcase top-tier software engineering. It combines **WebGL 3D rendering**, **Native LLM Integration**, **Hardware-Accelerated Physics**, and **Server-Side Data Fetching** into a buttery-smooth, cinematic user experience.

---

## ✨ Core Features & Engineering Marvels

### 🤖 1. "Aditya AI" — Native Chat Engine
A floating, glassmorphic AI chatbot embedded directly into the UI.
* **The Tech:** Powered by **Groq (Llama-3.1-8B-Instant)** for near-instantaneous inference.
* **The Architecture:** Custom React state engine communicating with a secure Next.js backend route (`/api/chat`). Features streaming-like speeds with 100% stable, zero-crash input handling.

### 💻 2. The "Mainframe" Easter Egg (Terminal Hack)
Typing `A-D-I-T-Y-A` anywhere on the site (or using the Navbar command icon) triggers a Matrix-style terminal hijack.
* **Commands:** `whoami` (Live IP & Coordinate Trace), `intel` (Classified Resume Data), `theme [color]`, and `joke` (Live API call to Groq LLM for random developer humor).
* **Arcade Module:** Fully playable games inside the terminal, including **Snake** and a **5-Player Multiplayer S.O.S** tactical grid game.

### 🌌 3. WebGL 3D Particle Shape-Shifting Typography
* **The Concept:** 3,000 glowing 3D particles float in the void. Every 4 seconds, they swarm together like nanobots to spell out my core tech stack (PYTHON, TENSORFLOW, NEXT.JS), then explode and reform.
* **The Math:** Uses a hidden HTML5 `<canvas>` to sample pixel coordinates of text, maps those 2D coordinates into 3D Vector space, and uses `useFrame` to interpolate (Lerp) thousands of particles at 60FPS.

### 🪞 4. Holographic 3D Resume Modal
An ultra-premium, interactive glass card for viewing my resume.
* Features heavy 3D parallax (`useSpring` and `translateZ(80px)`) so text literally floats above the glass when hovering with a mouse.
* Gracefully degrades on mobile devices to a flawless tap-to-flip 180-degree interaction.

### 📊 5. Live Metrics Dashboard (`/dashboard`)
A server-side rendered (SSR) dashboard that proves my skills with raw data rather than words.
* Fetches live statistics from **GitHub** (Followers, Repositories, Total Stargazers, Top Languages, Recent Commits).
* Fetches live data from **LeetCode** (Total Solved, Easy/Medium/Hard breakdown).
* Automatically caches and revalidates data every 60 seconds to bypass strict API rate limits.

---

## 🛠️ Tech Stack & Architecture (Why I chose them)

| Technology | Purpose | Justification for Future Self |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Core Framework | Unmatched SEO, SSR for the Dashboard, and secure API routes for the AI Chat & Groq. |
| **Tailwind CSS v4** | Styling | Rapid, utility-first styling keeping the CSS bundle infinitesimally small. |
| **Framer Motion** | Animations | Hardware-accelerated physics (`useSpring`), exit animations (`AnimatePresence`), and dynamic magnetic custom cursors. |
| **Lenis JS** | Scroll Physics | The industry standard for smooth scrolling. Doesn't hijack native scroll behaviors. |
| **React Three Fiber** | 3D Graphics | Declarative Three.js in React. Used for the Particle Typography and Hero Starfield. |
| **Groq / Llama-3.1** | LLM Engine | Offers LPU (Language Processing Unit) speeds, making the chat widget feel magical and instant. |

---

## 📂 Project Directory Structure

```text
adv-portfolio/
├── public/                 # Static assets
│   └── svg/                # SVGs and .mp4 video demos (demodavage.mp4)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/chat/       # Secure backend route for Groq AI
│   │   ├── dashboard/      # Live Metrics page
│   │   ├── layout.tsx      # Global layout (SEO, Lenis Wrapper, Navbar, Preloader)
│   │   ├── page.tsx        # Main Landing Page
│   │   ├── sitemap.ts      # Automated SEO Sitemap
│   │   └── robots.ts       # Automated SEO Robots instructions
│   ├── components/         # Reusable React Components
│   │   ├── About.tsx       # Hybrid Terminal / Bento Box Grid
│   │   ├── ChatWidget.tsx  # Custom AI Chat UI
│   │   ├── Contact.tsx     # Dynamic Aurora Background & Mailto
│   │   ├── CustomCursor.tsx# Magnetic Zero-Lag Framer Cursor
│   │   ├── Hero.tsx        # Typography & layout over the 3D canvas
│   │   ├── Navbar.tsx      # Floating glassmorphic navigation
│   │   ├── ParticleBg.tsx  # React Three Fiber Starfield
│   │   ├── Preloader.tsx   # Cinematic Boot-sequence loader
│   │   ├── Projects.tsx    # Showcase cards (Image/Video support)
│   │   ├── ResumeModal.tsx # Holographic 3D Flip Card
│   │   ├── TechShowcase.tsx# 3D Particle Shape-Shifting Typography
│   │   └── TerminalHack.tsx# The Matrix Easter Egg (Minigames & AI)
│   └── lib/                
│       └── prompt.ts       # The System Prompt guiding the AI agent
├── .env.local              # (Git Ignored) API Keys
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Project dependencies

## 💻 Local Development Setup

To run this project locally, follow these steps.

### 1. Clone the repository
```bash
git clone https://github.com/proximaditya/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the project and add your API keys.
*(Never commit this file!)*
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🚀 Deployment (Vercel)

This project is optimized for zero-config deployment on Vercel.

1. Push your code to GitHub/GitLab.
2. Import the repository in your Vercel Dashboard.
3. Add the environment variables in the Vercel deployment settings.
4. Click **Deploy**.

*Next.js takes care of Edge caching, API routing, and asset optimization automatically.*

---

## 🧠 Note to Future Self (Lessons Learned)

- **Web GL Typography:** Converting a 2D canvas pixel array into a `Float32Array` for `instancedMesh` manipulation is the most performance-efficient way to handle thousands of 3D particles in React Three Fiber.
- **Framer Motion Physics:** Always use `useSpring` and `useMotionValue` for tracking cursor coordinates. Using React `useState` for mouse tracking triggers expensive DOM re-renders and creates massive latency.
- **Server-Side Rate Limiting:** When pulling from GitHub/LeetCode APIs, setting `next: { revalidate: 60 }` ensures the server caches the response globally, preventing API ban-hammering from high traffic.
- **Safe Input Handling:** Vercel AI SDK inputs can momentarily initialize as undefined. Always use fallback strings (`const input = chat?.input || ""`) to prevent `.trim()` crashes on initial hydration.

<br>

<div align="center">
  <p>Built with 🧡 and ☕ by <b>Aditya Chourasia</b>.</p>
  <p>&copy; 2026. All rights reserved.</p>
</div>
