# PitchMind — AI Pitch Deck Generator

> Convert your README.md or technical documentation into an investor-ready 8-slide pitch deck,  
> powered by **Groq** (LLM) + **Hindsight** (persistent memory).

---

## Project Structure

```
pitchmind/
├── backend/
│   ├── main.py               ← FastAPI app (Groq + Hindsight)
│   ├── requirements.txt
│   └── .env                  ← ⚠ Add your API keys here
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── DocInput.jsx      ← upload / paste / demo
│   │   │   ├── SlideCard.jsx     ← individual slide with feedback
│   │   │   ├── PitchDeck.jsx     ← full deck view + PDF export
│   │   │   ├── MemoryPanel.jsx   ← Hindsight memory display
│   │   │   └── StatusBar.jsx
│   │   └── utils/
│   │       ├── api.js            ← axios wrappers
│   │       └── pdfExport.js      ← jsPDF export
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── start-backend.bat          ← double-click to start backend
├── start-frontend.bat         ← double-click to start frontend
└── start-all.bat              ← starts both in separate windows
```

---

## Quick Start

### Step 1 — Add API Keys

Edit **`backend/.env`**:

```env
GROQ_API_KEY=gsk_...              # https://console.groq.com/keys
HINDSIGHT_API_KEY=...             # https://app.hindsight.vectorize.io
HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io
```

- Groq key: free at [console.groq.com](https://console.groq.com)
- Hindsight key: free at [app.hindsight.vectorize.io](https://app.hindsight.vectorize.io)

> The app works without a Hindsight key — memory features show "Demo Mode" but generation still works via Groq.

---

### Step 2 — Start Servers

**Option A — Double-click `start-all.bat`** (opens both in separate CMD windows)

**Option B — Manual (two CMD windows, not PowerShell):**

```cmd
:: Window 1 — Backend
cd pitchmind\backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

```cmd
:: Window 2 — Frontend
cd pitchmind\frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Features

| Feature | Details |
|---|---|
| Upload README | Drag-drop `.md` / `.txt` or paste text |
| Try Demo | One-click EcoTrack sample project |
| 8-slide deck | Cover · Problem · Solution · Product · Market · Advantage · Business · Roadmap |
| Hindsight memory | Stores project context + user preferences across sessions |
| Before / After | Memory panel shows which memories improved the pitch |
| Per-slide feedback | Type feedback per slide — saved directly to Hindsight |
| Regenerate | Re-generates using all stored memories for a smarter pitch |
| PDF Export | Styled multi-page PDF downloaded to your browser |
| Copy JSON | Raw deck JSON to clipboard |

---

## Hindsight Memory Flow

```
1st generation  →  no memories yet  →  generic pitch
                   Hindsight stores: project summary, company name

2nd generation  →  recalls: project context
                   Groq uses memories as context  →  improved pitch
                   Hindsight stores: new feedback, style preferences

3rd generation  →  recalls: project + preferences + past feedback
                   Groq: best pitch yet  →  "Memory-Improved" badge shown
```

---

## Tech Stack

- **Frontend**: React 18 + Vite 5 + Tailwind CSS 3
- **Backend**: Python FastAPI + uvicorn
- **LLM**: Groq (`llama3-70b-8192`)
- **Memory**: Hindsight Cloud (`hindsight-client`)
- **PDF**: jsPDF
