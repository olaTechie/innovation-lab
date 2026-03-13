// src/components/AchievementWall.tsx
import { useGameStore } from '../store/gameStore'
import { achievements } from '../data/achievements'
import { GameImage } from './GameImage'
import type { AchievementCategory } from '../types'

const categoryLabels: Record<AchievementCategory, string> = {
  'role-mastery': 'Role Mastery',
  'innovation-strategy': 'Innovation Strategy',
  'decision-making': 'Decision Making',
  'engagement': 'Engagement & Reflection',
  'hidden': 'Hidden / Rare',
}

const categoryColors: Record<AchievementCategory, string> = {
  'role-mastery': '#7B2D8E',
  'innovation-strategy': '#4472C4',
  'decision-making': '#10b981',
  'engagement': '#f59e0b',
  'hidden': '#dc2626',
}

export function AchievementWall() {
  const unlockedIds = useGameStore((s) => s.achievements)
  const unlockedCount = unlockedIds.length

  const categories: AchievementCategory[] = ['role-mastery', 'innovation-strategy', 'decision-making', 'engagement', 'hidden']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h4>Achievements</h4>
        <span className="font-mono text-sm" style={{ color: 'var(--color-accent)' }}>
          {unlockedCount}/{achievements.length} Unlocked
        </span>
      </div>

      {categories.map((cat) => {
        const catAchievements = achievements.filter((a) => a.category === cat)
        const color = categoryColors[cat]
        return (
          <div key={cat} style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color,
              fontWeight: 600,
              marginBottom: 'var(--space-sm)',
            }}>
              {categoryLabels[cat]}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-sm)' }}>
              {catAchievements.map((ach) => {
                const unlocked = unlockedIds.includes(ach.id)
                return (
                  <div
                    key={ach.id}
                    className="card"
                    style={{
                      opacity: unlocked ? 1 : 0.4,
                      padding: '10px 12px',
                      display: 'flex',
                      gap: 'var(--space-sm)',
                      alignItems: 'center',
                    }}
                  >
                    <GameImage
                      src={ach.badgeImage}
                      fallbackEmoji={unlocked ? ach.badgeEmoji : '❓'}
                      fallbackGradient={unlocked ? `linear-gradient(135deg, ${color}, ${color}88)` : 'linear-gradient(135deg, #333, #555)'}
                      alt={unlocked ? ach.title : 'Locked achievement'}
                      width={36}
                      height={36}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: unlocked ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                        {unlocked ? ach.title : '???'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        {unlocked ? ach.description : ach.hint}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
