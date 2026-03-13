import { VideoEmbed } from './VideoEmbed'
import type { Scenario } from '../types'

interface ScenarioIntroProps {
  scenario: Scenario
  videoId: string
  onContinue: () => void
}

export function ScenarioIntro({ scenario, videoId, onContinue }: ScenarioIntroProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg)',
    }}>
      {/* Header */}
      <div className="header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span className="text-sm text-secondary">Scenario Briefing</span>
        </div>
      </div>

      <div className="phase-enter" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        maxWidth: 800,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Region badge */}
        <div className="badge" style={{
          background: 'var(--color-danger-muted)',
          color: 'var(--color-danger)',
          padding: '6px 16px',
          fontSize: '0.75rem',
          marginBottom: 'var(--space-md)',
        }}>
          {scenario.region.toUpperCase()}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 'var(--space-sm)',
          animation: 'cinematicSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both',
        }}>
          {scenario.title}
        </h1>
        <p className="text-lg text-secondary" style={{
          textAlign: 'center',
          marginBottom: 'var(--space-xl)',
        }}>
          {scenario.subtitle}
        </p>

        {/* Video embed */}
        <div style={{ width: '100%', marginBottom: 'var(--space-lg)' }}>
          <VideoEmbed
            videoId={videoId}
            title={`Scenario Briefing: ${scenario.title}`}
          />
        </div>

        {/* Prompt */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginBottom: 'var(--space-lg)',
        }}>
          Watch the briefing, then continue
        </p>

        {/* Continue button - enabled immediately */}
        <button
          className="btn btn-primary btn-lg"
          onClick={onContinue}
        >
          Continue to Briefing &rarr;
        </button>
      </div>
    </div>
  )
}
