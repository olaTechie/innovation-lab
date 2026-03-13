# Innovation Lab: Mission Control

**An interactive global health decision-making simulation for Warwick Medical School**

Part of the *Emerging Innovations in Global Health* lecture series (Session 3 of 4).

Live at: https://olatechie.github.io/innovation-lab/

---

## Overview

Students role-play as one of 6 stakeholders deploying health innovations in the fictional nation of **Asante** — a sub-Saharan African country of 12.4 million people facing three intersecting health crises. Every decision has consequences. There are no right answers — only trade-offs.

| | |
|---|---|
| **Duration** | 40-50 minutes (self-directed) |
| **Target** | PG/Masters students in Global Health |
| **Module** | IM93Q / IM9M1 |
| **Sessions** | 1: The Innovation Imperative -> 2: The Innovator's Toolkit -> **3: Mission Control** -> 4: Bridging Innovation to Impact |

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build     # TypeScript check + Vite build -> dist/
npm run preview   # Preview production build locally
```

## Deploy

**GitHub Pages** (configured): Push to `main` triggers auto-build via GitHub Actions.

**Manual deploy**: Upload the `dist/` folder to any static host (Cloudflare Pages, Netlify, Vercel, etc.).

---

## Adding YouTube Video Links

The app has 4 video embed placeholders that show "Video Coming Soon" until real YouTube IDs are provided. When you have the YouTube links, update these two files:

### 1. Series Overview Video (Landing Page)

**File:** `src/data/series.ts` — line 75

```typescript
// Replace PLACEHOLDER_SERIES_OVERVIEW with the YouTube video ID
// For https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is 'dQw4w9WgXcQ'
videoId: 'PLACEHOLDER_SERIES_OVERVIEW',  // <-- change this
```

**Also update:** `src/components/Landing.tsx` — line 180

```typescript
videoId="PLACEHOLDER_SERIES_OVERVIEW"  // <-- change this to the same ID
```

### 2. Scenario Intro Videos (Before Each Scenario)

**File:** `src/components/ScenarioEngine.tsx` — lines 10-12

```typescript
const scenarioVideoIds: Record<number, string> = {
  0: 'PLACEHOLDER_SCENARIO_1',  // <-- Scenario 1: The Silent Epidemic
  1: 'PLACEHOLDER_SCENARIO_2',  // <-- Scenario 2: The Invisible Threat
  2: 'PLACEHOLDER_SCENARIO_3',  // <-- Scenario 3: The Long Game
}
```

### How to Get a YouTube Video ID

From any YouTube URL, the ID is the value after `v=`:

| URL Format | Example | Video ID |
|-----------|---------|----------|
| Standard | `https://www.youtube.com/watch?v=abc123XYZ` | `abc123XYZ` |
| Short | `https://youtu.be/abc123XYZ` | `abc123XYZ` |
| Embed | `https://www.youtube.com/embed/abc123XYZ` | `abc123XYZ` |

After updating, rebuild and deploy:

```bash
npm run build
git add src/data/series.ts src/components/Landing.tsx src/components/ScenarioEngine.tsx
git commit -m "feat: add YouTube video IDs"
git push
```

### Video Transcripts (for NotebookLM)

Scripts ready for NotebookLM video generation are in `transcripts/`:

| File | Content | Duration |
|------|---------|----------|
| `transcripts/series_overview.md` | Series overview — introduces Asante, roles, scenarios | ~2 min |
| `transcripts/scenario_1_intro.md` | Scenario 1: The Silent Epidemic (Kibo Highlands, maternal health) | ~60s |
| `transcripts/scenario_2_intro.md` | Scenario 2: The Invisible Threat (Lumasa Metro, TB + dengue) | ~60s |
| `transcripts/scenario_3_intro.md` | Scenario 3: The Long Game (Lake Amara Basin, climate + refugees) | ~60s |

These scripts use mission-briefing tone with `[PAUSE]` and `[VISUAL CUE]` markers for production.

---

## The Experience

### Phase 1: Landing (Series Context)
- **Series Carousel** — Browsable overview of all 4 sessions with key stats and status badges
- **Cinematic Stats** — Auto-playing dramatic statistics that build urgency (skippable)
- **Video Hero** — Series overview video embed + interactive 3D globe of Asante

