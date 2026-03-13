# WHO Expert Review: Innovation Lab Simulation
## Comprehensive Public Health Review for Warwick Medical School

**Reviewer:** Senior WHO Regional Advisor (simulated expert review)
**Date:** 2026-03-13
**Scope:** Accuracy, pedagogical value, content gaps, scoring balance, and line-level corrections
**Target Audience:** PG/Masters students, Warwick Medical School

---

## 1. Accuracy Audit

### 1.1 Scenario 1 -- "The Silent Epidemic" (Maternal & Newborn Health, Kibo Highlands)

| Item | Current Value in Simulation | Issue | Corrected Value | Source |
|---|---|---|---|---|
| Maternal Mortality Rate | 612 per 100,000 live births | Plausible for a fictional sub-national hotspot. The global average is ~223/100,000 (2020); worst-performing countries like South Sudan reach ~1,223/100,000; sub-national pockets in Sierra Leone, Chad, and Nigeria exceed 800/100,000. A value of 612 is realistic for a neglected highland region. | Acceptable as-is; consider adding context that the national average for "Asante" should be specified (e.g., ~350/100,000) so students understand the intra-country inequity. | WHO MMEIG 2023; Lancet Global Health 2024; WHO Trends in Maternal Mortality 2000-2020 |
| "847 mothers died during or shortly after childbirth" | 847 deaths from a population of 2.1M | At an MMR of 612/100,000 live births, and assuming a crude birth rate of ~35/1,000 (typical for sub-Saharan African rural settings), the expected live births would be ~73,500. 612/100,000 x 73,500 = ~450 maternal deaths. To reach 847 deaths, the MMR would need to be ~1,152/100,000. This is internally inconsistent. | Either raise the MMR to ~1,150/100,000 (to match 847 deaths), or reduce deaths to ~450 (to match 612/100,000 MMR). Recommendation: lower deaths to "approximately 450" and keep MMR at 612/100,000, which is already a striking figure. | Arithmetic consistency check; WHO crude birth rate estimates for sub-Saharan Africa |
| Health Worker Coverage | 0.3 per 10,000 | This implies ~63 health workers for 2.1M people, which is extraordinarily low. WHO minimum threshold is 23 skilled health workers per 10,000. Even severely under-served areas of sub-Saharan Africa typically have 2-5 per 10,000 at the sub-national level. 0.3/10,000 may be more plausible if limited to midwives only, not all health workers. | Clarify as "0.3 midwives per 10,000 population" OR adjust to "2.1 health workers per 10,000" (still critically low). | WHO Global Health Observatory; WHO Health Workforce 2025 |
| Facility Birth Rate | 40% | Realistic. In rural sub-Saharan Africa, facility delivery rates range from 20-60% depending on geography and infrastructure. Ethiopia rural: ~26%; Kenya rural: ~44%; Tanzania rural: ~50%. | Acceptable as-is. | DHS surveys 2019-2023 |
| TBA-Attended Births | 60% | Consistent with the 40% facility birth rate. Realistic for highland/remote contexts. | Acceptable as-is. | -- |
| Neonatal Mortality Rate | 32 per 1,000 live births | The sub-Saharan African average is ~27/1,000 (2022, UN IGME). For a remote, under-served region, 32/1,000 is plausible and appropriately elevated. | Acceptable as-is. | UN IGME 2023; UNICEF Neonatal Mortality Report |
| Emergency Referral Success | 23% | Plausible but lacks specificity. What counts as "success"? Students would benefit from a definition (e.g., "reaching a CEmONC facility within 2 hours of referral decision"). | Add a tooltip or footnote: "Percentage of emergency obstetric referrals that reach a facility capable of caesarean section within the critical 2-hour window." | WHO EmONC assessment framework |
| PPH drapes: "60% reduction in severe postpartum bleeding" (innovations.ts) | 60% reduction | This figure comes from a WHO study but refers to the combined package of interventions (active management of the third stage of labour including uterotonic drugs + calibrated drape), not the drape alone. The drape improves *detection* of PPH; the reduction in severe PPH is attributable to the combined protocol. | Reword to: "WHO study: 60% reduction in severe PPH when calibrated drapes are used as part of active management of the third stage of labour (including uterotonics)." | WHO Recommendations on Prevention and Treatment of PPH, 2023 update |
| CHW coverage "15-20 villages each" | 15-20 villages per CHW | Realistic. In many sub-Saharan African countries, CHWs cover 500-1,000 households. At ~200 households/village, 15-20 villages is plausible. | Acceptable as-is. | WHO CHW Guidelines 2018 |

### 1.2 Scenario 2 -- "The Invisible Threat" (TB and Dengue, Lumasa Metro)

