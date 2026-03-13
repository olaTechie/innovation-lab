import type { Achievement } from '../types'

export const achievements: Achievement[] = [
  // --- Role Mastery ---
  {
    id: 'against-the-grain',
    title: 'Against the Grain',
    description: 'Score 70 or higher on a metric your role typically undervalues.',
    category: 'role-mastery',
    xpReward: 75,
    badgeImage: '/images/achievements/against-the-grain.png',
    badgeEmoji: '🏅',
    hint: 'Excel where your role is weakest',
    condition: (state) => {
      if (!state.role) return false
      const weakMetrics: Partial<Record<typeof state.role, (keyof typeof state.scores)[]>> = {
        health_minister: ['communityTrust'],
        chw: ['costEffectiveness'],
        tech_entrepreneur: ['equity', 'communityTrust'],
        patient_advocate: ['costEffectiveness'],
      }
      const weak = weakMetrics[state.role]
      if (!weak) return false
      return weak.some((m) => state.scores[m] >= 70)
    },
  },
  {
    id: 'true-to-form',
    title: 'True to Form',
    description: 'Score 80 or higher on your role\'s highest-weighted metric.',
    category: 'role-mastery',
    xpReward: 50,
    badgeImage: '/images/achievements/true-to-form.png',
    badgeEmoji: '🎯',
    hint: 'Master your role\'s primary strength',
    condition: (state) => {
      if (!state.role) return false
      const topMetrics: Partial<Record<typeof state.role, keyof typeof state.scores>> = {
        health_minister: 'coverage',
        ngo_director: 'sustainability',
        chw: 'communityTrust',
        tech_entrepreneur: 'costEffectiveness',
        who_advisor: 'equity',
        patient_advocate: 'equity',
      }
      const top = topMetrics[state.role]
      if (!top) return false
      return state.scores[top] >= 80
    },
  },
  {
    id: 'perspective-shift',
    title: 'Perspective Shift',
    description: 'Write 3 or more journal reflections that engage with the perspective of another stakeholder role.',
    category: 'role-mastery',
    xpReward: 75,
    badgeImage: '/images/achievements/perspective-shift.png',
    badgeEmoji: '🔄',
    hint: 'Write reflections that reference other roles\' perspectives',
    condition: (state) => {
      const keywords = [
        'minister', 'ngo', 'community health', 'tech', 'who', 'patient advocate',
        'entrepreneur', 'advisor',
      ]
      const matchingEntries = state.journalEntries.filter((entry) => {
        const lower = entry.response.toLowerCase()
        return keywords.some((kw) => lower.includes(kw))
      })
      return matchingEntries.length >= 3
    },
  },
  {
    id: 'the-diplomat',
    title: 'The Diplomat',
    description: 'Keep all metrics above 35 throughout the entire simulation.',
    category: 'role-mastery',
    xpReward: 100,
    badgeImage: '/images/achievements/the-diplomat.png',
    badgeEmoji: '🤝',
    hint: 'Never let any metric fall below 35',
    condition: (state) => {
      return Object.values(state.scores).every((v) => v >= 35)
    },
  },

  // --- Innovation Strategy ---
  {
    id: 'frugal-champion',
    title: 'Frugal Champion',
    description: 'Deploy 3 or more frugal innovations in a single scenario.',
    category: 'innovation-strategy',
    xpReward: 50,
    badgeImage: '/images/achievements/frugal-champion.png',
    badgeEmoji: '💡',
    hint: 'Frugal innovations are low-cost, high-impact tools',
    condition: (state) => {
      const frugalIds = ['pph_drape', 'dual_bednets', 'foldscope', 'solar_cold_chain', 'ovision']
      // Check if 3+ frugal innovations were deployed in any single scenario phase
      const countsByPhase: Record<number, number> = {}
      for (const deployed of state.deployedInnovations) {
        if (frugalIds.includes(deployed.innovationId)) {
          countsByPhase[deployed.scenarioPhase] = (countsByPhase[deployed.scenarioPhase] ?? 0) + 1
        }
      }
      return Object.values(countsByPhase).some((count) => count >= 3)
    },
  },
  {
    id: 'full-spectrum',
    title: 'Full Spectrum',
    description: 'Deploy at least one innovation from every category (all 5 categories).',
    category: 'innovation-strategy',
    xpReward: 75,
    badgeImage: '/images/achievements/full-spectrum.png',
    badgeEmoji: '🌈',
    hint: 'Explore every type of innovation available',
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
      return deployedCategories.size >= 5
    },
  },
  {
    id: 'budget-hawk',
    title: 'Budget Hawk',
    description: 'Complete a scenario using 50% or less of your innovation budget.',
    category: 'innovation-strategy',
    xpReward: 50,
    badgeImage: '/images/achievements/budget-hawk.png',
    badgeEmoji: '🦅',
    hint: 'Sometimes less is more — spend wisely',
    condition: (state) => {
      if (state.innovationBudgetTotal === 0) return false
      return state.innovationBudgetUsed / state.innovationBudgetTotal <= 0.5
    },
  },
  {
    id: 'all-in',
    title: 'All In',
    description: 'Spend 100% of your innovation budget in a single scenario.',
    category: 'innovation-strategy',
    xpReward: 50,
    badgeImage: '/images/achievements/all-in.png',
    badgeEmoji: '🎰',
    hint: 'Go all-in on your innovation portfolio',
    condition: (state) => {
      if (state.innovationBudgetTotal === 0) return false
      return state.innovationBudgetUsed >= state.innovationBudgetTotal
    },
  },

  // --- Decision Making ---
  {
    id: 'community-first-x3',
    title: 'Community First',
    description: 'Make 3 consecutive decisions that boost community trust.',
    category: 'decision-making',
    xpReward: 50,
    badgeImage: '/images/achievements/community-first-x3.png',
    badgeEmoji: '👥',
    hint: 'Three in a row — always choose the community',
    condition: (_state) => false, // tracked via store flag
  },
  {
    id: 'balanced-leader',
    title: 'Balanced Leader',
    description: 'End the simulation with all 6 metrics within 15 points of each other.',
    category: 'decision-making',
    xpReward: 100,
    badgeImage: '/images/achievements/balanced-leader.png',
    badgeEmoji: '⚖️',
    hint: 'Keep all metrics close — no extreme highs or lows',
    condition: (state) => {
      const values = Object.values(state.scores)
      const max = Math.max(...values)
      const min = Math.min(...values)
      return max - min <= 15
    },
  },
  {
    id: 'bold-move',
    title: 'Bold Move',
    description: 'Choose an option that drops any metric by 10 or more points.',
    category: 'decision-making',
    xpReward: 50,
    badgeImage: '/images/achievements/bold-move.png',
    badgeEmoji: '⚡',
    hint: 'Sometimes the right decision hurts in the short term',
    condition: (_state) => false, // tracked via store flag
  },
  {
    id: 'evidence-based',
    title: 'Evidence-Based',
    description: 'Read all role-specific context panels before making every decision.',
    category: 'decision-making',
    xpReward: 75,
    badgeImage: '/images/achievements/evidence-based.png',
    badgeEmoji: '📊',
    hint: 'Always expand the role context before deciding',
    condition: (_state) => false, // tracked inline
  },

  // --- Engagement & Reflection ---
  {
    id: 'deep-thinker',
    title: 'Deep Thinker',
    description: 'Write a single journal reflection of 100 words or more.',
    category: 'engagement',
    xpReward: 50,
    badgeImage: '/images/achievements/deep-thinker.png',
    badgeEmoji: '🧠',
    hint: 'Go beyond the surface — write at depth',
    condition: (state) => {
      return state.journalEntries.some(
        (entry) => entry.response.trim().split(/\s+/).length >= 100
      )
    },
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Submit a reflection for every scenario prompt (at least 3 entries).',
    category: 'engagement',
    xpReward: 75,
    badgeImage: '/images/achievements/completionist.png',
    badgeEmoji: '✅',
    hint: 'Reflect after every scenario — don\'t skip the journal',
    condition: (state) => {
      return state.journalEntries.length >= 3
    },
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Spend 5 or more minutes exploring the sandbox mode.',
    category: 'engagement',
    xpReward: 50,
    badgeImage: '/images/achievements/explorer.png',
    badgeEmoji: '🔍',
    hint: 'Take your time in the sandbox — experiment freely',
    condition: (_state) => false, // tracked inline
  },
  {
    id: 'mission-veteran',
    title: 'Mission Veteran',
    description: 'Complete the entire simulation across all 3 scenarios.',
    category: 'engagement',
    xpReward: 50,
    badgeImage: '/images/achievements/mission-veteran.png',
    badgeEmoji: '🎖️',
    hint: 'See the simulation all the way through to the debrief',
    condition: (state) => {
      return state.scenarioIndex >= 2 && state.decisions.length >= 6
    },
  },

  // --- Hidden / Rare ---
  {
    id: 'crisis-commander',
    title: 'Crisis Commander',
    description: 'Respond to all crisis events triggered during the simulation.',
    category: 'hidden',
    xpReward: 100,
    badgeImage: '/images/achievements/crisis-commander.png',
    badgeEmoji: '🛡️',
    hint: 'Never let a crisis go unanswered',
    condition: (state) => {
      return state.crisisHistory.length >= 3
    },
  },
  {
    id: 'secret-objective-complete',
    title: 'Secret Objective Complete',
    description: 'Fulfill all 3 hidden objectives for your role.',
    category: 'hidden',
    xpReward: 100,
    badgeImage: '/images/achievements/secret-objective-complete.png',
    badgeEmoji: '🔐',
    hint: 'Check your hidden objectives panel — can you complete all three?',
    condition: (_state) => false, // tracked inline
  },
  {
    id: 'the-outlier',
    title: 'The Outlier',
    description: 'Drive any single metric to an extreme — 95 or above, or 10 or below.',
    category: 'hidden',
    xpReward: 75,
    badgeImage: '/images/achievements/the-outlier.png',
    badgeEmoji: '📈',
    hint: 'Push one metric to its absolute limits',
    condition: (state) => {
      return Object.values(state.scores).some((v) => v >= 95 || v <= 10)
    },
  },
  {
    id: 'global-health-leader',
    title: 'Global Health Leader',
    description: 'Accumulate 3,000 XP across the entire simulation.',
    category: 'hidden',
    xpReward: 100,
    badgeImage: '/images/achievements/global-health-leader.png',
    badgeEmoji: '🌍',
    hint: 'Keep earning XP — every decision and reflection counts',
    condition: (state) => {
      return state.xp >= 3000
    },
  },
]
