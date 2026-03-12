import type { CountryData } from '../types'

export const asante: CountryData = {
  name: 'Asante',
  population: '12.4 million',
  populationNum: 12_400_000,
  gdpPerCapita: '$1,180',
  healthSpendPerCapita: '$47',
  lifeExpectancy: '58.3 years',
  maternalMortality: '412 per 100,000 live births',
  under5Mortality: '68 per 1,000 live births',
  hivPrevalence: '4.2%',
  tbIncidence: '287 per 100,000',
  healthWorkerDensity: '0.8 physicians per 10,000',

  history: `Asante gained independence in 1968 after two decades of colonial rule. A period of political instability in the 1980s gave way to democratic governance in 1994. The country has experienced steady but uneven economic growth, driven by agriculture (45% of GDP), mining (18%), and a growing services sector. Asante joined the African Union health sovereignty initiative in 2024, committing to local pharmaceutical production by 2035. The COVID-19 pandemic exposed critical weaknesses in its health system, catalyzing a national Health Innovation Strategy launched in 2025.`,

  geography: `Asante is a landlocked nation in sub-Saharan Africa, bordered by four countries. Its terrain ranges from the Kibo Highlands in the northwest (elevation 2,400m) through the Central Plateau to the Lake Amara basin in the southeast. The Mwanga River bisects the country north to south. Climate varies from tropical in the south to semi-arid in the northeast, with a rainy season from March to September. Climate change has shortened the rainy season by 3 weeks over the past decade, intensifying drought cycles in the northeast and increasing flood risk in the lake basin.`,

  healthSystem: `Asante operates a three-tier public health system: 842 community health posts, 124 health centres, 28 district hospitals, and 4 regional referral hospitals. The private sector accounts for 35% of outpatient care, mainly in urban areas. Community health workers (CHWs) number approximately 6,200 but are unevenly distributed, with 70% concentrated in urban and peri-urban areas. The National Health Insurance Scheme covers 38% of the population, with informal workers and rural populations largely excluded. Drug stockouts affect 45% of rural health facilities at least quarterly. Mobile phone penetration stands at 72%, with smartphone adoption at 31%.`,

  regions: [
    {
      name: 'Kibo Highlands',
      population: '2.1 million',
      characteristics: 'Mountainous, remote villages, limited road access. 3-hour average travel to nearest hospital. Strong traditional medicine practices.',
      primaryChallenge: 'Maternal & newborn health',
      color: '#4A7C59',
    },
    {
      name: 'Lumasa Metro',
      population: '3.8 million',
      characteristics: 'Capital city region. Dense informal settlements (40% of population). Two major referral hospitals. Growing industrial sector attracting rural migrants.',
      primaryChallenge: 'Infectious disease (TB, dengue)',
      color: '#D4A843',
    },
    {
      name: 'Central Plateau',
      population: '4.2 million',
      characteristics: 'Agricultural heartland. Network of health centres along main highway. Seasonal population shifts during harvest. Moderate infrastructure.',
      primaryChallenge: 'Child malnutrition & food security',
      color: '#C17547',
    },
    {
      name: 'Lake Amara Basin',
      population: '2.3 million',
      characteristics: 'Climate-vulnerable coastal region. Hosts 180,000 refugees from neighboring conflict. Rising sea levels and flooding. NCD burden growing among aging refugee population.',
      primaryChallenge: 'Climate adaptation & chronic disease',
      color: '#5B8BA0',
    },
  ],
}
