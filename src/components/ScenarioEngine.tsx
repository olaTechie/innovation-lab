import { useState, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { scenarios } from '../data/scenarios'
import { roles } from '../data/roles'
import { Dashboard } from './Dashboard'
import { ScenarioIntro } from './ScenarioIntro'
import type { Scores, ScenarioChoice, GamePhase } from '../types'

const scenarioVideoIds: Record<number, string> = {
  0: 'PLACEHOLDER_SCENARIO_1',
  1: 'PLACEHOLDER_SCENARIO_2',
  2: 'PLACEHOLDER_SCENARIO_3',
}

export function ScenarioEngine() {
  const {
    scenarioIndex,
    decisionPointIndex,
    scores,
    role,
    setPhase,
    updateScores,
    recordDecision,
    advanceDecisionPoint,
  } = useGameStore()

  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)
  const [preDecisionScores] = useState<Scores>({ ...scores })
  const [narrativeRevealed, setNarrativeRevealed] = useState(false)
  const [showBriefing, setShowBriefing] = useState(decisionPointIndex === 0)
  const [showVideoIntro, setShowVideoIntro] = useState(decisionPointIndex === 0)

  const scenario = scenarios[scenarioIndex]
  const decisionPoint = scenario?.decisionPoints[decisionPointIndex]
  const currentRole = roles.find((r) => r.id === role)

  const handleChoiceSelect = (choice: ScenarioChoice) => {
    if (showOutcome) return
    setSelectedChoice(choice)
  }

  const handleConfirmChoice = useCallback(() => {
    if (!selectedChoice || !scenario || !role) return

    recordDecision({
      scenarioId: scenario.id,
      decisionPointId: decisionPoint.id,
      choiceId: selectedChoice.id,
    })

    let effects = { ...selectedChoice.effects }
    const roleModifier = selectedChoice.roleModifiers?.[role]
    if (roleModifier) {
      for (const [key, value] of Object.entries(roleModifier)) {
        if (value !== undefined) {
          const k = key as keyof Scores
          effects[k] = (effects[k] || 0) + value
        }
      }
    }

    updateScores(effects)
    setShowOutcome(true)
    setNarrativeRevealed(false)
    setTimeout(() => setNarrativeRevealed(true), 300)
  }, [selectedChoice, scenario, role, decisionPoint, recordDecision, updateScores])

  const handleContinue = () => {
    const hasMoreDecisionPoints = decisionPointIndex < scenario.decisionPoints.length - 1

    if (hasMoreDecisionPoints) {
      advanceDecisionPoint()
    } else {
      const assemblyPhases: GamePhase[] = ['innovation_assembly_1', 'innovation_assembly_2', 'innovation_assembly_3']
      const nextPhase = assemblyPhases[scenarioIndex]
      if (nextPhase) {
        setPhase(nextPhase)
      } else {
        setPhase('debrief')
      }
    }
  }

  if (!scenario || !decisionPoint || !currentRole) {
    return <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>Loading scenario...</div>
  }

  // Video intro screen (before briefing, first decision point only)
  if (showVideoIntro && showBriefing) {
    return (
      <ScenarioIntro
        scenario={scenario}
        videoId={scenarioVideoIds[scenarioIndex] || 'PLACEHOLDER_SCENARIO_1'}
        onContinue={() => setShowVideoIntro(false)}
      />
    )
  }

  // Scenario briefing screen
  if (showBriefing) {
    return (
      <div>
        <div className="header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '1.1rem' }}>{currentRole.icon}</span>
            <span className="text-sm font-semibold" style={{ color: currentRole.color }}>{currentRole.shortTitle}</span>
            <span className="text-sm text-muted">&middot;</span>
            <span className="text-sm text-secondary">Scenario {scenarioIndex + 1} of 3</span>
          </div>
          <div className="progress-bar" style={{ width: 200 }}>
            <div className="progress-bar-fill" style={{ width: `${((scenarioIndex) / 3) * 100}%` }} />
          </div>
        </div>

        <div className="phase-enter" style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-2xl) var(--space-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <div className="badge" style={{
              background: 'var(--color-danger-muted)',
              color: 'var(--color-danger)',
              padding: '6px 16px',
              fontSize: '0.75rem',
              marginBottom: 'var(--space-lg)',
            }}>
              SCENARIO {scenarioIndex + 1} &middot; {scenario.region.toUpperCase()}
            </div>
            <h1 style={{ marginBottom: 'var(--space-sm)', fontSize: '2.5rem' }}>{scenario.title}</h1>
            <p className="text-lg text-secondary">{scenario.subtitle}</p>
          </div>

          {/* Setting */}
          <div className="card" style={{ marginBottom: 'var(--space-lg)', borderLeft: '3px solid var(--color-warning)' }}>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-warning)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setting</p>
            <p className="text-sm text-secondary" style={{ lineHeight: 1.7, marginBottom: 0 }}>{scenario.setting}</p>
          </div>

          {/* Narrative */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            {scenario.backgroundNarrative.split('\n\n').map((para, i) => (
              <p key={i} className="narrative-text" style={{
                animation: `fadeInUp 0.5s ease ${200 + i * 150}ms both`,
                margin: '0 auto var(--space-md)',
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Key stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-xl)',
          }}>
            {scenario.keyStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-card-value" style={{
                  color: stat.trend === 'up' ? 'var(--color-danger)' : stat.trend === 'down' ? 'var(--color-success)' : 'var(--color-accent)',
                  fontSize: '1.1rem',
                }}>
                  {stat.value}
                  {stat.trend && (
                    <span style={{ fontSize: '0.7rem', marginLeft: 4 }}>
                      {stat.trend === 'up' ? '\u25B2' : stat.trend === 'down' ? '\u25BC' : ''}
                    </span>
                  )}
                </div>
                <div className="stat-card-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setShowBriefing(false)}>
              Begin Decision Making
            </button>
          </div>
        </div>
      </div>
    )
  }

  const roleContext = decisionPoint.roleSpecificContext?.[role!]

  // Decision screen
  if (!showOutcome) {
    return (
      <div>
        <div className="header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '1.1rem' }}>{currentRole.icon}</span>
            <span className="text-sm font-semibold" style={{ color: currentRole.color }}>{currentRole.shortTitle}</span>
            <span className="text-sm text-muted">&middot;</span>
            <span className="text-sm text-secondary">Scenario {scenarioIndex + 1}: {scenario.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="progress-bar" style={{ width: 200 }}>
              <div className="progress-bar-fill" style={{ width: `${((scenarioIndex * 2 + decisionPointIndex + 1) / 6) * 100}%` }} />
            </div>
            <span className="text-xs text-muted">Decision {decisionPointIndex + 1}/{scenario.decisionPoints.length}</span>
          </div>
        </div>

        <div className="scenario-layout phase-enter">
          {/* Left: Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <div className="badge" style={{
                background: 'var(--color-warning-muted)',
                color: 'var(--color-warning)',
                marginBottom: 'var(--space-md)',
              }}>
                {scenario.region}
              </div>
              <h2 style={{ marginBottom: 4 }}>{decisionPoint.title}</h2>
              <p className="text-secondary text-sm">{scenario.subtitle}</p>
            </div>

            {/* Key stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-sm)' }}>
              {scenario.keyStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="stat-card" style={{ textAlign: 'left', padding: 'var(--space-sm) var(--space-md)' }}>
                  <div className="stat-card-label" style={{ marginBottom: 2 }}>{stat.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="font-mono font-semibold" style={{ fontSize: '0.95rem' }}>{stat.value}</span>
                    {stat.trend && (
                      <span style={{
                        fontSize: '0.7rem',
                        color: stat.trend === 'up' ? 'var(--color-danger)' : stat.trend === 'down' ? 'var(--color-success)' : 'var(--color-text-muted)',
                      }}>
                        {stat.trend === 'up' ? '\u25B2' : stat.trend === 'down' ? '\u25BC' : '\u25C6'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Context */}
            <div className="card" style={{ borderLeft: '3px solid var(--color-accent)' }}>
              <h4 style={{ marginBottom: 'var(--space-sm)', fontSize: '0.9rem' }}>Situation</h4>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.7 }}>{decisionPoint.context}</p>
            </div>

            {/* Role-specific intel */}
            {roleContext && (
              <div style={{
                background: `${currentRole.color}08`,
                border: `1px solid ${currentRole.color}22`,
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                borderLeft: `3px solid ${currentRole.color}`,
              }}>
                <p className="text-xs font-semibold" style={{ color: currentRole.color, marginBottom: 4 }}>
                  {currentRole.icon} YOUR INTEL
                </p>
                <p className="text-sm" style={{ lineHeight: 1.6, marginBottom: 0 }}>{roleContext}</p>
              </div>
            )}

            {/* Current scores */}
            <div>
              <h4 className="text-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
                Current Performance
              </h4>
              <Dashboard scores={scores} compact />
            </div>
          </div>

          {/* Right: Decision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>{decisionPoint.prompt}</h3>
              <p className="text-sm text-muted">Select your strategy below.</p>
            </div>

            <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {decisionPoint.choices.map((choice) => (
                <div
                  key={choice.id}
                  className={`choice-card ${selectedChoice?.id === choice.id ? 'selected' : ''}`}
                  onClick={() => handleChoiceSelect(choice)}
                >
                  <h4 style={{ marginBottom: 6 }}>{choice.label}</h4>
                  <p className="text-sm text-secondary" style={{ lineHeight: 1.6, marginBottom: 0 }}>{choice.description}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-primary btn-lg"
                disabled={!selectedChoice}
                onClick={handleConfirmChoice}
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Outcome reveal
  return (
    <div>
      <div className="header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: '1.1rem' }}>{currentRole.icon}</span>
          <span className="text-sm font-semibold" style={{ color: currentRole.color }}>{currentRole.shortTitle}</span>
          <span className="text-sm text-muted">&middot;</span>
          <span className="text-sm text-secondary">Outcome Revealed</span>
        </div>
        <div />
      </div>

      <div className="outcome-overlay">
        <div className="outcome-card">
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="badge" style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', marginBottom: 'var(--space-md)' }}>
              YOUR CHOICE: {selectedChoice?.label}
            </div>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Consequences</h3>
          </div>

          {narrativeRevealed && (
            <div className="animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
              <p style={{ lineHeight: 1.8, fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                {selectedChoice?.narrative}
              </p>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h4 className="text-sm" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-muted)' }}>
              Impact on Your Metrics
            </h4>
            <Dashboard scores={scores} previousScores={preDecisionScores} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary btn-lg" onClick={handleContinue}>
              {decisionPointIndex < scenario.decisionPoints.length - 1
                ? 'Next Decision'
                : 'Deploy Innovations'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
