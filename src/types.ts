export type RoleId = 'health_minister' | 'ngo_director' | 'chw' | 'tech_entrepreneur' | 'who_advisor' | 'patient_advocate'

export interface Role {
  id: RoleId
  title: string
  shortTitle: string
  icon: string
  portraitImage?: string
  color: string
  description: string
  priorities: string[]
  metrics: string[]
  uniqueInfo: string
}

export type ScenarioId = 'silent_epidemic' | 'invisible_threat' | 'long_game'

export interface ScenarioChoice {
  id: string
  label: string
  description: string
  effects: Partial<Scores>
  narrative: string
  roleModifiers?: Partial<Record<RoleId, Partial<Scores>>>
}

export interface DecisionPoint {
  id: string
  title: string
  prompt: string
  context: string
  choices: ScenarioChoice[]
  roleSpecificContext?: Partial<Record<RoleId, string>>
}

export interface Scenario {
  id: ScenarioId
  title: string
  subtitle: string
  region: string
  setting: string
  backgroundNarrative: string
  keyStats: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[]
  decisionPoints: DecisionPoint[]
  reflectionPrompt: string
}

export type InnovationCategory = 'frugal' | 'social_big_data' | 'digital_health_ai' | 'genai' | 'patient_centric'

export interface Innovation {
  id: string
  name: string
  category: InnovationCategory
  cost: number
  impact: number
  description: string
  realWorldBasis: string
  imageUrl?: string
  compatibility: Partial<Record<InnovationCategory, number>>
  roleAffinity: Partial<Record<RoleId, number>>
  effects: Partial<Scores>
}

export interface Scores {
  coverage: number
  equity: number
  costEffectiveness: number
  sustainability: number
  communityTrust: number
  healthOutcomes: number
}

export type GamePhase =
  | 'landing'
  | 'role_selection'
  | 'hidden_objectives'
  | 'country_briefing'
  | 'scenario_1'
  | 'mission_report_1'
  | 'innovation_assembly_1'
  | 'scenario_2'
  | 'mission_report_2'
  | 'innovation_assembly_2'
  | 'scenario_3'
  | 'mission_report_3'
  | 'innovation_assembly_3'
  | 'debrief'
  | 'sandbox'

export interface ResourceAllocation {
  budget: number
  workforce: number
  technology: number
  communityEngagement: number
}

export interface JournalEntry {
  phase: GamePhase
  prompt: string
  response: string
  timestamp: number
}

export interface DecisionRecord {
  scenarioId: ScenarioId
  decisionPointId: string
  choiceId: string
  timestamp: number
}

export interface DeployedInnovation {
  innovationId: string
  scenarioPhase: number
}

// --- Gamification Types ---

export type AchievementCategory = 'role-mastery' | 'innovation-strategy' | 'decision-making' | 'engagement' | 'hidden'

export interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  xpReward: number
  badgeImage: string
  badgeEmoji: string
  condition: (state: GameStateSnapshot) => boolean
  hint: string
}

export interface CrisisEvent {
  id: string
  scenarioIndex: number
  title: string
  description: string
  crisisArt: string
  crisisEmoji: string
  immediateEffects: Partial<Scores>
  triggerCondition: 'guaranteed' | ((state: GameStateSnapshot) => boolean)
  responses: CrisisResponseOption[]
  narrativeFlash: string
}

export interface CrisisResponseOption {
  id: string
  title: string
  description: string
  effects: Partial<Scores>
  narrativeFlash: string
}

export interface CrisisResponseRecord {
  crisisId: string
  choiceId: string
  scenarioIndex: number
  timestamp: number
}

export interface HiddenObjective {
  id: string
  roleId: RoleId
  description: string
  condition: (state: GameStateSnapshot) => boolean
}

export interface ObjectiveStatus {
  id: string
  completed: boolean
}

export interface Unlockable {
  id: string
  title: string
  description: string
  icon: string
  unlockCondition: (state: GameStateSnapshot) => boolean
}

export interface XPLevel {
  level: number
  title: string
  threshold: number
}

// Snapshot of state passed to condition functions (avoids circular dep with store)
export interface GameStateSnapshot {
  scores: Scores
  role: RoleId | null
  decisions: DecisionRecord[]
  deployedInnovations: DeployedInnovation[]
  journalEntries: JournalEntry[]
  achievements: string[]
  crisisHistory: CrisisResponseRecord[]
  xp: number
  scenarioIndex: number
  innovationBudgetUsed: number
  innovationBudgetTotal: number
}

export interface CountryData {
  name: string
  population: string
  populationNum: number
  gdpPerCapita: string
  healthSpendPerCapita: string
  lifeExpectancy: string
  maternalMortality: string
  under5Mortality: string
  hivPrevalence: string
  tbIncidence: string
  healthWorkerDensity: string
  regions: RegionData[]
  history: string
  healthSystem: string
  geography: string
}

export interface RegionData {
  name: string
  population: string
  characteristics: string
  primaryChallenge: string
  color: string
}
