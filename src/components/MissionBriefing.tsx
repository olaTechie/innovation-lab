import { useGameStore } from '../store/gameStore'

export function MissionBriefing() {
  const { setPhase } = useGameStore()

  return (
    <div style={{ minHeight: '100vh', padding: 'var(--space-xl)' }}>
      <div className="container" style={{ maxWidth: 900 }}>

        {/* Header */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <div className="badge" style={{
            background: 'rgba(123, 45, 142, 0.15)',
            color: 'var(--color-accent)',
            padding: '6px 16px',
            fontSize: '0.75rem',
            marginBottom: 'var(--space-md)',
          }}>
            MISSION BRIEFING
          </div>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Before You Begin</h2>
          <p className="text-secondary" style={{ maxWidth: 600, margin: '0 auto' }}>
            Read this briefing carefully. It will prepare you for the decisions ahead.
          </p>
        </div>

        {/* Section A: Learning Objectives */}
        <div className="animate-fade-in-up card" style={{
          marginBottom: 'var(--space-lg)',
          borderLeft: '3px solid var(--color-accent)',
        }}>
          <h3 style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>
            Mission Objectives
          </h3>
          <p className="text-sm text-secondary" style={{ marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
            By the end of this activity, you will be able to:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {[
              'Evaluate health innovations across competing dimensions — coverage, equity, cost-effectiveness, sustainability, community trust, and health outcomes',
              'Navigate resource allocation trade-offs under real-world constraints with limited budgets',
              'Understand how different stakeholder perspectives shape health policy decisions',
              'Critically assess the role of technology and innovation in global health systems',
            ].map((obj, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <span style={{
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  marginTop: 2,
                }}>{i + 1}.</span>
                <span className="text-sm" style={{ lineHeight: 1.6 }}>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section B: How It Works */}
        <div className="animate-fade-in-up card" style={{
          marginBottom: 'var(--space-lg)',
          animationDelay: '100ms',
          borderLeft: '3px solid var(--color-secondary)',
        }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>
            How It Works
          </h3>
          <p className="text-sm text-secondary" style={{ marginBottom: 'var(--space-lg)', lineHeight: 1.6 }}>
            You will choose a stakeholder role, face 3 real-world health scenarios with branching decisions,
            deploy innovations under budget constraints, and receive a full performance debrief.
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {[
              { step: '1', label: 'Choose Role', icon: '🎭' },
              { step: '2', label: '3 Scenarios', icon: '📋' },
              { step: '3', label: 'Deploy Innovations', icon: '🚀' },
              { step: '4', label: 'Debrief', icon: '📊' },
              { step: '5', label: 'Sandbox', icon: '🔬' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: 'var(--space-sm) var(--space-md)',
                background: 'var(--color-bg-input)',
                borderRadius: 'var(--radius-md)',
                minWidth: 100,
              }}>
                <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                <span className="text-xs font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Rules of Engagement */}
        <div className="animate-fade-in-up card" style={{
          marginBottom: 'var(--space-xl)',
          animationDelay: '200ms',
          borderLeft: '3px solid var(--color-warning)',
        }}>
          <h3 style={{ color: 'var(--color-warning)', marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>
            Rules of Engagement
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-sm)' }}>
            {[
              { rule: 'You play one role throughout the simulation — choose carefully', icon: '🎯' },
              { rule: 'Decisions are final and cannot be undone', icon: '⚖️' },
              { rule: 'Your performance is scored across 6 health metrics', icon: '📈' },
              { rule: 'Aim for 60%+ across your metrics — but the real learning is in the trade-offs, not the score', icon: '💡' },
            ].map((r, i) => (
              <div key={i} style={{
                background: 'var(--color-bg-input)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-sm)',
              }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{r.icon}</span>
                <span className="text-sm" style={{ lineHeight: 1.5 }}>{r.rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', animationDelay: '300ms' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase('role_selection')}>
            Choose Your Role
          </button>
        </div>
      </div>
    </div>
  )
}
