import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'
import { innovations, innovationCategories } from '../data/innovations'
import { unlockables } from '../data/unlockables'
import { RadarChart, Dashboard } from './Dashboard'
import { scoreLabels, getOverallScore, getScoreGrade } from '../utils/scoring'
import type { Scores, InnovationCategory } from '../types'

export function Sandbox() {
  const { scores: originalScores, role, deployedInnovations, setPhase, resetGame, unlockedContent, setSandboxEntryTime } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)

  useEffect(() => {
    setSandboxEntryTime()
  }, [setSandboxEntryTime])

  const [sandboxScores, setSandboxScores] = useState<Scores>({ ...originalScores })
  const [sandboxInnovations, setSandboxInnovations] = useState<Set<string>>(
    new Set(deployedInnovations.map((d) => d.innovationId))
  )
  const [selectedCategory, setSelectedCategory] = useState<InnovationCategory | 'all'>('all')

  // Sliders for direct score manipulation
  const handleScoreChange = (key: keyof Scores, value: number) => {
    setSandboxScores((prev) => ({ ...prev, [key]: value }))
  }

  const toggleInnovation = (id: string) => {
    const inn = innovations.find((i) => i.id === id)
    if (!inn) return

    setSandboxInnovations((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        // Remove effects
        setSandboxScores((s) => {
          const n = { ...s }
          for (const [k, v] of Object.entries(inn.effects)) {
            n[k as keyof Scores] = Math.max(0, Math.min(100, n[k as keyof Scores] - Math.round((v as number) * 0.5)))
          }
          return n
        })
      } else {
        next.add(id)
        // Add effects
        setSandboxScores((s) => {
          const n = { ...s }
          for (const [k, v] of Object.entries(inn.effects)) {
            n[k as keyof Scores] = Math.max(0, Math.min(100, n[k as keyof Scores] + Math.round((v as number) * 0.5)))
          }
          return n
        })
      }
      return next
    })
  }

  const resetToOriginal = () => {
    setSandboxScores({ ...originalScores })
    setSandboxInnovations(new Set(deployedInnovations.map((d) => d.innovationId)))
  }

  const overallScore = getOverallScore(sandboxScores)
  const grade = getScoreGrade(overallScore)

  const filteredInnovations = innovations.filter(
    (i) => selectedCategory === 'all' || i.category === selectedCategory
  )

  const budgetUsed = Array.from(sandboxInnovations).reduce((sum, id) => {
    const inn = innovations.find((i) => i.id === id)
    return sum + (inn?.cost || 0)
  }, 0)

  return (
    <div>
      <div className="header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{
            padding: '3px 10px',
            background: 'var(--color-warning-muted)',
            color: 'var(--color-warning)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Sandbox
          </span>
          <span className="text-sm text-secondary">All constraints removed. Explore freely.</span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-ghost btn-sm" onClick={resetToOriginal}>Reset to My Results</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setPhase('debrief')}>Back to Debrief</button>
          <button className="btn btn-secondary btn-sm" onClick={() => {
            resetGame()
            setPhase('landing')
          }}>
            New Game
          </button>
        </div>
      </div>

      <div style={{ padding: 'var(--space-xl)', maxWidth: 1400, margin: '0 auto' }} className="phase-enter">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Sandbox Mode</h2>
          <p className="text-secondary" style={{ maxWidth: 600, margin: '0 auto' }}>
            All sliders unlocked. Toggle any innovation on or off. Adjust scores directly.
            Explore &ldquo;what if&rdquo; scenarios to deepen your understanding.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-xl)' }}>
          {/* Left: Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Score sliders */}
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Adjust Scores Directly</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {(Object.entries(sandboxScores) as [keyof Scores, number][]).map(([key, value]) => (
                  <div key={key} className="custom-slider">
                    <label>
                      <span>{scoreLabels[key]}</span>
                      <span className="font-mono font-semibold">{value}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={value}
                      onChange={(e) => handleScoreChange(key, Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Innovation toggles */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <h4>Innovation Toolkit</h4>
                <span className="font-mono text-sm" style={{
                  color: budgetUsed > 60 ? 'var(--color-warning)' : 'var(--color-text-secondary)',
                }}>
                  Budget: ${budgetUsed}M
                </span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSelectedCategory('all')}>All</button>
                {Object.entries(innovationCategories).map(([key, cat]) => (
                  <button
                    key={key}
                    className={`btn btn-sm ${selectedCategory === key ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setSelectedCategory(key as InnovationCategory)}
                    style={selectedCategory === key ? { background: cat.color } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-sm)' }}>
                {filteredInnovations.map((inn) => {
                  const isActive = sandboxInnovations.has(inn.id)
                  const catColor = innovationCategories[inn.category]?.color || '#888'
                  return (
                    <div
                      key={inn.id}
                      onClick={() => toggleInnovation(inn.id)}
                      style={{
                        padding: '10px 12px',
                        background: isActive ? `${catColor}15` : 'var(--color-bg-input)',
                        border: `1px solid ${isActive ? catColor : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-sm font-semibold" style={{ color: isActive ? catColor : 'var(--color-text)' }}>
                          {inn.name}
                        </span>
                        <span className="font-mono text-xs" style={{ color: 'var(--color-warning)' }}>${inn.cost}M</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 3,
                          background: isActive ? catColor : 'var(--color-bg-card)',
                          border: `2px solid ${isActive ? catColor : 'var(--color-border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '10px', color: 'white', fontWeight: 700,
                        }}>
                          {isActive ? '\u2713' : ''}
                        </div>
                        <span className="text-xs text-muted">
                          {isActive ? 'Deployed' : 'Click to deploy'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Unlockable Content */}
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Bonus Content</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {unlockables.map((unlock) => {
                  const isUnlocked = unlockedContent.includes(unlock.id)
                  return (
                    <div
                      key={unlock.id}
                      style={{
                        padding: '12px',
                        background: isUnlocked ? 'rgba(123, 45, 142, 0.06)' : 'var(--color-bg-input)',
                        border: `1px solid ${isUnlocked ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        opacity: isUnlocked ? 1 : 0.5,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <span style={{ fontSize: '1.2rem' }}>{isUnlocked ? unlock.icon : '🔒'}</span>
                        <div>
                          <div className="text-sm font-semibold">{isUnlocked ? unlock.title : 'Locked'}</div>
                          <div className="text-xs text-muted">
                            {isUnlocked ? unlock.description : 'Unlock condition not met'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Live dashboard */}
          <div style={{ position: 'sticky', top: 80, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <p className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
                Live Score
              </p>
              <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: grade.color, lineHeight: 1 }}>
                {overallScore}
              </div>
              <div style={{ fontSize: '0.85rem', color: grade.color, fontWeight: 600, marginTop: 4 }}>
                {grade.label}
              </div>
            </div>

            <RadarChart scores={sandboxScores} comparisonScores={originalScores} />

            <div>
              <h4 className="text-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
                Detailed Metrics
              </h4>
              <Dashboard scores={sandboxScores} previousScores={originalScores} compact />
            </div>

            <div className="card" style={{ background: 'var(--color-bg-input)', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--color-text-secondary)' }}>Comparison:</strong> Dashed outline on radar shows your actual game results. Bars show ghost markers for your original scores.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
