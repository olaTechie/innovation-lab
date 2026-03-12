import type { Scores } from '../types'
import { scoreLabels, scoreColors, getScoreGrade } from '../utils/scoring'

interface DashboardProps {
  scores: Scores
  previousScores?: Scores
  compact?: boolean
}

export function Dashboard({ scores, previousScores, compact }: DashboardProps) {
  const entries = Object.entries(scores) as [keyof Scores, number][]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14 }}>
      {entries.map(([key, value]) => {
        const prev = previousScores?.[key]
        const delta = prev !== undefined ? value - prev : undefined
        const grade = getScoreGrade(value)

        return (
          <div key={key} className="metric-bar">
            <div className="metric-bar-header">
              <span className="metric-bar-label">{scoreLabels[key]}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="metric-bar-value" style={{ color: grade.color }}>
                  {value}
                </span>
                {delta !== undefined && delta !== 0 && (
                  <span className={`score-delta ${delta > 0 ? 'positive' : 'negative'}`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                )}
              </span>
            </div>
            <div className="metric-bar-track">
              {prev !== undefined && (
                <div className="metric-bar-ghost" style={{ width: `${prev}%` }} />
              )}
              <div
                className="metric-bar-fill"
                style={{
                  width: `${value}%`,
                  background: `linear-gradient(90deg, ${scoreColors[key]}88, ${scoreColors[key]})`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Radar/Spider chart for debrief
interface RadarChartProps {
  scores: Scores
  comparisonScores?: Scores
  size?: number
}

export function RadarChart({ scores, comparisonScores, size = 280 }: RadarChartProps) {
  const entries = Object.entries(scores) as [keyof Scores, number][]
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const n = entries.length

  const getPoint = (index: number, value: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (value / 100) * radius
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  }

  const polygon = entries.map(([, v], i) => getPoint(i, v).join(',')).join(' ')
  const compPolygon = comparisonScores
    ? (Object.entries(comparisonScores) as [keyof Scores, number][])
        .map(([, v], i) => getPoint(i, v).join(','))
        .join(' ')
    : null

  // Grid circles
  const gridLevels = [20, 40, 60, 80, 100]

  return (
    <div className="radar-chart">
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
        {/* Grid */}
        {gridLevels.map((level) => {
          const pts = Array.from({ length: n }, (_, i) => getPoint(i, level).join(',')).join(' ')
          return (
            <polygon
              key={level}
              points={pts}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.5"
              opacity={level === 100 ? 0.4 : 0.2}
            />
          )
        })}
        {/* Axes */}
        {entries.map(([, ], i) => {
          const [px, py] = getPoint(i, 100)
          return <line key={i} x1={cx} y1={cy} x2={px} y2={py} stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3" />
        })}
        {/* Comparison polygon */}
        {compPolygon && (
          <polygon
            points={compPolygon}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="4,3"
          />
        )}
        {/* Score polygon */}
        <polygon
          points={polygon}
          fill="rgba(59,130,246,0.15)"
          stroke="var(--color-accent)"
          strokeWidth="2"
          className="radar-polygon"
        />
        {/* Score dots */}
        {entries.map(([key, value], i) => {
          const [px, py] = getPoint(i, value)
          return <circle key={key} cx={px} cy={py} r="4" fill={scoreColors[key]} stroke="var(--color-bg-card)" strokeWidth="2" />
        })}
        {/* Labels */}
        {entries.map(([key], i) => {
          const [px, py] = getPoint(i, 118)
          return (
            <text
              key={key}
              x={px}
              y={py}
              textAnchor="middle"
              dominantBaseline="middle"
              className="radar-axis-label"
              style={{ fill: scoreColors[key as keyof Scores] }}
            >
              {scoreLabels[key as keyof Scores].split(' ').map((word, wi) => (
                <tspan key={wi} x={px} dy={wi === 0 ? 0 : 13}>{word}</tspan>
              ))}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// Summary score cards
export function ScoreSummary({ scores }: { scores: Scores }) {
  const entries = Object.entries(scores) as [keyof Scores, number][]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)' }}>
      {entries.map(([key, value]) => {
        const grade = getScoreGrade(value)
        return (
          <div key={key} className="stat-card">
            <div className="stat-card-value" style={{ color: grade.color }}>{value}</div>
            <div className="stat-card-label">{scoreLabels[key]}</div>
            <div className="stat-card-trend" style={{ color: grade.color }}>{grade.label}</div>
          </div>
        )
      })}
    </div>
  )
}
