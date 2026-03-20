import { useState, useCallback, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { innovations, innovationCategories } from '../data/innovations'
import { roles } from '../data/roles'
import { Dashboard } from './Dashboard'
import { GameImage } from './GameImage'
import type { Innovation, InnovationCategory, Scores, GamePhase } from '../types'

export function InnovationAssembly() {
  const {
    role,
    scores,
    scenarioIndex,
    deployedInnovations,
    deployInnovation,
    removeInnovation,
    updateScores,
    setPhase,
    advanceScenario,
    addXP,
    checkAchievements,
    setInnovationBudgetUsed,
  } = useGameStore()

  const [selectedCategory, setSelectedCategory] = useState<InnovationCategory | 'all'>('all')
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [preAssemblyScores] = useState<Scores>({ ...scores })

  const currentRole = roles.find((r) => r.id === role)
  const budgetTotal = 30
  const currentDeployed = deployedInnovations.filter((d) => d.scenarioPhase === scenarioIndex)
  const deployedIds = new Set(currentDeployed.map((d) => d.innovationId))
  const budgetUsed = currentDeployed.reduce((sum, d) => {
    const inn = innovations.find((i) => i.id === d.innovationId)
    return sum + (inn?.cost || 0)
  }, 0)

  useEffect(() => {
    setInnovationBudgetUsed(budgetUsed)
  }, [budgetUsed, setInnovationBudgetUsed])

  const filteredInnovations = innovations.filter((i) =>
    (selectedCategory === 'all' || i.category === selectedCategory) && !deployedIds.has(i.id)
  )

  const sortedInnovations = [...filteredInnovations].sort((a, b) => {
    const affinityA = role ? (a.roleAffinity[role] || 0) : 0
    const affinityB = role ? (b.roleAffinity[role] || 0) : 0
    return affinityB - affinityA
  })

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setIsDragOver(false)
  }

  const handleDrop = useCallback((innovationId: string) => {
    const innovation = innovations.find((i) => i.id === innovationId)
    if (!innovation) return
    if (budgetUsed + innovation.cost > budgetTotal) return
    if (deployedIds.has(innovationId)) return

    deployInnovation({ innovationId, scenarioPhase: scenarioIndex })
    updateScores(
      Object.fromEntries(
        Object.entries(innovation.effects).map(([k, v]) => [k, Math.round((v as number) * 0.5)])
      ) as Partial<Scores>
    )
    addXP(15)
    checkAchievements()
    setDraggedId(null)
    setIsDragOver(false)
  }, [budgetUsed, budgetTotal, deployedIds, scenarioIndex, deployInnovation, updateScores, addXP, checkAchievements])

  const handleRemove = (innovationId: string) => {
    const innovation = innovations.find((i) => i.id === innovationId)
    if (!innovation) return
    removeInnovation(innovationId)
    updateScores(
      Object.fromEntries(
        Object.entries(innovation.effects).map(([k, v]) => [k, -Math.round((v as number) * 0.5)])
      ) as Partial<Scores>
    )
  }

  const handleContinue = () => {
    const nextScenario = scenarioIndex + 1
    if (nextScenario < 3) {
      advanceScenario()
      const scenarioPhases: GamePhase[] = ['scenario_1', 'scenario_2', 'scenario_3']
      setPhase(scenarioPhases[nextScenario])
    } else {
      setPhase('debrief')
    }
  }

  const getCategoryColor = (cat: InnovationCategory) => innovationCategories[cat]?.color || '#888'
  const affinityDot = (innovation: Innovation) => {
    const affinity = role ? (innovation.roleAffinity[role] || 0) : 0
    if (affinity >= 0.85) return { label: 'Recommended', color: 'var(--color-success)' }
    if (affinity >= 0.7) return { label: 'Good Fit', color: 'var(--color-accent)' }
    return null
  }

  return (
    <div>
      <div className="header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: '1.1rem' }}>{currentRole?.icon}</span>
          <span className="text-sm font-semibold" style={{ color: currentRole?.color }}>{currentRole?.shortTitle}</span>
          <span className="text-sm text-muted">&middot;</span>
          <span className="text-sm text-secondary">Innovation Assembly</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span className="text-xs text-muted">Budget:</span>
          <span className="font-mono font-semibold text-sm" style={{
            color: budgetUsed > budgetTotal * 0.8 ? 'var(--color-warning)' : 'var(--color-success)',
          }}>
            {budgetUsed}/{budgetTotal}
          </span>
          <div className="progress-bar" style={{ width: 100 }}>
            <div className="progress-bar-fill" style={{
              width: `${(budgetUsed / budgetTotal) * 100}%`,
              background: budgetUsed > budgetTotal * 0.8
                ? 'linear-gradient(90deg, var(--color-warning), var(--color-danger))'
                : undefined,
            }} />
          </div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-xl)', maxWidth: 1400, margin: '0 auto' }} className="phase-enter">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Deploy Your Innovations</h2>
          <p className="text-secondary" style={{ maxWidth: 600, margin: '0 auto' }}>
            Drag innovations to your deployment plan. Budget is limited — choose wisely.
            Innovations highlighted for your role offer the best strategic fit.
          </p>
        </div>

        <div className="assembly-layout" style={{ gap: 'var(--space-xl)' }}>
          {/* Left: Available innovations */}
          <div>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
              <button
                className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
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

            {/* Innovation grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-sm)' }}>
              {sortedInnovations.map((inn) => {
                const canAfford = budgetUsed + inn.cost <= budgetTotal
                const affinity = affinityDot(inn)
                return (
                  <div
                    key={inn.id}
                    className={`innovation-card ${draggedId === inn.id ? 'dragging' : ''} ${!canAfford ? 'deployed' : ''}`}
                    role="button"
                    tabIndex={canAfford ? 0 : -1}
                    draggable={canAfford}
                    onDragStart={() => canAfford && handleDragStart(inn.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => canAfford && handleDrop(inn.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); canAfford && handleDrop(inn.id) } }}
                    style={{ borderLeft: `3px solid ${getCategoryColor(inn.category)}` }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <GameImage
                          src={inn.imageUrl || ''}
                          alt={inn.name}
                          fallbackEmoji={inn.category.charAt(0).toUpperCase()}
                          width={40}
                          height={40}
                          borderRadius="var(--radius-sm)"
                        />
                        <h4 style={{ fontSize: '0.9rem', lineHeight: 1.3 }}>{inn.name}</h4>
                      </div>
                      <span className="font-mono text-xs font-semibold" style={{
                        color: canAfford ? 'var(--color-warning)' : 'var(--color-danger)',
                        flexShrink: 0,
                        marginLeft: 8,
                      }}>
                        ${inn.cost}M
                      </span>
                    </div>
                    <p className="text-xs text-muted" style={{ marginBottom: 6, lineHeight: 1.4 }}>
                      {inn.description.slice(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: `${getCategoryColor(inn.category)}18`, color: getCategoryColor(inn.category) }}>
                        {innovationCategories[inn.category]?.label}
                      </span>
                      <span className="badge" style={{ background: 'var(--color-bg-input)', color: 'var(--color-success)' }}>
                        Impact: {inn.impact}/10
                      </span>
                      {affinity && (
                        <span className="badge" style={{ background: `${affinity.color}18`, color: affinity.color }}>
                          {affinity.label}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Deployment plan + dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* Drop zone */}
            <div
              className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                if (draggedId) handleDrop(draggedId)
              }}
            >
              {currentDeployed.length === 0 ? (
                <div className="drop-zone-placeholder">
                  Drag innovations here or click to deploy
                </div>
              ) : (
                currentDeployed.map((d) => {
                  const inn = innovations.find((i) => i.id === d.innovationId)
                  if (!inn) return null
                  return (
                    <div
                      key={d.innovationId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'var(--color-bg-card)',
                        border: `1px solid ${getCategoryColor(inn.category)}44`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span style={{ color: getCategoryColor(inn.category), fontWeight: 600 }}>{inn.name}</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--color-warning)' }}>${inn.cost}M</span>
                      <button
                        onClick={() => handleRemove(d.innovationId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                          padding: '0 4px',
                          fontSize: '1rem',
                          lineHeight: 1,
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  )
                })
              )}
            </div>

            {/* Dashboard */}
            <div>
              <h4 className="text-xs" style={{
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-sm)',
              }}>
                Impact Dashboard
              </h4>
              <Dashboard scores={scores} previousScores={preAssemblyScores} compact />
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleContinue}>
              {scenarioIndex < 2 ? 'Continue to Next Scenario' : 'View Final Results'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
