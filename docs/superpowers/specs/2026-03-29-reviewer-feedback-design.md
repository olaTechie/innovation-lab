# Reviewer Feedback Implementation — Design Spec

**Date:** 2026-03-29
**Context:** A reviewer tested the Innovation Lab and provided three pieces of feedback to improve clarity and student experience.

---

## Change 1: Mission Briefing Phase

### Problem
Students go from the landing page directly to role selection with no overview of what the activity is, what they'll learn, or how it works. The reviewer wants learning objectives, expectations, and rules communicated upfront.

### Solution
Add a new `mission_briefing` phase between `landing` and `role_selection`.

### Phase Flow Change
```
Before: landing → role_selection → hidden_objectives → ...
After:  landing → mission_briefing → role_selection → hidden_objectives → ...
```

### Screen Layout

The Mission Briefing screen contains three sections:

**Section A — Learning Objectives**
- Title: "Mission Objectives"
- 4 learning outcomes:
  1. Evaluate health innovations across competing dimensions (coverage, equity, cost-effectiveness, sustainability, community trust, health outcomes)
  2. Navigate resource allocation trade-offs under real-world constraints
  3. Understand how different stakeholder perspectives shape health policy decisions
  4. Critically assess the role of technology and innovation in global health systems

**Section B — How It Works**
- Brief text: "You'll choose a stakeholder role, face 3 real-world health scenarios with branching decisions, deploy innovations under budget constraints, and receive a full performance debrief."
- Visual step indicator showing the 5 phases: Role Selection → 3 Scenarios → Innovation Assembly → Debrief → Sandbox

**Section C — Rules of Engagement**
- 4 rules displayed as styled cards:
  1. "You play one role throughout the simulation — choose carefully"
  2. "Decisions are final and cannot be undone"
  3. "Your performance is scored across 6 health metrics"
  4. "Aim for 60%+ across your metrics — but the real learning is in the trade-offs, not the score"

**CTA:** "Choose Your Role" button → transitions to `role_selection`

### Files to Modify

| File | Change |
|------|--------|
| `src/types.ts` | Add `'mission_briefing'` to `GamePhase` union |
| `src/App.tsx` | Add phase case for `mission_briefing` rendering `MissionBriefing` component |
| `src/components/Landing.tsx` | Change `handleStart` to set phase to `'mission_briefing'` instead of `'role_selection'` |
| `src/components/MissionBriefing.tsx` | **New file** — the briefing screen component |

---

## Change 2: KPI Percentage Format

### Problem
Score values and deltas are displayed as raw numbers (e.g., "52", "+7"). The reviewer wants percentage format (e.g., "52%", "+7%") to make it clear these represent percentage points.

### Solution
Append `%` to all score value and delta displays. Pure UI formatting — no data model changes. Scores are already 0-100.

### Locations to Change

| Component | File | Current | New |
|-----------|------|---------|-----|
| Dashboard value | `Dashboard.tsx` | `52` | `52%` |
| Dashboard delta | `Dashboard.tsx` | `+5` | `+5%` |
| ScoreReveal primary | `ScoreReveal.tsx` | `+5 Equity` | `+5% Equity` |
| ScoreReveal bar value | `ScoreReveal.tsx` | `52` | `52%` |
| ScoreReveal bar delta | `ScoreReveal.tsx` | `+5` | `+5%` |
| CrisisEvent immediate effects | `CrisisEvent.tsx` | `Health -8` | `Health -8%` |
| CrisisEvent response effects | `CrisisEvent.tsx` | `Equity +3` | `Equity +3%` |
| MissionReport score grid | `MissionReport.tsx` | `52` | `52%` |
| ScoreSummary (Debrief) | `Dashboard.tsx` | `52` | `52%` |
| Sandbox score display | `Sandbox.tsx` | `52` | `52%` |
| ShareCard canvas | `ShareCard.tsx` | `52` | `52%` |

### Files to Modify

| File | Change |
|------|--------|
| `src/components/Dashboard.tsx` | Append `%` to metric bar values, deltas, and ScoreSummary values |
| `src/components/ScoreReveal.tsx` | Append `%` to primary effect value and bar values/deltas |
| `src/components/CrisisEvent.tsx` | Append `%` to immediate effects and response effects |
| `src/components/MissionReport.tsx` | Append `%` to score grid values |
| `src/components/Sandbox.tsx` | Append `%` to score display values |
| `src/components/ShareCard.tsx` | Append `%` to canvas-drawn score values |

---

## Out of Scope

- No changes to scoring logic, data model, or game mechanics
- No changes to the Zustand store
- No new dependencies
