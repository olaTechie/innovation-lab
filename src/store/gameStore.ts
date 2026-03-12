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
} from '../types'

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
  resetGame: () => void
  startGame: () => void
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
        }),

      startGame: () => set({ startTime: Date.now() }),
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
      }),
    }
  )
)
