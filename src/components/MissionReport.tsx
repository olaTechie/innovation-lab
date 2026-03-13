// src/components/MissionReport.tsx
import { useGameStore } from '../store/gameStore'
import { scenarios } from '../data/scenarios'
import { roles } from '../data/roles'
import { getRoleWeightedScore, getScoreGrade, scoreLabels, scoreColors } from '../utils/scoring'
import type { Scores, GamePhase } from '../types'

export function MissionReport() {
  const { scores, role, decisions, crisisHistory, scenarioIndex, setPhase } = useGameStore()
  const scenario = scenarios[scenarioIndex]
  const currentRole = roles.find((r) => r.id === role)

  const scenarioGrade = role ? getRoleWeightedScore(scores, role) : 0
  const grade = getScoreGrade(scenarioGrade)

  // Find highest-impact decision for this scenario
  const scenarioDecisions = decisions.filter((d) => d.scenarioId === scenario?.id)
  const scenarioCrises = crisisHistory.filter((c) => c.scenarioIndex === scenarioIndex)

  const getLetterGrade = (score: number): string => {
    if (score >= 90) return 'A+'
    if (score >= 85) return 'A'
    if (score >= 80) return 'A-'
    if (score >= 75) return 'B+'
    if (score >= 70) return 'B'
    if (score >= 65) return 'B-'
    if (score >= 60) return 'C+'
    if (score >= 55) return 'C'
    if (score >= 50) return 'C-'
    if (score >= 45) return 'D+'
    if (score >= 40) return 'D'
    return 'F'
  }

  const handleContinue = () => {
    const assemblyPhases: GamePhase[] = ['innovation_assembly_1', 'innovation_assembly_2', 'innovation_assembly_3']
    const nextPhase = assemblyPhases[scenarioIndex]
    if (nextPhase) {
      setPhase(nextPhase)
    } else {
      setPhase('debrief')
    }
  }

  if (!scenario) return null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="phase-enter" style={{ maxWidth: 700, padding: 'var(--space-xl)', width: '100%' }}>
        <div className="card" style={{ border: `1px solid ${grade.color}33`, padding: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)' }}>
            <div>
              <div className="badge" style={{ background: 'rgba(123, 45, 142, 0.15)', color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}>
                MISSION REPORT
              </div>
              <h3>{scenario.title} — Complete</h3>
              <p className="text-sm text-secondary">{scenario.region}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: grade.color, lineHeight: 1 }}>
                {getLetterGrade(scenarioGrade)}
              </div>
              <div className="text-xs" style={{ color: grade.color }}>{grade.label}</div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-lg)',
          }}>
            {(Object.entries(scores) as [keyof Scores, number][]).map(([key, value]) => (
              <div key={key} style={{ background: 'var(--color-bg-input)', borderRadius: 'var(--radius-sm)', padding: '8px', textAlign: 'center' }}>
                <div className="font-mono font-bold" style={{ fontSize: '1.2rem', color: scoreColors[key] }}>
                  {value}
                </div>
                <div className="text-xs text-muted">{scoreLabels[key]}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <p className="text-xs text-muted" style={{ textTransform: 'uppercase', marginBottom: 6 }}>
              Summary
            </p>
            <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
              You made {scenarioDecisions.length} decision{scenarioDecisions.length !== 1 ? 's' : ''} and
              responded to {scenarioCrises.length} crisis event{scenarioCrises.length !== 1 ? 's' : ''} as{' '}
              <strong style={{ color: currentRole?.color }}>{currentRole?.title}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={handleContinue}>
              {scenarioIndex < 2 ? 'Deploy Innovations' : 'View Final Debrief'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
