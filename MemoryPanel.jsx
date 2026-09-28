import React, { useState } from 'react'
import { Brain, ChevronDown, ChevronUp, Sparkles, Zap, RefreshCw } from 'lucide-react'
import { saveFeedback } from '../utils/api'

const MEMORY_ICONS = {
  observation: '🔍',
  world: '🌍',
  experience: '💡',
  opinion: '💭',
}

export default function MemoryPanel({
  memoriesUsed = [],
  memoriesCount = 0,
  isImproved = false,
  hindsightActive = false,
  sessionId,
  onRegenerateWithFeedback,
  documentation,
}) {
  const [expanded, setExpanded] = useState(true)
  const [quickFeedback, setQuickFeedback] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  const handleSaveFeedback = async () => {
    if (!quickFeedback.trim() || !sessionId) return
    setSaving(true)
    try {
      await saveFeedback({ sessionId, feedback: quickFeedback })
      setSavedMsg('✓ Feedback saved to Hindsight memory')
      setTimeout(() => setSavedMsg(''), 3000)
    } catch {
      setSavedMsg('Failed to save feedback')
    }
    setSaving(false)
  }

  const handleRegenerate = () => {
    if (onRegenerateWithFeedback) {
      onRegenerateWithFeedback(quickFeedback)
      setQuickFeedback('')
    }
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Hindsight Memory
              {hindsightActive ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                  Demo Mode
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {memoriesCount > 0
                ? `${memoriesCount} memor${memoriesCount === 1 ? 'y' : 'ies'} used to improve this pitch`
                : 'No prior memories – first generation'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isImproved && (
            <span className="tag-improved">
              <Sparkles className="w-3 h-3" />
              Memory-Improved
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/10 p-5 space-y-5 animate-fade-in">
          {/* Before/After explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Without Memory</span>
              </div>
              <p className="text-sm text-slate-500">
                Generic pitch from documentation alone. No awareness of previous versions, user preferences, or feedback.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">With Hindsight Memory</span>
              </div>
              <p className="text-sm text-purple-200/70">
                {isImproved
                  ? `Personalized pitch using ${memoriesCount} stored memories about this project and your preferences.`
                  : 'On next generation, this pitch will be improved using stored memories about your project.'}
              </p>
            </div>
          </div>

          {/* Memories used */}
          {memoriesUsed.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                Memories Retrieved &amp; Used
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {memoriesUsed.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">
                      {MEMORY_ICONS[m.type] || '🧠'}
                    </span>
                    <span className="text-sm text-slate-300 leading-relaxed">{m.text}</span>
                    {m.type && (
                      <span className="ml-auto flex-shrink-0 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs">
                        {m.type}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 rounded-xl bg-white/5 border border-white/10 text-center">
              <Brain className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">
                No memories retrieved yet. Generate your first pitch to start building memory.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                After generation, Hindsight will store project context &amp; your feedback for smarter future pitches.
              </p>
            </div>
          )}

          {/* Quick feedback + regenerate */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-sm font-semibold text-slate-300">
              Leave Feedback <span className="text-purple-400 font-normal">(stored in Hindsight)</span>
            </h4>
            <textarea
              className="input-field h-16 text-sm"
              placeholder="e.g. The problem slide needs more stats. Use a more technical tone for slide 4."
              value={quickFeedback}
              onChange={(e) => setQuickFeedback(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveFeedback}
                disabled={!quickFeedback.trim() || saving || !sessionId}
                className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
              >
                {saving ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Brain className="w-3.5 h-3.5" />
                )}
                Save to Memory
              </button>
              <button
                onClick={handleRegenerate}
                disabled={!documentation || !sessionId}
                className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate with Memory
              </button>
            </div>
            {savedMsg && (
              <p className="text-xs text-emerald-400 animate-fade-in">{savedMsg}</p>
            )}
            {!hindsightActive && (
              <p className="text-xs text-amber-400/70">
                ⚠️ Hindsight API key not configured – memory is simulated for demo purposes.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
