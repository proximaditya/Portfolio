<div align="center">

# 🌌 Aditya Chourasia — Portfolio
### AI/ML Software Engineer & Full-Stack Developer

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq_Llama_3-F55036?style=for-the-badge&logo=ai&logoColor=white)](https://groq.com/)

**[View Live Portfolio](https://proximaditya.vercel.app/)** • **[Report Bug](https://github.com/proximaditya/Portfolio/issues)** 

</div>

---

## 📖 Overview
Welcome to the source code of my futuristic, highly-optimized developer portfolio. 

Moving away from legacy HTML/JS and basic templating, this project was architected from the ground up to showcase top-tier software engineering. It combines **WebGL 3D rendering**, **Native AI Integration**, and **Server-Side Data Fetching** into a buttery-smooth, cinematic user experience.

---

## ✨ Core Features & Engineering Marvels

### 🤖 1. "Aditya AI" — Native Chat Engine
A floating, glassmorphic AI chatbot embedded directly into the UI.
* **The Tech:** Powered by **Groq (Llama-3-8B)** for near-instantaneous inference.
* **The Architecture:** Bypassed standard, bug-prone UI libraries to build a 100% custom, bulletproof React state engine. The frontend communicates with a secure Next.js backend route (`/api/chat`), ensuring API keys are never exposed to the client.

### 🌌 2. WebGL 3D Preloader & Environments
* **The Preloader:** Features a custom Framer Motion orchestration. A glowing glass orb shatters into four distinct shards while 70 stars lose gravity and scatter off-screen, seamlessly revealing the website.
* **The Background:** Uses **React Three Fiber** and **Drei** to render a highly optimized, rotating 3D starfield (`Math.random` generated coordinates handled strictly on the client to prevent Next.js SSR hydration crashes).

### 📊 3. Live Metrics Dashboard (`/dashboard`)
A server-side rendered (SSR) dashboard that proves my skills with raw data rather than words.
* Fetches live statistics from **GitHub** (Followers, Repositories, Total Stargazers, Top Languages).
* Fetches live data from **LeetCode** (Total Solved, Easy/Medium/Hard breakdown).
* Automatically caches and revalidates data every hour to prevent rate-limiting.

### 📝 4. Real-Time Guestbook (Supabase)
An interactive database implementation allowing visitors to leave reviews or say hello.
* Uses **Supabase (PostgreSQL)**.
* Implements Row Level Security (RLS) allowing public inserts and reads.
* Instantly updates the UI upon submission.

### 🎬 5. Cinematic Project Showcase
A scalable, data-driven "Bento Box" and alternating-card layout supporting both static images and auto-playing `.mp4` video demos (e.g., the *Savage-Commit* CLI tool).

---

## 🛠️ Tech Stack & Architecture (Why I chose them)

| Technology | Purpose | Justification for Future Self |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Core Framework | Unmatched SEO, SSR for the Dashboard, and secure API routes for the AI Chat. |
| **Tailwind CSS v4** | Styling | Rapid, utility-first styling keeping the CSS bundle infinitesimally small. |
| **Framer Motion** | Animations | Cinematic orchestrations, exit animations (`AnimatePresence`), and SVG path drawing. |
| **Lenis JS** | Scroll Physics | The industry standard for smooth scrolling. Doesn't hijack native scroll like Locomotive does. |
| **React Three Fiber** | 3D Graphics | Declarative Three.js. Vastly superior performance and customization compared to Vanilla Vanta.js. |
| **Groq / Llama-3** | LLM Engine | Offers LPU (Language Processing Unit) speeds, making the chat widget feel magical and instant. |
| **Supabase** | Backend / BaaS | Best-in-class open-source Postgres. Used for the Guestbook component. |

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
│   │   ├── Contact.tsx     # Enhanced Mailto & Social SVGs
│   │   ├── Guestbook.tsx   # Supabase live database connection
│   │   ├── Hero.tsx        # Typography & layout over the 3D canvas
│   │   ├── Navbar.tsx      # Floating glassmorphic navigation
│   │   ├── ParticleBg.tsx  # React Three Fiber Starfield
│   │   ├── Preloader.tsx   # Shattering glass initial load screen
│   │   └── Projects.tsx    # Showcase cards (Image/Video support)
│   └── lib/                
│       ├── prompt.ts       # The System Prompt guiding the AI agent
│       └── supabase.ts     # Supabase client initialization
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
3. Add the 3 environment variables in the Vercel deployment settings.
4. Click **Deploy**.

*Next.js takes care of Edge caching, API routing, and asset optimization automatically.*

---

## 🧠 Note to Future Self (Lessons Learned)

- **The Hydration Mismatch:** Generating `Math.random()` on the server causes React Hydration errors when the client loads. **Fix:** Always wrap randomized initial states in a `useEffect` so they only execute on the client browser (e.g., the stars in `Preloader.tsx`).
- **AI SDK Input Locking:** Relying on third-party SDK state for form inputs (like `useChat`'s internal input state) can cause crashes if it initializes as undefined. **Fix:** Build a native React `useState` for the form input, and manually push data to the backend array. It is 10x safer.
- **Video Rendering:** To prevent terminal demo `.mp4` videos from being cropped by Tailwind's `object-cover`, switch them to `object-contain` with a `w-[90%]` wrapper to frame them like a monitor.

<br>

<div align="center">
  <p>Built with 🧡 by <b>Aditya Chourasia</b>.</p>
  <p>&copy; 2026. All rights reserved.</p>
</div>