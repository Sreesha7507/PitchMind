import React from 'react'
import { Zap, Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Pitch<span className="gradient-text">Mind</span>
          </span>
        </div>

        {/* Center badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">Powered by Hindsight Memory</span>
        </div>

        {/* Right links */}
        <nav className="flex items-center gap-4 text-sm text-slate-400">
          <a
            href="https://hindsight.vectorize.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Hindsight
          </a>
          <a
            href="https://console.groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Groq
          </a>
        </nav>
      </div>
    </header>
  )
}
