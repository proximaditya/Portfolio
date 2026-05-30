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
    <p key="init1" className="text-green-500">&gt; ACCESS GRANTED.</p>,
    <p key="init2" className="text-green-500">&gt; WELCOME TO THE MAINFRAME, RECRUITER.</p>,
    <p key="init3" className="mb-4 text-green-500">&gt; TYPE <span className="text-white font-bold">'help'</span> TO VIEW AVAILABLE COMMANDS.</p>
  ]);
  
  // "" | "snake" | "sos"
  const [activeGame, setActiveGame] = useState<string | null>(null); 
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1. Keylogger to trigger the hack
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
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyIndex, isActive]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    if (isActive && !activeGame && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, activeGame]);

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
    const rawCmd = input.trim();
    if (!rawCmd) return;

    const args = rawCmd.split(/\s+/);
    const cmd = args[0].toLowerCase();
    const newHistory = [...history, <p key={Date.now() + "-cmd"} className="text-green-500">&gt; {rawCmd}</p>];
    setInput("");

    if (cmd === "help") {
      newHistory.push(
        <div key="help" className="pl-4 text-green-400 mb-2">
          <p>AVAILABLE COMMANDS:</p>
          <p><span className="text-white">intel</span>  - View classified target profile</p>
          <p><span className="text-white">whoami</span> - Execute reverse IP trace on your connection</p>
          <p><span className="text-white">play</span>   - Access gaming modules (snake, sos)</p>
          <p><span className="text-white">joke</span>   - Retrieve a random developer log</p>
          <p><span className="text-white">sudo</span>   - Execute with root privileges</p>
          <p><span className="text-white">date</span>   - Show system time</p>
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
    } else if (cmd === "play") {
      const gameType = args[1]?.toLowerCase();
      if (gameType === "a" || gameType === "snake") {
        setActiveGame("snake");
        return;
      } else if (gameType === "s" || gameType === "sos") {
        setActiveGame("sos");
        return;
      } else {
        newHistory.push(
          <div key={Date.now()} className="text-yellow-400 mb-2 mt-2 bg-black/50 p-3 border border-yellow-500/30">
            <p className="font-bold text-white mb-2">⚠️ SPECIFY A GAMING MODULE</p>
            <p>USAGE: <span className="text-green-400">play [a|s]</span></p>
            <p className="mt-2">- <span className="text-green-400">play a</span> : Initialize Snake (Data Intercept)</p>
            <p>- <span className="text-green-400">play s</span> : Initialize SOS (5-Player Tactical Grid)</p>
          </div>
        );
      }
    } else if (cmd === "sudo") {
      newHistory.push(<p key={Date.now()} className="text-red-500 mt-2 mb-2 font-bold">Access Denied. User is not in the sudoers file. This incident has been reported to the Mainframe Administrator.</p>);
    } else if (cmd === "joke") {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "I would love to change the world, but they won't give me the source code.",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "Hardware: The part of a computer that you can kick.",
        "To understand what recursion is, you must first understand recursion."
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      newHistory.push(<p key={Date.now()} className="text-cyan-400 mt-2 mb-2">🤖 {joke}</p>);
    } else if (cmd === "date") {
      newHistory.push(<p key={Date.now()} className="text-green-400 mt-2 mb-2">SYSTEM TIME: {new Date().toString()}</p>);
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
          className="fixed inset-0 z-[999999] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Matrix Background */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 bg-[#050505]/90 border border-green-500/50 p-6 rounded-lg w-[90%] max-w-3xl h-[75vh] shadow-[0_0_40px_rgba(0,255,0,0.15)] backdrop-blur-md flex flex-col"
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

            {activeGame === "snake" ? (
              <SnakeGame onExit={() => setActiveGame(null)} />
            ) : activeGame === "sos" ? (
              <SosGame onExit={() => setActiveGame(null)} />
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

// ==========================================
// 4. Matrix Snake Mini-Game Component
// ==========================================
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
        
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setGameOver(true);
          return prev;
        }
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
    }, 100);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex justify-between w-full max-w-[300px] mb-4 text-green-400">
        <span>SCORE: {score}</span>
        <span className="text-zinc-500 text-xs">[ESC] TO ABORT</span>
      </div>
      
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
        <div className="absolute bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)] rounded-full" style={{ width: '5%', height: '5%', left: `${food.x * 5}%`, top: `${food.y * 5}%` }} />
        {snake.map((segment, i) => (
          <div key={i} className="absolute bg-green-500 border border-black" style={{ width: '5%', height: '5%', left: `${segment.x * 5}%`, top: `${segment.y * 5}%` }} />
        ))}
      </div>
      <p className="mt-4 text-zinc-500 text-xs text-center">USE W,A,S,D OR ARROWS TO INTERCEPT DATA PACKETS.</p>
    </div>
  );
}

// ==========================================
// 5. 5-Player SOS Grid Mini-Game
// ==========================================
type CellData = { letter: 'S' | 'O' | null, colorClass: string } | null;

