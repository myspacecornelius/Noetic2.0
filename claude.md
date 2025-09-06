# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 + Nextra documentation site for "Noetic 2.0" - a strategic transformation from venture fund to CNS operating company. The site presents investor-ready documentation with interactive charts, phase-based navigation, and professional styling.

**Framework**: Next.js 13.5.x with Nextra v3.3.1 (pages router)  
**Brand**: "noetic1" by David C. Nichols  
**Domain**: `david-c-nichols.online`  

## Key Commands

### Development & Build
```bash
# Install dependencies (uses npm, not pnpm despite README reference)
npm install

# Development server (auto-finds available port, typically 3000-3002)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Deploy (custom script)
npm run deploy
```

### CI & Quality
- GitHub Actions CI runs on PRs and main branch: `.github/workflows/ci.yml`
- CI steps: `npm ci` → `npm run lint --if-present` → `npm run build`
- No explicit linting configured in package.json (only runs if present)

## Architecture & Structure

### Core Framework Integration
- **Nextra v3**: `next.config.mjs` configures theme as `nextra-theme-docs` with `./theme.config.tsx`
- **Theme Config**: `theme.config.tsx` handles branding, SEO, footer, and head tags
- **Pages Router**: Uses `pages/` directory with `.mdx` files and `_meta.tsx` for navigation
- **TypeScript**: Standard Next.js TS config with strict mode disabled

### Component Architecture
**Chart System** (Chart.js v4 + react-chartjs-2):
- `components/NoeticCharts.tsx`: Main chart exports (MarketLine, CapitalDoughnut, NoeticOsRadar, etc.)
- Chart.js components registered globally: LineElement, BarElement, RadialLinearScale, etc.
- All charts use consistent color palette: primary `#667eea`, secondary `#764ba2`

**UI Components**:
- `components/PhaseTabs.tsx`: Interactive phase navigation with state management
- `components/DashboardCard.tsx`: Consistent card container with hover effects
- `components/Phases.tsx`: Phase-specific content rendering
- Additional specialized components: ValuationChart, FitChart, KpiChart, counters

### Styling System
- **Global Styles**: `styles/global.css` with CSS custom properties for consistent theming
- **Design Tokens**: Primary colors (#667eea, #764ba2), success/warning/danger colors, typography scale
- **Component Classes**: `.hero`, `.dash-grid`, `.card`, `.phase-tabs`, `.risk-chip` patterns
- **Font Loading**: Inter font preloaded via Google Fonts in theme config

### Content Structure
**Main Pages**:
- `pages/index.mdx`: Landing page with hero section
- `pages/noetic-2.mdx`: Core dashboard with 5-phase breakdown (Foundation → Anchor → Bolt-Ons → Scale → Exit)
- `pages/cns-acquisition/`: Acquisition-focused content with sub-navigation
- Standard pages: about, advanced (features), another (showcase)

**Navigation**: 
- `pages/_meta.tsx`: Controls sidebar navigation and page ordering
- Contact link: `mailto:hello@david-c-nichols.online`

### Data & Business Logic
**Phase-Based Architecture**:
- 5 phases: Phase 0 (Foundation), Phase 1 (Anchor), Phase 2 (Bolt-Ons), Phase 3 (Scale), Phase 4 (Exit)
- Each phase contains: KPIs, charts, risk assessments, financial projections
- Chart data embedded directly in components (consider extracting to JSON files for maintainability)

**Key Metrics**:
- Market size projections (2024-2030: $140B+ CNS market)
- Capital allocation: Anchors 45%, Bolt-Ons 35%, Reserves 20%
- Financial targets: Revenue growth 25%+ CAGR, EBITDA margins 20%+

### Integration Points
**Vercel Deployment**:
- Configured for `david-c-nichols.online` domain
- `vercel.json` present for deployment configuration
- Custom deployment script: `scripts/deploy.sh`

**External Dependencies**:
- Chart.js v4.5.0 + react-chartjs-2 v5.3.0 for data visualizations
- Nextra v3.3.1 + nextra-theme-docs v3.3.1 for documentation framework
- TypeScript support with @types packages

## Development Patterns

### Adding New Charts
1. Chart.js components are registered centrally in `lib/chart-config.ts`
2. Use data from `data/noetic-metrics.json` with TypeScript types from `types/data.ts`
3. Wrap charts in `ErrorBoundary` for error handling
4. Use dynamic imports via `ChartComponents.tsx` for code splitting
5. All charts have consistent styling via `commonChartOptions`

### Creating New Pages
1. Add `.mdx` file to `pages/` directory
2. Update `pages/_meta.tsx` with navigation entry (use named variable exports for ESLint)
3. Use consistent component imports and styling classes
4. Follow phase-based content structure for business-related pages

### Component Development
1. Use TypeScript interfaces for all props (see `PhaseTabs.tsx`, `DashboardCard.tsx`)
2. Include accessibility attributes: `aria-label`, `aria-pressed`, etc.
3. Handle loading and error states explicitly
4. Support `className` and spread props for flexibility
5. Use `useCallback` for event handlers to prevent unnecessary re-renders

### Styling Updates
1. Use CSS custom properties defined in `styles/global.css`
2. Responsive design: mobile-first approach with `@media (max-width: 768px)`
3. Accessibility: Support `prefers-reduced-motion` and focus-visible
4. Follow established component patterns: `.card`, `.dash-grid`, `.hero`
5. Test responsive behavior and keyboard navigation

### Data Management
1. Business metrics stored in `data/noetic-metrics.json`
2. TypeScript interfaces in `types/data.ts` provide type safety
3. Custom hooks `useMetricsData()`, `usePhaseData()`, `useRisksByLevel()` for data access
4. Chart colors centralized in `lib/chart-config.ts`

### Performance Optimization
1. Bundle analysis: `npm run analyze`
2. Dynamic imports for charts reduce initial bundle size
3. Chart.js components selectively registered (not full library)
4. Console.log statements removed in production builds
5. SWC minification enabled for faster builds

### Common Issues
- **Build Errors**: Ensure theme config uses `content` not `text` for footer (Nextra v3 requirement)
- **Port Conflicts**: Dev server auto-finds available port (3000→3001→3002)
- **Chart Rendering**: Charts have error boundaries and loading states
- **Type Safety**: Strict TypeScript enabled with proper interfaces
- **ESLint**: Anonymous default exports should use named variables first

## Design System Reference

The existing `claude.md` file contains a comprehensive design brief with:
- Complete component specifications
- Color palette and design tokens
- Deployment instructions
- File-by-file implementation details

Reference that file when implementing major design changes or refactoring the visual system.