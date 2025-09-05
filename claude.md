# Claude Brief: Re‑skin “noetic1” (Nextra) to match the references and deploy to david-c-nichols.online

Paste this entire brief into Claude. It contains your two reference links, an extracted design system from the second reference, and concrete file updates (with full code blocks) tailored to this repository.

## Context
- Codebase: “noetic1” — Next.js 13 + Nextra docs template
- Theme: `nextra-theme-docs`
- Language: TypeScript
- Scripts: `npm run dev`, `npm run build`, `npm start`
- Content: MDX pages under `pages/` with navigation via `pages/_meta.json`
- Components: `components/` (Chart.js already available; repo uses `chart.js@^4` with `react-chartjs-2`)

## Goal
- Reproduce the visual look and UX of the references (below) inside this Nextra site, keeping docs features (sidebar/search) unless explicitly overridden.
- Publish at the custom domain: `david-c-nichols.online`.

## References
- Primary: https://claude.ai/public/artifacts/4663e0c0-4a1a-480a-850a-df9b1aac50e3
- Secondary (to incorporate as a page/section): https://claude.ai/public/artifacts/72220c6e-88a4-4ed6-bb0f-d4a123751057
- Note: The full HTML for the secondary reference was provided. Port its layout into React/MDX + Chart.js v4 (via `react-chartjs-2`) instead of direct DOM scripting.
- Brand: “noetic1” by “David C. Nichols”.

### Extracted design system (from secondary reference)
- Palette: primary `#667eea`, secondary `#764ba2`; gradient `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Accents: success `#10b981`, warning `#d97706`, danger `#dc2626`, slate text `#374151`/`#666`
- Surfaces: white cards, 12–20px radii, soft shadows; pill tabs; chip badges; dashboard grid
- Typography: modern sans (Inter or system), heavy headings, gradient text allowed in hero
- Components to build: hero, phase tabs, dashboard cards, metric rows, milestone tracker, risk chips, multiple Chart.js visualizations

## Deliverables
- Theme configuration updated (`theme.config.tsx`): brand, SEO, theme color, font preloads
- Global design (`styles/global.css`) and `_app.tsx` to import it
- Homepage restyle (`pages/index.mdx`) to match reference hero and actions
- New page `pages/noetic-2.mdx` implementing the secondary reference (phases dashboard)
- New components in `components/`: `PhaseTabs.tsx`, `DashboardCard.tsx`, `NoeticCharts.tsx`
- Navigation update in `pages/_meta.json` to include “Noetic 2.0”
- Public assets: `public/logo.svg`, `public/favicon.ico`, `public/og.png`
- Build passes (`next build`) and deploy to Vercel mapped to `david-c-nichols.online`

## Constraints
- Use Chart.js v4 via `react-chartjs-2` (already in `package.json`). Do not use DOM `new Chart()`.
- Keep changes idiomatic to Nextra; use global CSS variables to theme consistently.
- Maintain accessibility and avoid console warnings.

## Edits to return (complete file contents)

A) theme.config.tsx (replace entire file)
```tsx
import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 800, letterSpacing: '0.3px' }}>noetic1</span>,
  project: {
    link: 'https://github.com/YOUR_GITHUB/noetic1'
  },
  chat: {
    link: ''
  },
  docsRepositoryBase: 'https://github.com/YOUR_GITHUB/noetic1',
  head: (
    <>
      <meta name="theme-color" content="#667eea" />
      <meta property="og:site_name" content="noetic1" />
      <meta property="og:image" content="/og.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – noetic1',
      description: 'noetic1 by David C. Nichols',
      openGraph: {
        siteName: 'noetic1',
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'noetic1' }]
      },
      twitter: { cardType: 'summary_large_image' }
    }
  },
  footer: {
    text: `© ${new Date().getFullYear()} David C. Nichols · noetic1`
  }
}

export default config
```

B) pages/_app.tsx (new file)
```tsx
import type { AppProps } from 'next/app'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

C) styles/global.css (new file; palette from references)
```css
:root {
  --brand-700: #667eea; /* primary */
  --brand-2-700: #764ba2; /* secondary */
  --brand-800: #5a6fe4;
  --brand-900: #4f61de;
  --success-500: #10b981;
  --warning-500: #d97706;
  --danger-500: #dc2626;
  --slate-700: #374151;
  --slate-500: #666666;
  --bg: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e5e7eb;
}

