import type { CrisisEvent } from '../types'

export const crisisEvents: CrisisEvent[] = [
  // --- Scenario 1: The Silent Epidemic (Kibo Highlands) ---
  {
    id: 'landslide',
    scenarioIndex: 0,
    title: 'Landslide Blocks Highland Road',
    description:
      'A heavy overnight rainstorm has triggered a massive landslide on the main highland road, cutting off three remote villages from the district health centre. Approximately 4,200 people are now isolated, including 17 women in late pregnancy. Supplies of blood products and emergency oxytocin at the local health post will last no more than four days.',
    crisisArt: '/images/crisis/landslide.png',
    crisisEmoji: '🏔️',
    immediateEffects: { coverage: -6, healthOutcomes: -4 },
    triggerCondition: 'guaranteed',
    narrativeFlash:
      'A midnight radio call: "The road is gone. We have nothing left for complicated deliveries." The isolation of the highlands just became a life-or-death emergency.',
    responses: [
      {
        id: 'landslide_drone',
        title: 'Emergency Drone Airlift',
        description:
          'Coordinate an emergency drone delivery of blood products, oxytocin, and midwifery kits to the isolated villages. Costly to mobilise at short notice, and the terrain demands multiple relay flights, but coverage is restored within hours.',
        effects: { coverage: 4, costEffectiveness: -5, sustainability: -2 },
        narrativeFlash:
          'The drone descends through cloud and wind into the valley clearing. Cheers from the village. Supplies reach the health post before the next complicated birth.',
      },
      {
        id: 'landslide_chw',
        title: 'Activate CHW Emergency Network',
        description:
          'Deploy community health workers on foot and by motorbike through mountain tracks to deliver emergency kits and triage pregnant women. Slower than drones but deepens community relationships and leaves no household unchecked.',
        effects: { communityTrust: 5, coverage: 2, healthOutcomes: 1 },
        narrativeFlash:
          'By morning, every CHW in the network is on the move. It takes twelve hours, but every pregnant woman is reached — and every family sees the health system show up for them.',
      },
    ],
  },
  {
    id: 'tba-backlash',
    scenarioIndex: 0,
    title: 'Traditional Birth Attendant Backlash',
    description:
      'A group of senior traditional birth attendants has publicly denounced the new highland health programme, accusing government workers of disrespecting cultural birth practices and undermining their authority. Word has spread through village networks. Women are cancelling scheduled facility visits and home-birth supervision appointments, and several TBAs have refused to distribute the new PPH drapes.',
    crisisArt: '/images/crisis/tba-backlash.png',
    crisisEmoji: '⚠️',
    immediateEffects: { communityTrust: -7, equity: -3 },
    triggerCondition: (state) => state.scores.communityTrust < 45,
    narrativeFlash:
      'The most respected TBA in the highlands has spoken out. Her words carry more weight than any government announcement. Ignoring this will cost lives.',
    responses: [
      {
        id: 'tba_backlash_dialogue',
        title: 'Formal Dialogue with TBA Leaders',
        description:
          'Convene an urgent community meeting with TBA leaders, facilitated by elders, to listen to their concerns and co-design a revised programme that formally recognises their role in the referral chain.',
        effects: { communityTrust: 8, equity: 4, sustainability: 3 },
        narrativeFlash:
          'Three days of difficult conversation. By the end, the TBAs are not just tolerating the programme — they are helping lead it. Trust, once rebuilt, runs deep.',
      },
      {
        id: 'tba_backlash_incentives',
        title: 'TBA Certification and Incentive Scheme',
        description:
          'Launch a rapid accreditation programme that certifies TBAs as official community health auxiliaries, with a small monthly stipend and a public ceremony recognising their contribution. Faster than dialogue, but risks appearing transactional.',
        effects: { communityTrust: 4, coverage: 3, costEffectiveness: -4 },
        narrativeFlash:
          'The certificates are handed out at a district ceremony. Some TBAs are genuinely moved; others remain cautious. The backlash quiets, but underlying tensions linger.',
      },
    ],
  },

  // --- Scenario 2: The Invisible Threat (Lumasa Metro) ---
  {
    id: 'counterfeit-drugs',
    scenarioIndex: 1,
    title: 'Counterfeit Antimalarials Detected',
    description:
      'The national medicines regulatory authority has confirmed that a batch of counterfeit artemisinin-combination therapy tablets has entered informal settlement pharmacies in Lumasa Metro. At least 340 patients may have received substandard treatment in the past three weeks. One confirmed death has been linked to treatment failure. Community panic is spreading on social media.',
    crisisArt: '/images/crisis/counterfeit-drugs.png',
    crisisEmoji: '💊',
    immediateEffects: { communityTrust: -8, coverage: -5, healthOutcomes: -3 },
    triggerCondition: 'guaranteed',
    narrativeFlash:
      'The story breaks before the ministry can prepare a response. Pharmacies are mobbed. Patients who received the batch are terrified. The supply chain has been compromised.',
    responses: [
      {
        id: 'counterfeit_recall',
        title: 'Immediate Public Recall and Replacement',
        description:
          'Issue an emergency public recall of the suspect batch, set up free replacement clinics in the affected settlements, and deploy CHWs to trace every patient who received treatment in the affected period.',
        effects: { communityTrust: 6, coverage: 4, healthOutcomes: 4 },
        narrativeFlash:
          'Within 48 hours, every affected family has been contacted. The replacement clinics are overwhelmed but running. The transparent response begins to rebuild shattered trust.',
      },
      {
        id: 'counterfeit_digital_verify',
        title: 'Deploy Digital Drug Verification System',
        description:
          'Fast-track the rollout of a mobile drug verification system — allowing patients and pharmacists to check medicine authenticity via SMS — combined with a 30-day supply-chain audit.',
        effects: { communityTrust: 3, sustainability: 6, costEffectiveness: 4 },
        narrativeFlash:
          'A verification code on every packet. Within two weeks, pharmacists are scanning before dispensing. The long-term solution is seeded, but today\'s patients still need reassurance.',
      },
    ],
  },
  {
    id: 'power-failure',
    scenarioIndex: 1,
    title: 'Hospital Power Grid Failure',
    description:
      'A fire at the city\'s main transformer station has caused a 36-hour power outage across three districts of Lumasa Metro. The central referral hospital is running on ageing backup generators that failed twice overnight. Vaccine cold chains have been compromised. The TB laboratory — critical for MDR-TB confirmatory testing — has been offline for 18 hours.',
    crisisArt: '/images/crisis/power-failure.png',
    crisisEmoji: '🔌',
    immediateEffects: { healthOutcomes: -6, sustainability: -4 },
    triggerCondition: (state) => state.scores.sustainability < 40,
    narrativeFlash:
      'The laboratory goes dark mid-test. Specimens sit at room temperature. In the wards, nurses work by torchlight. The fragility of the health system is brutally exposed.',
    responses: [
      {
        id: 'power_solar_emergency',
        title: 'Emergency Solar Microgrids',
        description:
          'Procure and install portable solar power units for the laboratory, cold chain, and critical ward areas within 24 hours. Simultaneously begin procurement for a permanent hospital solar installation.',
        effects: { sustainability: 8, healthOutcomes: 4, costEffectiveness: -3 },
        narrativeFlash:
          'By the next morning, the lab is running on solar. Specimens are saved. The cold chain holds. The crisis has fast-tracked an infrastructure upgrade that was years overdue.',
      },
      {
        id: 'power_decentralise',
        title: 'Decentralise Critical Services',
        description:
          'Temporarily relocate MDR-TB testing to the national reference laboratory and redistribute cold chain stocks to smaller clinics with independent power supplies. Slower, but builds system resilience.',
        effects: { coverage: 3, sustainability: 5, communityTrust: 2 },
        narrativeFlash:
          'It takes 48 hours to redistribute everything. No specimens are lost. The decentralised approach reveals just how much resilience already exists in the peripheral network.',
      },
    ],
  },

  // --- Scenario 3: The Long Game (Lake Amara Basin) ---
  {
    id: 'refugee-influx',
    scenarioIndex: 2,
    title: 'Sudden Refugee Influx',
    description:
      'An escalation of violence across the border has triggered a sudden influx of 22,000 new refugees arriving at the Amala camp over five days — nearly doubling the planned intake for this year. The camp\'s health facilities were already operating at 140% capacity. Water and sanitation infrastructure is strained. Cholera and acute watery diarrhoea are being reported in two of the new arrival zones.',
    crisisArt: '/images/crisis/refugee-influx.png',
    crisisEmoji: '🏕️',
    immediateEffects: { coverage: -7, equity: -5, communityTrust: -3 },
    triggerCondition: 'guaranteed',
    narrativeFlash:
      'Thousands of exhausted people arrive at night. By morning, the camp health post has 400 waiting. There are medicines for 60. Decisions about who gets care cannot wait.',
    responses: [
      {
        id: 'refugee_rapid_clinic',
        title: 'Rapid Temporary Clinic Expansion',
        description:
          'Establish three temporary primary care clinics in the new arrival zones, staffed by a surge team of CHWs and NGO partners. Prioritise oral rehydration therapy for diarrhoea and basic triage to identify acute emergencies.',
        effects: { coverage: 6, equity: 5, healthOutcomes: 4 },
        narrativeFlash:
          'Tents go up within hours. CHWs work double shifts. By day three, every new arrival has been seen at least once. The diarrhoea cluster is contained.',
      },
      {
        id: 'refugee_host_integration',
        title: 'Integrate Host Community Resources',
        description:
          'Formally open host community health facilities to new refugees and offer overtime incentives to local health workers. Simultaneously invest in visible host community improvements to reduce resentment.',
        effects: { equity: 6, communityTrust: 5, coverage: 3, sustainability: 3 },
        narrativeFlash:
          'Host community clinic doors open. Local nurses volunteer weekend shifts. The shared waiting room is tense at first, but by the end of the week, neighbours are helping neighbours.',
      },
    ],
  },
  {
    id: 'funding-freeze',
    scenarioIndex: 2,
    title: 'International Funding Freeze',
    description:
      'A major bilateral donor has announced an immediate 60-day freeze on all disbursements pending an internal audit, affecting $4.2 million in committed funds for the Lake Amara health programme. Three NGO partners have issued stop-work notices. Community health worker stipends due at the end of the month are now uncertain. Health workers are threatening to strike.',
    crisisArt: '/images/crisis/funding-freeze.png',
    crisisEmoji: '🧊',
    immediateEffects: { costEffectiveness: -8, sustainability: -6 },
    triggerCondition: () => Math.random() < 0.5,
    narrativeFlash:
      'The email arrives on a Tuesday morning: "All payments suspended pending review." Three programme coordinators are on the phone simultaneously. The health system cannot absorb a 60-day freeze.',
    responses: [
      {
        id: 'funding_bridge',
        title: 'Emergency Bridge Financing',
        description:
          'Negotiate a short-term bridge loan from the national health ministry and approach two alternative donors for emergency co-financing, buying 45 days while the audit resolves. Demonstrate financial accountability proactively.',
        effects: { sustainability: 6, costEffectiveness: 4, communityTrust: 3 },
        narrativeFlash:
          'Forty-eight hours of calls. The ministry agrees to a bridge. A European foundation comes through with emergency funds. The CHWs are paid. The programme continues.',
      },
      {
        id: 'funding_restructure',
        title: 'Emergency Programme Restructure',
        description:
          'Immediately prioritise the most critical services, temporarily suspend lower-priority programme components, and negotiate with CHWs for a 30-day deferral with guaranteed payment. Use the crisis to streamline programme structure.',
        effects: { costEffectiveness: 6, sustainability: 4, coverage: -3, communityTrust: -2 },
        narrativeFlash:
          'Hard choices are made publicly and honestly. Some services pause. CHWs accept the deferral with reluctance. The leaner programme proves more durable — but some trust is spent.',
      },
    ],
  },
]
