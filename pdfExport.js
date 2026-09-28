import jsPDF from 'jspdf'

// Per-slide colour palette [background RGB, accent RGB]
const PALETTES = [
  { bg: [15, 23, 42],  accent: [99, 102, 241]  },  // 1 Cover      – indigo
  { bg: [20, 14, 38],  accent: [168, 85, 247]  },  // 2 Problem    – purple
  { bg: [10, 29, 47],  accent: [59, 130, 246]  },  // 3 Solution   – blue
  { bg: [10, 36, 38],  accent: [16, 185, 129]  },  // 4 Product    – emerald
  { bg: [30, 20, 10],  accent: [245, 158, 11]  },  // 5 Market     – amber
  { bg: [10, 38, 28],  accent: [52, 211, 153]  },  // 6 Advantage  – teal
  { bg: [38, 22, 10],  accent: [251, 146, 60]  },  // 7 Business   – orange
  { bg: [13, 28, 46],  accent: [139, 92, 246]  },  // 8 Roadmap    – violet
]

/**
 * Export the pitch deck to a landscape A4 PDF.
 * @param {Array}  slides  – array of slide objects from the API
 * @param {string} title   – company name used as filename prefix
 */
export async function exportToPDF(slides, title = 'PitchDeck') {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const W   = pdf.internal.pageSize.getWidth()   // ≈ 841 pt
  const H   = pdf.internal.pageSize.getHeight()  // ≈ 595 pt

  slides.forEach((slide, idx) => {
    if (idx > 0) pdf.addPage()

    const { bg, accent } = PALETTES[idx] || PALETTES[0]
    const [br, bg2, bb]  = bg
    const [ar, ag, ab]   = accent

    // ── Background ──────────────────────────────────────────────────────────
    pdf.setFillColor(br, bg2, bb)
    pdf.rect(0, 0, W, H, 'F')

    // ── Left accent bar ──────────────────────────────────────────────────────
    pdf.setFillColor(ar, ag, ab)
    pdf.rect(0, 0, 6, H, 'F')

    // ── Slide-number badge ───────────────────────────────────────────────────
    pdf.setFillColor(ar, ag, ab)
    pdf.roundedRect(28, 18, 34, 22, 4, 4, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(255, 255, 255)
    const numStr = String(idx + 1).padStart(2, '0')
    pdf.text(numStr, 45, 33, { align: 'center' })

    // ── Watermark ────────────────────────────────────────────────────────────
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(80, 85, 110)
    pdf.text('PITCHMIND', W - 28, 28, { align: 'right' })

    // ── Title ────────────────────────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(26)
    pdf.setTextColor(ar, ag, ab)
    const titleLines = pdf.splitTextToSize(slide.title || 'Untitled', W - 80)
    pdf.text(titleLines, 38, 78)

    // ── Subtitle ─────────────────────────────────────────────────────────────
    let contentY = 78 + titleLines.length * 28
    if (slide.subtitle) {
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.setTextColor(170, 175, 195)
      pdf.text(slide.subtitle, 38, contentY)
      contentY += 16
    }

    // ── Divider ──────────────────────────────────────────────────────────────
    contentY += 8
    pdf.setDrawColor(ar, ag, ab)
    pdf.setLineWidth(0.8)
    pdf.line(38, contentY, W - 38, contentY)
    contentY += 20

    // ── Bullet points ─────────────────────────────────────────────────────────
    const bullets = slide.bullet_points || []
    bullets.forEach((point) => {
      const text  = typeof point === 'string' ? point : String(point)
      const lines = pdf.splitTextToSize(text, W - 110)

      // Dot
      pdf.setFillColor(ar, ag, ab)
      pdf.circle(46, contentY - 3.5, 2.5, 'F')

      // Text
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(11)
      pdf.setTextColor(215, 220, 235)
      pdf.text(lines, 58, contentY)
      contentY += lines.length * 15 + 8

      if (contentY > H - 80) return  // guard against overflow
    })

    // ── Key metric box (bottom-right) ─────────────────────────────────────────
    if (slide.key_metric) {
      const metric   = String(slide.key_metric)
      const boxW     = Math.min(260, metric.length * 6.5 + 50)
      const boxX     = W - boxW - 36
      const boxY     = H - 78
      const boxH     = 52

      // Filled rectangle using solid dark-tinted accent (no alpha arg needed)
      pdf.setFillColor(
        Math.round(br + (ar - br) * 0.25),
        Math.round(bg2 + (ag - bg2) * 0.25),
        Math.round(bb + (ab - bb) * 0.25),
      )
      pdf.roundedRect(boxX, boxY, boxW, boxH, 6, 6, 'F')

      // Border
      pdf.setDrawColor(ar, ag, ab)
      pdf.setLineWidth(0.8)
      pdf.roundedRect(boxX, boxY, boxW, boxH, 6, 6, 'S')

      // Label
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(8)
      pdf.setTextColor(ar, ag, ab)
      pdf.text('KEY METRIC', boxX + boxW / 2, boxY + 16, { align: 'center' })

      // Value
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(220, 225, 240)
      const mLines = pdf.splitTextToSize(metric, boxW - 20)
      pdf.text(mLines, boxX + boxW / 2, boxY + 32, { align: 'center' })
    }

    // ── Footer ────────────────────────────────────────────────────────────────
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(70, 80, 100)
    pdf.text(`${idx + 1} / ${slides.length}`, W / 2, H - 12, { align: 'center' })
  })

  const safe = title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
  pdf.save(`${safe}_pitch_deck.pdf`)
}
