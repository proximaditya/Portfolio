import { Code2, Activity, Star, GitCommit, Trophy, TerminalSquare, GitFork } from "lucide-react";
import Link from "next/link";

// 🚀 SERVER-SIDE FETCHING
async function getGithubUser() {
  try {
    const res = await fetch("https://api.github.com/users/proximaditya", { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) { return null; }
}

async function getGithubRepos() {
  try {
    const res = await fetch("https://api.github.com/users/proximaditya/repos?per_page=100&sort=updated", { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) { return []; }
}

async function getGithubCommits() {
  try {
    const res = await fetch("https://api.github.com/users/proximaditya/events/public", { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const events = await res.json();
    const pushEvents = events.filter((e: any) => e.type === "PushEvent");
    const commits = pushEvents.flatMap((p: any) => 
      p.payload.commits.map((c: any) => ({
        repo: p.repo.name,
        message: c.message,
        sha: c.sha
      }))
    );
    return commits.slice(0, 5); // Latest 5 commits
  } catch (error) { return []; }
}

async function getLeetCodeStats() {
  try {
    // 🔥 Using the Alfa API you provided!
    const res = await fetch("https://alfa-leetcode-api.onrender.com/proximaditya/solved", { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) { return null; }
}

export default async function Dashboard() {
  const [githubUser, githubRepos, githubCommits, leetcodeData] = await Promise.all([
    getGithubUser(),
    getGithubRepos(),
    getGithubCommits(),
    getLeetCodeStats(),
  ]);

  // --- DYNAMIC GITHUB CALCULATIONS ---
  const rawLanguages = githubRepos?.map((repo: any) => repo.language).filter(Boolean) || [];
  // Calculate the most used language for an award
  const languageCounts = rawLanguages.reduce((acc: any, lang: string) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});
  const topLanguage = Object.keys(languageCounts).sort((a, b) => languageCounts[b] - languageCounts[a])[0] || "N/A";
  const uniqueLanguages = Array.from(new Set(rawLanguages)).slice(0, 4);

  const totalStars = githubRepos?.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0) || 0;
  
  // Find the repo with the most stars
  const topRepo = githubRepos?.length > 0 
    ? [...githubRepos].sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)[0] 
    : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-zinc-500 hover:text-orange-400 transition-colors text-sm mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Metrics.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Real-time data fetched directly from my developer profiles. Pure facts, zero fluff.
          </p>
        </div>

        {/* --- ROW 1: CORE STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* GitHub Overview Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                {/* 🚀 FIXED: Replaced Lucide Github with raw SVG */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Live
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold text-white mb-1">{githubUser?.public_repos || "0"}</p>
                <p className="text-zinc-400 font-medium text-sm">Public Repositories</p>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-zinc-500 text-xs mb-2">TOP LANGUAGES</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueLanguages.length > 0 ? uniqueLanguages.map((lang: any, i: number) => (
                    <span key={i} className="text-xs font-mono text-orange-300 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                      {lang}
                    </span>
                  )) : (
                    <span className="text-xs text-zinc-500">API Rate Limited</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Solved Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                <Code2 className="w-6 h-6 text-amber-400" />
              </div>
              <a href="https://leetcode.com/u/proximaditya/" target="_blank" rel="noreferrer" className="text-xs font-mono text-green-400 bg-green-400/10 hover:bg-green-400/20 px-2 py-1 rounded-full flex items-center gap-2 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Up to date
              </a>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">{leetcodeData?.solvedProblem || "0"}</p>
              <p className="text-zinc-400 font-medium text-sm mb-4">LeetCode Problems Solved</p>
              
              {/* LeetCode Progress Breakdown */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10 flex-wrap">
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">Easy: {leetcodeData?.easySolved || 0}</span>
                <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">Med: {leetcodeData?.mediumSolved || 0}</span>
                <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-md">Hard: {leetcodeData?.hardSolved || 0}</span>
              </div>
            </div>
          </div>

          {/* GitHub Trophies & Awards Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <Trophy className="w-6 h-6 text-orange-400 drop-shadow-md" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Open Source Awards</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-zinc-300">Earned <strong className="text-white">{totalStars}</strong> Stars across repos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-zinc-300">Top Language: <strong className="text-white">{topLanguage}</strong></span>
                </div>
                {topRepo && (
                  <div className="flex items-center gap-3">
                    <GitFork className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-zinc-300">Top Repo: <strong className="text-white truncate max-w-[150px] inline-block align-bottom">{topRepo.name}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* --- ROW 2: COMMITS & GRAPH --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Recent Commits Feed */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col h-[350px]">
            <div className="flex items-center gap-3 mb-6">
              <GitCommit className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-bold text-white">Live Commits</h3>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {githubCommits.length > 0 ? (
                githubCommits.map((commit: any, idx: number) => (
                  <div key={idx} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-16px] before:w-[2px] before:bg-white/10 last:before:hidden">
                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-zinc-900 border border-orange-500/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                    <p className="text-sm text-white font-medium truncate" title={commit.message}>{commit.message}</p>
                    <a href={`https://github.com/${commit.repo}`} target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors truncate block">
                      {commit.repo}
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-zinc-500">API rate limited or no recent pushes.</p>
                  <a href="https://github.com/proximaditya" target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:underline mt-2 inline-block">View directly on GitHub</a>
                </div>
              )}
            </div>
          </div>

          {/* GITHUB CONTRIBUTION GRAPH */}
          <div className="lg:col-span-2 w-full p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 h-[350px] flex flex-col justify-center overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Annual Contributions</h3>
              <span className="text-xs text-zinc-500">Updated Daily</span>
            </div>
            <div className="w-full overflow-x-auto custom-scrollbar pb-2">
              <img 
                src="https://ghchart.rshah.org/f97316/proximaditya" 
                alt="Aditya's Github Contribution Chart" 
                className="min-w-[700px] w-full h-auto opacity-90 hue-rotate-[5deg]"
              />
            </div>
          </div>
          
        </div>

        {/* --- THE EASTER EGG HINT --- */}
        <div className="flex items-center justify-center py-6 mt-8 border-t border-white/5">
          <div className="flex items-center gap-3 text-zinc-600 font-mono text-xs md:text-sm bg-black/50 px-4 py-2 rounded-lg border border-zinc-900">
            <TerminalSquare className="w-4 h-4 animate-pulse text-zinc-500" />
            <span>Looking for hidden access? Check the command icon in the top navbar...</span>
          </div>
        </div>

      </div>
    </main>
  );
}