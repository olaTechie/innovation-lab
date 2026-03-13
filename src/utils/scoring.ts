import type { Scores, RoleId, ResourceAllocation } from '../types'

export function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value))
}

export function applyResourceEffects(
  scores: Scores,
  resources: ResourceAllocation,
  prevResources: ResourceAllocation
): Partial<Scores> {
  const delta: Partial<Scores> = {}

  const budgetDiff = resources.budget - prevResources.budget
  const workforceDiff = resources.workforce - prevResources.workforce
  const techDiff = resources.technology - prevResources.technology
  const communityDiff = resources.communityEngagement - prevResources.communityEngagement

  if (budgetDiff !== 0) {
    delta.coverage = Math.round(budgetDiff * 0.15)
    delta.healthOutcomes = Math.round(budgetDiff * 0.1)
  }
  if (workforceDiff !== 0) {
    delta.coverage = (delta.coverage || 0) + Math.round(workforceDiff * 0.12)
    delta.equity = Math.round(workforceDiff * 0.15)
    delta.communityTrust = Math.round(workforceDiff * 0.08)
  }
  if (techDiff !== 0) {
    delta.costEffectiveness = Math.round(techDiff * 0.12)
    delta.coverage = (delta.coverage || 0) + Math.round(techDiff * 0.08)
    delta.sustainability = Math.round(techDiff * 0.06)
  }
  if (communityDiff !== 0) {
    delta.communityTrust = (delta.communityTrust || 0) + Math.round(communityDiff * 0.18)
    delta.sustainability = (delta.sustainability || 0) + Math.round(communityDiff * 0.12)
    delta.equity = (delta.equity || 0) + Math.round(communityDiff * 0.1)
  }

  return delta
}

export function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excellent', color: 'var(--color-success)' }
  if (score >= 60) return { label: 'Good', color: 'var(--color-accent)' }
  if (score >= 40) return { label: 'Fair', color: 'var(--color-warning)' }
  return { label: 'Critical', color: 'var(--color-danger)' }
}

export function getOverallScore(scores: Scores): number {
  const values = Object.values(scores)
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
}

export function getRoleWeightedScore(scores: Scores, role: RoleId): number {
  const weights = roleScoreWeights[role]
  let total = 0
  let weightSum = 0
  for (const [key, weight] of Object.entries(weights)) {
    total += scores[key as keyof Scores] * weight
    weightSum += weight
  }
  return Math.round(total / weightSum)
}

const roleScoreWeights: Record<RoleId, Record<keyof Scores, number>> = {
  health_minister: {
    coverage: 1.5,
    equity: 0.8,
    costEffectiveness: 1.3,
    sustainability: 1.0,
    communityTrust: 0.7,
    healthOutcomes: 1.2,
  },
  ngo_director: {
    coverage: 0.8,
    equity: 1.0,
    costEffectiveness: 0.9,
    sustainability: 1.5,
    communityTrust: 1.3,
    healthOutcomes: 1.2,
  },
  chw: {
    coverage: 0.9,
    equity: 1.2,
    costEffectiveness: 0.7,
    sustainability: 1.0,
    communityTrust: 1.5,
    healthOutcomes: 1.3,
  },
  tech_entrepreneur: {
    coverage: 1.3,
    equity: 0.6,
    costEffectiveness: 1.5,
    sustainability: 1.2,
    communityTrust: 0.6,
    healthOutcomes: 1.0,
  },
  who_advisor: {
    coverage: 1.2,
    equity: 1.5,
    costEffectiveness: 0.8,
    sustainability: 1.0,
    communityTrust: 0.8,
    healthOutcomes: 1.3,
  },
  patient_advocate: {
    coverage: 0.8,
    equity: 1.5,
    costEffectiveness: 0.6,
    sustainability: 0.9,
    communityTrust: 1.4,
    healthOutcomes: 1.3,
  },
}

export function generateRoleComparison(
  currentRole: RoleId,
  decisions: { choiceId: string }[],
  scores: Scores
): { role: RoleId; title: string; likelyScore: number; keyDifference: string }[] {
  const allRoles: { id: RoleId; title: string }[] = [
    { id: 'health_minister', title: 'Minister of Health' },
    { id: 'ngo_director', title: 'NGO Director' },
    { id: 'chw', title: 'Community Health Worker' },
    { id: 'tech_entrepreneur', title: 'Tech Entrepreneur' },
    { id: 'who_advisor', title: 'WHO Regional Advisor' },
    { id: 'patient_advocate', title: 'Patient Advocate' },
  ]

  const differences: Record<RoleId, string> = {
    health_minister: 'Would have prioritized national coverage metrics and budget efficiency, potentially sacrificing community engagement.',
    ngo_director: 'Would have focused on sustainability and community ownership, accepting slower initial progress for lasting impact.',
    chw: 'Would have prioritized culturally appropriate, ground-level solutions that communities can maintain independently.',
    tech_entrepreneur: 'Would have pushed for technology-first solutions, accepting higher upfront costs for greater scalability.',
    who_advisor: 'Would have insisted on evidence-based approaches and equity metrics, sometimes at the cost of speed.',
    patient_advocate: 'Would have centered patient experience and access, challenging top-down decisions that ignore community voice.',
  }

  return allRoles
    .filter((r) => r.id !== currentRole)
    .map((r) => ({
      role: r.id,
      title: r.title,
      likelyScore: getRoleWeightedScore(scores, r.id),
      keyDifference: differences[r.id],
    }))
}

export const scoreLabels: Record<keyof Scores, string> = {
  coverage: 'Population Coverage',
  equity: 'Health Equity',
  costEffectiveness: 'Cost-Effectiveness',
  sustainability: 'Sustainability',
  communityTrust: 'Community Trust',
  healthOutcomes: 'Health Outcomes',
}

export const scoreColors: Record<keyof Scores, string> = {
  coverage: '#4472C4',
  equity: '#8b5cf6',
  costEffectiveness: '#10b981',
  sustainability: '#f59e0b',
  communityTrust: '#ec4899',
  healthOutcomes: '#ef4444',
}
