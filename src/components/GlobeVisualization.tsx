export function GlobeVisualization() {
  return (
    <div className="globe-container" style={{ width: 340, height: 340 }}>
      <svg viewBox="0 0 340 340" className="globe-svg" style={{ width: 340, height: 340 }}>
        <defs>
          <radialGradient id="globe-grad" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#2a1540" />
            <stop offset="100%" stopColor="#0a0a12" />
          </radialGradient>
          <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(123,45,142,0.08)" />
          </radialGradient>
          <filter id="blur-sm">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        {/* Glow ring */}
        <circle cx="170" cy="170" r="162" fill="none" stroke="rgba(123,45,142,0.12)" strokeWidth="4" />
        <circle cx="170" cy="170" r="155" fill="url(#globe-grad)" stroke="rgba(123,45,142,0.25)" strokeWidth="1.5" />
        <circle cx="170" cy="170" r="155" fill="url(#globe-glow)" />
        {/* Grid lines */}
        {[30, 60, 90, 120, 150].map((angle) => {
          const r = 155 * Math.sin((angle * Math.PI) / 180)
          const cy = 170 - 155 * Math.cos((angle * Math.PI) / 180)
          return <ellipse key={`lat-${angle}`} cx="170" cy={cy} rx={r} ry={r * 0.15} fill="none" stroke="rgba(123,45,142,0.08)" strokeWidth="0.5" />
        })}
        {[-30, 0, 30].map((angle) => (
          <ellipse key={`lon-${angle}`} cx="170" cy="170" rx={Math.max(20, 155 * Math.cos((angle * Math.PI) / 180) * 0.3)} ry="155" fill="none" stroke="rgba(123,45,142,0.08)" strokeWidth="0.5" transform={`rotate(${angle}, 170, 170)`} />
        ))}
        {/* Stylized Africa/continent shapes */}
        <g opacity="0.6">
          {/* Africa-like shape */}
          <path d="M 155 95 Q 148 110 150 130 Q 145 145 148 160 Q 150 175 155 185 Q 160 195 158 210 Q 155 220 160 225 Q 168 230 175 220 Q 178 210 180 195 Q 182 180 178 165 Q 175 150 180 135 Q 185 120 178 105 Q 170 95 155 95 Z" fill="#4A7C59" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          {/* Europe hint */}
          <path d="M 148 80 Q 155 75 165 78 Q 175 82 168 88 Q 160 92 150 88 Z" fill="#5B8BA0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          {/* Middle East hint */}
          <path d="M 185 100 Q 195 95 200 105 Q 198 115 190 112 Z" fill="#C17547" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </g>
        {/* Asante highlight - pulsing */}
        <circle cx="162" cy="160" r="6" fill="#7B2D8E" opacity="0.8">
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="162" cy="160" r="3" fill="#9B4DBA" />
        {/* Arcs showing connections */}
        <path d="M 162 160 Q 140 120 150 85" fill="none" stroke="rgba(123,45,142,0.3)" strokeWidth="1" strokeDasharray="3,3">
          <animate attributeName="strokeDashoffset" values="0;-6" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M 162 160 Q 195 140 200 105" fill="none" stroke="rgba(123,45,142,0.3)" strokeWidth="1" strokeDasharray="3,3">
          <animate attributeName="strokeDashoffset" values="0;-6" dur="1.8s" repeatCount="indefinite" />
        </path>
        {/* Label */}
        <text x="175" y="153" fill="white" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.9">ASANTE</text>
      </svg>
    </div>
  )
}
