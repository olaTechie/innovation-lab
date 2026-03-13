import type { Unlockable } from '../types'

export const unlockables: Unlockable[] = [
  {
    id: 'hidden-innovation',
    title: 'Hidden 21st Innovation',
    description:
      'You have unlocked a secret 21st innovation not available in the standard assembly. This experimental intervention represents the cutting edge of global health — high risk, high reward, and only accessible to those who have demonstrated exceptional all-round performance.',
    icon: '🔬',
    unlockCondition: (state) => {
      const values = Object.values(state.scores)
      if (values.length === 0) return false
      const average = values.reduce((sum, v) => sum + v, 0) / values.length
      return average >= 70
    },
  },
  {
    id: 'alt-endings',
    title: 'Alternative Endings',
    description:
      'You have unlocked a set of alternative debrief endings that reveal what could have happened had you made different choices at key moments. Explore the road not taken — and discover how close the best and worst outcomes really were.',
    icon: '🎬',
    unlockCondition: (_state) => false, // checked via hidden objectives completion in store
  },
  {
    id: 'directors-commentary',
    title: "Director's Commentary",
    description:
      'You have unlocked the Director\'s Commentary — an in-depth layer of annotations throughout the simulation explaining the real-world evidence, design decisions, and global health debates behind every scenario, innovation, and crisis event.',
    icon: '📝',
    unlockCondition: (state) => state.xp >= 1500,
  },
]