### Phase 2: Role Selection & Briefing (~5 min)
- Choose from 6 roles, each with unique priorities, scoring weights, and classified intelligence
- Country briefing introduces Asante: 12.4M population, 4 distinct regions
- **Roles:** Minister of Health, NGO Director, Community Health Worker, Tech Entrepreneur, WHO Regional Advisor, Patient Advocate

### Phase 3: Three Scenario Rounds (~25 min total)

Each scenario begins with an optional video briefing, followed by a narrative setup and 2 decision points with branching consequences.

**Scenario 1 — "The Silent Epidemic"** (Maternal & Newborn Health)
- Kibo Highlands region, high maternal mortality, remote villages
- 2 decision points with branching consequences

**Scenario 2 — "The Invisible Threat"** (Infectious Disease)
- Lumasa Metro, dual TB/dengue emergency, hospital at 142% capacity
- 2 decision points with competing priorities

**Scenario 3 — "The Long Game"** (Climate + Chronic Disease + Displacement)
- Lake Amara Basin, 34,000 climate-displaced, 180,000 refugees
- 2 decision points about sustainability vs. immediate response

### Between Scenarios: Innovation Assembly
- Deploy innovations from a toolkit of 20 real-world innovations across 5 categories
- Budget constraint forces trade-offs
- Role-specific recommendations guide (but don't dictate) choices

### Phase 4: Debrief & Sandbox (~15 min)
- Performance radar chart and detailed scorecard
- Role comparison: how other roles would have scored differently
- Decision history review
- Reflection journal with guided prompts
- Sandbox mode: all sliders unlocked, explore freely

---

## Scoring Dimensions

| Metric | What It Measures |
|--------|-----------------|
| **Population Coverage** | How many people does your strategy reach? |
| **Health Equity** | Does your approach reduce or widen gaps? |
| **Cost-Effectiveness** | Are you getting maximum impact per dollar? |
| **Sustainability** | Will this last beyond the funding cycle? |
| **Community Trust** | Do communities accept and support your interventions? |
| **Health Outcomes** | Are people actually healthier? |

Each role weights these dimensions differently, creating genuinely different experiences.

---

## Innovation Categories (20 innovations)

| Category | Examples |
|----------|---------|
| **Frugal Innovation** | PPH Drape, Dual Bed Nets, Foldscope, Solar Cold Chain, OVision Pi |
| **Social Big Data** | Wastewater Surveillance, Wolbachia Program, ML Food Security, Climate Forecasting |
| **Digital Health & AI** | AI Pathology, 99DOTS, Telemedicine, Drone Delivery |
| **Generative AI** | LLM Clinical Support, AI Antibiotic Discovery, GenAI Health Education |
| **Patient-Centric** | Lenacapavir, Microbiome Foods, CHW Digital Tools, mRNA Platform |

All innovations are grounded in real-world research with citations to published evidence.

---

## Technical Details

| | |
|---|---|
| **Stack** | React 19, TypeScript 5.7, Vite 6, Zustand 5 |
| **3D** | Three.js + React Three Fiber + drei (lazy-loaded) |
| **State** | Zustand with localStorage persistence |
| **Routing** | Phase-based (no router library) |
| **Styling** | CSS custom properties, glassmorphism, CSS 3D transforms |
| **Bundle** | ~99KB gzipped (main) + ~248KB gzipped (Globe3D, lazy-loaded) |
| **Browsers** | Chrome, Firefox, Safari, Edge (modern versions) |
| **Fallback** | SVG globe on devices without WebGL |

### Project Structure

```
src/
├── components/
│   ├── Landing.tsx            # 3-phase intro (carousel -> cinematic -> hero)
│   ├── SeriesCarousel.tsx     # 4-session browsable carousel
│   ├── CinematicIntro.tsx     # Auto-playing stat sequence
│   ├── Globe3D.tsx            # Three.js interactive globe (lazy-loaded)
│   ├── GlobeVisualization.tsx # SVG fallback globe
│   ├── VideoEmbed.tsx         # YouTube embed with placeholder support
│   ├── ScenarioIntro.tsx      # Pre-scenario video briefing
│   ├── RoleSelection.tsx      # 6-role card picker
│   ├── CountryBriefing.tsx    # Asante country overview
│   ├── ScenarioEngine.tsx     # Decision engine with branching
│   ├── InnovationAssembly.tsx # Innovation deployment with budget
│   ├── Dashboard.tsx          # Live score metrics
│   ├── Debrief.tsx            # Radar chart + scorecard + reflection
│   └── Sandbox.tsx            # Unlocked slider exploration
├── data/
│   ├── scenarios.ts           # 3 scenarios, 6 decision points, branching choices
│   ├── innovations.ts         # 20 innovations with cost/impact data
│   ├── roles.ts               # 6 stakeholder roles with scoring weights
│   ├── country.ts             # Asante nation data (4 regions)
│   └── series.ts              # Lecture series metadata for carousel
├── store/
│   └── gameStore.ts           # Zustand store with persist middleware
├── utils/
│   └── scoring.ts             # Role-weighted scoring engine
├── styles/
│   └── index.css              # Design system (Warwick aubergine palette)
└── types.ts                   # Shared TypeScript types

reports/                       # AI agent research outputs
├── professor_review.md        # Series content analysis
├── video_transcripts.md       # All 4 video scripts (combined)
├── who_expert_review.md       # Accuracy & pedagogy audit
├── frontend_design_spec.md    # CSS, 3D, animation specifications
└── critic_synthesis.md        # Implementation synthesis notes

transcripts/                   # NotebookLM-ready video scripts
├── series_overview.md
├── scenario_1_intro.md
├── scenario_2_intro.md
└── scenario_3_intro.md
```

### Branding

| Colour | Hex | Usage |
|--------|-----|-------|
| Warwick Aubergine | `#7B2D8E` | Primary accent, buttons, glows |
| Warwick Blue | `#4472C4` | Secondary accent, links |
| Dark Background | `#0a0b1a` | App background |
| Surface | `#141627` | Cards, panels |

---

## Educator Notes

### Before the Session
- Students should have completed Sessions 1 and 2 (context for the 5 innovation categories)
- No special setup needed — just share the URL
- Students can work individually (recommended) or in pairs

### During the Session
- Allow 5-10 minutes for the landing intro and role selection
- Main scenarios take ~25 minutes
- Debrief/sandbox should get at least 10 minutes
- Encourage reflection journal entries — they're exportable

### After the Session
- Use the role comparison feature in class discussion: *"How would a Patient Advocate have decided differently from a Tech Entrepreneur?"*
- The three reflection prompts in the debrief are designed for post-session discussion
- Sandbox mode can be revisited before Session 4

### Key Pedagogical Design Principles
1. **No right answers** — every choice involves trade-offs between competing goods
2. **Role-specific information asymmetry** — drives genuine perspective-taking
3. **Explanatory feedback** — narratives explain *why* outcomes occurred, not just pass/fail
4. **Fictional but realistic** — Asante is invented to avoid political sensitivity while grounding in real data
5. **50% of learning is in the debrief** — allocate time for reflection and comparison

---

## Agent Reports

The v2 redesign was informed by 5 AI agents:

| Report | Agent | Purpose |
|--------|-------|---------|
| `reports/professor_review.md` | Professor of Global Health Informatics | Series carousel content, cinematic stats, narrative arc |
| `reports/video_transcripts.md` | Video Scriptwriter | 4 mission-briefing video scripts for NotebookLM |
| `reports/who_expert_review.md` | WHO Public Health Expert | Accuracy audit, pedagogical review, content gaps, scoring balance |
| `reports/frontend_design_spec.md` | Frontend Designer & 3D Expert | CSS rebrand, Three.js globe spec, animations, UX improvements |
| `reports/critic_synthesis.md` | Critic / Implementation Lead | Conflict resolution, prioritisation, implementation notes |

---

## Data Sources

All health data, innovation examples, and case studies are drawn from:
- WHO/World Bank 2025 Global Monitoring Report
- Gates Foundation 2025 Innovation Report
- GHTC 2025 Year in Review
- Published trials (NEJM, Lancet, Nature Medicine)
- GSMA 2025 State of Mobile Internet
- Country-specific data from Nepal, Indonesia, Vietnam, Kenya, and refugee settings

See `research/R1_content_research_report.md` and `research/R2_frugal_innovation_report.md` for full citations.

---

## License

Educational use. Created for Warwick Medical School.

**Module codes:** IM93Q / IM9M1
