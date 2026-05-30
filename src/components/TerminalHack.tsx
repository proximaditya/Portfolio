"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

const SECRET_CODE = ["a", "d", "i", "t", "y", "a"];

export default function TerminalHack() {
  const [isActive, setIsActive] = useState(false);
  const [keyIndex, setKeyIndex] = useState(0);
  
  // Terminal State
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<React.ReactNode[]>([
    <p key="init1">&gt; ACCESS GRANTED.</p>,
    <p key="init2">&gt; WELCOME TO THE MAINFRAME, RECRUITER.</p>,
    <p key="init3" className="mb-4">&gt; TYPE <span className="text-white font-bold">'help'</span> TO VIEW AVAILABLE COMMANDS.</p>
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1. Keylogger to trigger the hack
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) return; // Stop listening for the code if already open
      if (e.key.toLowerCase() === SECRET_CODE[keyIndex]) {
        if (keyIndex === SECRET_CODE.length - 1) {
          setIsActive(true);
          setKeyIndex(0);
        } else {
          setKeyIndex((prev) => prev + 1);
        }
      } else {
        setKeyIndex(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyIndex, isActive]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    if (isActive && !isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, isPlaying]);

  // 2. Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [isActive]);

  // 3. Command Handler
  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, <p key={Date.now()}>&gt; {input}</p>];
    setInput("");

    if (cmd === "help") {
      newHistory.push(
        <div key="help" className="pl-4 text-green-400 mb-2">
          <p>AVAILABLE COMMANDS:</p>
          <p><span className="text-white">intel</span>  - View classified target profile</p>
          <p><span className="text-white">whoami</span> - Execute reverse IP trace on your connection</p>
          <p><span className="text-white">play</span>   - Initialize training simulation (Mini-game)</p>
          <p><span className="text-white">clear</span>  - Wipe terminal history</p>
          <p><span className="text-white">exit</span>   - Terminate session</p>
        </div>
      );
    } else if (cmd === "intel") {
      newHistory.push(
        <div key="intel" className="bg-green-900/20 p-4 border border-green-500/30 rounded text-green-400 mb-4 mt-2">
          <p className="mb-2">⚠️ <span className="font-bold text-white">CLASSIFIED INTEL: ADITYA CHOURASIA</span></p>
          <ul className="list-none space-y-1">
            <li><span className="text-green-600">DESIGNATION:</span> Full-Stack AI/ML Engineer.</li>
            <li><span className="text-green-600">SPECIALTY:</span> Scalable Architectures, LLMs, Neural Networks.</li>
            <li><span className="text-green-600">NOTABLE OPS:</span> Smart India Hackathon (Finalist), ISRO Antariksh.</li>
            <li><span className="text-green-600">CURRENT STATUS:</span> Seeking high-impact engineering roles.</li>
          </ul>
        </div>
      );
    } else if (cmd === "whoami") {
      newHistory.push(<p key="tracing" className="text-yellow-400 animate-pulse">TRACING CONNECTION...</p>);
      setHistory(newHistory);
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        newHistory.pop(); // Remove tracing text
        newHistory.push(
          <div key="ip" className="text-red-500 mb-4 mt-2 border-l-2 border-red-500 pl-4">
            <p className="font-bold">🚨 INTRUDER DETECTED!</p>
            <p>IP ADDRESS: <span className="text-white">{data.ip}</span></p>
            <p>LOCATION: <span className="text-white">{data.city}, {data.region}, {data.country_name}</span></p>
            <p>COORDINATES: <span className="text-white">{data.latitude}, {data.longitude}</span></p>
            <p>ISP: <span className="text-white">{data.org}</span></p>
            <p className="text-xs mt-2 text-red-500/60">Target locked. Deploying countermeasures...</p>
          </div>
        );
      } catch (err) {
        newHistory.push(<p key="ip-err" className="text-red-500">Trace failed. Intruder using advanced proxy.</p>);
      }
    } else if (cmd === "play") {
      setIsPlaying(true);
      return;
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "exit") {
      setIsActive(false);
      return;
    } else {
      newHistory.push(<p key="err" className="text-red-500 mb-2">Command not found. Type 'help'.</p>);
    }
    setHistory(newHistory);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-black overflow-hidden flex flex-col items-center justify-center text-green-500 font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Matrix Background */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 bg-[#050505]/90 border border-green-500/50 p-6 rounded-lg w-[90%] max-w-2xl h-[70vh] shadow-[0_0_40px_rgba(0,255,0,0.15)] backdrop-blur-md flex flex-col"
          >
            <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2 shrink-0">
              <div className="flex items-center gap-2 text-green-500/70">
                <TerminalIcon className="w-5 h-5" />
                <span>root@aditya-mainframe:~</span>
              </div>
              <button onClick={() => setIsActive(false)} className="text-green-500/50 hover:text-green-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {isPlaying ? (
              <SnakeGame onExit={() => setIsPlaying(false)} />
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col font-mono text-sm md:text-base">
                {history}
                <form onSubmit={handleCommand} className="flex mt-2 shrink-0">
                  <span className="mr-2 text-green-500">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-green-400 font-mono caret-green-500"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
                <div ref={bottomRef} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 4. Matrix Snake Mini-Game Component
function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      if (["ArrowUp", "w"].includes(e.key) && dir.y === 0) setDir({ x: 0, y: -1 });
      if (["ArrowDown", "s"].includes(e.key) && dir.y === 0) setDir({ x: 0, y: 1 });
      if (["ArrowLeft", "a"].includes(e.key) && dir.x === 0) setDir({ x: -1, y: 0 });
      if (["ArrowRight", "d"].includes(e.key) && dir.x === 0) setDir({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir, onExit]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        
        // Wall collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setGameOver(true);
          return prev;
        }
        // Self collision
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100); // Game Speed
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex justify-between w-full max-w-[300px] mb-4 text-green-400">
        <span>SCORE: {score}</span>
        <span className="text-zinc-500 text-xs">[ESC] TO ABORT</span>
      </div>
      
      {/* 20x20 Grid */}
      <div className="w-[300px] h-[300px] border-2 border-green-500/30 bg-black/50 relative grid grid-cols-20 grid-rows-20">
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
            <p className="text-red-500 font-bold mb-4">SYSTEM FAILURE</p>
            <button 
              onClick={() => { setSnake([{x:10,y:10}]); setDir({x:0,y:-1}); setGameOver(false); setScore(0); }}
              className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors"
            >
              REBOOT
            </button>
          </div>
        )}
        
        {/* Render Food */}
        <div 
          className="absolute bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)] rounded-full"
          style={{ width: '5%', height: '5%', left: `${food.x * 5}%`, top: `${food.y * 5}%` }}
        />
        
        {/* Render Snake */}
        {snake.map((segment, i) => (
          <div 
            key={i} 
            className="absolute bg-green-500 border border-black"
            style={{ width: '5%', height: '5%', left: `${segment.x * 5}%`, top: `${segment.y * 5}%` }}
          />
        ))}
      </div>
      
      <p className="mt-4 text-zinc-500 text-xs text-center">USE W,A,S,D OR ARROWS TO INTERCEPT DATA PACKETS.</p>
    </div>
  );
}