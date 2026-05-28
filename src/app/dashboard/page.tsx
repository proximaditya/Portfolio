import { Code2, Users, Activity, Star } from "lucide-react";
import Link from "next/link";

// 🚀 SERVER-SIDE FETCHING

async function getGithubUser() {
  try {
    const res = await fetch("https://api.github.com/users/proximaditya", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// Fetch all repos to calculate languages and stars
async function getGithubRepos() {
  try {
    const res = await fetch("https://api.github.com/users/proximaditya/repos?per_page=100", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

async function getLeetCodeStats() {
  try {
    // Fixed: Using the correct username 'proximaditya'
    const res = await fetch("https://leetcode-stats-api.herokuapp.com/proximaditya", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Dashboard() {
  const [githubUser, githubRepos, leetcodeData] = await Promise.all([
    getGithubUser(),
    getGithubRepos(),
    getLeetCodeStats(),
  ]);

  // Extract unique languages used across your repos
  const rawLanguages = githubRepos?.map((repo: any) => repo.language).filter(Boolean) || [];
  const uniqueLanguages = Array.from(new Set(rawLanguages)).slice(0, 4); // Get top 4 languages
  const totalStars = githubRepos?.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0) || 0;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-zinc-500 hover:text-orange-400 transition-colors text-sm mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Metrics.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Real-time data fetched directly from my developer profiles. Numbers speak louder than words.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* GitHub Overview Card (Updated with Languages) */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between aspect-square hover:bg-white/10 transition-colors md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Live
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold text-white mb-1">{githubUser?.public_repos || "0"}</p>
                <p className="text-zinc-400 font-medium text-sm">Public Repositories</p>
              </div>
              
              {/* New: Top Languages Section */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-zinc-500 text-xs mb-2">TOP LANGUAGES DETECTED</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueLanguages.length > 0 ? uniqueLanguages.map((lang: any, i: number) => (
                    <span key={i} className="text-xs font-mono text-orange-300 bg-orange-500/10 px-2 py-1 rounded-md">
                      {lang}
                    </span>
                  )) : (
                    <span className="text-xs text-zinc-500">Fetching...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Solved Card (Updated Username) */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between aspect-square hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                <Code2 className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Live
              </span>
            </div>
            <div>
              <p className="text-5xl font-bold text-white mb-2">{leetcodeData?.totalSolved || "0"}</p>
              <p className="text-zinc-400 font-medium">LeetCode Solved</p>
              <div className="flex gap-2 mt-4">
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">Easy: {leetcodeData?.easySolved || 0}</span>
                <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">Med: {leetcodeData?.mediumSolved || 0}</span>
              </div>
            </div>
          </div>

          {/* GitHub Followers & Stars Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between aspect-square hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div>
              <p className="text-5xl font-bold text-white mb-2">{githubUser?.followers || "0"}</p>
              <p className="text-zinc-400 font-medium mb-4">GitHub Followers</p>
              
              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-zinc-300">{totalStars} Total Repository Stars</span>
              </div>
            </div>
          </div>

          {/* Wide Feature Card: Activity */}
          <div className="md:col-span-2 lg:col-span-3 p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Coding Activity</h3>
              </div>
              <p className="text-zinc-400 max-w-xl">
                My most recent focus has been building heavily scalable AI tools and backend monitoring systems, culminating in my participation in the ISRO Antariksh Hackathon.
              </p>
            </div>
            <a 
              href="https://github.com/proximaditya" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-colors whitespace-nowrap"
            >
              View GitHub Profile
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}