import { useGameStore } from './store/gameStore'
import { Landing } from './components/Landing'
import { RoleSelection } from './components/RoleSelection'
import { CountryBriefing } from './components/CountryBriefing'
import { ScenarioEngine } from './components/ScenarioEngine'
import { InnovationAssembly } from './components/InnovationAssembly'
import { Debrief } from './components/Debrief'
import { Sandbox } from './components/Sandbox'

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
      case 'debrief':
        return <Debrief />
      case 'sandbox':
        return <Sandbox />
      default:
        return <Landing />
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {renderPhase()}
    </div>
  )
}
