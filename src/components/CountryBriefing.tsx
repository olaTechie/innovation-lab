import { useGameStore } from '../store/gameStore'
import { asante } from '../data/country'
import { roles } from '../data/roles'

function RegionMap() {
  const regions = asante.regions
  return (
    <svg viewBox="0 0 400 360" style={{ width: '100%', maxWidth: 400, height: 'auto' }}>
      <defs>
        <filter id="region-glow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Country outline */}
      <path
        d="M 80 40 Q 120 20 200 30 Q 280 20 320 50 Q 350 80 340 140 Q 360 180 350 220 Q 340 260 310 290 Q 280 320 240 340 Q 200 350 160 340 Q 120 320 90 290 Q 60 260 50 220 Q 40 180 50 140 Q 45 100 60 70 Z"
        fill="var(--color-bg-card)"
        stroke="var(--color-border-light)"
        strokeWidth="1.5"
      />
      {/* Kibo Highlands - Northwest */}
      <path
        d="M 80 40 Q 120 20 180 30 L 190 80 Q 170 110 140 120 Q 100 110 70 90 Q 50 70 60 55 Z"
        fill={regions[0].color + '44'}
        stroke={regions[0].color}
        strokeWidth="1"
        className="globe-region"
      />
      <text x="115" y="75" fill={regions[0].color} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter">Kibo Highlands</text>

      {/* Lumasa Metro - Central */}
      <path
        d="M 190 80 Q 230 60 270 70 Q 290 90 280 130 Q 260 150 230 155 Q 200 150 180 130 Q 170 110 190 80 Z"
        fill={regions[1].color + '44'}
        stroke={regions[1].color}
        strokeWidth="1"
        className="globe-region"
      />
      <text x="228" y="112" fill={regions[1].color} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter">Lumasa Metro</text>
      <circle cx="230" cy="120" r="4" fill={regions[1].color}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Central Plateau - Center/Southwest */}
      <path
        d="M 70 90 Q 100 110 140 120 Q 170 110 180 130 Q 200 150 230 155 Q 200 200 170 230 Q 130 250 100 240 Q 70 220 55 190 Q 45 150 50 120 Z"
        fill={regions[2].color + '44'}
        stroke={regions[2].color}
        strokeWidth="1"
        className="globe-region"
      />
      <text x="130" y="185" fill={regions[2].color} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter">Central Plateau</text>

      {/* Lake Amara Basin - Southeast */}
      <path
        d="M 230 155 Q 260 150 280 130 Q 310 140 340 160 Q 355 190 350 220 Q 340 260 310 290 Q 280 310 250 320 Q 210 310 180 280 Q 160 250 170 230 Q 200 200 230 155 Z"
        fill={regions[3].color + '44'}
        stroke={regions[3].color}
        strokeWidth="1"
        className="globe-region"
      />
      <text x="270" y="230" fill={regions[3].color} fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter">Lake Amara</text>
      {/* Lake */}
      <ellipse cx="290" cy="255" rx="25" ry="18" fill="rgba(91,139,160,0.3)" stroke={regions[3].color} strokeWidth="0.5" strokeDasharray="3,2" />
      <text x="290" y="259" fill={regions[3].color} fontSize="7" textAnchor="middle" opacity="0.7" fontFamily="Inter">Lake Amara</text>

      {/* Mwanga River */}
      <path d="M 195 35 Q 200 100 195 160 Q 185 230 190 300 Q 195 330 200 345" fill="none" stroke="rgba(91,139,160,0.4)" strokeWidth="1.5" strokeDasharray="5,3" />
    </svg>
  )
}

export function CountryBriefing() {
  const { setPhase, role } = useGameStore()
  const currentRole = roles.find((r) => r.id === role)

  return (
    <div style={{ minHeight: '100vh', padding: 'var(--space-xl)' }}>
      <div className="container" style={{ maxWidth: 1000 }}>
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <div className="badge" style={{
            background: 'var(--color-accent-muted)',
            color: 'var(--color-accent)',
            padding: '6px 16px',
            fontSize: '0.75rem',
            marginBottom: 'var(--space-md)',
          }}>
            COUNTRY BRIEFING &middot; CLASSIFIED
          </div>
          <h2>The Republic of Asante</h2>
          <p className="text-secondary">A fictional sub-Saharan African nation. All data is grounded in real-world health statistics.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          {/* Map */}
          <div className="animate-fade-in-up card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)' }}>
            <RegionMap />
            <img src="/images/map/asante-illustrated.png" alt="Illustrated map of Asante" style={{ width: '100%', maxWidth: 380, marginTop: 'var(--space-md)', borderRadius: 'var(--radius-md)' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>

          {/* Key stats */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
              {[
                { label: 'Population', value: asante.population },
                { label: 'GDP per Capita', value: asante.gdpPerCapita },
                { label: 'Health Spend/Capita', value: asante.healthSpendPerCapita },
                { label: 'Life Expectancy', value: asante.lifeExpectancy },
                { label: 'Maternal Mortality', value: asante.maternalMortality },
                { label: 'Under-5 Mortality', value: asante.under5Mortality },
                { label: 'HIV Prevalence', value: asante.hivPrevalence },
                { label: 'TB Incidence', value: asante.tbIncidence },
                { label: 'Physician Density', value: asante.healthWorkerDensity },
                { label: 'Mobile Penetration', value: '72%' },
              ].map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-card-value text-accent" style={{ fontSize: '1.1rem' }}>{stat.value}</div>
                  <div className="stat-card-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regions */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Four Regions, Four Challenges</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
            {asante.regions.map((region) => (
              <div key={region.name} className="card" style={{ borderLeft: `3px solid ${region.color}` }}>
                <h4 style={{ color: region.color, marginBottom: 4 }}>{region.name}</h4>
                <p className="text-xs text-muted" style={{ marginBottom: 8 }}>Pop. {region.population}</p>
                <p className="text-sm text-secondary" style={{ marginBottom: 8, lineHeight: 1.5 }}>{region.characteristics}</p>
                <div className="badge" style={{ background: `${region.color}18`, color: region.color }}>
                  {region.primaryChallenge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative sections */}
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms', marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--color-accent)' }}>Geography & Climate</h4>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.7 }}>{asante.geography}</p>
            </div>
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--color-accent)' }}>Health System</h4>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.7 }}>{asante.healthSystem}</p>
            </div>
          </div>
        </div>

        {/* Role-specific callout */}
        {currentRole && (
          <div className="animate-fade-in-up" style={{
            animationDelay: '400ms',
            background: `${currentRole.color}08`,
            border: `1px solid ${currentRole.color}33`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-lg)',
            marginBottom: 'var(--space-xl)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
              <span style={{ fontSize: '1.25rem' }}>{currentRole.icon}</span>
              <h4 style={{ color: currentRole.color }}>Your Perspective as {currentRole.title}</h4>
            </div>
            <p className="text-sm" style={{ lineHeight: 1.7 }}>{currentRole.uniqueInfo}</p>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase('scenario_1')}>
            Begin Scenario 1: The Silent Epidemic
          </button>
        </div>
      </div>
    </div>
  )
}
