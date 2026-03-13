import { useGameStore } from './store/gameStore'
import { Landing } from './components/Landing'
import { RoleSelection } from './components/RoleSelection'
import { CountryBriefing } from './components/CountryBriefing'
import { ScenarioEngine } from './components/ScenarioEngine'
import { InnovationAssembly } from './components/InnovationAssembly'
import { Debrief } from './components/Debrief'
import { Sandbox } from './components/Sandbox'
import { XPProgressBar } from './components/XPProgressBar'
import { AchievementToast } from './components/AchievementToast'
import { StreakIndicator } from './components/StreakIndicator'
import { HiddenObjectives } from './components/HiddenObjectives'
import { MissionReport } from './components/MissionReport'

function ScenarioWrapper() {
  const { scenarioIndex, decisionPointIndex } = useGameStore()
  // Key forces remount when decision point changes, resetting preDecisionScores
  return <ScenarioEngine key={`s${scenarioIndex}-d${decisionPointIndex}`} />
}

export default function App() {
  const { phase } = useGameStore()

  const renderPhase = () => {
    switch (phase) {
      case 'landing':
        return <Landing />
      case 'role_selection':
        return <RoleSelection />
      case 'hidden_objectives':
        return <HiddenObjectives />
      case 'country_briefing':
        return <CountryBriefing />
      case 'scenario_1':
      case 'scenario_2':
      case 'scenario_3':
        return <ScenarioWrapper />
      case 'innovation_assembly_1':
      case 'innovation_assembly_2':
      case 'innovation_assembly_3':
        return <InnovationAssembly />
      case 'mission_report_1':
      case 'mission_report_2':
      case 'mission_report_3':
        return <MissionReport />
      case 'debrief':
        return <Debrief />
      case 'sandbox':
        return <Sandbox />
      default:
        return <Landing />
    }
  }

  const showXPBar = !['landing', 'role_selection'].includes(phase)

  return (
    <div style={{ minHeight: '100vh' }}>
      {showXPBar && <XPProgressBar />}
      {renderPhase()}
      <AchievementToast />
      <StreakIndicator />
    </div>
  )
}
