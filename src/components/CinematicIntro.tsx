import { useState, useEffect, useCallback } from 'react'

interface CinematicStat {
  number: string
  context: string
  source: string
}

const cinematicStats: CinematicStat[] = [
  {
    number: '4.6 billion',
    context: 'People lack access to essential health services -- more than half the world\'s population, and the number has increased from previous estimates.',
    source: 'WHO/World Bank, Tracking Universal Health Coverage: 2025 Global Monitoring Report',
  },
  {
    number: '10 million',
    context: 'The projected global health worker shortage by 2030. In Africa alone, an additional shortfall of 600,000 workers. You cannot train your way out of this gap; innovation must multiply the reach of every worker.',
    source: 'WHO World Health Statistics 2025',
  },
  {
    number: '$1 vs. $50,000',
    context: 'A Foldscope paper microscope costs under $1. An OVision cancer diagnostic built on a $35 Raspberry Pi achieves 95% accuracy compared to systems costing $50,000-$200,000. This is what frugal innovation looks like.',
    source: 'Stanford Prakash Lab / Nature Scientific Reports 2025',
  },
  {
    number: '0 of 13',
    context: 'The number of SDG 3 health targets currently on track for 2030. TB notifications hit 7.5 million. Malaria cases exceeded pre-pandemic levels. The world is going backwards, and innovation is the only variable that can bend these curves.',
    source: 'UN SDG Progress Report; WHO Global TB Report 2023; WHO World Malaria Report 2023',
  },
]

interface CinematicIntroProps {
  onComplete: () => void
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [phase, setPhase] = useState<'number' | 'context'>('number')

  const advanceSlide = useCallback(() => {
    if (phase === 'number') {
      setPhase('context')
    } else {
      if (currentSlide < cinematicStats.length - 1) {
        setCurrentSlide((s) => s + 1)
        setPhase('number')
      } else {
        onComplete()
      }
    }
  }, [phase, currentSlide, onComplete])

  useEffect(() => {
    const delay = phase === 'number' ? 1000 : 2000
    const timer = setTimeout(advanceSlide, delay)
    return () => clearTimeout(timer)
  }, [currentSlide, phase, advanceSlide])

  const stat = cinematicStats[currentSlide]

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
      background: 'var(--color-bg)',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(123,45,142,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Stat content */}
      <div
        key={`stat-${currentSlide}`}
        aria-live="polite"
        style={{
          textAlign: 'center',
          maxWidth: 700,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Big number */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-lg)',
          animation: 'cinematicFadeIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) both',
        }}>
          {stat.number}
        </div>

        {/* Context text */}
        {phase === 'context' && (
          <div style={{
            animation: 'cinematicSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
          }}>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-md)',
            }}>
              {stat.context}
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}>
              {stat.source}
            </p>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 2,
      }}>
        {cinematicStats.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: idx === currentSlide
                ? 'var(--color-accent)'
                : idx < currentSlide
                  ? 'rgba(123, 45, 142, 0.4)'
                  : 'var(--color-border)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="btn btn-ghost btn-sm"
        style={{
          position: 'absolute',
          bottom: 'var(--space-xl)',
          right: 'var(--space-xl)',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          opacity: 0.6,
          zIndex: 2,
        }}
      >
        Skip
      </button>
    </div>
  )
}
