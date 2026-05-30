"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

const SECRET_CODE = ["a", "d", "i", "t", "y", "a"];

const COLORS: Record<string, string> = {
  green: "#0f0",
  cyan: "#0ff",
  red: "#f00",
  purple: "#d946ef",
  amber: "#f59e0b",
};

const TEXT_COLORS: Record<string, string> = {
  green: "text-green-500",
  cyan: "text-cyan-500",
  red: "text-red-500",
  purple: "text-purple-500",
  amber: "text-amber-500",
};

export default function TerminalHack() {
  const [isActive, setIsActive] = useState(false);
  const [keyIndex, setKeyIndex] = useState(0);
  
  const [theme, setTheme] = useState("green");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<React.ReactNode[]>([
    <p key="init1">&gt; ACCESS GRANTED.</p>,
    <p key="init2">&gt; WELCOME TO THE MAINFRAME, RECRUITER.</p>,
    <p key="init3" className="mb-4">&gt; TYPE <span className="text-white font-bold">'help'</span> TO VIEW AVAILABLE COMMANDS.</p>
  ]);
  const [activeGame, setActiveGame] = useState<"none" | "snake" | "sos">("none");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keylogger & Remote Trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) return;
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
    const handleRemoteTrigger = () => setIsActive(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleRemoteTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleRemoteTrigger);
    };
  }, [keyIndex, isActive]);

  // Auto-scroll
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    if (isActive && activeGame === "none" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, activeGame]);

  // Matrix Rain
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
      ctx.fillStyle = COLORS[theme] || COLORS.green;
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
  }, [isActive, theme]);

  // Command Handler
  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmdStr = input.trim().toLowerCase();
    if (!cmdStr) return;

    const args = cmdStr.split(/\s+/);
    const command = args[0];

    const newHistory = [...history, <p key={Date.now()} className={TEXT_COLORS[theme] || "text-green-500"}>&gt; {input}</p>];
    setInput("");

    if (command === "help") {
      newHistory.push(
        <div key="help" className={`${TEXT_COLORS[theme] || "text-green-400"} mb-2 pl-4`}>
          <p>AVAILABLE COMMANDS:</p>
          <p><span className="text-white">intel</span>     - View classified target profile</p>
          <p><span className="text-white">whoami</span>    - Execute reverse IP trace</p>
          <p><span className="text-white">play</span>      - Arcade module (Usage: play snake | play sos)</p>
          <p><span className="text-white">theme</span>     - Change matrix color (green, cyan, red, purple, amber)</p>
          <p><span className="text-white">sudo</span>      - Execute root override</p>
          <p><span className="text-white">github</span>    - Locate target's code repository</p>
          <p><span className="text-white">joke</span>      - Query AI Core for developer humor</p>
          <p><span className="text-white">clear</span>     - Wipe terminal history</p>
          <p><span className="text-white">exit</span>      - Terminate session</p>
        </div>
      );
    } else if (command === "play") {
      if (args[1] === "snake" || args[1] === "a") {
        setActiveGame("snake");
        return;
      } else if (args[1] === "sos" || args[1] === "s") {
        setActiveGame("sos");
        return;
      } else {
        newHistory.push(<p key="err-play" className="text-red-500">Specify game: 'play a' (Snake) or 'play s' (SOS)</p>);
      }
    } else if (command === "theme") {
      const newTheme = args[1];
      if (COLORS[newTheme]) {
        setTheme(newTheme);
        newHistory.push(<p key="theme" className="text-white">System theme updated to {newTheme}.</p>);
      } else {
        newHistory.push(<p key="theme-err" className="text-red-500">Invalid theme. Try: green, cyan, red, purple, amber</p>);
      }
    } else if (command === "sudo") {
      newHistory.push(
        <div key="sudo" className="text-red-500 font-bold animate-pulse mt-2 mb-2">
          <p>⚠️ ACCESS DENIED.</p>
          <p>UNAUTHORIZED PRIVILEGE ESCALATION DETECTED.</p>
          <p>THIS INCIDENT HAS BEEN LOGGED AND REPORTED.</p>
        </div>
      );
    } else if (command === "github") {
      newHistory.push(<p key="gh" className="text-blue-400">Opening secure link to GitHub...</p>);
      setTimeout(() => window.open("https://github.com/proximaditya", "_blank"), 1000);
    } else if (command === "intel") {
      newHistory.push(
        <div key="intel" className={`bg-${theme}-900/20 p-4 border border-${theme}-500/30 rounded ${TEXT_COLORS[theme]} mb-4 mt-2`}>
          <p className="mb-2">⚠️ <span className="font-bold text-white">CLASSIFIED INTEL: ADITYA CHOURASIA</span></p>
          <ul className="list-none space-y-1">
            <li><span className="font-bold">DESIGNATION:</span> Full-Stack AI/ML Engineer.</li>
            <li><span className="font-bold">SPECIALTY:</span> Scalable Architectures, LLMs, Neural Networks.</li>
            <li><span className="font-bold">NOTABLE OPS:</span> Smart India Hackathon (Finalist), ISRO Antariksh.</li>
            <li><span className="font-bold">CURRENT STATUS:</span> Seeking high-impact engineering roles.</li>
          </ul>
        </div>
      );
    } else if (command === "joke") {
      // 🚀 THE NEW LIVE AI JOKE FEATURE
      newHistory.push(
        <p key="joke-loading" className="text-cyan-400 animate-pulse mt-2 mb-2">
          🤖 CONNECTING TO LLM CORE FOR GENERATION...
        </p>
      );
      setHistory(newHistory); // Render the loading state instantly

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            messages: [{ role: "user", content: "Tell me a very short, highly technical programming joke. Do not include any intro, outro, or emojis. Just the joke." }] 
          }),
        });
        const data = await res.json();
        
        // Remove the loading message and add the real joke
        newHistory.pop();
        newHistory.push(<p key={Date.now()} className="text-cyan-400 mt-2 mb-2">🤖 {data.text}</p>);
      } catch (err) {
        newHistory.pop();
        newHistory.push(<p key="joke-err" className="text-red-500 mt-2 mb-2">AI Core Offline. Fallback: Why do programmers prefer dark mode? Light attracts bugs.</p>);
      }
    } else if (command === "whoami") {
      newHistory.push(<p key="tracing" className="text-yellow-400 animate-pulse">TRACING CONNECTION...</p>);
      setHistory(newHistory);
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        newHistory.pop();
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
    } else if (command === "clear") {
      setHistory([]);
      return;
    } else if (command === "exit") {
      setIsActive(false);
      return;
    } else {
      newHistory.push(<p key="err" className="text-red-500 mb-2">Command not found. Type 'help'.</p>);
    }
    setHistory(newHistory);
  };

  const themeClass = TEXT_COLORS[theme] || "text-green-500";
  const borderClass = `border-${theme === "amber" ? "yellow" : theme}-500/50`;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[999999] bg-black overflow-hidden flex flex-col items-center justify-center ${themeClass} font-mono`}
          onClick={() => activeGame === "none" && inputRef.current?.focus()}
        >
          <canvas ref={canvasRef} className="absolute inset-0 opacity-30 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative z-10 bg-[#050505]/90 border ${borderClass} p-4 md:p-6 rounded-lg w-[95%] md:w-[90%] max-w-3xl h-[85vh] shadow-[0_0_40px_rgba(0,255,0,0.1)] backdrop-blur-md flex flex-col`}
            style={{ boxShadow: `0 0 40px ${COLORS[theme]}33` }}
          >
            <div className={`flex justify-between items-center mb-4 border-b ${borderClass} pb-2 shrink-0`}>
              <div className="flex items-center gap-2 opacity-80">
                <TerminalIcon className="w-5 h-5" />
                <span className="text-xs md:text-sm">root@aditya-mainframe:~</span>
              </div>
              <button onClick={() => setIsActive(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                <X className="w-6 h-6" />
              </button>
            </div>

            {activeGame === "snake" ? (
              <SnakeGame themeClass={themeClass} onExit={() => setActiveGame("none")} />
            ) : activeGame === "sos" ? (
              <SosGame themeClass={themeClass} onExit={() => setActiveGame("none")} />
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col font-mono text-sm md:text-base">
                {history}
                <form onSubmit={handleCommand} className="flex mt-2 shrink-0">
                  <span className="mr-2">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
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

// ==========================================
// 🎮 SNAKE GAME (Responsive)
// ==========================================
function SnakeGame({ themeClass, onExit }: { themeClass: string, onExit: () => void }) {
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
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some((s) => s.x === head.x && s.y === head.y)) {
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
    }, 100);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className={`flex flex-col items-center justify-center flex-1 w-full ${themeClass}`}>
      <div className="flex justify-between w-full max-w-[300px] mb-4 font-bold text-sm">
        <span>SCORE: {score}</span>
        <span className="text-zinc-500 text-xs">[ESC] TO ABORT</span>
      </div>
      <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] border-2 border-current bg-black/50 relative">
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center p-4">
            <p className="text-red-500 font-bold mb-4">SYSTEM FAILURE</p>
            <button onClick={() => { setSnake([{x:10,y:10}]); setDir({x:0,y:-1}); setGameOver(false); setScore(0); }} className="px-4 py-2 border border-current hover:bg-white/10 transition-colors">
              REBOOT
            </button>
          </div>
        )}
        <div className="absolute bg-white rounded-full shadow-[0_0_10px_#fff]" style={{ width: '5%', height: '5%', left: `${food.x * 5}%`, top: `${food.y * 5}%` }} />
        {snake.map((segment, i) => (
          <div key={i} className="absolute bg-current border border-black" style={{ width: '5%', height: '5%', left: `${segment.x * 5}%`, top: `${segment.y * 5}%` }} />
        ))}
      </div>
      <p className="mt-4 text-zinc-500 text-xs text-center max-w-[300px]">USE W,A,S,D TO INTERCEPT DATA PACKETS.</p>
    </div>
  );
}

