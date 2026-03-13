export interface SessionInfo {
  id: number
  title: string
  subtitle: string
  status: 'completed' | 'current' | 'upcoming'
  date: string
  duration: string
  format: string
  highlights: string[]
  keyStats: { label: string; value: string }[]
  summary: string
  videoId?: string
}

export const sessions: SessionInfo[] = [
  {
    id: 1,
    title: 'The Innovation Imperative',
    subtitle: 'Why the World Can\'t Wait',
    status: 'completed',
    date: 'Monday 23 March 2026',
    duration: '~30 minutes',
    format: 'In-class',
    highlights: [
      '4.6 billion people lack essential health services',
      '6 innovation vignettes: lenacapavir, Wolbachia mosquitoes, Zipline drones, eSanjeevani, wastewater surveillance, microbiome-directed nutrition',
      '8 Challenge Cards in a speed-dating exercise',
    ],
    keyStats: [
      { label: 'Innovation Vignettes', value: '6' },
      { label: 'Challenge Cards', value: '8' },
      { label: 'People Lacking Services', value: '4.6B' },
    ],
    summary: 'Students confronted the scale of the global health crisis through dramatic statistics and real-world innovation stories, sparking the initial curiosity and urgency that drives the rest of the series.',
  },
  {
    id: 2,
    title: 'The Innovator\'s Toolkit',
    subtitle: 'Five Lenses for Transforming Healthcare',
    status: 'completed',
    date: 'Friday 27 March 2026',
    duration: '50 minutes',
    format: 'In-class',
    highlights: [
      '5 analytical lenses: Frugal, Social Big Data, Digital Health & AI, Generative AI, Patient-Centric',
      '10 core competencies of frugal innovation with breakthrough examples',
      '5 hands-on exercises completed',
    ],
    keyStats: [
      { label: 'Analytical Lenses', value: '5' },
      { label: 'Frugal Competencies', value: '10' },
      { label: 'Hands-on Exercises', value: '5' },
    ],
    summary: 'Students acquired a structured analytical framework of five innovation lenses and practised applying them through rapid exercises, building evaluative capacity for Sessions 3 and 4.',
  },
  {
    id: 3,
    title: 'Innovation Lab: Mission Control',
    subtitle: 'You Are the Decision-Maker',
    status: 'current',
    date: 'Monday 30 March 2026',
    duration: '40-50 minutes',
    format: 'Self-directed (web app)',
    highlights: [
      'Interactive simulation set in "Asante," a fictional country of 12.4M people',
      '6 stakeholder roles with information asymmetry',
      '3 branching scenarios with resource allocation and innovation deployment',
    ],
    keyStats: [
      { label: 'Stakeholder Roles', value: '6' },
      { label: 'Branching Scenarios', value: '3' },
      { label: 'Population (Asante)', value: '12.4M' },
    ],
    summary: 'Students step into the shoes of a real decision-maker, navigating branching scenarios with genuine trade-offs across coverage, equity, cost-effectiveness, sustainability, community trust, and health outcomes.',
    videoId: 'PLACEHOLDER_SERIES_OVERVIEW',
  },
  {
    id: 4,
    title: 'Bridging Innovation to Impact',
    subtitle: 'From Prototype to Policy',
    status: 'upcoming',
    date: 'Wednesday 01 April 2026',
    duration: '60 minutes',
    format: 'In-class',
    highlights: [
      '5 real-world case study reveals compared against Session 3 decisions',
      'Ethics Tribunal role-play examining AI diagnostics in rural East Africa',
      'The "Valley of Death" framework: why 90% of innovations never reach the people who need them',
    ],
    keyStats: [
      { label: 'Case Study Reveals', value: '5' },
      { label: 'Ethical Principles', value: '6' },
      { label: 'Failure Lessons', value: '$60M+' },
    ],
    summary: 'Students will synthesise everything from the series by confronting the gap between prototype and policy, debating ethics through role-play, and drafting a 2-minute innovation pitch with structured peer feedback.',
  },
]
