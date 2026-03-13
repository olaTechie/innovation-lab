import React, { Suspense, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { GlobeVisualization } from './GlobeVisualization'
import { VideoEmbed } from './VideoEmbed'
import { SeriesCarousel } from './SeriesCarousel'
import { CinematicIntro } from './CinematicIntro'
import { scenarios } from '../data/scenarios'

// Lazy-load Globe3D for code splitting
const Globe3D = React.lazy(() => import('./Globe3D'))

// WebGL detection
const hasWebGL = (() => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
})()

export function Landing() {
  const { setPhase, startGame, resetGame, phase, role } = useGameStore()
  const [introPhase, setIntroPhase] = useState<'carousel' | 'cinematic' | 'hero'>('carousel')

  const hasSavedGame = phase !== 'landing' && role !== null

  const handleStart = () => {
    resetGame()
    startGame()
    setPhase('role_selection')
  }

  const handleResume = () => {
    // Re-emit the stored phase so App.tsx renders the correct component
    setPhase(phase)
  }

  // Phase 1: Series Carousel
  if (introPhase === 'carousel') {
    return <SeriesCarousel onContinue={() => setIntroPhase('cinematic')} />
  }

  // Phase 2: Cinematic Stats
  if (introPhase === 'cinematic') {
    return <CinematicIntro onComplete={() => setIntroPhase('hero')} />
  }

  // Phase 3: Hero with video + globe + CTA
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Parallax background */}
      <div className="parallax-bg">
        <div className="parallax-bg__stars" />
        <div className="parallax-bg__nebula-top" />
        <div className="parallax-bg__nebula-bottom" />
        <div className="parallax-bg__vignette" />
      </div>

      {/* Warwick header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(18, 16, 31, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          {/* Placeholder crest: purple "W" square */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            background: '#7B2D8E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '0.85rem',
            color: 'white',
            flexShrink: 0,
          }}>
            W
          </div>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-text)',
          }}>
            Warwick Medical School
          </span>
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          IM93Q / IM9M1
        </div>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Subtitle badge */}
        <div className="animate-fade-in-up" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          background: 'var(--color-accent-muted)',
          borderRadius: 'var(--radius-full)',
          marginBottom: 'var(--space-lg)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Session 3 &middot; Emerging Innovations in Global Health
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 'var(--space-md)',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ede8f5 0%, #7B2D8E 50%, #4472C4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Innovation Lab:<br />Mission Control
        </h1>

        <p className="animate-fade-in-up" style={{
          fontSize: '1.15rem',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2xl)',
          lineHeight: 1.7,
          textAlign: 'center',
          maxWidth: 600,
        }}>
          You are the decision-maker. Deploy health innovations, allocate resources, and navigate three critical scenarios in the fictional nation of <strong style={{ color: 'var(--color-text)' }}>Asante</strong>. Every choice has consequences.
        </p>

        {/* Split layout: Video (left) + Globe (right) */}
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-xl)',
          maxWidth: 1000,
          width: '100%',
          marginBottom: 'var(--space-2xl)',
        }}>
          {/* Video embed */}
          <div>
            <VideoEmbed
              videoId="PLACEHOLDER_SERIES_OVERVIEW"
              title="Series Overview: Innovation Lab"
            />
          </div>

          {/* Globe */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {hasWebGL ? (
              <Suspense fallback={<GlobeVisualization />}>
                <Globe3D />
              </Suspense>
            ) : (
              <GlobeVisualization />
            )}
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          alignItems: 'center',
        }}>
          <button className="btn btn-primary btn-lg" onClick={handleStart} style={{ minWidth: 240 }}>
            Begin Mission
          </button>

          {hasSavedGame && (
            <button className="btn btn-ghost btn-sm" onClick={handleResume}>
              Resume Previous Session
            </button>
          )}
        </div>

        {/* Quick stats */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          color: 'var(--color-text-muted)',
          fontSize: '0.8rem',
        }}>
          <span>~40-50 minutes</span>
          <span>&middot;</span>
          <span>6 roles</span>
          <span>&middot;</span>
          <span>3 scenarios</span>
          <span>&middot;</span>
          <span>20 innovations</span>
        </div>

        {/* Scenario preview strip */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          display: 'flex',
          gap: 'var(--space-md)',
          maxWidth: 800,
          width: '100%',
        }}>
          {scenarios.map((scenario, idx) => (
            <div
              key={scenario.id}
              className="card-glass"
              style={{
                flex: 1,
                padding: 'var(--space-md)',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(123, 45, 142, 0.15)',
                  border: '1px solid rgba(123, 45, 142, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7L8 5z" fill="var(--color-accent)" />
                  </svg>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-text-muted)',
                }}>
                  SCENARIO {idx + 1}
                </span>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 2,
              }}>
                {scenario.title}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
              }}>
                {scenario.region}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'var(--space-xl)',
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
        }}>
          Warwick Medical School &middot; IM93Q / IM9M1
        </div>
      </div>

    </div>
  )
}
