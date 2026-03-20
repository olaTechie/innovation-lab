// src/components/XPProgressBar.tsx
import { useGameStore } from '../store/gameStore'
import { GameImage } from './GameImage'

const XP_LEVELS = [
  { level: 1, title: 'Field Observer', threshold: 0 },
  { level: 2, title: 'Health Strategist', threshold: 500 },
  { level: 3, title: 'Policy Architect', threshold: 1500 },
  { level: 4, title: 'Global Health Leader', threshold: 3000 },
]

const RANK_IMAGES: Record<string, string> = {
  'Field Observer': '/images/ranks/field-observer.png',
  'Health Strategist': '/images/ranks/health-strategist.png',
  'Policy Architect': '/images/ranks/policy-architect.png',
  'Global Health Leader': '/images/ranks/global-health-leader.png',
}

export function XPProgressBar() {
  const xp = useGameStore((s) => s.xp)

  let currentLevel = XP_LEVELS[0]
  let nextLevel = XP_LEVELS[1]
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].threshold) {
      currentLevel = XP_LEVELS[i]
      nextLevel = XP_LEVELS[i + 1] || XP_LEVELS[i]
      break
    }
  }

  const isMaxLevel = currentLevel.level === 4
  const progressInLevel = xp - currentLevel.threshold
  const levelRange = nextLevel.threshold - currentLevel.threshold
  const percent = isMaxLevel ? 100 : Math.min(100, (progressInLevel / levelRange) * 100)

  return (
    <div className="xp-progress-bar">
      <div className="xp-progress-info">
        <span className="xp-level-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <GameImage
            src={RANK_IMAGES[currentLevel.title] || ''}
            alt={currentLevel.title}
            fallbackEmoji={'\u2B50'}
            width={24}
            height={24}
            borderRadius="4px"
          />
          Lv {currentLevel.level} · {currentLevel.title}
        </span>
        <span className="xp-count">{xp} XP</span>
      </div>
      <div className="xp-bar-track">
        <div
          className="xp-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      {!isMaxLevel && (
        <span className="xp-next-level">
          {nextLevel.threshold - xp} XP to {nextLevel.title}
        </span>
      )}
    </div>
  )
}
