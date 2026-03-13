// src/components/AchievementToast.tsx
import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'

export function AchievementToast() {
  const pendingToasts = useGameStore((s) => s.pendingToasts)
  const dismissToast = useGameStore((s) => s.dismissToast)

  useEffect(() => {
    if (pendingToasts.length === 0) return
    const timer = setTimeout(() => {
      dismissToast(pendingToasts[0].id)
    }, 4000)
    return () => clearTimeout(timer)
  }, [pendingToasts, dismissToast])

  if (pendingToasts.length === 0) return null

  return (
    <div className="achievement-toast-container">
      {pendingToasts.slice(0, 3).map((toast, i) => (
        <div
          key={toast.id}
          className="achievement-toast"
          style={{ animationDelay: `${i * 100}ms` }}
          onClick={() => dismissToast(toast.id)}
        >
          <div className="achievement-toast-icon">{toast.emoji}</div>
          <div className="achievement-toast-content">
            <div className="achievement-toast-label">Achievement Unlocked</div>
            <div className="achievement-toast-title">{toast.title}</div>
          </div>
          <div className="achievement-toast-xp">+{toast.xp} XP</div>
        </div>
      ))}
    </div>
  )
}
