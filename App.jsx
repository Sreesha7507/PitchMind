import React, { useState, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import DocInput from './components/DocInput'
import PitchDeck from './components/PitchDeck'
import StatusBar from './components/StatusBar'
import { generatePitch, getDemoReadme } from './utils/api'

export default function App() {
  const [deck, setDeck] = useState(null)
  const [memoriesUsed, setMemoriesUsed] = useState([])
  const [memoriesCount, setMemoriesCount] = useState(0)
  const [isImproved, setIsImproved] = useState(false)
  const [hindsightActive, setHindsightActive] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [documentation, setDocumentation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const deckRef = useRef(null)

  const handleGenerate = async ({ documentation: doc, feedback, preferences }) => {
    if (!doc?.trim()) return

    setDocumentation(doc)
    setIsLoading(true)
    setStatus({ type: 'loading', message: 'Retrieving Hindsight memories & generating pitch deck with Groq…' })

    try {
      const res = await generatePitch({
        documentation: doc,
        sessionId,
        feedback,
        preferences,
      })

      const data = res.data
      setDeck(data.deck)
      setMemoriesUsed(data.memories_used || [])
      setMemoriesCount(data.memories_count || 0)
      setIsImproved(data.is_improved || false)
      setHindsightActive(data.hindsight_active || false)
      setSessionId(data.session_id)

      setStatus({
        type: 'success',
        message: data.is_improved
          ? `✓ Pitch deck generated using ${data.memories_count} Hindsight memories — this is an improved version!`
          : '✓ Pitch deck generated! Add feedback below and regenerate to see memory-powered improvement.',
      })

      // Scroll to deck
      setTimeout(() => deckRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Unknown error'
      setStatus({ type: 'error', message: `Generation failed: ${msg}` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async ({ feedback: extraFeedback } = {}) => {
    if (!documentation?.trim()) return

    setIsLoading(true)
    setStatus({ type: 'loading', message: 'Retrieving updated Hindsight memories & regenerating…' })

    try {
      const res = await generatePitch({
        documentation,
        sessionId,
        feedback: extraFeedback,
        preferences: null,
      })

      const data = res.data
      setDeck(data.deck)
      setMemoriesUsed(data.memories_used || [])
      setMemoriesCount(data.memories_count || 0)
      setIsImproved(data.is_improved || false)
      setHindsightActive(data.hindsight_active || false)
      setSessionId(data.session_id)

      setStatus({
        type: 'success',
        message: `✓ Regenerated with ${data.memories_count} Hindsight memories. ${
          data.is_improved ? 'This pitch is memory-improved!' : ''
        }`,
      })
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Unknown error'
      setStatus({ type: 'error', message: `Regeneration failed: ${msg}` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryDemo = async () => {
    try {
      setStatus({ type: 'loading', message: 'Loading demo project…' })
      const res = await getDemoReadme()
      const doc = res.data.content
      setStatus(null)
      await handleGenerate({ documentation: doc, feedback: '', preferences: '' })
    } catch {
      setStatus({ type: 'error', message: 'Could not load demo. Is the backend server running on port 8000?' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <Hero onTryDemo={handleTryDemo} />
        <HowItWorks />
        <DocInput onGenerate={handleGenerate} isLoading={isLoading} />
        <StatusBar status={status} />
        <div ref={deckRef}>
          {deck && (
            <PitchDeck
              deck={deck}
              memoriesUsed={memoriesUsed}
              memoriesCount={memoriesCount}
              isImproved={isImproved}
              hindsightActive={hindsightActive}
              sessionId={sessionId}
              documentation={documentation}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>
          PitchMind · Built for Hackathon ·{' '}
          <a href="https://hindsight.vectorize.io" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400">
            Hindsight
          </a>{' '}
          ·{' '}
          <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-400">
            Groq
          </a>
        </p>
      </footer>
    </div>
  )
}
