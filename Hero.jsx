import React from 'react'
import { Sparkles, ArrowDown } from 'lucide-react'

export default function Hero({ onTryDemo }) {
  return (
    <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-600/10 blur-3xl rounded-full" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Hackathon Build · Hindsight Memory Integration</span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1] animate-slide-up">
        README → <span className="gradient-text">Investor Deck</span>
        <br />
        in 30 seconds
      </h1>

      {/* Sub-headline */}
      <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10">
        Paste your README or technical docs. PitchMind uses <strong className="text-white">Groq</strong> to generate a
        polished 8-slide pitch deck and <strong className="text-white">Hindsight</strong> to remember
        your project details and preferences — so every regeneration is smarter than the last.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onTryDemo}
          className="btn-primary flex items-center gap-2 text-base"
        >
          <Sparkles className="w-4 h-4" />
          Try Demo
        </button>
        <a
          href="#upload-section"
          className="btn-secondary flex items-center gap-2 text-base"
        >
          Upload Your README
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>

      {/* Feature pills */}
      <div className="mt-14 flex flex-wrap justify-center gap-3 text-xs text-slate-500">
        {[
          '8 Investor-Ready Slides',
          'Hindsight Memory',
          'Before / After Improvement',
          'PDF Export',
          'Groq LLM',
          'User Feedback Loop',
        ].map((f) => (
          <span key={f} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            {f}
          </span>
        ))}
      </div>
    </section>
  )
}
