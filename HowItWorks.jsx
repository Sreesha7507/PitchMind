import React from 'react'
import { Upload, Brain, Sparkles, TrendingUp } from 'lucide-react'

const STEPS = [
  {
    icon: Upload,
    color: 'from-indigo-500 to-blue-600',
    title: 'Upload Docs',
    description: 'Drop your README.md or paste any technical documentation.',
  },
  {
    icon: Brain,
    color: 'from-purple-500 to-pink-600',
    title: 'Hindsight Recalls',
    description: 'Hindsight fetches memories from previous sessions — project context, user preferences, and feedback.',
  },
  {
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
    title: 'Groq Generates',
    description: 'Groq LLM crafts 8 investor-ready slides, informed by your memories for a smarter pitch.',
  },
  {
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
    title: 'Memory Improves',
    description: 'Your feedback is stored back in Hindsight. Every regeneration gets smarter — demonstrable before/after improvement.',
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-10">How PitchMind Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="glass-card p-5 flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-600 font-mono">0{i + 1}</span>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
