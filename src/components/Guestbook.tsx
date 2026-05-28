"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch messages on load
  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10); // Show last 10 messages

    if (!error && data) {
      setMessages(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("guestbook").insert([
      { name: name.trim(), message: message.trim() },
    ]);

    if (!error) {
      setName("");
      setMessage("");
      fetchMessages(); // Refresh the list
    }

    setIsSubmitting(false);
  }

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Developer <span className="text-orange-500">Guestbook.</span>
          </h2>
          <p className="text-zinc-400">Leave a review, drop a tip, or just say hello!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Submit Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 h-fit"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  maxLength={50}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Incredible portfolio! Let's connect..."
                  maxLength={300}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Sign Guestbook"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Messages Feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-8 border border-dashed border-white/10 rounded-2xl">
                <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                <p>No messages yet. Be the first!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{msg.name}</span>
                    <span className="text-xs text-zinc-500">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{msg.message}</p>
                </div>
              ))
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}