import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  RoleId,
  GamePhase,
  Scores,
  ResourceAllocation,
  JournalEntry,
  DecisionRecord,
  DeployedInnovation,
  CrisisResponseRecord,
  ObjectiveStatus,
  GameStateSnapshot,
} from '../types'
import { achievements } from '../data/achievements'
import { hiddenObjectives } from '../data/hiddenObjectives'
import { unlockables } from '../data/unlockables'

const XP_LEVELS = [
  { level: 1, title: 'Field Observer', threshold: 0 },
  { level: 2, title: 'Health Strategist', threshold: 500 },
  { level: 3, title: 'Policy Architect', threshold: 1500 },
  { level: 4, title: 'Global Health Leader', threshold: 3000 },
]

function getLevelFromXP(xp: number): number {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].threshold) return XP_LEVELS[i].level
  }
  return 1
}

interface GameState {
  phase: GamePhase
  role: RoleId | null
  scores: Scores
  resources: ResourceAllocation
  totalBudget: number
  journalEntries: JournalEntry[]
  decisions: DecisionRecord[]
  deployedInnovations: DeployedInnovation[]
  scenarioIndex: number
  decisionPointIndex: number
  innovationBudgetUsed: number
  innovationBudgetTotal: number
  startTime: number | null
  sandboxScores: Scores | null

  // Gamification state
  xp: number
  achievements: string[]
  pendingToasts: { id: string; title: string; emoji: string; xp: number }[]
  hiddenObjectiveStatus: ObjectiveStatus[]
  crisisHistory: CrisisResponseRecord[]
  streakMetric: string | null
  streakCount: number
  unlockedContent: string[]
  sandboxEntryTime: number | null
  viewedIntelCount: number
  boldMoveTriggered: boolean
  communityStreakTriggered: boolean
  missionReportXPAwarded: number[]

  // Actions
  setPhase: (phase: GamePhase) => void
  selectRole: (role: RoleId) => void
  updateScores: (delta: Partial<Scores>) => void
  setResources: (resources: Partial<ResourceAllocation>) => void
  addJournalEntry: (entry: Omit<JournalEntry, 'timestamp'>) => void
  recordDecision: (decision: Omit<DecisionRecord, 'timestamp'>) => void
  deployInnovation: (innovation: DeployedInnovation) => void
  removeInnovation: (innovationId: string) => void
  advanceScenario: () => void
  advanceDecisionPoint: () => void
  setScenarioIndex: (index: number) => void
  setDecisionPointIndex: (index: number) => void
  setSandboxScores: (scores: Scores) => void
  setInnovationBudgetUsed: (used: number) => void
  resetGame: () => void
  startGame: () => void

  // Gamification actions
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
  dismissToast: (id: string) => void
  recordCrisisResponse: (crisisId: string, choiceId: string, scenarioIndex: number) => void
  updateStreak: (dominantMetric: string | null) => void
  checkAchievements: () => void
  checkUnlocks: () => void
  initializeObjectives: (roleId: string) => void
  updateObjectiveStatus: () => void
  setSandboxEntryTime: () => void
  incrementIntelViews: () => void
  triggerBoldMove: () => void
  markMissionReportXP: (scenarioIndex: number) => void
  getStateSnapshot: () => GameStateSnapshot
}

const initialScores: Scores = {
  coverage: 30,
  equity: 25,
  costEffectiveness: 40,
  sustainability: 35,
  communityTrust: 30,
  healthOutcomes: 25,
}

