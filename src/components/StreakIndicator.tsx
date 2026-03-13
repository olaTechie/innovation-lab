// src/components/StreakIndicator.tsx
import { useGameStore } from '../store/gameStore'
import { scoreLabels, scoreColors } from '../utils/scoring'
import type { Scores } from '../types'

export function StreakIndicator() {
  const streakMetric = useGameStore((s) => s.streakMetric)
  const streakCount = useGameStore((s) => s.streakCount)

  if (!streakMetric || streakCount < 3) return null

  const label = scoreLabels[streakMetric as keyof Scores] || streakMetric
  const color = scoreColors[streakMetric as keyof Scores] || 'var(--color-accent)'

  return (
    <div
      className="streak-indicator"
      style={{
        background: `${color}22`,
        borderColor: `${color}44`,
        color,
      }}
    >
      🔥 {label} Streak x{streakCount}
    </div>
  )
}