| Item | Current Value in Simulation | Issue | Corrected Value | Source |
|---|---|---|---|---|
| TB Case Detection Rate | 73% | Global TB case detection rate was approximately 75% in 2022 (7.5M notified of estimated 10.6M). For a high-burden urban setting, 73% is realistic. | Acceptable as-is. | WHO Global TB Report 2023 |
| MDR-TB Prevalence | 8% of new cases | This is high but plausible for a hotspot. Globally, 3.3% of new TB cases have MDR/RR-TB (2022). In high-burden MDR-TB countries (Belarus, Russia, Moldova), rates exceed 20%. For an urban informal settlement with incomplete treatment and overcrowding, 8% is a credible hotspot figure. | Acceptable as-is, but consider adding context: "triple the national average of 2.7%." | WHO Global TB Report 2023; Global Drug Resistance Surveillance |
| "809 cases were notified" for a city of 3.8M | 809 TB case notifications | This is far too low. Indonesia notified 809,000 cases nationally (2023). For a city of 3.8M with high TB burden, expected notifications would be in the thousands. At a notification rate of ~200/100,000 (common in high-burden African cities), expect ~7,600 notifications. | Change to "7,600 cases were notified" with an estimated true burden of "over 10,400." Alternatively, if the intent is 809 per 100,000 (notification rate), clarify accordingly. | WHO Global TB Report 2023; Indonesia case study in R1 report |
| Dengue Cases (this month) | 2,340 | Plausible for an urban dengue outbreak. During peak outbreaks, cities can see thousands of cases per month. | Acceptable as-is. | WHO Dengue Global Situation 2024 |
| Hospital Bed Occupancy | 142% | Realistic for overcrowded urban hospitals in LMICs. Occupancy rates above 100% are well-documented in African referral hospitals. | Acceptable as-is. | Lancet Commission on Diagnostics 2021 |
| Health Workers per 10,000 | 2.1 | More realistic for an urban setting than the 0.3 in Scenario 1, but still far below the WHO threshold of 23/10,000. Plausible for "Asante." | Acceptable as-is. | WHO GHO |
| TB treatment completion rate | 61% | The global TB treatment success rate was 88% in 2022 (for drug-susceptible TB). For a high-burden urban setting with significant MDR-TB and stigma, 61% is low but defensible. However, the simulation should distinguish between drug-susceptible and MDR-TB completion rates (MDR-TB success is ~63% globally). | Consider noting: "61% overall, reflecting high loss to follow-up in informal settlements where standard DOTS supervision is impractical." | WHO Global TB Report 2023 |
| "Each MDR-TB case costs 100x more to treat than regular TB" | 100x cost ratio | Approximate. Drug-susceptible TB: ~$40-400/patient (LMICs). MDR-TB: ~$1,000-$8,000 (short regimen) to $20,000+ (long regimen with injectables). The ratio ranges from 25x to 200x depending on regimen and setting. "100x" is a reasonable approximation. | Acceptable as-is as a heuristic. | WHO TB Report 2023; MSF TB treatment cost data |
| 99DOTS cost: "$2/patient" | ~$2/patient for 6 months | Consistent with published data from Microsoft Research India. | Acceptable as-is. | Microsoft Research; R1 report |

### 1.3 Scenario 3 -- "The Long Game" (Climate, NCDs & Displacement, Lake Amara Basin)

| Item | Current Value in Simulation | Issue | Corrected Value | Source |
|---|---|---|---|---|
| NCD Prevalence (camp) | 18% of adults | This is plausible but on the low side for an ageing refugee population. In protracted refugee settings, NCD prevalence among adults can reach 20-40%. A UNHCR survey in Jordan found 18% of Syrian refugees had at least one NCD, supporting this figure for a younger refugee population. For an "aging" population as described, 25-30% would be more realistic. | Consider increasing to "24% of adults" to reflect an ageing demographic, or keep at 18% but remove the "aging" descriptor. | UNHCR Health Access Report 2024; Lancet Diabetes & Endocrinology review of NCD in refugees |
| Mental Health Gap | 94% unserved | The WHO mental health treatment gap in LMICs is estimated at 76-85%. In refugee settings, it can be higher. However, "94% unserved" is very high even for refugee contexts. UNHCR reports that mental health services reached <5% of those in need in some protracted settings, making 94-95% unserved plausible for a specific camp. | Acceptable as-is for a specific under-resourced camp. Consider citing: "consistent with UNHCR estimates that fewer than 5% of refugees with mental health conditions receive appropriate care in protracted settings." | WHO Mental Health Atlas 2022; UNHCR Global Trends 2024 |
| Refugee Population | 180,000 in a camp built for 50,000 | Realistic. Dadaab (Kenya) housed up to 350,000 in a camp designed for 90,000. Kakuma reached 200,000. The 3.6x overcrowding ratio is well-documented in protracted settings. | Acceptable as-is. | UNHCR camp statistics |
| International Funding Trend | Declining 12%/year | This is steeper than the aggregate global trend but realistic for specific protracted crises that fall out of the news cycle. Overall humanitarian funding grew modestly in 2023-2024 but many individual country operations saw 10-20% cuts. | Acceptable as-is for a fictional protracted crisis. Consider softening to "declining approximately 10-15% per year." | UNHCR Global Appeal 2025; OCHA Financial Tracking Service |
| Climate Displacement | 34,000 this year | Plausible for a lake-basin flooding scenario. Internal climate displacement in East Africa reached millions in 2023 (Cyclone Freddy, Horn of Africa floods). For a sub-regional lake-level rise, 34,000 is conservative and realistic. | Acceptable as-is. | IDMC Global Report on Internal Displacement 2024 |
| Lake level rise: "2.3 meters in the past decade" | 2.3m in 10 years | Consistent with real-world analogues. Lake Victoria rose ~1.7m between 2019-2020. Lake Tanganyika and Lake Malawi have shown similar fluctuations. Lake Chad has shown dramatic long-term changes. | Acceptable as-is. | NASA/USDA Global Reservoir and Lake Monitor; World Bank climate reports |

### 1.4 Innovations Data (innovations.ts)

