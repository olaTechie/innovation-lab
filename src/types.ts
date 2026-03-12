export type RoleId = 'health_minister' | 'ngo_director' | 'chw' | 'tech_entrepreneur' | 'who_advisor' | 'patient_advocate'

export interface Role {
  id: RoleId
  title: string
  shortTitle: string
  icon: string
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
  | 'country_briefing'
  | 'scenario_1'
  | 'innovation_assembly_1'
  | 'scenario_2'
  | 'innovation_assembly_2'
  | 'scenario_3'
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
