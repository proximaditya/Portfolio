import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader"; // <--- Import the Preloader

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Aditya Chourasia | AI/ML Engineer",
  description: "Portfolio of Aditya Chourasia, AI/ML Enthusiast & Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        {/* Put Preloader at the very top of the body! */}
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