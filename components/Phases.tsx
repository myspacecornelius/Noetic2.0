import { useState } from 'react'
import PhaseTabs from './PhaseTabs'
import DashboardCard from './DashboardCard'
import { MarketLine, CapitalDoughnut, NoeticOsRadar, PlatformKpiBar, ValueCreationDualAxis, ReturnBar } from './NoeticCharts'

export default function Phases() {
  const [phase, setPhase] = useState('p0')
  return (
    <>
      <PhaseTabs
        phases={[
          { key: 'p0', label: 'Phase 0: Foundation' },
          { key: 'p1', label: 'Phase 1: Anchor' },
          { key: 'p2', label: 'Phase 2: Bolt-Ons' },
          { key: 'p3', label: 'Phase 3: Scale' },
          { key: 'p4', label: 'Phase 4: Exit' }
        ]}
        onChange={setPhase}
      />

      {/* Phase 0 */}
      <div hidden={phase !== 'p0'}>
        <h3>Phase 0: Foundation</h3>
        <div className="dash-grid">
          <DashboardCard title="Market Opportunity">
            <div style={{ height: 300 }}>
              <MarketLine />
            </div>
            <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, padding: 10, marginTop: 10, color: '#dc2626' }}>
              <strong>Reality Check:</strong> Neurotech funding was $2.3B in 2024 across 129 deals—your hunting ground is smaller than global CNS market
            </div>
          </DashboardCard>
          <DashboardCard title="Capital Plan Overview">
            <div className="metric"><span>Target Fund Size</span><span className="metricValue">$500M - $1.5B</span></div>
            <div className="metric"><span>Anchor Allocation</span><span className="metricValue">40-50%</span></div>
            <div className="metric"><span>Bolt-On Allocation</span><span className="metricValue">30-40%</span></div>
            <div className="metric"><span>Reserves</span><span className="metricValue">20-30%</span></div>
            <div style={{ height: 300, marginTop: 12 }}>
              <CapitalDoughnut />
            </div>
          </DashboardCard>
          <DashboardCard title="Phase 0 Critical Metrics">
            <div className="metric"><span>Operating Partners Hired</span><span className="metricValue">0/3</span></div>
            <div className="metric"><span>Target Pipeline Built</span><span className="metricValue">0/100+</span></div>
            <div className="metric"><span>NoeticOS Development</span><span className="metricValue">Planning</span></div>
            <div className="metric"><span>First LOIs</span><span className="metricValue">Target: 20+</span></div>
          </DashboardCard>
          <DashboardCard title="Risk Assessment">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              <div className="risk-chip risk-high">Integration Execution</div>
              <div className="risk-chip risk-medium">Regulatory/Payer</div>
              <div className="risk-chip risk-high">Talent Retention</div>
              <div className="risk-chip risk-medium">Market Timing</div>
              <div className="risk-chip risk-medium">Competition</div>
              <div className="risk-chip risk-low">Technology Risk</div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Phase 1 */}
      <div hidden={phase !== 'p1'}>
        <h3>Phase 1: Anchor</h3>
        <div className="dash-grid">
          <DashboardCard title="Anchor Target Profile">
            <div className="metric"><span>Revenue Range</span><span className="metricValue">$35-75M</span></div>
            <div className="metric"><span>EBITDA Margin</span><span className="metricValue">20%+</span></div>
            <div className="metric"><span>Focus Areas</span><span className="metricValue">Neurodiagnostics</span></div>
            <div className="metric"><span>Business Model</span><span className="metricValue">SaaS + Device</span></div>
            <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: 8, padding: 15, marginTop: 10, color: '#065f46' }}>
              <strong>Critical Success Factor:</strong> First anchor must have proven management team staying post-close and clear bolt-on thesis with named targets
            </div>
          </DashboardCard>
          <DashboardCard title="Integration KPIs">
            <div className="metric"><span>100-Day Plan Execution</span><span className="metricValue">Target: 100%</span></div>
            <div className="metric"><span>Margin Expansion</span><span className="metricValue">+300 bps</span></div>
            <div className="metric"><span>Synergy Realization</span><span className="metricValue">70% by M18</span></div>
            <div className="metric"><span>Bolt-On Pipeline</span><span className="metricValue">20+ qualified</span></div>
          </DashboardCard>
          <DashboardCard title="NoeticOS Implementation">
            <div style={{ height: 300 }}>
              <NoeticOsRadar />
            </div>
          </DashboardCard>
          <DashboardCard title="Financial Projections">
            <div className="metric"><span>Target ROIC</span><span className="metricValue">15%+ by Y2</span></div>
            <div className="metric"><span>Revenue Growth</span><span className="metricValue">25%+ CAGR</span></div>
            <div className="metric"><span>FCF Conversion</span><span className="metricValue">80%+ of EBITDA</span></div>
          </DashboardCard>
        </div>
      </div>

      {/* Phase 2 */}
      <div hidden={phase !== 'p2'}>
        <h3>Phase 2: Bolt-Ons</h3>
        <div className="dash-grid">
          <DashboardCard title="Bolt-On Strategy">
            <div className="metric"><span>Target Count</span><span className="metricValue">3-6 acquisitions</span></div>
            <div className="metric"><span>Size Range</span><span className="metricValue">$5-25M revenue</span></div>
            <div className="metric"><span>Integration Timeline</span><span className="metricValue">&lt;18 months</span></div>
            <div className="metric"><span>Synergy Target</span><span className="metricValue">70% of underwrite</span></div>
          </DashboardCard>
          <DashboardCard title="Platform KPIs">
            <div style={{ height: 300 }}>
              <PlatformKpiBar />
            </div>
          </DashboardCard>
          <DashboardCard title="Synergy Tracking">
            <div className="metric"><span>Revenue Synergies</span><span className="metricValue">Cross-sell attach 25%+</span></div>
            <div className="metric"><span>Cost Synergies</span><span className="metricValue">Shared services 25%+</span></div>
            <div className="metric"><span>Procurement Savings</span><span className="metricValue">10-15%</span></div>
            <div className="metric"><span>R&D Acceleration</span><span className="metricValue">30% cycle reduction</span></div>
          </DashboardCard>
          <DashboardCard title="Bolt-On Archetypes">
            <div style={{ marginTop: 12 }}>
              <div style={{ padding: 10, background: '#f0f4ff', borderRadius: 8, marginBottom: 10 }}><strong>Archetype A:</strong> Psychedelic Derivative IP</div>
              <div style={{ padding: 10, background: '#f0f4ff', borderRadius: 8, marginBottom: 10 }}><strong>Archetype B:</strong> MH Infrastructure Network</div>
              <div style={{ padding: 10, background: '#f0f4ff', borderRadius: 8 }}><strong>Archetype C:</strong> Data/AI Decision Support</div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Phase 3 */}
      <div hidden={phase !== 'p3'}>
        <h3>Phase 3: Scale</h3>
        <div className="dash-grid">
          <DashboardCard title="Platform Operating Metrics">
            <div className="metric"><span>Combined Revenue</span><span className="metricValue">$150M+ target</span></div>
            <div className="metric"><span>EBITDA Margin</span><span className="metricValue">25%+ target</span></div>
            <div className="metric"><span>FCF Yield</span><span className="metricValue">15%+ target</span></div>
            <div className="metric"><span>Revenue/Invested Capital</span><span className="metricValue">1.2x+ target</span></div>
          </DashboardCard>
          <DashboardCard title="System-Level Value Creation">
            <div style={{ height: 300 }}>
              <ValueCreationDualAxis />
            </div>
          </DashboardCard>
          <DashboardCard title="Platform Advantages">
            <div style={{ marginTop: 12 }}>
              <div style={{ padding: 10, background: '#d1fae5', borderRadius: 8, marginBottom: 10 }}><strong>Unified Data Platform:</strong> Cross-portfolio insights</div>
              <div style={{ padding: 10, background: '#d1fae5', borderRadius: 8, marginBottom: 10 }}><strong>Shared GTM:</strong> Channel leverage & payer deals</div>
              <div style={{ padding: 10, background: '#d1fae5', borderRadius: 8, marginBottom: 10 }}><strong>Regulatory Efficiency:</strong> Faster approval cycles</div>
              <div style={{ padding: 10, background: '#d1fae5', borderRadius: 8 }}><strong>International Scale:</strong> Geographic expansion</div>
            </div>
          </DashboardCard>
          <DashboardCard title="Cash Conversion Optimization">
            <div className="metric"><span>Working Capital Days</span><span className="metricValue">-10 day improvement</span></div>
            <div className="metric"><span>Cash Conversion Cycle</span><span className="metricValue">30 days target</span></div>
            <div className="metric"><span>EBITDA to FCF</span><span className="metricValue">85%+ conversion</span></div>
          </DashboardCard>
        </div>
      </div>

      {/* Phase 4 */}
      <div hidden={phase !== 'p4'}>
        <h3>Phase 4: Exit</h3>
        <div className="dash-grid">
          <DashboardCard title="Exit Strategy Options">
            <div style={{ marginTop: 12 }}>
              <div style={{ padding: 15, background: 'rgba(59,130,246,0.1)', borderRadius: 8, marginBottom: 10, borderLeft: '4px solid #3b82f6', color: '#0f172a' }}><strong>Strategic Sale:</strong> Big Pharma acquisition<br /><small style={{ color: '#475569' }}>Target: 6-8x revenue multiple</small></div>
              <div style={{ padding: 15, background: 'rgba(59,130,246,0.1)', borderRadius: 8, marginBottom: 10, borderLeft: '4px solid #3b82f6', color: '#0f172a' }}><strong>Dividend Recap:</strong> Return capital, hold assets<br /><small style={{ color: '#475569' }}>Target: 2-3x cash-on-cash return</small></div>
              <div style={{ padding: 15, background: 'rgba(59,130,246,0.1)', borderRadius: 8, marginBottom: 10, borderLeft: '4px solid #3b82f6', color: '#0f172a' }}><strong>Carve-Out IPO:</strong> Public market exit<br /><small style={{ color: '#475569' }}>Target: 8-12x revenue multiple</small></div>
              <div style={{ padding: 15, background: 'rgba(59,130,246,0.1)', borderRadius: 8, borderLeft: '4px solid #3b82f6', color: '#0f172a' }}><strong>Continue to Hold:</strong> Long-term value creation<br /><small style={{ color: '#475569' }}>Target: 20%+ FCF yield</small></div>
            </div>
          </DashboardCard>
          <DashboardCard title="Return Scenarios">
            <div style={{ height: 300 }}>
              <ReturnBar />
            </div>
          </DashboardCard>
          <DashboardCard title="Exit Readiness Metrics">
            <div className="metric"><span>Revenue Run-Rate</span><span className="metricValue">$200M+ target</span></div>
            <div className="metric"><span>EBITDA Margin</span><span className="metricValue">30%+ target</span></div>
            <div className="metric"><span>Growth Rate</span><span className="metricValue">20%+ sustainable</span></div>
            <div className="metric"><span>Market Position</span><span className="metricValue">Top 3 in niche</span></div>
          </DashboardCard>
        </div>
      </div>
    </>
  )
}

