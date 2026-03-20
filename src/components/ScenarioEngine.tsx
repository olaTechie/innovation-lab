import { useState, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { scenarios } from '../data/scenarios'
import { roles } from '../data/roles'
import { crisisEvents } from '../data/crisisEvents'
import { Dashboard } from './Dashboard'
import { ScenarioIntro } from './ScenarioIntro'
import { CrisisEvent } from './CrisisEvent'
import { ScoreReveal } from './ScoreReveal'
import type { Scores, ScenarioChoice, GamePhase, CrisisResponseOption } from '../types'

const scenarioVideoIds: Record<number, string> = {
  0: 'GfrGZuw7naA',
  1: 'Wd3Pk9F-np8',
  2: 'moy5aDF5fX8',
}

type SubState = 'video_intro' | 'briefing' | 'decision' | 'score_reveal' | 'crisis' | 'crisis_score_reveal' | 'outcome'

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
    addXP,
    recordCrisisResponse,
    updateStreak,
    checkAchievements,
    triggerBoldMove,
    updateObjectiveStatus,
  } = useGameStore()

  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null)
  const [subState, setSubState] = useState<SubState>(decisionPointIndex === 0 ? 'video_intro' : 'decision')
  const [preDecisionScores, setPreDecisionScores] = useState<Scores>({ ...scores })
  const [lastEffects, setLastEffects] = useState<Partial<Scores>>({})
  const [lastNarrativeFlash, setLastNarrativeFlash] = useState('')
  const [activeCrisis, setActiveCrisis] = useState<typeof crisisEvents[0] | null>(null)
  const [bannerFailed, setBannerFailed] = useState(false)

  const scenario = scenarios[scenarioIndex]
  const decisionPoint = scenario?.decisionPoints[decisionPointIndex]
  const currentRole = roles.find((r) => r.id === role)

  const handleChoiceSelect = (choice: ScenarioChoice) => {
    setSelectedChoice(choice)
  }

  const handlePostCrisisFlow = useCallback(() => {
    setActiveCrisis(null)
    const hasMoreDecisionPoints = decisionPointIndex < scenario.decisionPoints.length - 1

    if (hasMoreDecisionPoints) {
      advanceDecisionPoint()
      // Note: ScenarioWrapper with key prop will remount the component for the new decision point
    } else {
      // All decisions done — go to mission report
      const reportPhases: GamePhase[] = ['mission_report_1', 'mission_report_2', 'mission_report_3']
      const nextPhase = reportPhases[scenarioIndex]
      if (nextPhase) {
        setPhase(nextPhase)
      } else {
        setPhase('debrief')
      }
    }
  }, [decisionPointIndex, scenario, scenarioIndex, advanceDecisionPoint, setPhase])

  const handleScoreRevealComplete = useCallback(() => {
    // Get crises for this scenario
    const scenarioCrises = crisisEvents.filter((c) => c.scenarioIndex === scenarioIndex)

    // After Decision 1 (decisionPointIndex === 0): check for Crisis A (guaranteed)
    // After Decision 2 (decisionPointIndex === 1): check for Crisis B (conditional)
    const currentScores = useGameStore.getState().scores

    let crisisToFire: typeof crisisEvents[0] | null = null

    if (decisionPointIndex === 0) {
      // Crisis A: guaranteed
      crisisToFire = scenarioCrises.find((c) => c.triggerCondition === 'guaranteed') || null
    } else if (decisionPointIndex === 1) {
      // Crisis B: conditional
      crisisToFire = scenarioCrises.find((c) => {
        if (c.triggerCondition === 'guaranteed') return false
        if (typeof c.triggerCondition === 'function') {
          return c.triggerCondition({ ...useGameStore.getState().getStateSnapshot(), scores: currentScores })
        }
        return false
      }) || null
    }

    if (crisisToFire) {
      // Apply immediate effects
      setPreDecisionScores({ ...currentScores })
      updateScores(crisisToFire.immediateEffects)
      setActiveCrisis(crisisToFire)
      setSubState('crisis')
    } else {
      // No crisis — go to outcome or next decision
      handlePostCrisisFlow()
    }
  }, [scenarioIndex, decisionPointIndex, updateScores, handlePostCrisisFlow])

  const handleConfirmChoice = useCallback(() => {
    if (!selectedChoice || !scenario || !role) return

    // Capture current scores BEFORE applying
    setPreDecisionScores({ ...scores })

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
    setLastEffects(effects)
    setLastNarrativeFlash(selectedChoice.narrative || '')

    // XP for decision
    addXP(25)

    // Bold move detection
    const hasNegativeEffect = Object.values(effects).some((v) => v !== undefined && v <= -10)
    if (hasNegativeEffect) triggerBoldMove()

    // Streak tracking — find dominant positive metric
    const sortedEffects = Object.entries(effects)
      .filter(([, v]) => v !== undefined && v > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
    const dominantMetric = sortedEffects[0]?.[0] || null
    updateStreak(dominantMetric)

    checkAchievements()
    updateObjectiveStatus()

    setSubState('score_reveal')
  }, [selectedChoice, scenario, role, scores, decisionPoint, recordDecision, updateScores, addXP, triggerBoldMove, updateStreak, checkAchievements, updateObjectiveStatus])

  const handleCrisisRespond = useCallback((response: CrisisResponseOption) => {
    if (!activeCrisis) return

    const currentScores = useGameStore.getState().scores
    setPreDecisionScores({ ...currentScores })

    recordCrisisResponse(activeCrisis.id, response.id, scenarioIndex)
    updateScores(response.effects)

    setLastEffects(response.effects)
    setLastNarrativeFlash(response.narrativeFlash || '')

    addXP(40) // XP for crisis response
    checkAchievements()
    updateObjectiveStatus()

    setSubState('crisis_score_reveal')
  }, [activeCrisis, scenarioIndex, recordCrisisResponse, updateScores, addXP, checkAchievements, updateObjectiveStatus])

  if (!scenario || !decisionPoint || !currentRole) {
    return <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>Loading scenario...</div>
  }

  // Video intro screen (before briefing, first decision point only)
  if (subState === 'video_intro') {
    return (
      <ScenarioIntro
        scenario={scenario}
        videoId={scenarioVideoIds[scenarioIndex] || 'PLACEHOLDER_SCENARIO_1'}
        onContinue={() => setSubState('briefing')}
      />
    )
  }

  // Scenario briefing screen
  if (subState === 'briefing') {
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

          {!bannerFailed && (
            <img
              src={`/images/banners/scenario-${scenarioIndex + 1}.jpg`}
              alt={scenario.title}
              style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-lg)' }}
              onError={() => setBannerFailed(true)}
            />
          )}

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
            <button className="btn btn-primary btn-lg" onClick={() => setSubState('decision')}>
              Begin Decision Making
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Score reveal (after decision or crisis)
  if (subState === 'score_reveal' || subState === 'crisis_score_reveal') {
    const currentScores = useGameStore.getState().scores
    return (
      <ScoreReveal
        effects={lastEffects}
        currentScores={currentScores}
        previousScores={preDecisionScores}
        narrativeFlash={lastNarrativeFlash}
        onComplete={subState === 'crisis_score_reveal' ? handlePostCrisisFlow : handleScoreRevealComplete}
      />
    )
  }

  // Crisis event screen
  if (subState === 'crisis' && activeCrisis) {
    return <CrisisEvent crisis={activeCrisis} onRespond={handleCrisisRespond} />
  }

  const roleContext = decisionPoint.roleSpecificContext?.[role!]

  // Decision screen (subState === 'decision' or fallthrough)
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
