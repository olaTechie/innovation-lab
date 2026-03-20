import { useState } from 'react'

interface VideoEmbedProps {
  videoId: string
  title?: string
  aspectRatio?: string
}

export function VideoEmbed({ videoId, title = 'Video', aspectRatio = '16/9' }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const isPlaceholder = videoId.startsWith('PLACEHOLDER')

  if (isPlaceholder && !playing) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        overflow: 'hidden',
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(123,45,142,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(123, 45, 142, 0.15)',
          border: '2px solid rgba(123, 45, 142, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7L8 5z" fill="var(--color-accent)" />
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 4,
          }}>
            Video Coming Soon
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: 0,
          }}>
            {title}
          </p>
        </div>
      </div>
    )
  }

  if (playing || !isPlaceholder) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: '#000',
      }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    )
  }

  // Non-placeholder: show clickable thumbnail
  return (
    <div
      onClick={() => setPlaying(true)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying(true) } }}
      role="button"
      tabIndex={0}
      aria-label="Play video"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#000',
      }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.7,
        }}
      />
      {/* Play button overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(123, 45, 142, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(123, 45, 142, 0.4)',
          transition: 'transform 0.2s ease',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7L8 5z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
