import { useState } from 'react'

interface GameImageProps {
  src: string
  fallbackEmoji: string
  fallbackGradient?: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
  borderRadius?: string
}

export function GameImage({
  src,
  fallbackEmoji,
  fallbackGradient = 'linear-gradient(135deg, #7B2D8E, #4472C4)',
  alt,
  width = 48,
  height = 48,
  className,
  style,
  borderRadius = '50%',
}: GameImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={className}
        role="img"
        aria-label={alt}
        style={{
          width,
          height,
          borderRadius,
          background: fallbackGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: typeof width === 'number' ? width * 0.5 : '1.2rem',
          flexShrink: 0,
          ...style,
        }}
      >
        {fallbackEmoji}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      style={{
        width,
        height,
        borderRadius,
        objectFit: 'cover',
        flexShrink: 0,
        ...style,
      }}
    />
  )
}
