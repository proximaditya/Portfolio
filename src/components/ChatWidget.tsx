"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

// Explicitly define the Message type to kill red lines
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 100% Standard React State - No buggy third-party hooks!
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Open chat from About section
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  // Custom, Bulletproof Send Function
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = input.trim();
    if (!messageText || isLoading) return;

    // 1. Add user message to UI immediately
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: messageText };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput(""); // Clear input box
    setIsLoading(true);
    setError(false);

    try {
      // 2. Call our native API route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newUserMsg] }),
      });

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();

      // 3. Add AI response to UI
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.text },
      ]);
      
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500/20 to-amber-500/5 border border-orange-500/20 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  <Bot className="w-5 h-5 text-orange-400 drop-shadow-md" />
                </div>
                <div>
                  <h3 className="font-medium text-white tracking-wide">Aditya AI</h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                    Online & Ready
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-center gap-3">
                  <div className="p-4 rounded-full bg-white/5 border border-white/5">
                    <Sparkles className="w-8 h-8 text-orange-500/50" />
                  </div>
                  <p className="text-sm max-w-[250px]">Hi! Ask me anything about Aditya&apos;s skills, projects, or background.</p>
                </div>
              )}
              
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-orange-400" />
                    </div>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${m.role === "user" ? "bg-orange-500 text-black rounded-tr-sm font-medium shadow-md" : "bg-white/10 text-zinc-200 rounded-tl-sm border border-white/5 shadow-sm"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {/* Errors & Loading */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
                  Connection failed. Check your GROQ_API_KEY.
                </div>
              )}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="px-4 py-3.5 rounded-2xl bg-white/10 border border-white/5 rounded-tl-sm flex gap-1.5 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#050505]/50 border-t border-white/10 flex gap-2 backdrop-blur-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
              />
              <button 
                type="submit" 
                disabled={isLoading || input.trim() === ""} 
                className="p-2 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all hover:scale-110 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 rounded-full border border-white/40 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        {isOpen ? (
          <X className="w-7 h-7 text-white drop-shadow-md z-10" />
        ) : (
          <div className="relative flex items-center justify-center z-10">
            <Bot className="w-7 h-7 text-white drop-shadow-md" />
            <Sparkles className="absolute -top-1 -right-2 w-4 h-4 text-amber-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </button>
    </div>
  );
}