html, body { height: 100%; }
body {
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

:where(h1,h2,h3,h4,h5) { color: var(--brand-900); font-weight: 800; }
h1 { font-size: clamp(2rem, 2.5vw + 1rem, 3rem); line-height: 1.1; }
h2 { font-size: clamp(1.5rem, 1.2vw + 1rem, 2rem); line-height: 1.2; }

a { color: var(--brand-700); text-decoration: none; }
a:hover { text-decoration: underline; }

.button { display: inline-flex; align-items: center; justify-content: center; padding: .75rem 1.25rem; border-radius: .75rem; font-weight: 700; color: #fff; background: var(--brand-700); border: 1px solid transparent; transition: .2s ease; }
.button:hover { filter: brightness(1.05); transform: translateY(-1px); }
.button.secondary { background: #fff; color: var(--brand-700); border-color: var(--brand-700); }

.hero { border-radius: 1.25rem; padding: clamp(1.25rem, 2vw, 2rem); background: linear-gradient(135deg, var(--brand-700), var(--brand-2-700)); color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.15); margin-bottom: 2rem; }
.hero h1 { color: #fff; margin-bottom: .5rem; }
.hero p { color: #e2e8f0; max-width: 70ch; }
.hero .actions { display: flex; gap: .75rem; margin-top: 1rem; flex-wrap: wrap; }

.nextra-content { max-width: 1000px; }

code, pre { font-feature-settings: "liga" 0; }
pre { border: 1px solid var(--border); }

/* Tabs and chips */
.phase-tabs { display: flex; justify-content: center; gap: 12px; margin: 20px 0; }
.phase-tab { padding: 12px 24px; background: rgba(255,255,255,0.9); border: 2px solid var(--brand-700); border-radius: 25px; cursor: pointer; font-weight: 700; color: var(--brand-700); transition: .2s ease; }
.phase-tab.active { background: var(--brand-700); color: #fff; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,.3); }
.risk-chip { padding: 10px; border-radius: 8px; text-align: center; font-size: .9em; font-weight: 700; }
.risk-high { background: #fee2e2; color: #dc2626; }
.risk-medium { background: #fef3c7; color: #d97706; }
.risk-low { background: #d1fae5; color: #059669; }

/* Dashboard */
.dash-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; }
.card { background: rgba(255,255,255,0.95); border-radius: 15px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,.1); transition: transform .2s ease; }
.card:hover { transform: translateY(-3px); }
.card h3 { color: var(--brand-700); margin-bottom: 12px; font-size: 1.25rem; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; }

/* Simple metric rows */
.metric { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border); }
.metric:last-child { border-bottom: 0; }
.metricValue { font-weight: 700; color: var(--brand-700); }
```

D) pages/index.mdx (replace content with reference-styled hero)
```mdx
---
title: Home
---

<div className="hero">
  <h1>noetic1</h1>
  <p>Design‑forward documentation and content site by David C. Nichols. This build aligns to the provided reference with a focus on clarity, speed, and accessibility.</p>
  <div className="actions">
    <a className="button" href="/about">Learn More</a>
    <a className="button secondary" href="/noetic-2">Explore Noetic 2.0</a>
  </div>
</div>

## What’s inside
- Next.js + Nextra docs theme
- Custom global styles aligned to the references
- MDX with React components (see `components/`)
```

E) pages/noetic-2.mdx (new page implementing secondary reference)
```mdx
---
title: Noetic 2.0
---

import PhaseTabs from '../components/PhaseTabs'
import DashboardCard from '../components/DashboardCard'
import { MarketLine, CapitalDoughnut, NoeticOsRadar, PlatformKpiBar, ValueCreationDualAxis, ReturnBar } from '../components/NoeticCharts'

<div className="hero">
  <h1>NOETIC 2.0</h1>
  <p>Strategic Transformation: From Venture Fund to CNS Operating Company</p>
  <p><strong>$140B+ Market • 10.4% CAGR • Infrastructure-Led Strategy</strong></p>
</div>

<PhaseTabs phases={[
  { key: 'p0', label: 'Phase 0: Foundation' },
  { key: 'p1', label: 'Phase 1: Anchor' },
  { key: 'p2', label: 'Phase 2: Bolt-Ons' },
  { key: 'p3', label: 'Phase 3: Scale' },
  { key: 'p4', label: 'Phase 4: Exit' },
]} />

### Phase 0: Foundation
<div className="dash-grid">
  <DashboardCard title="Market Opportunity">
    <div style={{ height: 300 }}>
      <MarketLine />
    </div>
    <div style={{ background:'#fee2e2', border:'1px solid #fecaca', borderRadius:8, padding:10, marginTop:10, color:'#dc2626' }}>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
      <div className="risk-chip risk-high">Integration Execution</div>
      <div className="risk-chip risk-medium">Regulatory/Payer</div>
      <div className="risk-chip risk-high">Talent Retention</div>
      <div className="risk-chip risk-medium">Market Timing</div>
      <div className="risk-chip risk-medium">Competition</div>
      <div className="risk-chip risk-low">Technology Risk</div>
    </div>
  </DashboardCard>
</div>

### Phase 1: Anchor
<div className="dash-grid">
  <DashboardCard title="Anchor Target Profile">
    <div className="metric"><span>Revenue Range</span><span className="metricValue">$35-75M</span></div>
    <div className="metric"><span>EBITDA Margin</span><span className="metricValue">20%+</span></div>
    <div className="metric"><span>Focus Areas</span><span className="metricValue">Neurodiagnostics</span></div>
    <div className="metric"><span>Business Model</span><span className="metricValue">SaaS + Device</span></div>
    <div style={{ background:'#d1fae5', border:'1px solid #a7f3d0', borderRadius:8, padding:15, marginTop:10, color:'#065f46' }}>
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

### Phase 2: Bolt-Ons
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
      <div style={{ padding:10, background:'#f0f4ff', borderRadius:8, marginBottom:10 }}><strong>Archetype A:</strong> Psychedelic Derivative IP</div>
      <div style={{ padding:10, background:'#f0f4ff', borderRadius:8, marginBottom:10 }}><strong>Archetype B:</strong> MH Infrastructure Network</div>
      <div style={{ padding:10, background:'#f0f4ff', borderRadius:8 }}><strong>Archetype C:</strong> Data/AI Decision Support</div>
    </div>
  </DashboardCard>
</div>

### Phase 3: Scale
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
      <div style={{ padding:10, background:'#d1fae5', borderRadius:8, marginBottom:10 }}><strong>Unified Data Platform:</strong> Cross-portfolio insights</div>
      <div style={{ padding:10, background:'#d1fae5', borderRadius:8, marginBottom:10 }}><strong>Shared GTM:</strong> Channel leverage & payer deals</div>
      <div style={{ padding:10, background:'#d1fae5', borderRadius:8, marginBottom:10 }}><strong>Regulatory Efficiency:</strong> Faster approval cycles</div>
      <div style={{ padding:10, background:'#d1fae5', borderRadius:8 }}><strong>International Scale:</strong> Geographic expansion</div>
    </div>
  </DashboardCard>
  <DashboardCard title="Cash Conversion Optimization">
    <div className="metric"><span>Working Capital Days</span><span className="metricValue">-10 day improvement</span></div>
    <div className="metric"><span>Cash Conversion Cycle</span><span className="metricValue">30 days target</span></div>
    <div className="metric"><span>EBITDA to FCF</span><span className="metricValue">85%+ conversion</span></div>
  </DashboardCard>
</div>

### Phase 4: Exit
<div className="dash-grid">
  <DashboardCard title="Exit Strategy Options">
    <div style={{ marginTop: 12 }}>
      <div style={{ padding:15, background:'rgba(59,130,246,0.1)', borderRadius:8, marginBottom:10, borderLeft:'4px solid #3b82f6', color:'#0f172a' }}><strong>Strategic Sale:</strong> Big Pharma acquisition<br /><small style={{ color:'#475569' }}>Target: 6-8x revenue multiple</small></div>
      <div style={{ padding:15, background:'rgba(59,130,246,0.1)', borderRadius:8, marginBottom:10, borderLeft:'4px solid #3b82f6', color:'#0f172a' }}><strong>Dividend Recap:</strong> Return capital, hold assets<br /><small style={{ color:'#475569' }}>Target: 2-3x cash-on-cash return</small></div>
      <div style={{ padding:15, background:'rgba(59,130,246,0.1)', borderRadius:8, marginBottom:10, borderLeft:'4px solid #3b82f6', color:'#0f172a' }}><strong>Carve-Out IPO:</strong> Public market exit<br /><small style={{ color:'#475569' }}>Target: 8-12x revenue multiple</small></div>
      <div style={{ padding:15, background:'rgba(59,130,246,0.1)', borderRadius:8, borderLeft:'4px solid #3b82f6', color:'#0f172a' }}><strong>Continue to Hold:</strong> Long-term value creation<br /><small style={{ color:'#475569' }}>Target: 20%+ FCF yield</small></div>
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
```

F) pages/_meta.json (update navigation)
```json
{
  "index": "Home",
  "noetic-2": "Noetic 2.0",
  "about": "About",
  "advanced": "Features",
  "another": "Showcase",
  "cns-acquisition": "CNS Acquisition",
  "contact": {
    "title": "Contact",
    "type": "page",
    "href": "mailto:hello@david-c-nichols.online",
    "newWindow": true
  }
}
```

G) components/PhaseTabs.tsx (new)
```tsx
import { useState } from 'react'

type Phase = { key: string; label: string }

export default function PhaseTabs({ phases, onChange }: { phases: Phase[]; onChange?: (key: string) => void }) {
  const [active, setActive] = useState(phases[0]?.key)
  return (
    <div className="phase-tabs">
      {phases.map(p => (
        <button
          key={p.key}
          className={`phase-tab ${active === p.key ? 'active' : ''}`}
          onClick={() => { setActive(p.key); onChange?.(p.key) }}
        >{p.label}</button>
      ))}
    </div>
  )
}
```

H) components/DashboardCard.tsx (new)
```tsx
import { PropsWithChildren } from 'react'

export default function DashboardCard({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

I) components/NoeticCharts.tsx (new; Chart.js v4)
```tsx
import {
  Chart as ChartJS, LineElement, BarElement, PointElement, LineController, BarController,
  CategoryScale, LinearScale, RadialLinearScale, Tooltip, Legend, Filler
} from 'chart.js'
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'

ChartJS.register(LineElement, BarElement, PointElement, LineController, BarController,
  CategoryScale, LinearScale, RadialLinearScale, Tooltip, Legend, Filler)

export function MarketLine() {
  return <Line data={{
    labels: ['2024','2025','2026','2027','2028','2029','2030'],
    datasets: [{ label: 'CNS Market Size ($B)', data: [140.4,155,171.1,189,208.7,230.4,254.6], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,.1)', fill: true, tension: .4 }]
  }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, ticks: { callback: (v: any) => `$${v}B` } } } }} />
}

export function CapitalDoughnut() {
  return <Doughnut data={{ labels: ['Anchors','Bolt-Ons','Reserves'], datasets: [{ data: [45,35,20], backgroundColor: ['#667eea','#764ba2','#a855f7'], borderWidth: 0 }] }} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
}

export function NoeticOsRadar() {
  return <Radar data={{
    labels: ['FP&A','Reg/QA','Market Access','Data/AI','GTM','People Ops'],
    datasets: [{ label: 'Implementation Progress', data: [20,15,10,25,30,20], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,.2)', pointBackgroundColor: '#667eea' }]
  }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 100, ticks: { callback: (v: any) => `${v}%` } } } }} />
}

export function PlatformKpiBar() {
  return <Bar data={{ labels: ['Revenue Growth','EBITDA Margin','Cross-Sell Rate','Integration Speed'], datasets: [ { label: 'Current', data: [15,18,12,70], backgroundColor: '#e5e7eb' }, { label: 'Target', data: [25,25,25,90], backgroundColor: '#667eea' } ] }} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
}

export function ValueCreationDualAxis() {
  return <Line data={{ labels: ['Year 0','Year 1','Year 2','Year 3','Year 4'], datasets: [ { label: 'Revenue ($M)', data: [0,40,80,150,200], borderColor: '#667eea', yAxisID: 'y' }, { label: 'EBITDA Margin (%)', data: [0,15,20,25,30], borderColor: '#764ba2', yAxisID: 'y1' } ] }} options={{ responsive: true, scales: { y: { type:'linear', position:'left' }, y1: { type:'linear', position:'right', grid: { drawOnChartArea: false } } } }} />
}

export function ReturnBar() {
  return <Bar data={{ labels: ['Base Case','Upside Case','Stress Case'], datasets: [{ label: 'IRR (%)', data: [15,25,8], backgroundColor: ['#10b981','#667eea','#ef4444'] }] }} options={{ responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: (v: any) => `${v}%` } } } }} />
}
```

J) public/logo.svg (placeholder)
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="32" fill="url(#g)"/>
  <g fill="#fff" font-family="Inter, Segoe UI, Arial" font-weight="800" font-size="88">
    <text x="28" y="150">no</text>
    <text x="150" y="150">1</text>
  </g>
  </svg>
```

K) public/favicon.ico and public/og.png
- Favicon: generate from `logo.svg` (32×32 or 48×48) and place at `public/favicon.ico`.
- OG image: 1200×630 PNG with the same gradient and the word “noetic1”. Save as `public/og.png`.

## Deployment: Vercel + Domain
1) Create a Vercel project for this repo (Framework: Next.js)
2) Build: `next build` · Install: `npm i` · Output: `.next`
3) Deploy the default branch
4) Add custom domain `david-c-nichols.online`
5) DNS
   - Registrar DNS: A record for apex to 76.76.21.21; optional CNAME `www` → `cname.vercel-dns.com`
   - Or Cloudflare: CNAME flattening (per Vercel docs); disable proxy if issues
6) Validate HTTPS and set canonical redirect (www ↔ apex) in Vercel

## What to return
- The exact file contents for each item above (no elisions)
- Any extra head tags needed for fonts if you choose different families
- Notes on any Nextra theme constraints and how you worked around them

## Verification
- [ ] `npm run dev` runs without console errors
- [ ] `npm run build` passes
- [ ] Visuals match the references (palette, hero, tabs, cards, chips)
- [ ] Mobile layout holds (no overflow; tabs usable)
- [ ] Deployed at `https://david-c-nichols.online/` with valid TLS

---

If a marketing‑style header is required to fully match the primary reference, propose a minimal override plan for Nextra’s header (CSS override or a custom theme slot) before implementing.



When asked to design UI & frontend interface
When asked to design UI & frontend interface
# Role
You are superdesign, a senior frontend designer integrated into VS Code as part of the Super Design extension.
Your goal is to help user generate amazing design using code

# Instructions
- Use the available tools when needed to help with file operations and code analysis
- When creating design file:
  - Build one single html page of just one screen to build a design based on users' feedback/task
  - You ALWAYS output design files in '.superdesign/design_iterations' folder as {design_name}_{n}.html (Where n needs to be unique like table_1.html, table_2.html, etc.) or svg file
  - If you are iterating design based on existing file, then the naming convention should be {current_file_name}_{n}.html, e.g. if we are iterating ui_1.html, then each version should be ui_1_1.html, ui_1_2.html, etc.
- You should ALWAYS use tools above for write/edit html files, don't just output in a message, always do tool calls

## Styling
1. superdesign tries to use the flowbite library as a base unless the user specifies otherwise.
2. superdesign avoids using indigo or blue colors unless specified in the user's request.
3. superdesign MUST generate responsive designs.
4. When designing component, poster or any other design that is not full app, you should make sure the background fits well with the actual poster or component UI color; e.g. if component is light then background should be dark, vice versa.
5. Font should always using google font, below is a list of default fonts: 'JetBrains Mono', 'Fira Code', 'Source Code Pro','IBM Plex Mono','Roboto Mono','Space Mono','Geist Mono','Inter','Roboto','Open Sans','Poppins','Montserrat','Outfit','Plus Jakarta Sans','DM Sans','Geist','Oxanium','Architects Daughter','Merriweather','Playfair Display','Lora','Source Serif Pro','Libre Baskerville','Space Grotesk'
6. When creating CSS, make sure you include !important for all properties that might be overwritten by tailwind & flowbite, e.g. h1, body, etc.
7. Unless user asked specifcially, you should NEVER use some bootstrap style blue color, those are terrible color choices, instead looking at reference below.
8. Example theme patterns:
Ney-brutalism style that feels like 90s web design
<neo-brutalism-style>
:root {
  --background: oklch(1.0000 0 0);
  --foreground: oklch(0 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0 0 0);
  --primary: oklch(0.6489 0.2370 26.9728);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.9680 0.2110 109.7692);
  --secondary-foreground: oklch(0 0 0);
  --muted: oklch(0.9551 0 0);
  --muted-foreground: oklch(0.3211 0 0);
  --accent: oklch(0.5635 0.2408 260.8178);
  --accent-foreground: oklch(1.0000 0 0);
  --destructive: oklch(0 0 0);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0 0 0);
  --input: oklch(0 0 0);
  --ring: oklch(0.6489 0.2370 26.9728);
  --chart-1: oklch(0.6489 0.2370 26.9728);
  --chart-2: oklch(0.9680 0.2110 109.7692);
  --chart-3: oklch(0.5635 0.2408 260.8178);
  --chart-4: oklch(0.7323 0.2492 142.4953);
  --chart-5: oklch(0.5931 0.2726 328.3634);
  --sidebar: oklch(0.9551 0 0);
  --sidebar-foreground: oklch(0 0 0);
  --sidebar-primary: oklch(0.6489 0.2370 26.9728);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.5635 0.2408 260.8178);
  --sidebar-accent-foreground: oklch(1.0000 0 0);
  --sidebar-border: oklch(0 0 0);
  --sidebar-ring: oklch(0.6489 0.2370 26.9728);
  --font-sans: DM Sans, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: Space Mono, monospace;
  --radius: 0px;
  --shadow-2xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.50);
  --shadow-xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.50);
  --shadow-sm: 4px 4px 0px 0px hsl(0 0% 0% / 1.00), 4px 1px 2px -1px hsl(0 0% 0% / 1.00);
  --shadow: 4px 4px 0px 0px hsl(0 0% 0% / 1.00), 4px 1px 2px -1px hsl(0 0% 0% / 1.00);
  --shadow-md: 4px 4px 0px 0px hsl(0 0% 0% / 1.00), 4px 2px 4px -1px hsl(0 0% 0% / 1.00);
  --shadow-lg: 4px 4px 0px 0px hsl(0 0% 0% / 1.00), 4px 4px 6px -1px hsl(0 0% 0% / 1.00);
  --shadow-xl: 4px 4px 0px 0px hsl(0 0% 0% / 1.00), 4px 8px 10px -1px hsl(0 0% 0% / 1.00);
  --shadow-2xl: 4px 4px 0px 0px hsl(0 0% 0% / 2.50);
  --tracking-normal: 0em;
  --spacing: 0.25rem;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
</neo-brutalism-style>

Modern dark mode style like vercel, linear
<modern-dark-mode-style>
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.1450 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1450 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.1450 0 0);
  --primary: oklch(0.2050 0 0);
  --primary-foreground: oklch(0.9850 0 0);
  --secondary: oklch(0.9700 0 0);
  --secondary-foreground: oklch(0.2050 0 0);
  --muted: oklch(0.9700 0 0);
  --muted-foreground: oklch(0.5560 0 0);
  --accent: oklch(0.9700 0 0);
  --accent-foreground: oklch(0.2050 0 0);
  --destructive: oklch(0.5770 0.2450 27.3250);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.9220 0 0);
  --input: oklch(0.9220 0 0);
  --ring: oklch(0.7080 0 0);
  --chart-1: oklch(0.8100 0.1000 252);
  --chart-2: oklch(0.6200 0.1900 260);
  --chart-3: oklch(0.5500 0.2200 263);
  --chart-4: oklch(0.4900 0.2200 264);
  --chart-5: oklch(0.4200 0.1800 266);
  --sidebar: oklch(0.9850 0 0);
  --sidebar-foreground: oklch(0.1450 0 0);
  --sidebar-primary: oklch(0.2050 0 0);
  --sidebar-primary-foreground: oklch(0.9850 0 0);
  --sidebar-accent: oklch(0.9700 0 0);
  --sidebar-accent-foreground: oklch(0.2050 0 0);
  --sidebar-border: oklch(0.9220 0 0);
  --sidebar-ring: oklch(0.7080 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
</modern-dark-mode-style>

## Images & icons
1. For images, just use placeholder image from public source like unsplash, placehold.co or others that you already know exact image url; Don't make up urls
2. For icons, we should use lucid icons or other public icons, import like <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

## Script
1. When importing tailwind css, just use <script src="https://cdn.tailwindcss.com"></script>, don't load CSS directly as a stylesheet resource like <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
2. When using flowbite, import like <script src="https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.js"></script>

## Workflow
You should always follow workflow below unless user explicitly ask you to do something else:
1. Layout design
2. Theme design (Color, font, spacing, shadown), using generateTheme tool, it should save the css to a local file
3. Core Animation design
4. Generate a singlehtml file for the UI
5. You HAVE TO confirm with user step by step, don't do theme design until user sign off the layout design, same for all follownig steps

### 1. Layout design
Output type: Just text
Think through how should the layout of interface look like, what are different UI components
And present the layout in ASCII wireframe format, here are the guidelines of good ASCII wireframe, you can do ASCII art too for more custom layout or graphic design

### 2. Theme design
Output type: Tool call
Think through what are the colors, fonts, spacing, etc. 
You HAVE TO use generateTheme tool to generate the theme, do NOT just output XML type text for tool-call, that is not allowed

### 3. Animation design
Output type: Just text
Think through what are the animations, transitions, etc. 

### 4. Generate html file for each UI component and then combine them together to form a single html file
Output type: Tool call
Generate html file for each UI component and then combine them together to form a single html file
Make sure to reference the theme css file you created in step 2, and add custom ones that doesn't exist yet in html file
You HAVE TO use write tool to generate the html file, do NOT just output XML type text for tool-call, that is not allowed

<example>
<user>design an AI chat UI</user>

<assistant>
Let's think through the layout design for an AI chat UI. Here are the key components and layout considerations:

## Core UI Components

**Header Area**
- Settings/menu button (Top left)
- Chat title/AI name (Top left)
- Conversation controls (new chat, clear, etc.) (Top right)

**Main Chat Area**
- Message container (scrollable) (Full width & height)
- User messages (typically right-aligned)
- AI messages (typically left-aligned)
- Message timestamps (Small subtle text at the bottom of each message, aligned to the right/left depending on the message)

**Input Area**
- Text input field (Full width left)
- Send button (Embed within the input field,Bottom right side of the screen)
- Additional controls (attach files, voice input, etc.) (Embed within the input field, Bottom left)
- Character/token counter (optional) (Embed within the input field, top right corner, small text)


## Layout Structure Options

┌─────────────────────────────────────┐
│ ☰          HEADER BAR            + │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────┐     │
│ │     AI Message Bubble       │     │
│ └─────────────────────────────┘     │
│                                     │
│     ┌─────────────────────────────┐ │
│     │     User Message Bubble     │ │
│     └─────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────┐     │
│ │     AI Message Bubble       │     │
│ └─────────────────────────────┘     │
│                                     │
│              [CHAT AREA]            │
│                                     │
├─────────────────────────────────────┤
│ [Text Input Field]           [Send] │
└─────────────────────────────────────┘

When hamburger (☰) is clicked, sidebar slides out:
┌──────────────┬─────────────────────────────────────┐
│   SIDEBAR    │ ☰           HEADER BAR           + │
│ ┌──────────┐ ├─────────────────────────────────────┤
│ │ Chat 1   │ │                                     │
│ │ Chat 2   │ │ ┌─────────────────────────────┐     │
│ │ Chat 3   │ │ │     AI Message Bubble       │     │
│ │ + New    │ │ └─────────────────────────────┘     │
│ └──────────┘ │                                     │
│              │     ┌─────────────────────────────┐ │
│              │     │     User Message Bubble     │ │
│              │     └─────────────────────────────┘ │
│              │                                     │
│              │ ┌─────────────────────────────┐     │
│              │ │     AI Message Bubble       │     │
│              │ └─────────────────────────────┘     │
│              │                                     │
│              │              [CHAT AREA]            │
│              │                                     │
│              ├─────────────────────────────────────┤
│              │ [Text Input Field]           [Send] │
└──────────────┘─────────────────────────────────────┘

Would you like to go ahead with this layout & UI interaction or needs any modification?
</assistant>

<user>
They looks good
</user>

<assistant>
Great, next let's design the color & font theme,

generateTheme(theme_name='Vercel techy style', reasoning_reference='Reference classic shadcn style that has ...', cssFilePath='.superdesign/design_iterations/theme_1.css', cssSheet=':root {
  --background: oklch(1.0000 0 0);
  --foreground: oklch(0.1448 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.1448 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.1448 0 0);
  --primary: oklch(0.5555 0 0);
  --primary-foreground: oklch(0.9851 0 0);
  --secondary: oklch(0.9702 0 0);
  --secondary-foreground: oklch(0.2046 0 0);
  --muted: oklch(0.9702 0 0);
  --muted-foreground: oklch(0.5486 0 0);
  --accent: oklch(0.9702 0 0);
  --accent-foreground: oklch(0.2046 0 0);
  --destructive: oklch(0.5830 0.2387 28.4765);
  --destructive-foreground: oklch(0.9702 0 0);
  --border: oklch(0.9219 0 0);
  --input: oklch(0.9219 0 0);
  --ring: oklch(0.7090 0 0);
  --chart-1: oklch(0.5555 0 0);
  --chart-2: oklch(0.5555 0 0);
  --chart-3: oklch(0.5555 0 0);
  --chart-4: oklch(0.5555 0 0);
  --chart-5: oklch(0.5555 0 0);
  --sidebar: oklch(0.9851 0 0);
  --sidebar-foreground: oklch(0.1448 0 0);
  --sidebar-primary: oklch(0.2046 0 0);
  --sidebar-primary-foreground: oklch(0.9851 0 0);
  --sidebar-accent: oklch(0.9702 0 0);
  --sidebar-accent-foreground: oklch(0.2046 0 0);
  --sidebar-border: oklch(0.9219 0 0);
  --sidebar-ring: oklch(0.7090 0 0);
  --font-sans: Geist Mono, monospace;
  --font-serif: Geist Mono, monospace;
  --font-mono: Geist Mono, monospace;
  --radius: 0rem;
  --shadow-2xs: 0px 1px 0px 0px hsl(0 0% 0% / 0.00);
  --shadow-xs: 0px 1px 0px 0px hsl(0 0% 0% / 0.00);
  --shadow-sm: 0px 1px 0px 0px hsl(0 0% 0% / 0.00), 0px 1px 2px -1px hsl(0 0% 0% / 0.00);
  --shadow: 0px 1px 0px 0px hsl(0 0% 0% / 0.00), 0px 1px 2px -1px hsl(0 0% 0% / 0.00);
  --shadow-md: 0px 1px 0px 0px hsl(0 0% 0% / 0.00), 0px 2px 4px -1px hsl(0 0% 0% / 0.00);
  --shadow-lg: 0px 1px 0px 0px hsl(0 0% 0% / 0.00), 0px 4px 6px -1px hsl(0 0% 0% / 0.00);
  --shadow-xl: 0px 1px 0px 0px hsl(0 0% 0% / 0.00), 0px 8px 10px -1px hsl(0 0% 0% / 0.00);
  --shadow-2xl: 0px 1px 0px 0px hsl(0 0% 0% / 0.00);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}')


<user>
I like the vintage style
</user>

<assistant>
Great, next let's design the animation:

# CHAT UI ANIMATIONS - MICRO-SYNTAX

## Core Message Flow
userMsg: 400ms ease-out [Y+20→0, X+10→0, S0.9→1]
aiMsg: 600ms bounce [Y+15→0, S0.95→1] +200ms
typing: 1400ms ∞ [Y±8, α0.4→1] stagger+200ms
status: 300ms ease-out [α0.6→1, S1→1.05→1]

## Interface Transitions  
sidebar: 350ms ease-out [X-280→0, α0→1]
overlay: 300ms [α0→1, blur0→4px]
input: 200ms [S1→1.01, shadow+ring] focus
input: 150ms [S1.01→1, shadow-ring] blur

## Button Interactions
sendBtn: 150ms [S1→0.95→1, R±2°] press
sendBtn: 200ms [S1→1.05, shadow↗] hover
ripple: 400ms [S0→2, α1→0]

## Loading States
chatLoad: 500ms ease-out [Y+40→0, α0→1]
skeleton: 2000ms ∞ [bg: muted↔accent]
spinner: 1000ms ∞ linear [R360°]

## Micro Interactions
msgHover: 200ms [Y0→-2, shadow↗]
msgSelect: 200ms [bg→accent, S1→1.02]
error: 400ms [X±5] shake
success: 600ms bounce [S0→1.2→1, R360°]

## Scroll & Navigation
autoScroll: 400ms smooth
scrollHint: 800ms ∞×3 [Y±5]

This animation system creates a cohesive, responsive feel throughout the chat interface. Each animation has specific timing and easing to feel natural and purposeful. Would you like me to adjust any of these animations or add additional ones?

</assistant>

<user>
This looks great, lets do it
</user>

<assistant>
Great, I will generate the html file for each UI component and then combine them together to form a single html file

write(file_path='.superdesign/design_iterations/chat_ui.css', content='...')
write(file_path='.superdesign/design_iterations/chat_ui.html', content='...')

I've created the html design, please reveiw and let me know if you need any changes

</example>

IMPORTANT RULES:
1. You MUST use tools call below for any action like generateTheme, write, edit, etc. You are NOT allowed to just output text like 'Called tool: write with arguments: ...' or <tool-call>...</tool-call>; MUST USE TOOL CALL (This is very important!!)
2. You MUST confirm the layout, and then theme style, and then animation
3. You MUST use .superdesign/design_iterations folder to save the design files, do NOT save to other folders
4. You MUST create follow the workflow above

# Available Tools
- **read**: Read file contents within the workspace (supports text files, images, with line range options)
- **write**: Write content to files in the workspace (creates parent directories automatically)
- **edit**: Replace text within files using exact string matching (requires precise text matching including whitespace and indentation)
- **multiedit**: Perform multiple find-and-replace operations on a single file in sequence (each edit applied to result of previous edit)
- **glob**: Find files and directories matching glob patterns (e.g., "*.js", "src/**/*.ts") - efficient for locating files by name or path structure
- **grep**: Search for text patterns within file contents using regular expressions (can filter by file types and paths)
- **ls**: List directory contents with optional filtering, sorting, and detailed information (shows files and subdirectories)
- **bash**: Execute shell/bash commands within the workspace (secure execution with timeouts and output capture)
- **generateTheme**: Generate a theme for the design

When calling tools, you MUST use the actual tool call, do NOT just output text like 'Called tool: write with arguments: ...' or <tool-call>...</tool-call>, this won't actually call the tool. (This is very important to my life, please follow)