function SosGame({ onExit }: { onExit: () => void }) {
  const size = 6; // 6x6 Grid
  const players = [
    { id: 0, color: "text-green-500", name: "P1 (GRN)" },
    { id: 1, color: "text-cyan-400", name: "P2 (CYN)" },
    { id: 2, color: "text-fuchsia-500", name: "P3 (MAG)" },
    { id: 3, color: "text-yellow-400", name: "P4 (YLW)" },
    { id: 4, color: "text-red-500", name: "P5 (RED)" },
  ];

  const [board, setBoard] = useState<CellData[]>(Array(size * size).fill(null));
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [selectedLetter, setSelectedLetter] = useState<'S' | 'O'>('S');

  // Allow ESC to exit easily
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      if (e.key.toLowerCase() === 's') setSelectedLetter('S');
      if (e.key.toLowerCase() === 'o') setSelectedLetter('O');
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  const getLetter = (b: CellData[], r: number, c: number) => {
    if (r >= 0 && r < size && c >= 0 && c < size) return b[r * size + c]?.letter;
    return null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx]) return; // Cell already filled

    const newBoard = [...board];
    newBoard[idx] = { letter: selectedLetter, colorClass: players[turn].color };

    const r = Math.floor(idx / size);
    const c = idx % size;
    let pointsGained = 0;

    // Check for SOS formations involving the newly placed letter
    if (selectedLetter === 'S') {
      // Look outward in all 8 directions for an 'O' immediately followed by an 'S'
      const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
      for (const [dr, dc] of directions) {
        if (getLetter(newBoard, r + dr, c + dc) === 'O' && getLetter(newBoard, r + dr * 2, c + dc * 2) === 'S') {
          pointsGained++;
        }
      }
    } else {
      // Look at pairs of opposite directions for 'S' ... 'O' ... 'S'
      const pairs = [
        [[-1,-1], [1,1]], // Main Diagonal
        [[-1,0], [1,0]],  // Vertical
        [[-1,1], [1,-1]], // Anti Diagonal
        [[0,-1], [0,1]]   // Horizontal
      ];
      for (const [[dr1, dc1], [dr2, dc2]] of pairs) {
        if (getLetter(newBoard, r + dr1, c + dc1) === 'S' && getLetter(newBoard, r + dr2, c + dc2) === 'S') {
          pointsGained++;
        }
      }
    }

    setBoard(newBoard);

    if (pointsGained > 0) {
      // Score points and get another turn
      const newScores = [...scores];
      newScores[turn] += pointsGained;
      setScores(newScores);
    } else {
      // Move to next player
      setTurn((prev) => (prev + 1) % players.length);
    }
  };

  const isGameOver = board.every((c) => c !== null);
  const maxScore = Math.max(...scores);

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full text-xs md:text-sm">
      <div className="flex justify-between w-full max-w-[450px] mb-4 text-green-400">
        <span>S.O.S. MULTIPLAYER</span>
        <span className="text-zinc-500">[ESC] TO ABORT</span>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-5 gap-2 mb-4 w-full max-w-[450px]">
        {players.map((p, i) => (
          <div 
            key={p.id} 
            className={`flex flex-col items-center p-2 border transition-all ${
              turn === i ? `border-current bg-white/10 ${p.color}` : 'border-zinc-800 text-zinc-600'
            }`}
            style={turn === i ? { textShadow: '0 0 10px currentColor' } : {}}
          >
            <span className="font-bold whitespace-nowrap">{p.name}</span>
            <span className="text-white mt-1">{scores[i]} PTS</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setSelectedLetter('S')} 
          className={`px-6 py-2 border transition-colors ${selectedLetter === 'S' ? 'border-green-500 text-green-500 bg-green-500/20' : 'border-zinc-700 text-zinc-500 hover:text-white'}`}
        >
          PLACE 'S'
        </button>
        <button 
          onClick={() => setSelectedLetter('O')} 
          className={`px-6 py-2 border transition-colors ${selectedLetter === 'O' ? 'border-green-500 text-green-500 bg-green-500/20' : 'border-zinc-700 text-zinc-500 hover:text-white'}`}
        >
          PLACE 'O'
        </button>
      </div>

      {/* 6x6 Grid */}
      <div className="grid grid-cols-6 gap-1 w-full max-w-[320px] aspect-square bg-black/50 border-2 border-zinc-800 p-1 relative">
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 text-center p-4">
            <p className="text-white font-bold mb-2">GAME OVER</p>
            <div className="mb-4 text-sm text-yellow-400">
              {players.map((p, i) => scores[i] === maxScore && (
                <p key={i} className={p.color} style={{ textShadow: '0 0 8px currentColor' }}>
                  {p.name} WINS WITH {scores[i]} PTS!
                </p>
              ))}
            </div>
            <button 
              onClick={() => { setBoard(Array(size * size).fill(null)); setScores([0,0,0,0,0]); setTurn(0); }}
              className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors"
            >
              RESTART
            </button>
          </div>
        )}

        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            disabled={!!cell || isGameOver}
            className="flex items-center justify-center text-xl md:text-2xl font-bold border border-zinc-800 hover:bg-white/10 transition-colors"
          >
            {cell && (
              <span className={cell.colorClass} style={{ textShadow: '0 0 10px currentColor' }}>
                {cell.letter}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-zinc-500 text-xs text-center">
        FORM "S-O-S" (HORIZONTAL, VERTICAL, DIAGONAL) TO SCORE A POINT & GET ANOTHER TURN.
      </p>
    </div>
  );
}