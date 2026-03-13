// src/components/ShareCard.tsx
import { useRef, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'
import { getOverallScore, getRoleWeightedScore, scoreLabels } from '../utils/scoring'
import type { Scores } from '../types'

function getLetterGrade(score: number): string {
  if (score >= 90) return 'A+'
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  if (score >= 55) return 'C'
  return score >= 40 ? 'D' : 'F'
}

export function ShareCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scores, role, xp, achievements, crisisHistory, hiddenObjectiveStatus } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)
  const overallScore = getOverallScore(scores)
  const roleScore = role ? getRoleWeightedScore(scores, role) : overallScore

  const XP_LEVELS = [
    { level: 1, title: 'Field Observer', threshold: 0 },
    { level: 2, title: 'Health Strategist', threshold: 500 },
    { level: 3, title: 'Policy Architect', threshold: 1500 },
    { level: 4, title: 'Global Health Leader', threshold: 3000 },
  ]
  let levelTitle = 'Field Observer'
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].threshold) { levelTitle = XP_LEVELS[i].title; break }
  }

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 1200, H = 630
    canvas.width = W
    canvas.height = H

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#0c0d1e')
    bg.addColorStop(0.5, '#1a0a2e')
    bg.addColorStop(1, '#0a0b1a')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Grid overlay
    ctx.strokeStyle = 'rgba(123, 45, 142, 0.04)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

    // Header
    ctx.fillStyle = 'rgba(123, 45, 142, 0.6)'
    ctx.font = '600 11px system-ui'
    ctx.letterSpacing = '3px'
    ctx.fillText('MISSION DEBRIEF', 40, 50)
    ctx.letterSpacing = '0px'

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.font = '800 28px system-ui'
    ctx.fillText('Innovation Lab', 40, 85)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.font = '400 13px system-ui'
    ctx.fillText('Warwick Medical School', 40, 108)

    // Grade
    ctx.fillStyle = '#7B2D8E'
    ctx.font = '900 64px system-ui'
    ctx.textAlign = 'right'
    ctx.fillText(getLetterGrade(roleScore), W - 40, 90)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.font = '400 12px system-ui'
    ctx.fillText('Overall Grade', W - 40, 110)
    ctx.textAlign = 'left'

    // Role
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.font = '700 20px system-ui'
    ctx.fillText(`${currentRole?.icon || ''} ${currentRole?.title || 'Unknown'}`, 40, 170)
    ctx.fillStyle = 'rgba(123, 45, 142, 0.7)'
    ctx.font = '400 14px system-ui'
    ctx.fillText(`${levelTitle} — ${xp} XP`, 40, 195)

    // Scores
    const scoreEntries = Object.entries(scores) as [keyof Scores, number][]
    const startY = 240
    scoreEntries.forEach(([key, value], i) => {
      const y = startY + i * 36
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.font = '400 13px system-ui'
      ctx.fillText(scoreLabels[key], 40, y)

      // Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.fillRect(200, y - 10, 300, 14)
      ctx.fillStyle = '#7B2D8E'
      ctx.fillRect(200, y - 10, value * 3, 14)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.font = '700 13px system-ui'
      ctx.fillText(String(value), 510, y)
    })

    // Stats
    const statsY = 480
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
    ctx.fillRect(40, statsY, 160, 60)
    ctx.fillRect(220, statsY, 160, 60)
    ctx.fillRect(400, statsY, 160, 60)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#7B2D8E'
    ctx.font = '800 24px system-ui'
    ctx.fillText(String(crisisHistory.length), 120, statsY + 28)
    ctx.fillText(String(achievements.length), 300, statsY + 28)
    ctx.fillText(`${hiddenObjectiveStatus.filter((o) => o.completed).length}/3`, 480, statsY + 28)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.font = '400 10px system-ui'
    ctx.fillText('Crises Handled', 120, statsY + 48)
    ctx.fillText('Achievements', 300, statsY + 48)
    ctx.fillText('Objectives Met', 480, statsY + 48)
    ctx.textAlign = 'left'

    // Footer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.fillRect(40, H - 40, W - 80, 1)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.font = '400 10px system-ui'
    ctx.fillText('olatechie.github.io/innovation-lab', 40, H - 18)
    ctx.textAlign = 'right'
    ctx.fillText('IM93Q / IM9M1', W - 40, H - 18)
    ctx.textAlign = 'left'
  }, [scores, role, xp, achievements, crisisHistory, hiddenObjectiveStatus, currentRole, roleScore, levelTitle])

  const handleDownload = () => {
    drawCard()
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `innovation-lab-${currentRole?.shortTitle || 'result'}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  const handleCopy = async () => {
    drawCard()
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve))
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      }
    } catch {
      // Clipboard API not available — fallback silently
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
        <button className="btn btn-primary btn-sm" onClick={handleDownload}>
          Download Results Card
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  )
}