const initialResources: ResourceAllocation = {
  budget: 50,
  workforce: 50,
  technology: 30,
  communityEngagement: 40,
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: 'landing',
      role: null,
      scores: { ...initialScores },
      resources: { ...initialResources },
      totalBudget: 250,
      journalEntries: [],
      decisions: [],
      deployedInnovations: [],
      scenarioIndex: 0,
      decisionPointIndex: 0,
      innovationBudgetUsed: 0,
      innovationBudgetTotal: 30,
      startTime: null,
      sandboxScores: null,

      // Gamification defaults
      xp: 0,
      achievements: [],
      pendingToasts: [],
      hiddenObjectiveStatus: [],
      crisisHistory: [],
      streakMetric: null,
      streakCount: 0,
      unlockedContent: [],
      sandboxEntryTime: null,
      viewedIntelCount: 0,
      boldMoveTriggered: false,
      communityStreakTriggered: false,
      missionReportXPAwarded: [],

      setPhase: (phase) => set({ phase }),

      selectRole: (role) => set({ role }),

      updateScores: (delta) =>
        set((state) => {
          const newScores = { ...state.scores }
          for (const [key, value] of Object.entries(delta)) {
            if (value !== undefined) {
              const k = key as keyof Scores
              newScores[k] = Math.max(0, Math.min(100, newScores[k] + value))
            }
          }
          return { scores: newScores }
        }),

      setResources: (resources) =>
        set((state) => ({
          resources: { ...state.resources, ...resources },
        })),

      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [
            ...state.journalEntries,
            { ...entry, timestamp: Date.now() },
          ],
        })),

      recordDecision: (decision) =>
        set((state) => ({
          decisions: [
            ...state.decisions,
            { ...decision, timestamp: Date.now() },
          ],
        })),

      deployInnovation: (innovation) =>
        set((state) => ({
          deployedInnovations: [...state.deployedInnovations, innovation],
        })),

      removeInnovation: (innovationId) =>
        set((state) => ({
          deployedInnovations: state.deployedInnovations.filter(
            (i) => i.innovationId !== innovationId
          ),
        })),

      advanceScenario: () =>
        set((state) => ({
          scenarioIndex: state.scenarioIndex + 1,
          decisionPointIndex: 0,
        })),

      advanceDecisionPoint: () =>
        set((state) => ({
          decisionPointIndex: state.decisionPointIndex + 1,
        })),

      setScenarioIndex: (index) => set({ scenarioIndex: index }),
      setDecisionPointIndex: (index) => set({ decisionPointIndex: index }),

      setSandboxScores: (scores) => set({ sandboxScores: scores }),

      setInnovationBudgetUsed: (used) => set({ innovationBudgetUsed: used }),

      resetGame: () =>
        set({
          phase: 'landing',
          role: null,
          scores: { ...initialScores },
          resources: { ...initialResources },
          journalEntries: [],
          decisions: [],
          deployedInnovations: [],
          scenarioIndex: 0,
          decisionPointIndex: 0,
          innovationBudgetUsed: 0,
          startTime: null,
          sandboxScores: null,
          xp: 0,
          achievements: [],
          pendingToasts: [],
          hiddenObjectiveStatus: [],
          crisisHistory: [],
          streakMetric: null,
          streakCount: 0,
          unlockedContent: [],
          sandboxEntryTime: null,
          viewedIntelCount: 0,
          boldMoveTriggered: false,
          communityStreakTriggered: false,
          missionReportXPAwarded: [],
        }),

      startGame: () => set({ startTime: Date.now() }),

      // Gamification actions

      getStateSnapshot: () => {
        const s = get()
        return {
          scores: s.scores,
          role: s.role,
          decisions: s.decisions,
          deployedInnovations: s.deployedInnovations,
          journalEntries: s.journalEntries,
          achievements: s.achievements,
          crisisHistory: s.crisisHistory,
          xp: s.xp,
          scenarioIndex: s.scenarioIndex,
          innovationBudgetUsed: s.innovationBudgetUsed,
          innovationBudgetTotal: s.innovationBudgetTotal,
        }
      },

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      unlockAchievement: (id) => set((state) => {
        if (state.achievements.includes(id)) return {}
        const achievement = achievements.find((a) => a.id === id)
        if (!achievement) return {}
        return {
          achievements: [...state.achievements, id],
          xp: state.xp + achievement.xpReward,
          pendingToasts: [...state.pendingToasts, {
            id: achievement.id,
            title: achievement.title,
            emoji: achievement.badgeEmoji,
            xp: achievement.xpReward,
          }],
        }
      }),

      dismissToast: (id) => set((state) => ({
        pendingToasts: state.pendingToasts.filter((t) => t.id !== id),
      })),

      recordCrisisResponse: (crisisId, choiceId, scenarioIndex) => set((state) => ({
        crisisHistory: [...state.crisisHistory, { crisisId, choiceId, scenarioIndex, timestamp: Date.now() }],
      })),

      updateStreak: (dominantMetric) => set((state) => {
        if (!dominantMetric) return { streakMetric: null, streakCount: 0 }
        if (dominantMetric === state.streakMetric) {
          const newCount = state.streakCount + 1
          return {
            streakCount: newCount,
            ...(dominantMetric === 'communityTrust' && newCount >= 3 && !state.communityStreakTriggered
              ? { communityStreakTriggered: true } : {}),
          }
        }
        return { streakMetric: dominantMetric, streakCount: 1 }
      }),

      checkAchievements: () => {
        const state = get()
        const snapshot = state.getStateSnapshot()
        for (const achievement of achievements) {
          if (state.achievements.includes(achievement.id)) continue
          if (achievement.id === 'bold-move' && state.boldMoveTriggered) {
            state.unlockAchievement(achievement.id); continue
          }
          if (achievement.id === 'community-first-x3' && state.communityStreakTriggered) {
            state.unlockAchievement(achievement.id); continue
          }
          try {
            if (achievement.condition(snapshot)) state.unlockAchievement(achievement.id)
          } catch { /* skip */ }
        }
      },

      checkUnlocks: () => {
        const state = get()
        const snapshot = state.getStateSnapshot()
        const newUnlocks: string[] = []
        for (const unlock of unlockables) {
          if (state.unlockedContent.includes(unlock.id)) continue
          if (unlock.id === 'alt-endings') {
            const allComplete = state.hiddenObjectiveStatus.length >= 3 && state.hiddenObjectiveStatus.every((o) => o.completed)
            if (allComplete) newUnlocks.push(unlock.id)
            continue
          }
          try { if (unlock.unlockCondition(snapshot)) newUnlocks.push(unlock.id) } catch { /* skip */ }
        }
        if (newUnlocks.length > 0) set((s) => ({ unlockedContent: [...s.unlockedContent, ...newUnlocks] }))
      },

      initializeObjectives: (roleId) => {
        const roleObjectives = hiddenObjectives.filter((o) => o.roleId === roleId)
        set({ hiddenObjectiveStatus: roleObjectives.map((o) => ({ id: o.id, completed: false })) })
      },

      updateObjectiveStatus: () => {
        const state = get()
        const snapshot = state.getStateSnapshot()
        set({
          hiddenObjectiveStatus: state.hiddenObjectiveStatus.map((os) => {
            if (os.completed) return os
            const obj = hiddenObjectives.find((o) => o.id === os.id)
            if (!obj) return os
            try { return { ...os, completed: obj.condition(snapshot) } } catch { return os }
          }),
        })
      },

      setSandboxEntryTime: () => set((state) => ({
        sandboxEntryTime: state.sandboxEntryTime || Date.now(),
      })),

      incrementIntelViews: () => set((state) => ({
        viewedIntelCount: state.viewedIntelCount + 1,
      })),

      triggerBoldMove: () => set({ boldMoveTriggered: true }),

      markMissionReportXP: (scenarioIndex) => set((state) => {
        if (state.missionReportXPAwarded.includes(scenarioIndex)) return {}
        return { missionReportXPAwarded: [...state.missionReportXPAwarded, scenarioIndex] }
      }),
    }),
    {
      name: 'innovation-lab-game-state',
      partialize: (state) => ({
        phase: state.phase,
        role: state.role,
        scores: state.scores,
        resources: state.resources,
        journalEntries: state.journalEntries,
        decisions: state.decisions,
        deployedInnovations: state.deployedInnovations,
        scenarioIndex: state.scenarioIndex,
        decisionPointIndex: state.decisionPointIndex,
        innovationBudgetUsed: state.innovationBudgetUsed,
        startTime: state.startTime,
        xp: state.xp,
        achievements: state.achievements,
        hiddenObjectiveStatus: state.hiddenObjectiveStatus,
        crisisHistory: state.crisisHistory,
        streakMetric: state.streakMetric,
        streakCount: state.streakCount,
        unlockedContent: state.unlockedContent,
        sandboxEntryTime: state.sandboxEntryTime,
        viewedIntelCount: state.viewedIntelCount,
        boldMoveTriggered: state.boldMoveTriggered,
        communityStreakTriggered: state.communityStreakTriggered,
        missionReportXPAwarded: state.missionReportXPAwarded,
      }),
    }
  )
)

export { getLevelFromXP, XP_LEVELS }
