import { useState, useCallback, useEffect } from 'react'
import { sessions } from '../data/series'

interface SeriesCarouselProps {
  onContinue: () => void
}

export function SeriesCarousel({ onContinue }: SeriesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(2) // Default to Session 3 ("current")

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((i) => Math.min(sessions.length - 1, i + 1))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'COMPLETED',
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          glow: false,
        }
      case 'current':
        return {
          label: 'YOU ARE HERE',
          bg: 'rgba(123, 45, 142, 0.2)',
          color: '#9B4DBA',
          glow: true,
        }
      case 'upcoming':
        return {
          label: 'UPCOMING',
          bg: 'rgba(106, 93, 128, 0.15)',
          color: '#6a5d80',
          glow: false,
        }
      default:
        return { label: '', bg: '', color: '', glow: false }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-xl)',
      position: 'relative',
    }}>
      {/* Parallax background */}
      <div className="parallax-bg">
        <div className="parallax-bg__stars" />
        <div className="parallax-bg__nebula-top" />
        <div className="parallax-bg__nebula-bottom" />
        <div className="parallax-bg__vignette" />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100 }}>
        {/* Header */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            background: 'var(--color-accent-muted)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-md)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-accent)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Emerging Innovations in Global Health
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-sm)',
          }}>
            Your Learning Journey
          </h1>
          <p className="text-secondary" style={{ fontSize: '1rem' }}>
            Four sessions. From inspiration to impact.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
        }}>
          {sessions.map((session, idx) => {
            const badge = getStatusBadge(session.status)
            const isActive = idx === activeIndex
            const isDim = session.status === 'upcoming'

            return (
              <div
                key={session.id}
                onClick={() => setActiveIndex(idx)}
                className="card-glass"
                style={{
                  cursor: 'pointer',
                  opacity: isDim ? 0.6 : 1,
                  borderColor: isActive ? 'rgba(123, 45, 142, 0.4)' : undefined,
                  boxShadow: isActive ? '0 0 20px rgba(123, 45, 142, 0.15)' : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Status badge */}
                <div style={{
                  display: 'inline-flex',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: badge.bg,
                  color: badge.color,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  marginBottom: 'var(--space-sm)',
                  animation: badge.glow ? 'pulseGlow 2.5s ease-in-out infinite' : undefined,
                }}>
                  {badge.label}
                </div>

                {/* Session number */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: 4,
                }}>
                  SESSION {session.id}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  marginBottom: 4,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                }}>
                  {session.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-md)',
                }}>
                  {session.subtitle}
                </p>

                {/* Details */}
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px 12px',
                }}>
                  <span>{session.duration}</span>
                  <span>{session.format}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dot navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 'var(--space-xl)',
        }}>
          {sessions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: idx === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 'var(--radius-full)',
                background: idx === activeIndex ? 'var(--color-accent)' : 'var(--color-border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Session detail (for active) */}
        {sessions[activeIndex] && (
          <div className="animate-fade-in" style={{
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto var(--space-xl)',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
            }}>
              {sessions[activeIndex].summary}
            </p>
          </div>
        )}

        {/* Continue button */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
