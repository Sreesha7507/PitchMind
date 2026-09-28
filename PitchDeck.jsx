import React, { useRef } from 'react'
import { Download, RefreshCw, Copy, Check } from 'lucide-react'
import SlideCard from './SlideCard'
import MemoryPanel from './MemoryPanel'
import { exportToPDF } from '../utils/pdfExport'
import { saveFeedback } from '../utils/api'

export default function PitchDeck({
  deck,
  memoriesUsed,
  memoriesCount,
  isImproved,
  hindsightActive,
  sessionId,
  documentation,
  onRegenerate,
  isLoading,
}) {
  const deckRef = useRef()
  const [copied, setCopied] = React.useState(false)

  if (!deck?.slides?.length) return null

  const slides = deck.slides
  const companyName = slides[0]?.title || 'Startup'

  const handleExportPDF = async () => {
    try {
      await exportToPDF(slides, companyName)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('PDF export failed. Please check the console.')
    }
  }

  const handleCopyJSON = async () => {
    await navigator.clipboard.writeText(JSON.stringify(deck, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSlideFeedback = async (feedback, slideNumber) => {
    if (!sessionId) return
    try {
      await saveFeedback({ sessionId, feedback, slideNumber })
    } catch {
      console.warn('Feedback save failed')
    }
  }

  const handleRegenerateWithFeedback = (extraFeedback) => {
    onRegenerate?.({ feedback: extraFeedback })
  }

  return (
    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{companyName} — Pitch Deck</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {slides.length} slides generated
            {isImproved && (
              <span className="ml-2 text-purple-400">· enhanced with Hindsight memory</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyJSON}
            className="btn-secondary flex items-center gap-2 text-sm py-2 px-4"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button
            onClick={handleExportPDF}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Memory panel */}
      <MemoryPanel
        memoriesUsed={memoriesUsed}
        memoriesCount={memoriesCount}
        isImproved={isImproved}
        hindsightActive={hindsightActive}
        sessionId={sessionId}
        onRegenerateWithFeedback={handleRegenerateWithFeedback}
        documentation={documentation}
      />

      {/* Slides */}
      <div ref={deckRef} className="space-y-4">
        {slides.map((slide, i) => (
          <SlideCard
            key={slide.slide_number || i}
            slide={slide}
            index={i}
            onFeedback={handleSlideFeedback}
          />
        ))}
      </div>

      {/* Bottom regenerate */}
      <div className="pt-4 border-t border-white/10 flex justify-center">
        <button
          onClick={() => onRegenerate?.({})}
          disabled={isLoading}
          className="btn-secondary flex items-center gap-2"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Regenerate with Updated Memory
        </button>
      </div>
    </section>
  )
}
