// src/components/HiddenObjectives.tsx
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'
import { hiddenObjectives } from '../data/hiddenObjectives'

export function HiddenObjectives() {
  const { role, setPhase, initializeObjectives } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)
  const roleObjectives = hiddenObjectives.filter((o) => o.roleId === role)

  const handleContinue = () => {
    if (role) initializeObjectives(role)
    setPhase('country_briefing')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="phase-enter" style={{ maxWidth: 600, padding: 'var(--space-xl)', textAlign: 'center' }}>
        <div className="badge" style={{
          background: 'rgba(220, 38, 38, 0.15)',
          color: '#ef4444',
          padding: '6px 16px',
          fontSize: '0.7rem',
          marginBottom: 'var(--space-lg)',
          display: 'inline-block',
        }}>
          CLASSIFIED BRIEFING
        </div>

        <h2 style={{ marginBottom: 'var(--space-sm)' }}>
          <span style={{ color: currentRole?.color }}>{currentRole?.icon}</span>{' '}
          {currentRole?.title} — Secret Objectives
        </h2>
        <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
          These objectives are known only to you. Your progress will be tracked silently.
          Success or failure will be revealed at debrief.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', textAlign: 'left' }}>
          {roleObjectives.map((obj, i) => (
            <div
              key={obj.id}
              className="card"
              style={{
                borderLeft: `3px solid ${currentRole?.color || 'var(--color-accent)'}`,
                animation: `fadeInUp 0.4s ease ${200 + i * 150}ms both`,
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--radius-sm)',
                  background: `${currentRole?.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: currentRole?.color,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <p className="text-sm" style={{ lineHeight: 1.6, marginBottom: 0 }}>
                  {obj.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={handleContinue}
          style={{ marginTop: 'var(--space-xl)' }}
        >
          Understood — Begin Mission
        </button>
      </div>
    </div>
  )
}
