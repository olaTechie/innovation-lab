import { useGameStore } from '../store/gameStore'

function GlobeVisualization() {
  return (
    <div className="globe-container" style={{ width: 340, height: 340 }}>
      <svg viewBox="0 0 340 340" className="globe-svg" style={{ width: 340, height: 340 }}>
        <defs>
          <radialGradient id="globe-grad" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0a1628" />
          </radialGradient>
          <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
          </radialGradient>
          <filter id="blur-sm">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        {/* Glow ring */}
        <circle cx="170" cy="170" r="162" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="4" />
        <circle cx="170" cy="170" r="155" fill="url(#globe-grad)" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
        <circle cx="170" cy="170" r="155" fill="url(#globe-glow)" />
        {/* Grid lines */}
        {[30, 60, 90, 120, 150].map((angle) => {
          const r = 155 * Math.sin((angle * Math.PI) / 180)
          const cy = 170 - 155 * Math.cos((angle * Math.PI) / 180)
          return <ellipse key={`lat-${angle}`} cx="170" cy={cy} rx={r} ry={r * 0.15} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
        })}
        {[-30, 0, 30].map((angle) => (
          <ellipse key={`lon-${angle}`} cx="170" cy="170" rx={Math.max(20, 155 * Math.cos((angle * Math.PI) / 180) * 0.3)} ry="155" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" transform={`rotate(${angle}, 170, 170)`} />
        ))}
        {/* Stylized Africa/continent shapes */}
        <g opacity="0.6">
          {/* Africa-like shape */}
          <path d="M 155 95 Q 148 110 150 130 Q 145 145 148 160 Q 150 175 155 185 Q 160 195 158 210 Q 155 220 160 225 Q 168 230 175 220 Q 178 210 180 195 Q 182 180 178 165 Q 175 150 180 135 Q 185 120 178 105 Q 170 95 155 95 Z" fill="#4A7C59" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          {/* Europe hint */}
          <path d="M 148 80 Q 155 75 165 78 Q 175 82 168 88 Q 160 92 150 88 Z" fill="#5B8BA0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          {/* Middle East hint */}
          <path d="M 185 100 Q 195 95 200 105 Q 198 115 190 112 Z" fill="#C17547" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </g>
        {/* Asante highlight - pulsing */}
        <circle cx="162" cy="160" r="6" fill="#3b82f6" opacity="0.8">
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="162" cy="160" r="3" fill="#60a5fa" />
        {/* Arcs showing connections */}
        <path d="M 162 160 Q 140 120 150 85" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="3,3">
          <animate attributeName="strokeDashoffset" values="0;-6" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M 162 160 Q 195 140 200 105" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="3,3">
          <animate attributeName="strokeDashoffset" values="0;-6" dur="1.8s" repeatCount="indefinite" />
        </path>
        {/* Label */}
        <text x="175" y="153" fill="white" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.9">ASANTE</text>
      </svg>
    </div>
  )
}

export function Landing() {
  const { setPhase, startGame, resetGame, phase, role } = useGameStore()

  const hasSavedGame = phase !== 'landing' && role !== null

  const handleStart = () => {
    resetGame()
    startGame()
    setPhase('role_selection')
  }

  const handleResume = () => {
    // Just close landing, continue from saved state
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-xl)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="animate-fade-in-up" style={{ textAlign: 'center', maxWidth: 600, position: 'relative', zIndex: 1 }}>
        {/* Subtitle */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          background: 'var(--color-accent-muted)',
          borderRadius: 'var(--radius-full)',
          marginBottom: 'var(--space-lg)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Session 3 &middot; Emerging Innovations in Global Health
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 'var(--space-md)',
          background: 'linear-gradient(135deg, #e8ecf4 0%, #3b82f6 50%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Innovation Lab:<br />Mission Control
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2xl)',
          lineHeight: 1.7,
        }}>
          You are the decision-maker. Deploy health innovations, allocate resources, and navigate three critical scenarios in the fictional nation of <strong style={{ color: 'var(--color-text)' }}>Asante</strong>. Every choice has consequences.
        </p>

        <GlobeVisualization />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center', marginTop: 'var(--space-2xl)' }}>
          <button className="btn btn-primary btn-lg" onClick={handleStart} style={{ minWidth: 240 }}>
            Begin Mission
          </button>

          {hasSavedGame && (
            <button className="btn btn-ghost btn-sm" onClick={handleResume}>
              Resume Previous Session
            </button>
          )}
        </div>

        <div style={{
          marginTop: 'var(--space-2xl)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          color: 'var(--color-text-muted)',
          fontSize: '0.8rem',
        }}>
          <span>~40-50 minutes</span>
          <span>&middot;</span>
          <span>6 roles</span>
          <span>&middot;</span>
          <span>3 scenarios</span>
          <span>&middot;</span>
          <span>20 innovations</span>
        </div>

        <div style={{
          marginTop: 'var(--space-xl)',
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
        }}>
          Warwick Medical School &middot; Global Health MD999 & ES99B
        </div>
      </div>
    </div>
  )
}