// ==========================================
// 5. RESPONSIVE S.O.S GAME
// ==========================================
type CellData = { letter: 'S' | 'O' | null, colorClass: string } | null;

function SosGame({ themeClass, onExit }: { themeClass: string, onExit: () => void }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [isStarted, setIsStarted] = useState(false);
  const size = 6;
  
  const players = [
    { id: 0, color: "text-green-500", name: "P1" },
    { id: 1, color: "text-cyan-400", name: "P2" },
    { id: 2, color: "text-fuchsia-500", name: "P3" },
    { id: 3, color: "text-yellow-400", name: "P4" },
    { id: 4, color: "text-red-500", name: "P5" },
  ];

  const [board, setBoard] = useState<CellData[]>(Array(size * size).fill(null));
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [selectedLetter, setSelectedLetter] = useState<'S' | 'O'>('S');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onExit();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onExit]);

  const getLetter = (b: CellData[], r: number, c: number) => {
    if (r >= 0 && r < size && c >= 0 && c < size) return b[r * size + c]?.letter;
    return null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx]) return; 

    const newBoard = [...board];
    newBoard[idx] = { letter: selectedLetter, colorClass: players[turn].color };

    const r = Math.floor(idx / size);
    const c = idx % size;
    let pointsGained = 0;

    if (selectedLetter === 'S') {
      const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
      for (const [dr, dc] of directions) {
        if (getLetter(newBoard, r + dr, c + dc) === 'O' && getLetter(newBoard, r + dr * 2, c + dc * 2) === 'S') {
          pointsGained++;
        }
      }
    } else {
      const pairs = [ [[-1,-1], [1,1]], [[-1,0], [1,0]], [[-1,1], [1,-1]], [[0,-1], [0,1]] ];
      for (const [[dr1, dc1], [dr2, dc2]] of pairs) {
        if (getLetter(newBoard, r + dr1, c + dc1) === 'S' && getLetter(newBoard, r + dr2, c + dc2) === 'S') {
          pointsGained++;
        }
      }
    }

    setBoard(newBoard);

    if (pointsGained > 0) {
      const newScores = [...scores];
      newScores[turn] += pointsGained;
      setScores(newScores);
    } else {
      setTurn((prev) => (prev + 1) % numPlayers);
    }
  };

  const isGameOver = board.every((c) => c !== null);
  const maxScore = Math.max(...scores.slice(0, numPlayers));

  if (!isStarted) {
    return (
      <div className={`flex flex-col items-center justify-center flex-1 ${themeClass} space-y-6 w-full px-4 text-center`}>
        <h2 className="text-2xl font-bold text-white">S.O.S MULTIPLAYER</h2>
        <p className="text-zinc-400 max-w-sm text-sm">Select number of hackers. Connect S-O-S to score points and keep your turn.</p>
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-[300px]">
          {[2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => { setNumPlayers(n); setIsStarted(true); }} className="px-4 py-2 border border-current hover:bg-white/10 text-sm md:text-base flex-1 min-w-[60px]">
              {n} P
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-8">[ESC] TO ABORT</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center flex-1 w-full text-xs md:text-sm ${themeClass}`}>
      
      {/* Responsive Scoreboard */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mb-4 w-full max-w-md px-2">
        {players.slice(0, numPlayers).map((p, i) => (
          <div 
            key={p.id} 
            className={`flex flex-col items-center p-1.5 md:p-2 border transition-all flex-1 min-w-[50px] ${
              turn === i ? `border-current bg-white/10 ${p.color}` : 'border-zinc-800 text-zinc-600'
            }`}
            style={turn === i ? { textShadow: '0 0 10px currentColor' } : {}}
          >
            <span className="font-bold">{p.name}</span>
            <span className="text-white mt-1 text-[10px] md:text-xs">{scores[i]} PTS</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setSelectedLetter('S')} className={`px-6 py-1.5 md:py-2 border font-bold transition-colors ${selectedLetter === 'S' ? 'bg-white text-black' : 'border-white text-white'}`}>[ S ]</button>
        <button onClick={() => setSelectedLetter('O')} className={`px-6 py-1.5 md:py-2 border font-bold transition-colors ${selectedLetter === 'O' ? 'bg-white text-black' : 'border-white text-white'}`}>[ O ]</button>
      </div>

      {/* 🚀 Fully Responsive Grid */}
      <div className="relative w-full max-w-[280px] md:max-w-[350px] aspect-square">
        {isGameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 p-4 text-center">
            <p className="text-xl text-white font-bold mb-4">GAME OVER</p>
            <div className="mb-6 space-y-1">
              {players.slice(0, numPlayers).map((p, i) => scores[i] === maxScore && (
                <p key={i} className={`${p.color} text-sm md:text-base font-bold`} style={{ textShadow: '0 0 8px currentColor' }}>
                  {p.name} WINS WITH {scores[i]} PTS!
                </p>
              ))}
            </div>
            <button 
              onClick={() => { setBoard(Array(size * size).fill(null)); setScores([0,0,0,0,0]); setTurn(0); }}
              className="px-6 py-2 border border-current hover:bg-white/10 transition-colors"
            >
              RESTART
            </button>
          </div>
        )}
        
        <div className="w-full h-full grid grid-cols-6 border-t border-l border-white/20 bg-black/50">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              disabled={!!cell || isGameOver}
              className="w-full h-full border-b border-r border-white/20 flex items-center justify-center text-lg md:text-2xl font-bold hover:bg-white/10 transition-colors"
            >
              {cell && (
                <span className={cell.colorClass} style={{ textShadow: '0 0 10px currentColor' }}>
                  {cell.letter}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between w-full max-w-[280px] md:max-w-[350px] text-[10px] md:text-xs text-zinc-500">
        <p className="uppercase">Current Hacker: P{turn + 1}</p>
        <p>[ESC] TO EXIT</p>
      </div>
    </div>
  );
}