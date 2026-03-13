import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  {
    id: 'silent_epidemic',
    title: 'The Silent Epidemic',
    subtitle: 'Maternal & Newborn Health in the Highlands',
    region: 'Kibo Highlands',
    setting: 'Remote mountainous region with 2.1 million people scattered across villages connected by unpaved roads. Average travel time to nearest hospital: 3 hours. Strong traditional birth attendant culture. Rainy season makes many roads impassable for 4 months each year.',
    backgroundNarrative: `In the Kibo Highlands of Asante, a crisis unfolds in silence. Last year, approximately 450 mothers died during or shortly after childbirth — a rate of 612 per 100,000 live births, nearly 5 times the national average of 350. Most deaths occur at home or on the journey to a facility, from postpartum hemorrhage, eclampsia, or obstructed labor.

The highland communities have deep trust in traditional birth attendants (TBAs), who attend 60% of births. Many women fear the district hospital, where staff shortages mean long waits and impersonal care. The few community health workers in the region are stretched thin, each responsible for 15-20 villages and up to 1,000 households.

A new regional health coordinator has been appointed, and resources are being mobilized. But the question isn't just what to deploy — it's how to deploy it in a way that communities will accept and that can survive beyond the initial funding cycle.

You have been called to advise on the strategy. The lives of mothers and newborns depend on the decisions made in the next 12 months.`,
    keyStats: [
      { label: 'Maternal Mortality Rate', value: '612 per 100,000', trend: 'up' },
      { label: 'Facility Birth Rate', value: '40%', trend: 'stable' },
      { label: 'Midwife Coverage', value: '0.3 per 10,000', trend: 'down' },
      { label: 'Emergency Referral Success', value: '23%', trend: 'down' },
      { label: 'TBA-Attended Births', value: '60%', trend: 'up' },
      { label: 'Neonatal Mortality', value: '32 per 1,000', trend: 'stable' },
    ],
    decisionPoints: [
      {
        id: 'se_dp1',
        title: 'First Response Strategy',
        prompt: 'How should resources be allocated to address the maternal health crisis in the Kibo Highlands?',
        context: 'You have an initial budget of $2.5 million and must decide the primary strategy for the first 6 months.',
        roleSpecificContext: {
          health_minister: 'Parliament is watching. You need to show measurable results within 6 months to secure continued funding. The opposition party has called the maternal death rate "a national disgrace."',
          ngo_director: 'Your donors have earmarked $1.2M specifically for community-based interventions. They want evidence of community ownership within 12 months.',
          chw: 'You know that previous government programs failed because they ignored TBAs. The community elders are skeptical of "outsider" solutions. Trust must be earned before any technology can work.',
          tech_entrepreneur: 'You see an opportunity to demonstrate that drone delivery and telemedicine can leapfrog infrastructure limitations. But connectivity in the highlands is only 12%.',
          who_advisor: 'The evidence clearly shows that skilled birth attendance is the single most effective intervention. But the cultural context makes rapid scale-up challenging.',
          patient_advocate: 'Women in the highlands tell you they want respectful care, not just any care. The hospital staff have been reported for dismissing patients and charging informal fees.',
        },
        choices: [
          {
            id: 'se_dp1_facility',
            label: 'Strengthen Health Facilities',
            description: 'Invest in upgrading the 3 district health centres with emergency obstetric care, recruit 15 new midwives, and establish a referral ambulance network.',
            effects: { coverage: 12, healthOutcomes: 10, costEffectiveness: 6, equity: 4, communityTrust: 2, sustainability: 5 },
            narrative: 'The facilities are upgraded within 4 months. New midwives arrive but struggle to adapt to highland conditions. The ambulance network helps, but roads remain impassable in rainy season. Facility births increase from 40% to 52%, but communities in the most remote villages see little change. Maternal mortality drops by 15% in areas near facilities but remains unchanged in remote villages.',
            roleModifiers: {
              health_minister: { coverage: 4, costEffectiveness: -2 },
              patient_advocate: { communityTrust: -4, equity: -3 },
            },
          },
          {
            id: 'se_dp1_community',
            label: 'Community-Based Approach',
            description: 'Train 200 TBAs in safe delivery practices, equip them with PPH drapes and basic kits, establish a network of community health posts with radio communication.',
            effects: { coverage: 8, healthOutcomes: 8, costEffectiveness: 12, equity: 10, communityTrust: 14, sustainability: 10 },
            narrative: 'The TBA training program is enthusiastically received. Community elders become program champions. PPH drapes enable early detection of dangerous bleeding. Radio networks connect TBAs to midwives for real-time guidance. Within 6 months, home birth safety improves significantly. Maternal mortality drops by 22% across the region, with the greatest gains in the most remote areas. However, complicated cases still face referral challenges.',
            roleModifiers: {
              tech_entrepreneur: { sustainability: -3, costEffectiveness: -2 },
              who_advisor: { healthOutcomes: -3 },
            },
          },
          {
            id: 'se_dp1_tech',
            label: 'Technology Leapfrog',
            description: 'Deploy drone delivery for emergency blood products, establish telemedicine links between health posts and the regional hospital, and introduce AI-assisted ultrasound screening.',
            effects: { coverage: 6, healthOutcomes: 7, costEffectiveness: 4, equity: 3, communityTrust: -2, sustainability: 3 },
            narrative: 'The technology generates excitement among health workers but suspicion among communities. Drones deliver blood products successfully to 2 of 3 landing sites, saving 12 lives in the first 3 months. Telemedicine works when connectivity holds, but drops frequently. AI ultrasound identifies 43 high-risk pregnancies that would have been missed. However, the technology requires maintenance expertise not available locally, and communities feel excluded from the design process.',
            roleModifiers: {
              chw: { communityTrust: -6, equity: -4 },
              ngo_director: { sustainability: -4 },
            },
          },
          {
            id: 'se_dp1_integrated',
            label: 'Integrated Strategy',
            description: 'Combine TBA training with selected technology (drone delivery + radio networks), allocating 60% to community approaches and 40% to technology. Slower rollout but broader coverage.',
            effects: { coverage: 9, healthOutcomes: 9, costEffectiveness: 8, equity: 8, communityTrust: 8, sustainability: 8 },
            narrative: 'The integrated approach takes 2 months longer to launch but builds on community strengths while adding technological capability. TBAs are involved in designing the drone landing protocols. The community health posts become technology hubs where both traditional and modern approaches coexist. Results emerge gradually: maternal mortality drops by 18% in 6 months, with consistent gains across remote and accessible areas alike.',
            roleModifiers: {
              health_minister: { costEffectiveness: -3 },
              tech_entrepreneur: { coverage: -2, healthOutcomes: -2 },
            },
          },
        ],
      },
      {
        id: 'se_dp2',
        title: 'Scaling the Response',
        prompt: 'Six months in, early results are showing. How do you scale what\'s working?',
        context: 'Based on your initial strategy, you now face a scaling decision. An additional $1.5 million has been unlocked. International attention is growing.',
        roleSpecificContext: {
          health_minister: 'The President has announced a national maternal health initiative. Your highland program is the pilot. Scale-up pressure is intense.',
          ngo_director: 'Three other NGOs want to replicate your model in the Central Plateau. Coordination is needed but territorial dynamics are complex.',
          chw: 'CHWs in the program report burnout. They are doing 3x the work with the same pay. Without addressing workforce sustainability, the gains will be temporary.',
          tech_entrepreneur: 'A major tech company wants to sponsor a national telemedicine expansion using the highland pilot as proof of concept.',
          who_advisor: 'The initial results need rigorous evaluation before scaling. Premature expansion could dilute quality and waste resources.',
          patient_advocate: 'Women\'s groups in the highlands are demanding a seat at the planning table for any expansion. They have organized a patient advisory council.',
        },
        choices: [
          {
            id: 'se_dp2_rapid',
            label: 'Rapid National Scale-up',
            description: 'Expand the program to all four regions within 6 months. Standardize the model and deploy quickly to maximize lives saved.',
            effects: { coverage: 14, healthOutcomes: 6, costEffectiveness: 3, equity: 5, communityTrust: -3, sustainability: -2 },
            narrative: 'The rapid scale-up reaches all regions within the timeline. National coverage expands significantly, but the program loses the community-specific adaptations that made the highland pilot successful. Quality varies widely between regions. Some communities resist the standardized approach. Initial health gains plateau after 3 months as implementation challenges mount.',
          },
          {
            id: 'se_dp2_deepen',
            label: 'Deepen Before Widening',
            description: 'Consolidate gains in the highlands, build robust evaluation data, and prepare for quality-assured expansion in Year 2.',
            effects: { coverage: 5, healthOutcomes: 12, costEffectiveness: 10, equity: 8, communityTrust: 10, sustainability: 12 },
            narrative: 'The decision to deepen before expanding is politically unpopular but epidemiologically sound. Highland outcomes continue to improve — maternal mortality drops another 15%. Rigorous evaluation data emerges that convinces skeptics. CHW workforce is strengthened and well-supported. When expansion begins in Year 2, it is well-designed and community-informed.',
          },
          {
            id: 'se_dp2_partner',
            label: 'Partnership Expansion',
            description: 'Partner with other NGOs and the private sector for expansion. Share the model but let each partner adapt it to their region.',
            effects: { coverage: 10, healthOutcomes: 8, costEffectiveness: 7, equity: 7, communityTrust: 5, sustainability: 7 },
            narrative: 'Partnership-driven expansion creates a network of adapted programs. Each region develops its own variant of the model. Coordination is challenging but innovation emerges from the diversity of approaches. Coverage expands faster than the "deepen" approach but with more consistency than the "rapid" approach.',
          },
        ],
      },
    ],
    reflectionPrompt: 'As a {role}, what was the hardest trade-off you faced in the maternal health scenario? How did your role\'s priorities shape your decisions?',
  },
  {
    id: 'invisible_threat',
    title: 'The Invisible Threat',
    subtitle: 'Infectious Disease in a Growing City',
    region: 'Lumasa Metro',
    setting: 'The capital city of Asante, population 3.8 million. Dense informal settlements house 40% of the urban population. Two major referral hospitals are overwhelmed. TB case notifications are rising but an estimated 1 in 4 cases goes undetected. A dengue outbreak is escalating in the informal settlements.',
    backgroundNarrative: `Lumasa Metro, Asante's capital, is a city of contrasts. Glass towers rise above sprawling informal settlements where 1.5 million people live in overcrowded conditions with intermittent water supply. The city's two referral hospitals — built for a population of 1 million — now serve nearly 4 million.

TB has been quietly spreading through the informal settlements, fueled by overcrowding, poor ventilation, and limited access to diagnosis. Last year, 7,600 cases were notified — but epidemiological models suggest the true number exceeds 10,400. Worse, drug-resistant TB (MDR-TB) has been detected in 8% of new cases, nearly three times the national average of 2.8%.

Simultaneously, an unusual dengue outbreak is growing. Climate change has extended the mosquito breeding season by 6 weeks, and the recent expansion of standing water in construction sites has created new breeding grounds. Cases have doubled in the past month, and the city's surveillance system can barely keep up.

The mayor has declared a dual health emergency. Resources are limited. Every decision about TB comes at the cost of dengue response, and vice versa. Time is not on your side.`,
    keyStats: [
      { label: 'TB Case Detection Rate', value: '73%', trend: 'up' },
      { label: 'MDR-TB Prevalence', value: '8% of new cases', trend: 'up' },
      { label: 'Dengue Cases (this month)', value: '2,340', trend: 'up' },
      { label: 'Hospital Bed Occupancy', value: '142%', trend: 'up' },
      { label: 'Informal Settlement Pop.', value: '1.5 million', trend: 'up' },
      { label: 'Health Workers per 10,000', value: '2.1', trend: 'stable' },
    ],
    decisionPoints: [
      {
        id: 'it_dp1',
        title: 'Dual Emergency Response',
        prompt: 'With two outbreaks competing for resources, how do you allocate your response?',
        context: 'Emergency budget: $3 million. The TB epidemic is chronic but accelerating. The dengue outbreak is acute and visible. Media attention is on dengue; epidemiologists are alarmed about TB.',
        roleSpecificContext: {
          health_minister: 'The media is covering dengue deaths daily. Public pressure demands visible dengue action. But your chief epidemiologist warns that TB will kill 10x more people over the next 5 years if not addressed now.',
          ngo_director: 'Your organization specializes in TB. Pivoting to dengue would dilute your expertise. But the dengue emergency is happening now.',
          chw: 'In the settlements, people fear dengue because it\'s visible and acute. TB stigma means people hide symptoms. You need different approaches for each disease.',
          tech_entrepreneur: 'You see an opportunity for integrated digital surveillance that tracks both diseases simultaneously. But building it takes time the dengue outbreak won\'t give you.',
          who_advisor: 'WHO guidelines recommend active TB case finding in high-burden urban settings. For dengue, vector control is the proven approach. Both need investment.',
          patient_advocate: 'TB patients report being turned away from overcrowded clinics. Dengue patients are dying in waiting rooms. Both communities need immediate help.',
        },
        choices: [
          {
            id: 'it_dp1_tb_focus',
            label: 'Prioritize TB Response',
            description: 'Allocate 70% to active TB case finding using portable X-ray units, 99DOTS adherence tracking, and MDR-TB treatment. 30% for basic dengue vector control.',
            effects: { coverage: 8, healthOutcomes: 11, costEffectiveness: 9, equity: 7, communityTrust: 3, sustainability: 8 },
            narrative: 'Active case finding identifies 287 previously undetected TB cases in the first 3 months, including 31 MDR-TB cases that would have continued spreading. TB mortality begins to decline. However, dengue cases continue to rise with minimal vector control. 12 dengue deaths generate intense media criticism. The community feels the government is ignoring the visible emergency.',
          },
          {
            id: 'it_dp1_dengue_focus',
            label: 'Prioritize Dengue Response',
            description: 'Allocate 70% to emergency dengue response: vector control spraying, community clean-up campaigns, rapid diagnostic kits, and hospital surge capacity. 30% for routine TB services.',
            effects: { coverage: 6, healthOutcomes: 5, costEffectiveness: 5, equity: 4, communityTrust: 10, sustainability: 3 },
            narrative: 'The visible dengue response reassures the public. Spraying campaigns reduce mosquito populations in targeted areas. Hospital surge capacity saves lives. Dengue cases plateau within 6 weeks. But TB continues to spread silently. By month 6, TB case notifications jump 23% as the untreated epidemic accelerates. The long-term death toll from deferred TB action will far exceed the dengue deaths prevented.',
          },
          {
            id: 'it_dp1_balanced',
            label: 'Balanced Dual Response',
            description: 'Split 50/50 between TB and dengue. Deploy Wolbachia mosquitoes for long-term dengue control while running active TB case finding in the highest-burden settlements.',
            effects: { coverage: 9, healthOutcomes: 9, costEffectiveness: 7, equity: 8, communityTrust: 7, sustainability: 10 },
            narrative: 'The balanced approach addresses both threats without fully containing either in the short term. Wolbachia mosquitoes are released in 3 settlements — a long-term investment that won\'t show results for 6-12 months. Active TB case finding catches 180 cases. Both epidemics continue but at a slower pace. The integrated approach builds surveillance capacity that serves both diseases.',
          },
          {
            id: 'it_dp1_surveillance',
            label: 'Invest in Surveillance Infrastructure',
            description: 'Allocate 40% to build integrated disease surveillance (wastewater monitoring + digital case reporting + ML prediction). 30% each for TB and dengue clinical response.',
            effects: { coverage: 7, healthOutcomes: 6, costEffectiveness: 8, equity: 6, communityTrust: 4, sustainability: 14 },
            narrative: 'The surveillance investment takes 3 months to deploy but transforms the response. Wastewater monitoring detects a new dengue cluster 10 days before clinical cases appear, allowing pre-emptive vector control. ML models identify TB hotspots for targeted screening. By month 6, the system is predicting outbreaks rather than reacting to them. However, the delayed clinical response means more suffering in the short term.',
          },
        ],
      },
      {
        id: 'it_dp2',
        title: 'Stigma and Adherence',
        prompt: 'TB treatment takes 6 months. Stigma causes patients to hide their diagnosis and abandon treatment. How do you tackle adherence?',
        context: 'Treatment completion rate is only 61% — far below the WHO target of 90% and the global average of 88% for drug-susceptible TB. Patients who stop treatment early drive drug resistance. Community stigma is the primary barrier.',
        roleSpecificContext: {
          health_minister: 'Each MDR-TB case costs 100x more to treat than regular TB. Low adherence is creating a fiscal time bomb.',
          ngo_director: 'Community health programs have the best track record on adherence, but they require sustained investment in human relationships.',
          chw: 'You know these patients by name. They stop treatment because they feel better, because they fear their neighbors finding out, because they can\'t afford the transport to the clinic.',
          tech_entrepreneur: 'Digital adherence technologies like 99DOTS have shown promise in India. Could a similar approach work in Asante\'s informal settlements?',
          who_advisor: 'The evidence supports community-based directly observed therapy, but it must be adapted to urban settings where communities are more fluid.',
          patient_advocate: 'Patients tell you the biggest barrier is how they\'re treated at the clinic — long waits, judgmental staff, lack of privacy. The system needs to serve patients, not the other way around.',
        },
        choices: [
          {
            id: 'it_dp2_digital',
            label: 'Digital Adherence Support',
            description: 'Deploy 99DOTS SMS-based tracking ($2/patient) combined with CHW follow-up for missed doses. Incentivize completion with mobile money transfers.',
            effects: { coverage: 7, healthOutcomes: 9, costEffectiveness: 12, equity: 5, communityTrust: 6, sustainability: 7 },
            narrative: '99DOTS achieves 78% coverage among enrolled patients. Treatment completion rises from 61% to 79%. The cost per patient is dramatically lower than traditional DOTS supervision. However, the system struggles to reach the poorest patients — those without mobile phones or who change SIM cards frequently. MDR-TB rates begin to stabilize.',
          },
          {
            id: 'it_dp2_community',
            label: 'Community-Led Destigmatization',
            description: 'Train TB survivors as peer supporters, launch community dialogue sessions, engage religious and community leaders as champions, establish patient support groups.',
            effects: { coverage: 5, healthOutcomes: 7, costEffectiveness: 8, equity: 10, communityTrust: 14, sustainability: 10 },
            narrative: 'TB survivors become powerful advocates. Community dialogue sessions reduce stigma measurably — willingness to disclose TB diagnosis increases from 23% to 54%. Patient support groups create social networks that sustain adherence through difficult months. Treatment completion rises to 74%. The approach is slow but creates lasting cultural change.',
          },
          {
            id: 'it_dp2_clinic',
            label: 'Transform the Clinic Experience',
            description: 'Redesign TB clinics for privacy and dignity, train staff in patient-centered care, reduce wait times with appointment systems, provide integrated services (TB + HIV + NCD).',
            effects: { coverage: 6, healthOutcomes: 8, costEffectiveness: 6, equity: 8, communityTrust: 10, sustainability: 8 },
            narrative: 'The redesigned clinics become models of patient-centered care. Wait times drop from 4 hours to 45 minutes. Private consultation rooms eliminate the fear of being seen at the "TB window." Integrated services mean patients make one trip instead of three. Treatment completion rises to 76%. Staff morale improves dramatically, reducing turnover.',
          },
        ],
      },
    ],
    reflectionPrompt: 'As a {role}, how did you balance the tension between the acute dengue emergency and the chronic TB epidemic? What would you do differently?',
  },
  {
    id: 'long_game',
    title: 'The Long Game',
    subtitle: 'Climate, Chronic Disease & Displacement',
    region: 'Lake Amara Basin',
    setting: 'The southeastern lake basin of Asante, population 2.3 million including 180,000 refugees from a neighboring conflict. Climate change is causing rising lake levels and more frequent flooding. An aging refugee population faces growing NCD burden. Local communities feel neglected as resources flow to refugee camps.',
    backgroundNarrative: `The Lake Amara Basin is where Asante's present challenges meet its future ones. Three crises are converging in this region, each feeding the others.

First, climate change. Lake Amara has risen 2.3 meters in the past decade, flooding 12 villages and displacing 34,000 people internally. The rainy season now brings more intense but shorter rainfall, causing flash floods that destroy crops and contaminate water sources. Vector-borne diseases are spreading into areas that were previously too cool for mosquitoes.

Second, displacement. The Amala refugee camp, established 8 years ago for 50,000 people, now houses 180,000. What was meant to be temporary has become permanent. The refugee population is aging, and chronic diseases — diabetes, hypertension, depression — are growing. Medical supplies are inconsistent. Mental health services are virtually nonexistent.

Third, the host community backlash. Local villages around the camp feel that international aid bypasses them while refugees receive healthcare they cannot access. Tensions are rising. Last month, a clinic serving both communities was vandalized.

You must plan for the next 5 years, not the next 5 months. Quick fixes won't work here. The question is: how do you build a health system that serves both refugees and host communities, adapts to climate change, and can sustain itself as international attention inevitably fades?`,
    keyStats: [
      { label: 'Refugee Population', value: '180,000', trend: 'up' },
      { label: 'NCD Prevalence (camp)', value: '24% of adults', trend: 'up' },
      { label: 'Mental Health Gap', value: '94% unserved', trend: 'stable' },
      { label: 'Climate Displacement', value: '34,000 this year', trend: 'up' },
      { label: 'Host-Refugee Tension', value: 'High (incidents rising)', trend: 'up' },
      { label: 'International Funding Trend', value: 'Declining 12%/year', trend: 'down' },
    ],
    decisionPoints: [
      {
        id: 'lg_dp1',
        title: 'Service Integration vs Separation',
        prompt: 'Should health services for refugees and host communities be integrated or maintained separately?',
        context: 'International refugee funding supports camp clinics. Government funding supports district health facilities. Integrating services is politically complex but potentially more efficient and equitable.',
        roleSpecificContext: {
          health_minister: 'Integration means taking responsibility for refugee health — a fiscal and political risk. But separate systems are duplicative and breed resentment.',
          ngo_director: 'Your donors fund refugee programs specifically. Integration might jeopardize funding streams that require clear beneficiary targeting.',
          chw: 'On the ground, the division makes no sense. Diseases don\'t check citizenship. You treat whoever walks in the door.',
          tech_entrepreneur: 'A shared digital health platform could serve both populations efficiently. Data integration would enable better resource allocation.',
          who_advisor: 'WHO policy supports integration of refugee health into national systems. But evidence shows that premature integration without adequate resources can reduce quality for both populations.',
          patient_advocate: 'Both communities feel underserved. Host community members are angry that refugees get "free healthcare" they can\'t access. Refugees feel like second-class patients in government facilities.',
        },
        choices: [
          {
            id: 'lg_dp1_integrate',
            label: 'Full Integration',
            description: 'Merge refugee and host community health services under the district health system. Pool funding, share facilities, unified health records.',
            effects: { coverage: 7, healthOutcomes: 6, costEffectiveness: 10, equity: 12, communityTrust: 5, sustainability: 11 },
            narrative: 'Integration begins slowly. Initial resistance from both communities gradually gives way as shared facilities improve with pooled resources. The district hospital, now serving all, receives upgraded equipment. Wait times increase initially but stabilize as workflows are optimized. Equity improves dramatically — the same standard of care for all. Some refugee-specific funding is lost, but government commitment deepens. By Year 2, the integrated model is 30% more cost-effective than the parallel systems.',
          },
          {
            id: 'lg_dp1_separate',
            label: 'Maintain Separate Systems',
            description: 'Keep refugee and host community health services separate but improve coordination. Establish referral pathways and shared specialist services.',
            effects: { coverage: 5, healthOutcomes: 7, costEffectiveness: 4, equity: 3, communityTrust: 3, sustainability: 4 },
            narrative: 'Separate systems continue to operate, preserving dedicated refugee funding streams. Coordination improves with shared referral protocols. However, duplication persists, and host community resentment deepens. When international funding drops 12% in Year 2, the refugee health system faces service cuts while the host community system remains unchanged, widening the gap in the opposite direction.',
          },
          {
            id: 'lg_dp1_hybrid',
            label: 'Hybrid Model',
            description: 'Integrate primary care and chronic disease management (shared facilities), maintain separate emergency and specialized refugee services (camp-based).',
            effects: { coverage: 8, healthOutcomes: 8, costEffectiveness: 8, equity: 9, communityTrust: 8, sustainability: 8 },
            narrative: 'The hybrid model proves pragmatic. Shared primary care clinics become community bridges — refugees and host community members wait in the same queues, building familiarity. Specialized camp services handle refugee-specific needs (trauma, legal health certificates). NCD management improves significantly with integrated chronic disease clinics. Community tensions ease as visible equity improves. The model attracts attention from UNHCR as a potential template.',
          },
        ],
      },
      {
        id: 'lg_dp2',
        title: 'Building for an Uncertain Future',
        prompt: 'Climate change will intensify. Funding will decline. How do you build a health system that can adapt and sustain itself?',
        context: 'You must design a 5-year sustainability plan. International funding is declining 12% annually. Climate projections show increasing flood risk and vector-borne disease expansion. The refugee situation has no political resolution in sight.',
        roleSpecificContext: {
          health_minister: 'The Treasury is demanding a transition plan from international to domestic funding. But the national health budget is already stretched.',
          ngo_director: 'Your organization\'s global strategy is shifting from direct service delivery to capacity building. You need to transition without leaving a vacuum.',
          chw: 'Community health workers from both refugee and host communities have been your backbone. But most are volunteers or paid stipends that depend on external funding.',
          tech_entrepreneur: 'Climate-resilient health technologies — solar cold chains, telemedicine for flood-isolated communities, early warning systems — could transform the region\'s preparedness.',
          who_advisor: 'The evidence is clear: community ownership and local financing are the only sustainable models. But building them takes years.',
          patient_advocate: 'Patients fear being abandoned. Every time funding is discussed, communities panic. Sustainability must be framed as strengthening, not withdrawal.',
        },
        choices: [
          {
            id: 'lg_dp2_local_capacity',
            label: 'Local Capacity Building',
            description: 'Invest heavily in training local health workers, establishing community health financing schemes, and transferring program management to district health teams.',
            effects: { coverage: 6, healthOutcomes: 7, costEffectiveness: 8, equity: 9, communityTrust: 12, sustainability: 16 },
            narrative: 'A 3-year transition plan is developed with community input. Local health workers are formally trained and integrated into the civil service payroll. Community health insurance schemes launch in 4 villages as pilots, covering basic services for $3/month/household. District health teams take ownership of planning and budgeting. By Year 3, 60% of health services are locally financed. The model is slower to show health gains but builds genuine resilience.',
          },
          {
            id: 'lg_dp2_climate_tech',
            label: 'Climate-Resilient Technology',
            description: 'Deploy solar cold chains, flood-proof health facilities, climate-disease early warning systems, and telemedicine for disaster response.',
            effects: { coverage: 9, healthOutcomes: 8, costEffectiveness: 5, equity: 5, communityTrust: 4, sustainability: 9 },
            narrative: 'Climate-resilient infrastructure transforms the region\'s disaster preparedness. Solar cold chains maintain vaccine integrity through power outages. Flood-proof facilities on elevated platforms continue operating during the rainy season. Early warning systems predict disease surges 2 weeks ahead. However, the technology requires maintenance expertise and replacement parts that depend on external supply chains. Community ownership of the technology is limited.',
          },
          {
            id: 'lg_dp2_revenue',
            label: 'Revenue Generation & Self-Funding',
            description: 'Establish social enterprise health services, partner with private sector for pharmaceutical supply, create a regional health innovation fund from mining royalties.',
            effects: { coverage: 7, healthOutcomes: 5, costEffectiveness: 10, equity: 4, communityTrust: 3, sustainability: 12 },
            narrative: 'The revenue-generation approach is innovative but controversial. A social enterprise pharmacy chain provides affordable medicines while generating surplus for the health system. Mining royalties are earmarked for health (5% of regional revenue). Private sector partnerships improve supply chains. However, the most vulnerable populations — refugees and the poorest host community members — benefit least from market-based approaches. Equity concerns grow.',
          },
          {
            id: 'lg_dp2_comprehensive',
            label: 'Comprehensive Resilience Plan',
            description: 'Combine local capacity building with climate technology AND community financing. Slower, more expensive, but addresses all dimensions of sustainability.',
            effects: { coverage: 8, healthOutcomes: 8, costEffectiveness: 6, equity: 8, communityTrust: 9, sustainability: 13 },
            narrative: 'The comprehensive approach requires patience and coordination across multiple stakeholders. Local capacity building creates the human foundation. Climate technology provides the infrastructure resilience. Community financing creates the fiscal pathway. By Year 5, the Lake Amara Basin health system is recognized as a model for climate-adaptive, community-owned healthcare. It is not perfect — gaps remain in mental health and specialist care — but it is resilient and improving.',
          },
        ],
      },
    ],
    reflectionPrompt: 'As a {role}, how did you think about sustainability differently in this scenario? What tensions emerged between short-term needs and long-term resilience?',
  },
]
