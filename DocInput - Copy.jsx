import React, { useRef, useState } from 'react'
import { Upload, FileText, X, Clipboard, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { getDemoReadme, uploadReadme } from '../utils/api'

export default function DocInput({ onGenerate, isLoading }) {
  const [documentation, setDocumentation] = useState('')
  const [filename, setFilename] = useState('')
  const [feedback, setFeedback] = useState('')
  const [preferences, setPreferences] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef()

  const handleFileUpload = async (file) => {
    if (!file) return
    setUploadError('')
    if (file.size > 500_000) {
      setUploadError('File too large (max 500KB)')
      return
    }
    try {
      const res = await uploadReadme(file)
      setDocumentation(res.data.content)
      setFilename(res.data.filename)
    } catch {
      setUploadError('Failed to read file. Try pasting the content instead.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  const handleDemoClick = async () => {
    try {
      const res = await getDemoReadme()
      setDocumentation(res.data.content)
      setFilename('EcoTrack_demo_README.md')
    } catch {
      setUploadError('Could not load demo. Is the backend running?')
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setDocumentation(text)
    } catch {
      setUploadError('Clipboard access denied. Please paste manually.')
    }
  }

  const handleSubmit = () => {
    if (!documentation.trim()) return
    onGenerate({ documentation, feedback, preferences })
  }

  const charCount = documentation.length

  return (
    <section id="upload-section" className="max-w-4xl mx-auto px-6 pb-10">
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Documentation</h2>
            <p className="text-slate-400 text-sm mt-1">README.md, technical docs, or any project description</p>
          </div>
          <button
            onClick={handleDemoClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30
                       text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Try Demo
          </button>
        </div>

        {/* Drop zone / File upload */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-5 mb-4 text-center transition-all cursor-pointer
            ${dragOver ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/20 hover:border-white/40 hover:bg-white/5'}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt,.rst,.adoc"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">
            Drop your <span className="text-white font-medium">README.md</span> here, or click to browse
          </p>
          <p className="text-slate-600 text-xs mt-1">.md · .txt · .rst · .adoc · max 500KB</p>
        </div>

        {/* Action row */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePaste}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                       text-slate-300 text-sm hover:bg-white/10 transition-all"
          >
            <Clipboard className="w-4 h-4" />
            Paste from clipboard
          </button>
          {filename && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
              <FileText className="w-4 h-4" />
              <span className="max-w-[180px] truncate">{filename}</span>
              <button onClick={() => { setDocumentation(''); setFilename('') }}>
                <X className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          className="input-field h-52 font-mono text-sm"
          placeholder="Paste your README.md or project documentation here…&#10;&#10;Tip: Use the 'Try Demo' button to see a sample EcoTrack project deck."
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
        />
        <div className="flex justify-end mt-1 mb-4">
          <span className={`text-xs ${charCount > 0 ? 'text-slate-500' : 'text-slate-700'}`}>
            {charCount.toLocaleString()} characters
          </span>
        </div>

        {/* Advanced options toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-4"
        >
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showAdvanced ? 'Hide' : 'Show'} preferences & feedback (Hindsight memory context)
        </button>

        {showAdvanced && (
          <div className="space-y-4 mb-6 animate-fade-in">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Feedback on previous pitch <span className="text-purple-400">(stored in Hindsight)</span>
              </label>
              <textarea
                className="input-field h-20 text-sm"
                placeholder="e.g. The problem slide needed more market data. Make the solution simpler."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Style preferences <span className="text-purple-400">(stored in Hindsight)</span>
              </label>
              <textarea
                className="input-field h-20 text-sm"
                placeholder="e.g. Use bullet points only. Keep tone professional. Highlight TAM with a number."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>
          </div>
        )}

        {uploadError && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {uploadError}
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleSubmit}
          disabled={!documentation.trim() || isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating pitch deck…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Pitch Deck
            </>
          )}
        </button>
      </div>
    </section>
  )
}
