import type { HiddenObjective } from '../types'

export const hiddenObjectives: HiddenObjective[] = [
  // --- Minister of Health ---
  {
    id: 'moh-1',
    roleId: 'health_minister',
    description: 'Keep coverage above 40 at all times — no region left behind.',
    condition: (state) => state.scores.coverage >= 40,
  },
  {
    id: 'moh-2',
    roleId: 'health_minister',
    description: 'Deploy at least 2 digital health innovations to modernise the system.',
    condition: (state) => {
      const digitalIds = ['ai_pathology', '99dots', 'esanjeevani', 'drone_delivery']
      const deployed = new Set(state.deployedInnovations.map((d) => d.innovationId))
      return digitalIds.filter((id) => deployed.has(id)).length >= 2
    },
  },
  {
    id: 'moh-3',
    roleId: 'health_minister',
    description: 'Demonstrate fiscal discipline — reach a cost-effectiveness score of 65 or higher.',
    condition: (state) => state.scores.costEffectiveness >= 65,
  },

  // --- NGO Director ---
  {
    id: 'ngo-1',
    roleId: 'ngo_director',
    description: 'Sustain programme sustainability above 45 — prove this work will outlast the funding cycle.',
    condition: (state) => state.scores.sustainability >= 45,
  },
  {
    id: 'ngo-2',
    roleId: 'ngo_director',
    description: 'Deploy at least 2 patient-centric innovations that centre community needs.',
    condition: (state) => {
      const patientCentricIds = ['lenacapavir', 'md_rutfs', 'chw_digital', 'mrna_platform']
      const deployed = new Set(state.deployedInnovations.map((d) => d.innovationId))
      return patientCentricIds.filter((id) => deployed.has(id)).length >= 2
    },
  },
  {
    id: 'ngo-3',
    roleId: 'ngo_director',
    description: 'Demonstrate reflective practice — submit at least 3 journal entries across the simulation.',
    condition: (state) => state.journalEntries.length >= 3,
  },

  // --- Community Health Worker ---
  {
    id: 'chw-1',
    roleId: 'chw',
    description: 'Earn and keep community trust — reach a community trust score of 70 or higher.',
    condition: (state) => state.scores.communityTrust >= 70,
  },
  {
    id: 'chw-2',
    roleId: 'chw',
    description: 'Champion frugal innovation — deploy at least 2 low-cost, high-impact tools.',
    condition: (state) => {
      const frugalIds = ['pph_drape', 'dual_bednets', 'foldscope', 'solar_cold_chain', 'ovision']
      const deployed = new Set(state.deployedInnovations.map((d) => d.innovationId))
      return frugalIds.filter((id) => deployed.has(id)).length >= 2
    },
  },
  {
    id: 'chw-3',
    roleId: 'chw',
    description: 'Choose community-based options at least 3 times across all decision points.',
    condition: (state) => {
      const communityChoiceIds = [
        'se_dp1_community', 'se_dp2_chw',
        'it_dp1_community', 'it_dp2_prevention',
        'lg_dp1_integrate', 'lg_dp2_community',
      ]
      return state.decisions.filter((d) => communityChoiceIds.includes(d.choiceId)).length >= 3
    },
  },

  // --- Tech Entrepreneur ---
  {
    id: 'tech-1',
    roleId: 'tech_entrepreneur',
    description: 'Build the digital future — deploy at least 3 digital or AI innovations.',
    condition: (state) => {
      const digitalAiIds = [
        'ai_pathology', '99dots', 'esanjeevani', 'drone_delivery',
        'llm_clinical_support', 'ai_antibiotic_discovery', 'genai_health_education',
      ]
      const deployed = new Set(state.deployedInnovations.map((d) => d.innovationId))
      return digitalAiIds.filter((id) => deployed.has(id)).length >= 3
    },
  },
  {
    id: 'tech-2',
    roleId: 'tech_entrepreneur',
    description: 'Prove technology delivers value — reach a cost-effectiveness score of 70 or higher.',
    condition: (state) => state.scores.costEffectiveness >= 70,
  },
  {
    id: 'tech-3',
    roleId: 'tech_entrepreneur',
    description: 'Operate lean — stay under 80% of your innovation budget.',
    condition: (state) => {
      if (state.innovationBudgetTotal === 0) return false
      return state.innovationBudgetUsed / state.innovationBudgetTotal < 0.8
    },
  },

  // --- WHO Regional Advisor ---
  {
    id: 'who-1',
    roleId: 'who_advisor',
    description: 'Uphold the principle of do no harm — keep every metric above 30.',
    condition: (state) => Object.values(state.scores).every((v) => v > 30),
  },
  {
    id: 'who-2',
    roleId: 'who_advisor',
    description: 'Champion equity — reach an equity score of 65 or higher.',
    condition: (state) => state.scores.equity >= 65,
  },
  {
    id: 'who-3',
    roleId: 'who_advisor',
    description: 'Build a diverse evidence base — deploy innovations from at least 4 different categories.',
    condition: (state) => {
      const categoryById: Record<string, string> = {
        pph_drape: 'frugal', dual_bednets: 'frugal', foldscope: 'frugal',
        solar_cold_chain: 'frugal', ovision: 'frugal',
        wastewater_surveillance: 'social_big_data', ml_food_security: 'social_big_data',
        climate_ml_forecast: 'social_big_data',
        wolbachia: 'patient_centric', lenacapavir: 'patient_centric',
        md_rutfs: 'patient_centric', chw_digital: 'patient_centric',
        mrna_platform: 'patient_centric',
        ai_pathology: 'digital_health_ai', '99dots': 'digital_health_ai',
        esanjeevani: 'digital_health_ai', drone_delivery: 'digital_health_ai',
        llm_clinical_support: 'genai', ai_antibiotic_discovery: 'genai',
        genai_health_education: 'genai',
      }
      const deployedCategories = new Set(
        state.deployedInnovations.map((d) => categoryById[d.innovationId]).filter(Boolean)
      )
      return deployedCategories.size >= 4
    },
  },

  // --- Patient Advocate ---
  {
    id: 'pa-1',
    roleId: 'patient_advocate',
    description: 'Champion both dignity and fairness — reach a combined community trust + equity score of 140 or higher.',
    condition: (state) => state.scores.communityTrust + state.scores.equity >= 140,
  },
  {
    id: 'pa-2',
    roleId: 'patient_advocate',
    description: 'Never sacrifice patients for cost — refuse to choose the cheapest option when people\'s lives are at stake.',
    condition: (_state) => false, // tracked inline
  },
  {
    id: 'pa-3',
    roleId: 'patient_advocate',
    description: 'Deliver meaningful health improvements — reach a health outcomes score of 60 or higher.',
    condition: (state) => state.scores.healthOutcomes >= 60,
  },
]
