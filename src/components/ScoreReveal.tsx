// src/components/ScoreReveal.tsx
import { useState, useEffect } from 'react'
import type { Scores } from '../types'
import { scoreLabels, scoreColors } from '../utils/scoring'

interface ScoreRevealProps {
  effects: Partial<Scores>
  currentScores: Scores
  previousScores: Scores
  narrativeFlash: string
  onComplete: () => void
}

export function ScoreReveal({ effects, currentScores, previousScores, narrativeFlash, onComplete }: ScoreRevealProps) {
  const [phase, setPhase] = useState<'title' | 'primary' | 'narrative' | 'bars'>('title')
  const [narrativeText, setNarrativeText] = useState('')

  // Find the primary (largest magnitude) effect
  const sortedEffects = Object.entries(effects)
    .filter(([, v]) => v !== undefined && v !== 0)
    .sort((a, b) => Math.abs(b[1] as number) - Math.abs(a[1] as number))
  const primaryKey = sortedEffects[0]?.[0] as keyof Scores | undefined
  const primaryValue = sortedEffects[0]?.[1] as number | undefined

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase('primary'), 500))
    timers.push(setTimeout(() => setPhase('narrative'), 1500))
    timers.push(setTimeout(() => setPhase('bars'), 3000))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Typewriter effect for narrative
  useEffect(() => {
    if (phase !== 'narrative' && phase !== 'bars') return
    if (narrativeText.length >= narrativeFlash.length) return
    const timer = setTimeout(() => {
      setNarrativeText(narrativeFlash.slice(0, narrativeText.length + 2))
    }, 20)
    return () => clearTimeout(timer)
  }, [phase, narrativeText, narrativeFlash])

  return (
    <div className="score-reveal-overlay" onClick={onComplete}>
      <div className="score-reveal-card" onClick={(e) => e.stopPropagation()}>
        <div className="score-reveal-label" style={{ opacity: phase !== 'title' ? 0.6 : 1 }}>
          IMPACT REPORT
        </div>

        {primaryKey && primaryValue !== undefined && (phase === 'primary' || phase === 'narrative' || phase === 'bars') && (
          <div className="score-reveal-primary animate-fade-in-up">
            <span style={{ color: primaryValue > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
              {primaryValue > 0 ? '+' : ''}{primaryValue} {scoreLabels[primaryKey]}
            </span>
          </div>
        )}

        {(phase === 'narrative' || phase === 'bars') && (
          <p className="score-reveal-narrative animate-fade-in">
            {narrativeText}
            {narrativeText.length < narrativeFlash.length && <span className="typing-cursor">|</span>}
          </p>
        )}

        {phase === 'bars' && (
          <div className="score-reveal-bars animate-fade-in-up">
            {(Object.entries(currentScores) as [keyof Scores, number][]).map(([key, value]) => {
              const prev = previousScores[key]
              const delta = value - prev
              const color = scoreColors[key]
              return (
                <div key={key} className="score-reveal-bar-row">
                  <span className="score-reveal-bar-label">{scoreLabels[key]}</span>
                  <div className="score-reveal-bar-track">
                    <div
                      className="score-reveal-bar-fill"
                      style={{ width: `${value}%`, background: color }}
                    />
                  </div>
                  <span className="score-reveal-bar-value" style={{ color }}>
                    {value}
                    {delta !== 0 && (
                      <span style={{ fontSize: '0.7rem', marginLeft: 4, color: delta > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {delta > 0 ? '+' : ''}{delta}
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onComplete}>
            Continue
          </button>
          <div className="text-xs text-muted" style={{ marginTop: 'var(--space-sm)' }}>
            Click anywhere to skip
          </div>
        </div>
      </div>
    </div>
  )
}
