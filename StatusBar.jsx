import React from 'react'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function StatusBar({ status }) {
  if (!status) return null

  const config = {
    loading: {
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
    },
    success: {
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    error: {
      icon: <XCircle className="w-4 h-4" />,
      color: 'bg-red-500/10 border-red-500/30 text-red-300',
    },
    warning: {
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
  }

  const c = config[status.type] || config.warning

  return (
    <div className="max-w-4xl mx-auto px-6 mb-4 animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${c.color}`}>
        {c.icon}
        <span className="text-sm font-medium">{status.message}</span>
      </div>
    </div>
  )
}