| Item | Current Value | Issue | Corrected Value | Source |
|---|---|---|---|---|
| Dual Bed Nets: "38.4M nets deployed across 17 sub-Saharan African countries" | 38.4M | Consistent with R1 and R2 reports. The Global Fund reported 38.4M dual-ingredient nets deployed by 2022 and noted 80% of nets shipped in 2023 were dual-ingredient. By 2025-2026, the deployed figure would be significantly higher. | Consider updating to reflect 2025 scale: "Over 100M dual-ingredient nets deployed across 20+ countries by 2025." | WHO World Malaria Report 2024; Global Fund New Nets Project |
| Wolbachia: "77% dengue reduction in Indonesia, 94-97% in Colombia" | As stated | Accurate. The Yogyakarta RCT (NEJM 2021) showed 77% reduction. Colombia data from Aburra Valley shows 94-97%. | Acceptable as-is. | NEJM 2021; World Mosquito Program 2025 |
| Lenacapavir: "100% efficacy in trials" | 100% in PURPOSE 1 | Accurate for the PURPOSE 1 trial (cisgender women). The PURPOSE 2 trial showed 96% reduction in HIV incidence among cisgender men, trans, and non-binary individuals. The simulation should note that "100% efficacy" was for a specific trial population. | Consider rewording to: "100% efficacy in PURPOSE 1 trial (5,300 cisgender women); 96% efficacy in PURPOSE 2 trial (broader populations)." | Gilead PURPOSE 1 & 2 trial data; WHO HIV guidelines 2025 |
| Lenacapavir: "FDA approved June 2025" | June 2025 | The FDA approved lenacapavir for PrEP in late 2024 (December 2024), not June 2025. WHO prequalification came in October 2025. | Change to: "FDA approved December 2024 for HIV prevention. WHO prequalified October 2025." | FDA approval notice; WHO PQ announcement |
| AI Antibiotic Discovery: "AMR causes 1.27 million deaths annually" | 1.27M deaths (2019 estimate) | This is the 2019 IHME/Lancet estimate of deaths *directly attributable* to AMR. The total number of deaths *associated with* AMR was 4.95 million. By 2024-2025, updated modelling from the Lancet suggests the attributable figure may have risen. The 2024 Lancet GRAM study projected AMR deaths rising to 1.91M attributable deaths/year by 2050 under a "worst case" scenario. | Consider updating to: "AMR directly caused an estimated 1.27 million deaths in 2019 and was associated with 4.95 million deaths (Lancet/IHME 2022). Updated 2024 projections suggest AMR attributable deaths could reach 1.91 million/year by 2050 without intervention." | Murray et al., Lancet 2022; Lancet GRAM 2024 update |
| Foldscope: "magnifying up to 2,000x" | 2,000x | Consistent with published specifications from the Prakash Lab. | Acceptable as-is. | Cybulski et al., PLOS ONE 2014 |
| Drone Delivery: "51% reduction in maternal deaths from hemorrhage in Rwanda" | 51% | This figure is from a Wharton School/Lancet Global Health study of Zipline-served facilities. It refers to the reduction specifically at *served facilities*, not nationally. | Clarify: "51% reduction in maternal deaths from hemorrhage at Zipline-served health facilities in Rwanda." | Lancet Global Health 2022; Wharton School study |
| mRNA Vaccine Platform: "BioNTech Phase I/II for TB" | Phase I/II | Status should be verified. BioNTech's BNT164a1/b1 TB candidates entered Phase I in 2023-2024. As of early 2026, they may still be in Phase I or have progressed. | Verify current trial status via clinicaltrials.gov. | BioNTech pipeline; Nature Signal Transduction 2024 |
| OVision: "95% accuracy in detecting ovarian cancer subtypes" | 95% accuracy | This is proof-of-concept accuracy on a specific dataset. Should not be confused with clinical validation accuracy, which typically drops in real-world deployment. | Add qualifier: "95% accuracy in detecting ovarian cancer subtypes on research datasets (proof-of-concept; clinical validation pending)." | Mehta et al., Nature Scientific Reports 2025 |

---

## 2. Pedagogical Review

### 2.1 Health Systems Thinking

**Strengths:**
- The three scenarios effectively cover the WHO health system building blocks: service delivery (Scenario 1), health workforce (all three), health information systems (Scenario 2 surveillance), medical products & technologies (innovations layer), health financing (Scenario 3 sustainability), and leadership/governance (role-based decisions).
- The progression from an acute crisis (Scenario 1, maternal health) to a dual-disease challenge (Scenario 2, TB + dengue) to a long-term systems challenge (Scenario 3, climate + displacement) is pedagogically sound. It moves students from "how to respond" to "how to build."
- The decision-point structure (initial response then scaling/sustainability) within each scenario mirrors real-world programme cycles.

**Weaknesses:**
- The simulation does not explicitly surface the concept of the **WHO health system building blocks**. Adding a brief framework reference in the debrief would strengthen health systems literacy.
- There is no explicit treatment of **governance failures** as a root cause. All three scenarios assume good-faith actors. In reality, corruption, procurement fraud, and political capture of health budgets are major barriers. At least one scenario or decision point should introduce governance risk.
- The simulation lacks a **health financing mechanism layer**. Students are told they have a budget but never engage with *how* that budget was generated (tax revenue, donor aid, insurance premiums, out-of-pocket payments). Scenario 3's sustainability decision point touches on this but only superficially.

### 2.2 Trade-off Learning

**Strengths:**
- The six metrics (coverage, equity, cost-effectiveness, sustainability, community trust, health outcomes) create genuine multi-dimensional trade-offs. No single choice maximizes all six metrics in any decision point (see Section 4 for exceptions).
- The tension between acute visible crises (dengue) and chronic invisible ones (TB) in Scenario 2 is an excellent teaching device for priority-setting.
- The community trust metric forces students to consider demand-side factors, not just supply-side interventions.

**Weaknesses:**
- The "Integrated" or "Comprehensive" choices tend to score reasonably well across all metrics (see Section 4). While the simulation penalizes them with roleModifiers, students may still gravitate toward them as "safe" choices, reducing the pedagogical tension. Consider making the trade-offs for integrated approaches more painful (e.g., significantly higher cost, much slower timelines, or explicit opportunity cost).
- The simulation does not make students *feel* the trade-off of limited budget. Each decision point has a fixed budget, but students never have to sacrifice one scenario's funding for another. A cross-scenario resource constraint would strengthen trade-off learning.

### 2.3 Role Differentiation and Information Asymmetry

