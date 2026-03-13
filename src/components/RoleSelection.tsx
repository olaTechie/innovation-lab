import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'
import type { RoleId } from '../types'

export function RoleSelection() {
  const { selectRole, setPhase } = useGameStore()
  const [selectedId, setSelectedId] = useState<RoleId | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const selected = roles.find((r) => r.id === selectedId)

  const handleSelect = (id: RoleId) => {
    setSelectedId(id)
    setShowDetail(true)
  }

  const handleConfirm = () => {
    if (selectedId) {
      selectRole(selectedId)
      setPhase('hidden_objectives')
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: 'var(--space-xl)' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Choose Your Role</h2>
          <p className="text-secondary" style={{ maxWidth: 560, margin: '0 auto' }}>
            Each role sees the same crises through a different lens. Your priorities, information, and success metrics will differ based on your choice.
          </p>
        </div>

        <div className="stagger-children" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
        }}>
          {roles.map((role) => (
            <div
              key={role.id}
              className={`card card-interactive ${selectedId === role.id ? 'selected' : ''}`}
              onClick={() => handleSelect(role.id)}
              style={{
                borderColor: selectedId === role.id ? role.color : undefined,
                boxShadow: selectedId === role.id ? `0 0 20px ${role.color}22` : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: `${role.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                }}>
                  {role.icon}
                </div>
                <div>
                  <h4 style={{ color: role.color }}>{role.title}</h4>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {role.metrics.map((m) => (
                      <span key={m} className="badge" style={{ background: `${role.color}15`, color: role.color }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
                {role.description.slice(0, 150)}...
              </p>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {showDetail && selected && (
          <div className="animate-fade-in-up" style={{
            background: 'var(--color-bg-elevated)',
            border: `1px solid ${selected.color}44`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            maxWidth: 700,
            margin: '0 auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <span style={{ fontSize: '2rem' }}>{selected.icon}</span>
              <div>
                <h3 style={{ color: selected.color }}>{selected.title}</h3>
                <p className="text-sm text-secondary" style={{ marginBottom: 0 }}>Your mission parameters</p>
              </div>
            </div>

            <p style={{ marginBottom: 'var(--space-lg)', lineHeight: 1.7 }}>{selected.description}</p>

            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>
                Your Priorities
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.priorities.map((p, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: selected.color, fontWeight: 700 }}>{i + 1}.</span>
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-lg)',
              borderLeft: `3px solid ${selected.color}`,
            }}>
              <p className="text-xs font-semibold" style={{ color: selected.color, marginBottom: 4 }}>
                CLASSIFIED BRIEFING
              </p>
              <p className="text-sm" style={{ lineHeight: 1.6, marginBottom: 0 }}>{selected.uniqueInfo}</p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => { setShowDetail(false); setSelectedId(null) }}>
                Choose Another
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleConfirm}
                style={{ background: selected.color }}
              >
                Accept Mission as {selected.shortTitle}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
