import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'
import { scenarios } from '../data/scenarios'
import { innovations } from '../data/innovations'
import { RadarChart, ScoreSummary } from './Dashboard'
import { JournalViewer, downloadJournal } from './ReflectionJournal'
import {
  getOverallScore,
  getRoleWeightedScore,
  generateRoleComparison,
  getScoreGrade,
  scoreLabels,
} from '../utils/scoring'
import type { Scores } from '../types'

export function Debrief() {
  const { scores, role, decisions, deployedInnovations, journalEntries, setPhase } = useGameStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'journal' | 'decisions'>('overview')

  const currentRole = roles.find((r) => r.id === role)
  const overallScore = getOverallScore(scores)
  const roleWeightedScore = role ? getRoleWeightedScore(scores, role) : overallScore
  const overallGrade = getScoreGrade(overallScore)
  const roleGrade = getScoreGrade(roleWeightedScore)

  const comparison = role ? generateRoleComparison(role, decisions, scores) : []

  // Best and worst metrics
  const sortedMetrics = (Object.entries(scores) as [keyof Scores, number][]).sort((a, b) => b[1] - a[1])
  const bestMetric = sortedMetrics[0]
  const worstMetric = sortedMetrics[sortedMetrics.length - 1]

  const deployedInns = deployedInnovations.map((d) => innovations.find((i) => i.id === d.innovationId)).filter(Boolean)

  const reflectionPrompts = [
    'What was the hardest trade-off you faced across all three scenarios?',
    'Which role perspective did you find hardest to reconcile with yours?',
    'What innovation combination surprised you with its impact?',
  ]

  const [reflectionResponses, setReflectionResponses] = useState<string[]>(reflectionPrompts.map(() => ''))

  const tabs = [
    { id: 'overview', label: 'Scorecard' },
    { id: 'comparison', label: 'Role Comparison' },
    { id: 'decisions', label: 'Decision History' },
    { id: 'journal', label: 'Reflection Journal' },
  ] as const

  return (
    <div>
      <div className="header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: '1.1rem' }}>{currentRole?.icon}</span>
          <span className="text-sm font-semibold" style={{ color: currentRole?.color }}>{currentRole?.title}</span>
          <span className="text-sm text-muted">&middot;</span>
          <span className="text-sm text-secondary">Mission Debrief</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setPhase('sandbox')}>
          Enter Sandbox Mode
        </button>
      </div>

      <div style={{ padding: 'var(--space-xl)', maxWidth: 1000, margin: '0 auto' }} className="phase-enter">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Mission Complete</h2>
          <p className="text-secondary">
            Here's how your decisions as <strong style={{ color: currentRole?.color }}>{currentRole?.title}</strong> shaped
            Asante's health outcomes.
          </p>
        </div>

        {/* Top-level scores */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-xl)',
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <p className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
              Overall Performance
            </p>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: overallGrade.color, lineHeight: 1 }}>
              {overallScore}
            </div>
            <div style={{ fontSize: '0.85rem', color: overallGrade.color, fontWeight: 600, marginTop: 4 }}>
              {overallGrade.label}
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <p className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
              {currentRole?.shortTitle} Score (Role-Weighted)
            </p>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: roleGrade.color, lineHeight: 1 }}>
              {roleWeightedScore}
            </div>
            <div style={{ fontSize: '0.85rem', color: roleGrade.color, fontWeight: 600, marginTop: 4 }}>
              {roleGrade.label}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-xs)',
          marginBottom: 'var(--space-xl)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--space-xs)',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
              <div>
                <h4 style={{ marginBottom: 'var(--space-md)' }}>Performance Radar</h4>
                <RadarChart scores={scores} />
              </div>
              <div>
                <h4 style={{ marginBottom: 'var(--space-md)' }}>Detailed Scores</h4>
                <ScoreSummary scores={scores} />
                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <div className="card" style={{ borderLeft: '3px solid var(--color-success)' }}>
                    <p className="text-xs text-muted" style={{ marginBottom: 4 }}>STRONGEST AREA</p>
                    <p className="font-semibold">{scoreLabels[bestMetric[0]]}: {bestMetric[1]}</p>
                  </div>
                  <div className="card" style={{ borderLeft: '3px solid var(--color-danger)', marginTop: 'var(--space-sm)' }}>
                    <p className="text-xs text-muted" style={{ marginBottom: 4 }}>AREA FOR IMPROVEMENT</p>
                    <p className="font-semibold">{scoreLabels[worstMetric[0]]}: {worstMetric[1]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployed innovations summary */}
            <div>
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Innovations Deployed ({deployedInns.length})</h4>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                {deployedInns.map((inn) => inn && (
                  <div key={inn.id} className="badge" style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    background: 'var(--color-bg-card)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}>
                    {inn.name} (${inn.cost}M)
                  </div>
                ))}
              </div>
            </div>

            {/* Reflection prompts */}
            <div>
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Final Reflections</h4>
              {reflectionPrompts.map((prompt, i) => (
                <div key={i} style={{ marginBottom: 'var(--space-md)' }}>
                  <p className="text-sm font-semibold" style={{ marginBottom: 6, color: 'var(--color-text-secondary)' }}>
                    {i + 1}. {prompt}
                  </p>
                  <textarea
                    value={reflectionResponses[i]}
                    onChange={(e) => {
                      const next = [...reflectionResponses]
                      next[i] = e.target.value
                      setReflectionResponses(next)
                    }}
                    placeholder="Your thoughts..."
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="animate-fade-in">
            <p className="text-secondary" style={{ marginBottom: 'var(--space-lg)' }}>
              How would other roles have fared with similar decisions? Each role weighs outcomes differently.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {comparison.map((comp) => {
                const compRole = roles.find((r) => r.id === comp.role)
                const compGrade = getScoreGrade(comp.likelyScore)
                return (
                  <div key={comp.role} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 'var(--radius-md)',
                      background: `${compRole?.color}18`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
                    }}>
                      {compRole?.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: compRole?.color, marginBottom: 4 }}>{comp.title}</h4>
                      <p className="text-sm text-secondary" style={{ lineHeight: 1.5, marginBottom: 0 }}>
                        {comp.keyDifference}
                      </p>
                    </div>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div className="font-mono font-bold" style={{ fontSize: '1.5rem', color: compGrade.color }}>
                        {comp.likelyScore}
                      </div>
                      <div className="text-xs" style={{ color: compGrade.color }}>{compGrade.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'decisions' && (
          <div className="animate-fade-in">
            <p className="text-secondary" style={{ marginBottom: 'var(--space-lg)' }}>
              A record of every decision you made across all three scenarios.
            </p>
            {decisions.map((dec, i) => {
              const scenario = scenarios.find((s) => s.id === dec.scenarioId)
              const dp = scenario?.decisionPoints.find((d) => d.id === dec.decisionPointId)
              const choice = dp?.choices.find((c) => c.id === dec.choiceId)
              return (
                <div key={i} className="card" style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="text-xs text-muted" style={{ textTransform: 'uppercase' }}>{scenario?.title}</span>
                    <span className="text-xs text-muted">{new Date(dec.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <h4 style={{ marginBottom: 4, fontSize: '0.95rem' }}>{dp?.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-accent)', marginBottom: 4 }}>
                    Chose: {choice?.label}
                  </p>
                  <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>{choice?.narrative?.slice(0, 200)}...</p>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <p className="text-secondary" style={{ marginBottom: 0 }}>Your reflection entries from this session.</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => downloadJournal(journalEntries, currentRole?.title || 'Unknown')}
                disabled={journalEntries.length === 0}
              >
                Download Journal
              </button>
            </div>
            <JournalViewer />
          </div>
        )}

        {/* Bottom actions */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-md)',
        }}>
          <button className="btn btn-secondary" onClick={() => {
            if (journalEntries.length > 0) {
              downloadJournal(journalEntries, currentRole?.title || 'Unknown')
            }
          }}>
            Download Full Report
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase('sandbox')}>
            Enter Sandbox Mode
          </button>
        </div>
      </div>
    </div>
  )
}