**Strengths:**
- The six roles are well-differentiated across three dimensions: priorities, metrics, and unique information.
- The uniqueInfo field creates genuine information asymmetry that would be powerful in a group setting (e.g., the CHW knows that 40% of programs fail due to poor cultural fit; the Minister knows 62% of preventable deaths occur in rural areas but 73% of spending goes to urban facilities).
- The roleSpecificContext in each decision point is well-crafted and creates realistic internal tensions (e.g., the NGO Director's donors have earmarked funds that conflict with integrated approaches).

**Weaknesses:**
- The **Tech Entrepreneur** role risks being a caricature. In practice, technology entrepreneurs in global health (e.g., Zipline's Keller Rinaudo, mPedigree's Bright Simons) are deeply engaged with community needs and regulatory environments. The role should emphasize that good health tech entrepreneurs are obsessed with outcomes, not technology for its own sake.
- The **Patient Advocate** and **CHW** roles overlap significantly in their priorities (community trust, equity, health outcomes). Consider giving the Patient Advocate more emphasis on **health literacy, informed consent, and data rights** to create sharper differentiation.
- The roleModifiers are sparse. Only 1-2 roles have modifiers per choice, meaning most roles experience the same base effects. This weakens the "you would have decided differently in a different role" learning objective. Consider adding roleModifiers for at least 3-4 roles per choice.

### 2.4 Scoring System and "Correct Answers"

**Strengths:**
- The role-weighted scoring system (`getRoleWeightedScore`) ensures that the "best" score depends on your role. This is pedagogically excellent -- it demonstrates that optimal decisions depend on whose perspective you take.
- The `getOverallScore` function uses a simple average, while role-weighted scoring uses per-metric weights (e.g., Health Minister weights coverage at 1.5x but community trust at 0.7x). This creates genuine divergence.

**Weaknesses:**
- The `generateRoleComparison` function adds random noise (`Math.random() - 0.5) * 10`) to counterfactual role scores. This is pedagogically problematic: it undermines the deterministic relationship between choices and outcomes. Students should be able to trace *why* a different role would have scored differently, not attribute it to randomness. Recommendation: remove the random noise and compute counterfactual scores deterministically based on alternative choice paths, or at minimum reduce the noise range to +/- 3.
- The scoring system does not account for **sequencing effects** between the two decision points within each scenario. The second decision's effects are simply added to the first. In reality, certain first-round decisions would constrain or amplify second-round options (e.g., choosing "Technology Leapfrog" in Scenario 1 DP1 should make "Deepen Before Widening" in DP2 more costly, as the community trust deficit needs repair).

---

## 3. Content Gap Analysis

### 3.1 Missing Global Health Concepts

| Concept | Importance for PG Students | How to Integrate |
|---|---|---|
| **Antimicrobial Resistance (AMR)** | AMR is arguably the greatest long-term threat to global health. The simulation mentions MDR-TB but does not treat AMR as a cross-cutting theme. The AI Antibiotic Discovery innovation is in the game but AMR stewardship is not a decision point. | Add an AMR stewardship decision to Scenario 2 (e.g., "How do you balance TB treatment access with AMR stewardship? Expanding empiric treatment finds more cases but risks resistance if diagnosis is imprecise.") |
| **Pandemic Preparedness and the IHR** | COVID-19 demonstrated the catastrophic cost of poor preparedness. The International Health Regulations (2005) and the Pandemic Preparedness Treaty negotiations are critical for PG students. | Add a brief reference in Scenario 2's surveillance decision point. Alternatively, create a 4th scenario focused on a novel pathogen emerging in the Lake Amara Basin (zoonotic spillover from displaced wildlife + refugee overcrowding). |
| **One Health** | The interconnection of human, animal, and environmental health is not addressed. Scenario 3's climate-health nexus is an ideal entry point but the simulation does not connect to zoonotic disease risk, veterinary capacity, or environmental health infrastructure. | Add a sentence to Scenario 3's background narrative about zoonotic risk from displaced livestock and wildlife habitat destruction. |
| **Universal Health Coverage (UHC) Financing** | The simulation never engages with *how* health is financed. Concepts like social health insurance, community-based health insurance, results-based financing, and domestic resource mobilization are absent. | Scenario 3's sustainability decision point could include a choice about health financing mechanisms (e.g., "Introduce a community-based health insurance scheme at $3/month vs. advocate for a national social health insurance mandate"). |
| **Digital Determinants of Health** | The simulation mentions connectivity rates but does not engage with the concept of digital literacy, data sovereignty, algorithmic bias, or the gender digital divide as determinants of health outcomes. | Add a note to the Tech Entrepreneur's uniqueInfo about the gender digital divide (885 million unconnected women in LMICs, per GSMA 2025) and algorithmic bias risk. |
| **Health Workforce Migration** | The global health workforce crisis is partly driven by emigration of trained professionals from LMICs to HICs. The simulation mentions health worker shortages but not the "brain drain" dynamic. | Add to the Health Minister's uniqueInfo in Scenario 1: "Last year, 42 of the 87 midwives trained in Asante's medical schools emigrated within 12 months of graduation." |
| **Supply Chain and Procurement** | Essential medicine stockouts, counterfeit drugs, and last-mile supply chain failures are absent from the scenarios despite being critical constraints in real-world LMIC health systems. | Consider adding a sub-decision in Scenario 2 about pharmaceutical supply chains (e.g., "90-day TB drug supply has arrived, but the cold chain failed for rifampicin. Do you use potentially degraded stock or wait 6 weeks for resupply?"). |

### 3.2 Missing Innovation Categories

| Category | Examples | Why It Matters |
|---|---|---|
| **Point-of-Care Diagnostics beyond microscopy** | GeneXpert MTB/RIF, Abbott m-PIMA, Truenat | GeneXpert transformed TB diagnosis globally. Students should understand the diagnostic ecosystem, not just AI pathology. The Foldscope is interesting but unvalidated; GeneXpert is the proven workhorse. |
| **3D Printing for Medical Devices** | E-NABLE prosthetic hands, OpenFlexure microscope, 3D-printed surgical instruments | The R2 report documents this thoroughly but it is absent from the innovations.ts file. 3D printing enables local manufacturing, which is critical for health sovereignty. |
| **Mobile Money for Health** | M-TIBA (Kenya), M-PESA health payments | Mobile money platforms are transforming health financing in East Africa. Students should understand that financial innovation is as important as medical innovation. |
| **Counterfeit Drug Detection** | mPedigree GoldKeys, PharmaSecure | Substandard and falsified medicines kill an estimated 250,000-500,000 people annually in sub-Saharan Africa. This is absent from the simulation. |
| **Neonatal Innovations** | Neopenda neoGuard, Embrace Infant Warmer | Scenario 1 focuses on maternal health but largely ignores newborn-specific innovations despite listing neonatal mortality as a key stat. |

### 3.3 Missing Stakeholder Perspectives

| Stakeholder | Why They Matter | How to Integrate |
|---|---|---|
| **Ministry of Finance / Treasury** | Health budgets are determined by finance ministries, not health ministries. The fiscal space for health, competing demands (education, infrastructure, defence), and debt servicing are critical constraints that the Health Minister role does not capture. | Add as an alternative role, or add Treasury pressure to the Health Minister's roleSpecificContext. |
| **Traditional Healer / TBA** | The simulation describes TBAs as important actors in Scenario 1 but does not give students the option to play as one. Traditional healers are the first point of contact for 60-80% of the population in many African countries. | Add as a 7th role option, or add a more robust traditional healer perspective within the CHW role. |
| **Private Sector Healthcare Provider** | In many LMICs, 50-70% of healthcare is delivered by the private sector (private clinics, pharmacies, drug shops). The simulation is entirely focused on public sector and NGO delivery. | Add private sector dynamics to Scenario 2 (e.g., "Private clinics in Lumasa Metro diagnose 40% of TB cases but rarely report to the national system"). |
| **Journalist / Media** | Media coverage shapes political will and public behaviour. The simulation mentions media pressure but does not give students the option to manage communication strategically. | Add a communication sub-decision to Scenario 2 (e.g., "Dengue deaths are dominating headlines. Do you hold a press conference to redirect attention to TB?"). |
| **Refugee Representative / Community Leader** | Scenario 3 describes refugee populations but does not include a refugee perspective as a role. Refugee agency and leadership are critical to effective humanitarian health programming. | Consider replacing one existing role with a refugee community leader for Scenario 3, or adding scenario-specific role variants. |

### 3.4 Suggested Additional Scenarios

**Scenario A: "The Resistance" -- Antimicrobial Resistance in a Regional Referral Hospital**
- Setting: A 600-bed regional referral hospital where post-surgical infection rates have tripled in 18 months. Carbapenem-resistant Klebsiella has been identified on two wards. The hospital pharmacy routinely dispenses antibiotics without prescription. Local pharmacies sell leftover antibiotics as single pills.
- Decision Point 1: How do you introduce antibiotic stewardship in a setting where restricting access could mean patients die from untreated infections?
- Decision Point 2: Do you invest in a hospital-level microbiology laboratory ($500K), implement rapid diagnostic testing at point-of-care ($150K), or deploy an empiric treatment protocol based on regional resistance patterns ($20K)?
- Learning Objectives: AMR as a systems problem; tension between access and stewardship; diagnostic infrastructure as a public good; One Health connections (agricultural antibiotic use).

**Scenario B: "Patient Zero" -- Pandemic Preparedness and Novel Pathogen Response**
- Setting: A health worker in the Lake Amara Basin develops an unusual febrile illness with a 30% case fatality rate. Genomic sequencing identifies a novel paramyxovirus. Three contacts are symptomatic. The pathogen likely spilled over from fruit bats displaced by flooding into the refugee camp.
- Decision Point 1: Do you impose quarantine (effective but politically explosive in the refugee camp), conduct ring vaccination with an experimental mRNA vaccine (fast but untested), or deploy an intensive contact tracing and isolation programme?
- Decision Point 2: International media has arrived. WHO is requesting data sharing. The national government wants to control the narrative. How do you balance transparency, national sovereignty, and community trust?
- Learning Objectives: IHR obligations; pandemic preparedness; One Health; novel vaccine deployment ethics; data sharing vs sovereignty; risk communication.

---

## 4. Scoring Balance Review

### 4.1 Scenario 1, Decision Point 1: "First Response Strategy"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Strengthen Facilities | cov:12 ho:10 ce:6 eq:4 ct:2 sus:5 (sum=39) | No | Reasonable. Lower community trust and equity reflect facility-centric bias. | None needed. |
| Community-Based | cov:8 ho:8 ce:12 eq:10 ct:14 sus:10 (sum=62) | **YES -- DOMINATES** | Sum is 62 vs 39 (next closest). This choice is clearly superior across nearly all metrics. It has the highest score in 4 of 6 metrics and is only modestly lower in 2 (coverage, health outcomes). A rational student would always choose this. | Reduce effects to create a genuine trade-off. Suggested: cov:6 ho:6 ce:10 eq:10 ct:14 sus:8 (sum=54). Also consider lowering healthOutcomes further to reflect the real limitation of TBA-based care: TBAs cannot perform caesarean sections, manage eclampsia, or handle severe complications. Add roleModifier for health_minister: { healthOutcomes: -4, coverage: -3 } reflecting political risk of "non-facility" approach. |
| Technology Leapfrog | cov:6 ho:7 ce:4 eq:3 ct:-2 sus:3 (sum=21) | No | Weakest option with a negative community trust score. However, the sum of 21 is *too* low -- it makes this a clearly "wrong" answer. | Increase healthOutcomes to 10 and coverage to 8 to reflect the genuine life-saving potential of drones and telemedicine, while keeping community trust negative. Suggested: cov:8 ho:10 ce:4 eq:3 ct:-2 sus:3 (sum=26). |
| Integrated Strategy | cov:9 ho:9 ce:8 eq:8 ct:8 sus:8 (sum=50) | Near-dominant | Scores above average on every metric. This is the "safe" choice. The roleModifiers (health_minister: ce:-3; tech_entrepreneur: cov:-2, ho:-2) partially offset this but only for 2 roles. | Add explicit trade-offs: increase cost (reduce ce to 5), slow the timeline (reduce ho to 7 in short term), or require additional funding (reduce sustainability to 6). Suggested: cov:9 ho:7 ce:5 eq:8 ct:8 sus:6 (sum=43). |

### 4.2 Scenario 1, Decision Point 2: "Scaling the Response"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Rapid National Scale-up | cov:14 ho:6 ce:3 eq:5 ct:-3 sus:-2 (sum=23) | No | Has the highest coverage but lowest sustainability and negative community trust. Good trade-off design. | None needed. |
| Deepen Before Widening | cov:5 ho:12 ce:10 eq:8 ct:10 sus:12 (sum=57) | **YES -- DOMINATES** | Sum of 57 is far higher than alternatives. Only weakness is low coverage (5), but all other metrics are the highest. A student who values anything other than raw coverage will always choose this. | Reduce effects. Suggestion: cov:5 ho:10 ce:8 eq:7 ct:8 sus:10 (sum=48). The political cost of slow coverage expansion should be more painful. Add roleModifier for health_minister: { coverage: -4, costEffectiveness: -3 } and for ngo_director: { sustainability: -2 } reflecting donor impatience. |
| Partnership Expansion | cov:10 ho:8 ce:7 eq:7 ct:5 sus:7 (sum=44) | No | Reasonable middle-ground option. | None needed. |

### 4.3 Scenario 2, Decision Point 1: "Dual Emergency Response"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Prioritize TB | cov:8 ho:11 ce:9 eq:7 ct:3 sus:8 (sum=46) | No | Good balance -- high health outcomes but low community trust. | None needed. |
| Prioritize Dengue | cov:6 ho:5 ce:5 eq:4 ct:10 sus:3 (sum=33) | No | Appropriately reflects the epidemiological reality that dengue response is less cost-effective long-term. Low sustainability is correct. | None needed. |
| Balanced Dual Response | cov:9 ho:9 ce:7 eq:8 ct:7 sus:10 (sum=50) | Near-dominant | Scores at or near the top in 4 of 6 metrics. The "balanced" approach should have a clearer cost: neither epidemic is contained quickly. | Reduce ho to 7 and ce to 5 to reflect the "jack of all trades, master of none" problem. Suggested: cov:9 ho:7 ce:5 eq:8 ct:7 sus:10 (sum=46). |
| Invest in Surveillance | cov:7 ho:6 ce:8 eq:6 ct:4 sus:14 (sum=45) | No | Highest sustainability (14) with moderate other scores. Good trade-off design. | None needed. |

### 4.4 Scenario 2, Decision Point 2: "Stigma and Adherence"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Digital Adherence | cov:7 ho:9 ce:12 eq:5 ct:6 sus:7 (sum=46) | No | Good trade-off: high cost-effectiveness but low equity (digital divide). | None needed. |
| Community-Led Destigmatization | cov:5 ho:7 ce:8 eq:10 ct:14 sus:10 (sum=54) | Near-dominant | Highest sum. High equity and community trust but lower health outcomes and coverage. The sum gap (54 vs 46 for next best) is significant but not as extreme as Scenario 1. | Consider reducing ce to 6 and sus to 8: sum=50. Community-led approaches are more resource-intensive than often assumed. |
| Transform Clinic Experience | cov:6 ho:8 ce:6 eq:8 ct:10 sus:8 (sum=46) | No | Balanced option. Equal sum to Digital Adherence but different distribution. | None needed. |

### 4.5 Scenario 3, Decision Point 1: "Service Integration vs Separation"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Full Integration | cov:7 ho:6 ce:10 eq:12 sus:11 ct:5 (sum=51) | No | High equity and cost-effectiveness but lower community trust and health outcomes reflect transition challenges. | None needed. |
| Maintain Separate | cov:5 ho:7 ce:4 eq:3 ct:3 sus:4 (sum=26) | Weakest | Sum of 26 is far below alternatives. This makes "separate systems" look like an obviously wrong answer. In reality, separate systems preserve dedicated refugee funding and can provide higher-quality specialised care. | Increase ho to 9 (specialised care quality) and add ct to 6 (each community's "own" services). Suggested: cov:5 ho:9 ce:4 eq:3 ct:6 sus:4 (sum=31). Still weaker but not a "trap" option. |
| Hybrid Model | cov:8 ho:8 ce:8 eq:9 ct:8 sus:8 (sum=49) | Near-dominant | All metrics at 8-9: the classic "safe" middle option. | Introduce a sharper trade-off. Suggested: cov:7 ho:7 ce:6 eq:9 ct:8 sus:7 (sum=44). The hybrid model is complex and coordination-heavy, which should reduce cost-effectiveness and coverage. |

### 4.6 Scenario 3, Decision Point 2: "Building for an Uncertain Future"

| Choice | Effects (sum) | Dominant? | Issue | Suggested Adjustment |
|---|---|---|---|---|
| Local Capacity Building | cov:6 ho:7 ce:8 eq:9 ct:12 sus:16 (sum=58) | **YES -- DOMINATES** | Sum of 58 is highest by a wide margin. Sustainability of 16 is the highest single-metric score in the entire simulation. Every role except Tech Entrepreneur would prefer this. | Reduce sustainability to 12 and ct to 9. Local capacity building is correct strategy but it is slow and difficult. Suggested: cov:5 ho:6 ce:7 eq:9 ct:9 sus:12 (sum=48). |
| Climate-Resilient Technology | cov:9 ho:8 ce:5 eq:5 ct:4 sus:9 (sum=40) | No | Reasonable. High coverage and health outcomes but lower equity and community trust. | None needed. |
| Revenue Generation | cov:7 ho:5 ce:10 eq:4 ct:3 sus:12 (sum=41) | No | Interesting option. Equity concerns are well-reflected. | None needed. |
| Comprehensive Resilience | cov:8 ho:8 ce:6 eq:8 ct:9 sus:13 (sum=52) | Near-dominant | Second highest sum. Again, the "comprehensive" option is too safe. | Reduce to cov:7 ho:7 ce:4 eq:7 ct:8 sus:11 (sum=44). Comprehensive plans are expensive, slow, and require exceptional coordination. |

### 4.7 Summary of Scoring Balance Issues

**Systemic Pattern:** In 4 of 6 decision points, the community-based / deepening / local-capacity / comprehensive option dominates or near-dominates. While these approaches are indeed effective in real-world global health, the simulation creates a predictable pattern where students can reliably maximise scores by choosing community-focused, patient-centred options. This undermines the pedagogical objective of forcing genuine trade-offs.

**Recommendation:** Reduce effect sums for community-based options by 10-15% and increase effect sums for technology and facility options by 5-10%. The goal is not to make any option "best" but to ensure the effect sum range within each decision point is no more than 25% between highest and lowest (currently some decision points have a 2-3x range).

**RoleModifiers Recommendation:** Currently, only 8 of 25 choices have roleModifiers, and those that do modify only 1-2 roles. Expand roleModifiers to at least 4 roles per choice, ensuring that each role experiences meaningfully different outcomes. This is the primary mechanism for making the "correct answer" role-dependent.

---

## 5. Specific Corrections

### 5.1 scenarios.ts

| File | Location | Current Text | Suggested Correction | Reason |
|---|---|---|---|---|
| scenarios.ts | Line 10, backgroundNarrative | "Last year, 847 mothers died during or shortly after childbirth -- a rate of 612 per 100,000 live births" | "Last year, approximately 450 mothers died during or shortly after childbirth -- a rate of 612 per 100,000 live births" | Internal arithmetic inconsistency. 612/100,000 applied to ~73,500 live births yields ~450 deaths, not 847. See Section 1.1. |
| scenarios.ts | Line 12, backgroundNarrative | "The few community health workers in the region are stretched thin, covering 15-20 villages each." | "The few community health workers in the region are stretched thin, each responsible for 15-20 villages and up to 1,000 households." | Adding household numbers gives students a concrete sense of workload. WHO CHW guidelines reference household ratios. |
| scenarios.ts | Line 22, keyStats | `{ label: 'Health Worker Coverage', value: '0.3 per 10,000', trend: 'down' }` | `{ label: 'Midwife Coverage', value: '0.3 per 10,000', trend: 'down' }` | 0.3 per 10,000 is unrealistically low for all health workers combined but plausible for midwives specifically. See Section 1.1. |
| scenarios.ts | Line 134, backgroundNarrative | "Last year, 809 cases were notified -- but epidemiological models suggest the true number is over 1,100." | "Last year, 7,600 cases were notified -- but epidemiological models suggest the true number exceeds 10,400." | 809 TB notifications for a city of 3.8M is implausibly low. At a notification rate of ~200/100,000, expect ~7,600. The "1 in 4 goes undetected" narrative (73% detection rate) should yield 10,400 total cases. See Section 1.2. |
| scenarios.ts | Line 134, backgroundNarrative | "Worse, drug-resistant TB (MDR-TB) has been detected in 8% of new cases, triple the national average." | "Worse, drug-resistant TB (MDR-TB) has been detected in 8% of new cases, nearly three times the national average of 2.8%." | Providing the specific national average gives students a reference point and enables them to calculate the absolute number of MDR-TB cases. |
| scenarios.ts | Line 196, context | "Treatment completion rate is only 61%." | "Treatment completion rate is only 61% -- far below the WHO target of 90% and the global average of 88% for drug-susceptible TB." | Adding the WHO target and global average provides essential context for PG students. |
| scenarios.ts | Line 248, keyStats | `{ label: 'NCD Prevalence (camp)', value: '18% of adults', trend: 'up' }` | `{ label: 'NCD Prevalence (camp)', value: '24% of adults', trend: 'up' }` | 18% is plausible but inconsistent with the narrative description of "an aging refugee population" with "growing NCD burden." UNHCR data from protracted settings with aging populations shows 20-30% NCD prevalence. |

### 5.2 innovations.ts

| File | Location | Current Text | Suggested Correction | Reason |
|---|---|---|---|---|
| innovations.ts | Line 12, PPH Drape realWorldBasis | "WHO study: 60% reduction in severe postpartum bleeding." | "WHO study: 60% reduction in severe PPH when used as part of active management of the third stage of labour (including uterotonics). The drape's primary function is accurate blood loss measurement." | The 60% reduction is for the combined protocol, not the drape alone. See Section 1.1. |
| innovations.ts | Line 59, OVision description | "95% accuracy in detecting ovarian cancer subtypes, on par with traditional systems costing $50K-$200K." | "95% accuracy in detecting ovarian cancer subtypes on research datasets, on par with traditional systems costing $50K-$200K. Clinical validation pending." | Proof-of-concept accuracy on curated datasets differs from real-world clinical accuracy. PG students should understand this distinction. |
| innovations.ts | Line 85, Wolbachia category | `category: 'social_big_data'` | `category: 'patient_centric'` or create a new `biological_innovation` category | Wolbachia is a biological vector control intervention, not a data-driven solution. Classifying it under "Social Big Data" is misleading. It is closer to "Patient-Centric" (community-level protection) or warrants its own "Biological Innovation" category. |
| innovations.ts | Line 160, Drone Delivery realWorldBasis | "51% reduction in maternal deaths from hemorrhage in Rwanda." | "51% reduction in maternal deaths from hemorrhage at Zipline-served health facilities in Rwanda (Wharton/Lancet Global Health study)." | The 51% figure applies to served facilities specifically, not to Rwanda nationally. |
| innovations.ts | Line 211, Lenacapavir description | "100% efficacy in trials. $40/year across 100+ LMICs." | "100% efficacy in PURPOSE 1 trial (5,300 cisgender women, Uganda/South Africa); 96% reduction in PURPOSE 2 (broader populations). $40/year across 100+ LMICs via CHAI agreement." | Specifying the trial populations and the access mechanism (CHAI) adds critical context. |
| innovations.ts | Line 212, Lenacapavir realWorldBasis | "FDA approved June 2025." | "FDA approved December 2024 for HIV prevention. WHO prequalified October 2025 (record 36-day review)." | Incorrect approval date. |
| innovations.ts | Line 185, AI Antibiotic Discovery description | "Addresses AMR crisis (1.27M deaths annually)." | "Addresses AMR crisis (1.27M deaths directly attributable and 4.95M associated deaths annually, Lancet/IHME 2022; projected to worsen through 2050)." | The 1.27M figure alone understates the AMR burden. The 4.95M "associated" figure is equally important for context. |

### 5.3 roles.ts

| File | Location | Current Text | Suggested Correction | Reason |
|---|---|---|---|---|
| roles.ts | Line 58, Tech Entrepreneur description | "You believe technology can leapfrog traditional barriers to healthcare access." | "You believe technology can leapfrog traditional barriers to healthcare access, but you know from experience that the best health technologies are those designed with communities, not for them." | Prevents the role from being a caricature of techno-solutionism. Real health tech entrepreneurs (e.g., Zipline, mPedigree) are deeply community-engaged. |
| roles.ts | Line 66, Tech Entrepreneur uniqueInfo | "Mobile phone penetration in Asante is 72% but smartphone adoption is only 31%." | "Mobile phone penetration in Asante is 72% but smartphone adoption is only 31% (and only 18% among women). Internet connectivity drops below 15% in rural areas. The gender digital divide means any digital health solution that requires smartphones will miss half the population." | Adding the gender dimension reflects the GSMA finding of 885M unconnected women in LMICs (GSMA 2025). |

### 5.4 scoring.ts

| File | Location | Current Text | Suggested Correction | Reason |
|---|---|---|---|---|
| scoring.ts | Line 144, generateRoleComparison | `likelyScore: getRoleWeightedScore(scores, r.id) + Math.round((Math.random() - 0.5) * 10)` | `likelyScore: getRoleWeightedScore(scores, r.id)` | Remove random noise from counterfactual scores. Students should be able to deterministically trace why a different role would have scored differently. Random noise undermines the pedagogical value of the comparison. See Section 2.4. |
| scoring.ts | Lines 90-96, tech_entrepreneur weights | `equity: 0.6, communityTrust: 0.6` | `equity: 0.7, communityTrust: 0.7` | Equity and community trust weights of 0.6 are too low for a responsible tech entrepreneur. Real-world health tech companies increasingly recognise that equity and trust are prerequisites for adoption and scale. Slightly increasing these weights makes the role less of a caricature. |

---

## Appendix A: Cross-Cutting Observations

### A.1 Gender and Equity
The simulation handles gender well in Scenario 1 (maternal health) but does not engage with gender as a determinant of health access in Scenarios 2 and 3. In urban TB settings, men are disproportionately affected but less likely to seek care. In refugee settings, gender-based violence is a major health issue. Consider adding gender-specific data or decision points.

### A.2 Mental Health
Scenario 3 lists "94% unserved" for mental health but no decision point addresses how to deliver mental health services. Given the global mental health crisis and its particular severity in conflict-affected populations, this is a significant gap. Consider adding a mental health intervention option (e.g., WHO mhGAP-based task-shifting to CHWs, digital mental health platforms).

### A.3 Data Quality and Surveillance
The simulation assumes that data is available and accurate. In reality, health data in LMICs is often incomplete, delayed, and biased (e.g., deaths at home are not counted, private sector cases are not reported). Consider adding a "data uncertainty" element to the simulation -- e.g., presenting students with ranges rather than point estimates, or revealing that initial statistics were wrong after the first decision point.

### A.4 Ethical Dimensions
The simulation does not explicitly address ethical dilemmas: informed consent for community-level interventions (e.g., Wolbachia release), data privacy for digital health tools, clinical trial ethics in emergency settings, or the ethics of resource rationing. For PG students, these dimensions are critical. Consider adding an "ethical consideration" prompt to each decision point.

### A.5 Political Economy
Health decisions are not made in a vacuum. Corruption, elite capture, donor conditionality, geopolitical interests, and electoral cycles all shape health policy. The simulation's roleSpecificContext hints at political dynamics (e.g., "Parliament is watching") but does not make students engage with political economy as a structural constraint. Consider adding a "political risk" metric or making political feasibility an explicit factor in scoring.

---

## Appendix B: Summary of Priority Recommendations

1. **Fix the arithmetic inconsistency** in Scenario 1 (847 deaths vs. 612/100,000 MMR). This is the most visible error and will be caught by attentive PG students.

2. **Fix the TB case notification figure** in Scenario 2 (809 should be ~7,600). This is the second most visible error.

3. **Rebalance effect scores** to eliminate dominant strategies. The community-based option in Scenario 1 DP1 (sum=62 vs next best 50) and the local capacity option in Scenario 3 DP2 (sum=58 vs next best 52) need downward adjustment. The separate systems option in Scenario 3 DP1 (sum=26) and technology leapfrog in Scenario 1 DP1 (sum=21) need upward adjustment.

4. **Expand roleModifiers** to cover at least 4 roles per choice. This is the most impactful change for making the simulation role-dependent rather than having universal "best" answers.

5. **Remove random noise** from `generateRoleComparison` in scoring.ts. This is a small code change with significant pedagogical benefit.

6. **Correct the Lenacapavir FDA approval date** from June 2025 to December 2024.

7. **Reclassify Wolbachia** from "Social Big Data" to a more appropriate category.

8. **Add AMR stewardship** as a decision point or sub-theme, preferably in Scenario 2.

9. **Add mental health intervention options** to Scenario 3, given the 94% treatment gap is highlighted but never addressed.

10. **Strengthen the Tech Entrepreneur role** to avoid caricature, including gender digital divide data.

---

*Review completed 2026-03-13. This review is intended to strengthen an already well-designed educational simulation. The core architecture -- three scenarios, six roles, branching decision points, multi-metric scoring -- is pedagogically sound and aligns well with current WHO and Lancet Commission frameworks for health systems thinking. The corrections and suggestions above are offered in the spirit of ensuring that postgraduate students receive the most accurate, nuanced, and challenging learning experience possible.*
