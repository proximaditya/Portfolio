import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// 🚀 ADVANCED SEO METADATA
export const metadata: Metadata = {
  title: "Aditya Chourasia | AI/ML Software Engineer",
  description: "Portfolio of Aditya Chourasia, a Full-Stack & AI/ML Software Engineer specializing in scalable architectures, machine learning models, and intelligent web applications.",
  keywords: [
    "Aditya Chourasia",
    "Aditya Chourasia Portfolio",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "Python Developer",
    "Team XOR",
    "Team SPARK",
    "Smart India Hackathon",
    "ISRO Hackathon",
  ],
  authors: [{ name: "Aditya Chourasia" }],
  creator: "Aditya Chourasia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-vercel-domain.vercel.app", // You can update this to your actual Vercel domain later!
    title: "Aditya Chourasia | AI/ML Software Engineer",
    description: "Explore my projects, AI models, and hackathon journeys.",
    siteName: "Aditya Chourasia Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Chourasia | AI/ML Software Engineer",
    description: "Explore my projects, AI models, and hackathon journeys.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-[#050505] text-white`}>
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <ChatWidget />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}