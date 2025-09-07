# CLAUDE.md — Engineering Guide

## Project Overview
- Stack: Next.js 13 (pages router) + Nextra v3 (docs theme) + TypeScript
- Purpose: Investor‑ready docs with charts and a “Thesis Builder” for exportable presentations
- Branding: Noetic 2.0 — professional, data‑forward, clean UI

## Runbook
- Prereqs: Node 18.x or 20.x recommended (use `nvm`), npm preferred
- Install: `npm install` (package‑lock present). If you prefer: `pnpm i`
- Dev: `npm run dev` then open http://localhost:3000
- Build: `npm run build`
- Prod: `npm start`

### Dev Server Troubleshooting
- Port/permission errors (e.g., EPERM listen 0.0.0.0): run `npx next dev -H 127.0.0.1 -p 3000`
- Clear cache: delete `.next` then retry `npm run dev`
- Node version: prefer 18.x or 20.x. Avoid experimental 22.x for now
- TypeScript stops server: fix compile errors; dev server won’t serve pages until TS passes
  - Recently fixed: duplicate `else if (selection.type === 'phase')` in `components/thesis/PreviewPanel.tsx` which caused a TS narrowing error and blocked builds

## Repo Structure
- `pages/` — MDX pages + navigation
  - `index.mdx` (landing), `advanced.mdx`, `another.mdx`, `thesis-builder.mdx`
  - `cns-acquisition/` section with `criteria.mdx`
  - `_app.tsx` wires global styles and chart config
  - `_meta.tsx` controls sidebar/nav ordering and labels
- `components/`
  - Charts: `NoeticCharts.tsx` (MarketLine, CapitalDoughnut, NoeticOsRadar, PlatformKpiBar, ValueCreationDualAxis, ReturnBar)
  - Dynamic imports: `ChartComponents.tsx` (code splitting + SSR false)
  - Layout/UI: `DashboardCard.tsx`, `PhaseTabs.tsx`, `Phases.tsx`, `ErrorBoundary.tsx`
  - Thesis Builder: `components/thesis/` — `ThesisBuilder.tsx`, `DataSelector.tsx`, `PreviewPanel.tsx`, `ExportControls.tsx`, `ChartCapture.tsx`, `DynamicThesisBuilder.tsx`, `TemplateSelector.tsx`
- `lib/chart-config.ts` — registers Chart.js parts and exports `commonChartOptions` + `chartColors`
- `data/noetic-metrics.json` — canonical data for charts, phases, risks, and capital plan
- `hooks/useMetricsData.ts` — memoized data access + small helpers (phase lookup, risk filter)
- `styles/global.css` — global styles, utility classes (hero, dash-grid, risk chips, etc.)
- `theme.config.tsx` — Nextra theme config (branding, SEO, head, footer)

## Implementation Guidelines
- TypeScript: add prop interfaces, avoid `any`, keep discriminated unions consistent with `types/data.ts`
- Components:
  - Wrap chart renderings with `ErrorBoundary`
  - Prefer dynamic imports for chart components to keep TTI fast
  - Keep `className` passthroughs and accessibility attrs (`aria-*`)
- Charts:
  - Use `commonChartOptions` and `chartColors` from `lib/chart-config.ts`
  - Read from `data/noetic-metrics.json` via `useMetricsData()` where possible
- Styling:
  - Reuse existing classes (`hero`, `dash-grid`, `card`, `phase-tabs`, `risk-chip`)
  - Keep CSS changes minimal and consistent with the current design
- Content/Docs:
  - New pages → add `.mdx` in `pages/` and entries in `pages/_meta.tsx`
  - Keep tone and structure professional and investor‑friendly

## Common Tasks
- Add a new chart:
  1) Extend `data/noetic-metrics.json` and types if needed
  2) Implement in `components/NoeticCharts.tsx` and wire dynamically via `ChartComponents.tsx`
  3) Surface in pages or Thesis Builder
- Add a new phase or metric:
  - Update `data/noetic-metrics.json` and consume via `useMetricsData()`
- Extend Thesis Builder:
  - Use `types/data.ts` unions; update `DataSelector`, `PreviewPanel`, `ExportControls` deterministically
- Export features (PDF/PPTX):
  - Deps available: `html2canvas`, `jspdf`, `pptxgenjs` (see `ChartCapture.tsx` and `ExportControls.tsx`)

## Quality & CI
- Lint: `npm run lint` or `npm run lint:fix` (rules via Next/ESLint)
- Type check: `npm run type-check`
- Build checks: GitHub Actions (if configured) runs install → lint → build

## Known Issues & Notes
- Sandbox/CI environments may block port binding; use `-H 127.0.0.1` if needed
- ESLint warnings in `components/thesis/ChartCapture.tsx` (`react-hooks/exhaustive-deps`, `@next/next/no-img-element`) are safe to address incrementally; prefer real fixes over disabling
- README mentions `pnpm`; project currently uses npm (see `package-lock.json`). Either works locally if used consistently

## Deployment
- Vercel config present via `vercel.json` and theme settings in `theme.config.tsx`
- Custom script: `npm run deploy` (see `scripts/deploy.sh`)

— End —

