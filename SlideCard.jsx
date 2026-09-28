import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Star, MessageSquare, Check } from 'lucide-react'

const SLIDE_THEMES = [
  { gradient: 'from-indigo-600 to-violet-600', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', badge: 'bg-indigo-500/20 text-indigo-300', num: '01' },
  { gradient: 'from-red-500 to-rose-600', bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-300', num: '02' },
  { gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', badge: 'bg-emerald-500/20 text-emerald-300', num: '03' },
  { gradient: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-300', num: '04' },
  { gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-300', num: '05' },
  { gradient: 'from-teal-500 to-green-600', bg: 'bg-teal-500/10', border: 'border-teal-500/30', badge: 'bg-teal-500/20 text-teal-300', num: '06' },
  { gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', badge: 'bg-orange-500/20 text-orange-300', num: '07' },
  { gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-500/10', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-300', num: '08' },
]

const SLIDE_LABELS = [
  'Cover',
  'Problem',
  'Solution',
  'Product',
  'Market',
  'Advantage',
  'Business',
  'Roadmap',
]

export default function SlideCard({ slide, index, onFeedback }) {
  const [expanded, setExpanded] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const theme = SLIDE_THEMES[index] || SLIDE_THEMES[0]
  const label = SLIDE_LABELS[index] || `Slide ${index + 1}`

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) return
    onFeedback?.(feedbackText, slide.slide_number)
    setFeedbackSent(true)
    setTimeout(() => {
      setFeedbackSent(false)
      setFeedbackText('')
    }, 2500)
  }

  const bullets = slide.bullet_points || []

  return (
    <div className={`glass-card border ${theme.border} overflow-hidden animate-slide-up`}>
      {/* Colored top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${theme.gradient}`} />

      {/* Header */}
      <div
        className="flex items-start justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Slide number */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
            <span className="text-white text-xs font-bold">{theme.num}</span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Label + title */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${theme.badge}`}>
                {label}
              </span>
              {slide.key_metric && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 text-xs border border-yellow-500/20">
                  <Star className="w-3 h-3" />
                  {String(slide.key_metric).slice(0, 60)}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">{slide.title}</h3>
            {slide.subtitle && (
              <p className="text-sm text-slate-400 mt-0.5">{slide.subtitle}</p>
            )}
          </div>
        </div>

        <div className="ml-3 flex-shrink-0 text-slate-400">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 animate-fade-in">
          {/* Bullet points */}
          <ul className="space-y-2">
            {bullets.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-gradient-to-br ${theme.gradient}`} />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {typeof point === 'string' ? point : String(point)}
                </span>
              </li>
            ))}
          </ul>

          {/* Speaker notes toggle */}
          {slide.speaker_notes && (
            <div>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {showNotes ? 'Hide' : 'Show'} speaker notes
              </button>
              {showNotes && (
                <div className="mt-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 italic leading-relaxed animate-fade-in">
                  "{slide.speaker_notes}"
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          <div className="flex gap-2 pt-1 border-t border-white/10">
            <input
              type="text"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                         placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="Feedback for this slide (saved to memory)…"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFeedbackSubmit()}
            />
            <button
              onClick={handleFeedbackSubmit}
              disabled={!feedbackText.trim()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs
                         font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-all
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {feedbackSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Saved</span>
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
