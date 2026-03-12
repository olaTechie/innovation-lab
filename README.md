# Innovation Lab: Mission Control

An interactive global health decision-making simulation for Warwick Medical School's "Emerging Innovations in Global Health" lecture series (Session 3).

## Overview

Students role-play as one of 6 stakeholders deploying health innovations in the fictional nation of **Asante**, a sub-Saharan African country facing three intersecting health crises. Every decision has consequences. There are no right answers — only trade-offs.

**Duration:** 40-50 minutes (self-directed)
**Target:** Postgraduate/Masters students in Global Health

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

Output is in `dist/`. Deploy the entire `dist/` folder to any static hosting (Cloudflare Pages, Netlify, GitHub Pages, etc).

### Deploy to Cloudflare Pages

1. Push to a Git repository
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Framework preset: None

Or drag-and-drop the `dist/` folder into the Cloudflare Pages dashboard.

## The Experience

### Phase 1: Role Selection & Briefing (5 min)
- Students choose from 6 roles, each with unique priorities, metrics, and classified intelligence
- Country briefing introduces Asante: 12.4M population, 4 distinct regions, each facing different health challenges
- **Roles:** Minister of Health, NGO Director, Community Health Worker, Tech Entrepreneur, WHO Regional Advisor, Patient Advocate

### Phase 2: Three Scenario Rounds (~25 min total)

**Scenario 1 — "The Silent Epidemic"** (Maternal & Newborn Health)
- Highland region, high maternal mortality, remote villages
- Based on Nepal case study data
- 2 decision points with branching consequences

**Scenario 2 — "The Invisible Threat"** (Infectious Disease)
- Dense urban area, dual TB/dengue emergency
- Based on Indonesia TB + Vietnam dengue case studies
- 2 decision points with competing priorities

**Scenario 3 — "The Long Game"** (Climate + Chronic Disease + Displacement)
- Climate-vulnerable lake basin with 180,000 refugees
- Based on refugee + Kenya + Vietnam case studies
- 2 decision points about sustainability

### Between Scenarios: Innovation Assembly
- Deploy innovations from a toolkit of 20 real-world innovations across 5 categories
- Budget constraint forces trade-offs
- Role-specific recommendations guide (but don't dictate) choices

### Phase 3: Debrief & Sandbox (~15 min)
- Performance radar chart and detailed scorecard
- Role comparison: how other roles would have scored differently
- Decision history review
- Reflection journal with guided prompts
- Sandbox mode: all sliders unlocked, explore freely

## Innovation Categories (20 innovations)

1. **Frugal Innovation** — PPH Drape, Dual Bed Nets, Foldscope, Solar Cold Chain, OVision Pi
2. **Social Big Data** — Wastewater Surveillance, Wolbachia Program, ML Food Security, Climate Forecasting
3. **Digital Health & AI** — AI Pathology, 99DOTS, Telemedicine, Drone Delivery
4. **Generative AI** — LLM Clinical Support, AI Antibiotic Discovery, GenAI Health Education
5. **Patient-Centric** — Lenacapavir, Microbiome Foods, CHW Digital Tools, mRNA Platform

All innovations are grounded in real-world research with citations to published evidence.

## Scoring Dimensions

- **Population Coverage** — How many people does your strategy reach?
- **Health Equity** — Does your approach reduce or widen gaps?
- **Cost-Effectiveness** — Are you getting maximum impact per dollar?
- **Sustainability** — Will this last beyond the funding cycle?
- **Community Trust** — Do communities accept and support your interventions?
- **Health Outcomes** — Are people actually healthier?

Each role weights these dimensions differently, creating genuinely different experiences.

## Technical Details

- **Stack:** React 19, Vite, TypeScript, Zustand (state management)
- **No backend required** — all simulation logic runs in the browser
- **Session persistence** — progress saved to localStorage, can resume if interrupted
- **Bundle size:** ~93KB gzipped (CSS + JS)
- **Browser support:** Chrome, Firefox, Safari, Edge (modern versions)
- **Device support:** Laptops and tablets (landscape). Responsive but desktop-optimized.

## Educator Notes

### Before the Session
- Students should have completed Sessions 1 and 2 (context for the 5 innovation categories)
- No special setup needed — just share the URL
- Students can work individually (recommended) or in pairs

### During the Session
- Allow 5-10 minutes for role selection and country briefing
- Main scenarios take ~25 minutes
- Debrief/sandbox should get at least 10 minutes
- Encourage reflection journal entries — they're exportable

### After the Session
- Use the role comparison feature in class discussion: "How would a Patient Advocate have decided differently from a Tech Entrepreneur?"
- The three reflection prompts in the debrief are designed for post-session discussion
- Sandbox mode can be revisited before Session 4

### Key Pedagogical Design Principles
1. **No right answers** — every choice involves trade-offs between competing goods
2. **Role-specific information asymmetry** — drives genuine perspective-taking
3. **Explanatory feedback** — narratives explain WHY outcomes occurred, not just pass/fail
4. **Fictional but realistic** — Asante is invented to avoid political sensitivity while grounding in real data
5. **50% of learning is in the debrief** — allocate time for reflection and comparison

## Data Sources

All health data, innovation examples, and case studies are drawn from:
- WHO/World Bank 2025 Global Monitoring Report
- Gates Foundation 2025 Innovation Report
- GHTC 2025 Year in Review
- Published trials (NEJM, Lancet, Nature Medicine)
- GSMA 2025 State of Mobile Internet
- Country-specific data from Nepal, Indonesia, Vietnam, Kenya, and refugee settings

See the R1 Content Research Report and R2 Frugal Innovation Report for full citations.

## License

Educational use. Created for Warwick Medical School, Global Health MD999 & ES99B.
