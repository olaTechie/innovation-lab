// src/components/CrisisEvent.tsx
import { useState } from 'react'
import { GameImage } from './GameImage'
import type { CrisisEvent as CrisisEventType, CrisisResponseOption, Scores } from '../types'
import { scoreLabels } from '../utils/scoring'

interface CrisisEventProps {
  crisis: CrisisEventType
  onRespond: (response: CrisisResponseOption) => void
}

export function CrisisEvent({ crisis, onRespond }: CrisisEventProps) {
  const [selected, setSelected] = useState<CrisisResponseOption | null>(null)

  return (
    <div className="crisis-overlay">
      <div className="crisis-card phase-enter">
        <div className="crisis-alert-bar" />

        <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start', marginBottom: 'var(--space-lg)' }}>
          <GameImage
            src={crisis.crisisArt}
            fallbackEmoji={crisis.crisisEmoji}
            fallbackGradient="linear-gradient(135deg, #dc2626, #991b1b)"
            alt={crisis.title}
            width={64}
            height={64}
            borderRadius="var(--radius-md)"
          />
          <div>
            <div className="badge" style={{
              background: 'rgba(220, 38, 38, 0.2)',
              color: '#ef4444',
              marginBottom: 'var(--space-sm)',
            }}>
              ⚠ CRISIS ALERT
            </div>
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>{crisis.title}</h3>
            <p className="text-sm text-secondary" style={{ lineHeight: 1.7 }}>{crisis.description}</p>
          </div>
        </div>

        {/* Immediate effects */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {(Object.entries(crisis.immediateEffects) as [keyof Scores, number][]).map(([key, value]) => (
            <span
              key={key}
              className="badge"
              style={{
                background: 'rgba(220, 38, 38, 0.15)',
                color: '#ef4444',
                padding: '4px 10px',
              }}
            >
              {scoreLabels[key]} {value > 0 ? '+' : ''}{value}
            </span>
          ))}
        </div>

        <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-muted)' }}>
          How do you respond?
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          {crisis.responses.map((response) => (
            <div
              key={response.id}
              className={`choice-card ${selected?.id === response.id ? 'selected' : ''}`}
              onClick={() => setSelected(response)}
            >
              <h4 style={{ marginBottom: 6 }}>{response.title}</h4>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.5, marginBottom: 8 }}>
                {response.description}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                {(Object.entries(response.effects) as [keyof Scores, number][]).map(([key, value]) => (
                  <span
                    key={key}
                    className="text-xs"
                    style={{ color: value > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}
                  >
                    {scoreLabels[key]} {value > 0 ? '+' : ''}{value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-primary btn-lg"
            disabled={!selected}
            onClick={() => selected && onRespond(selected)}
            style={{ background: '#dc2626' }}
          >
            Respond to Crisis
          </button>
        </div>
      </div>
    </div>
  )
}
