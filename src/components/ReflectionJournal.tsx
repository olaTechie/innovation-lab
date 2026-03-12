import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { roles } from '../data/roles'

interface ReflectionModalProps {
  prompt: string
  onSubmit: (response: string) => void
  onSkip: () => void
}

export function ReflectionModal({ prompt, onSubmit, onSkip }: ReflectionModalProps) {
  const [response, setResponse] = useState('')
  const { role } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)

  const filledPrompt = prompt.replace('{role}', currentRole?.title || 'your role')

  return (
    <div className="outcome-overlay">
      <div className="outcome-card" style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="badge" style={{
            background: 'rgba(236, 72, 153, 0.15)',
            color: '#ec4899',
            marginBottom: 'var(--space-md)',
          }}>
            REFLECTION
          </div>
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>Pause and Reflect</h3>
          <p className="text-secondary" style={{ lineHeight: 1.7 }}>
            {filledPrompt}
          </p>
        </div>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Share your thoughts... (your journal entries will be available for download at the end)"
          rows={5}
          style={{ marginBottom: 'var(--space-lg)' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-ghost" onClick={onSkip}>Skip</button>
          <button
            className="btn btn-primary"
            onClick={() => onSubmit(response)}
            disabled={!response.trim()}
          >
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  )
}

export function JournalViewer() {
  const { journalEntries, role } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)

  if (journalEntries.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-muted)' }}>
        No journal entries yet. Reflections will appear here.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {journalEntries.map((entry, i) => (
        <div key={i} className="card" style={{ borderLeft: `3px solid ${currentRole?.color || 'var(--color-accent)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {entry.phase.replace(/_/g, ' ')}
            </span>
            <span className="text-xs text-muted">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', marginBottom: 6, fontStyle: 'italic' }}>
            &ldquo;{entry.prompt}&rdquo;
          </p>
          <p className="text-sm" style={{ lineHeight: 1.6 }}>{entry.response}</p>
        </div>
      ))}
    </div>
  )
}

export function downloadJournal(entries: { phase: string; prompt: string; response: string; timestamp: number }[], roleName: string) {
  let text = `INNOVATION LAB: MISSION CONTROL\nReflection Journal\nRole: ${roleName}\nDate: ${new Date().toLocaleDateString()}\n\n`
  text += '='.repeat(50) + '\n\n'

  entries.forEach((entry, i) => {
    text += `--- Entry ${i + 1} (${entry.phase.replace(/_/g, ' ')}) ---\n`
    text += `Time: ${new Date(entry.timestamp).toLocaleTimeString()}\n`
    text += `Prompt: ${entry.prompt}\n`
    text += `Response: ${entry.response}\n\n`
  })

  text += '='.repeat(50) + '\n'
  text += 'Warwick Medical School - Emerging Innovations in Global Health\n'

  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reflection-journal-${roleName.toLowerCase().replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
