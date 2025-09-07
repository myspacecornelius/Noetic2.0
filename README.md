# NOETIC 2.0

**Strategic CNS Investment Platform** | Professional investor documentation and thesis builder for central nervous system market opportunities.

[![Next.js](https://img.shields.io/badge/Next.js-13.0+-xblack?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Nextra](https://img.shields.io/badge/Nextra-3.0+-gray?style=flat-square)](https://nextra.site/)

---

## Overview

Noetic 2.0 represents a strategic transformation from venture fund to CNS operating company, targeting the **$140B+ central nervous system market** with an infrastructure-led consolidation strategy. This platform provides professional-grade investor documentation, interactive charts, and a sophisticated thesis builder for creating exportable presentations.

### Key Features

- **📊 Interactive Analytics**: Real-time charts showing market data, capital allocation, platform KPIs, and return scenarios
- **🎯 Thesis Builder**: Professional presentation generator with dark preview stage and enhanced thumbnails
- **📈 Financial Modeling**: Multiple investment scenarios with sensitivity analysis and risk assessment
- **🎨 Studio UI**: Premium dark interface with instrument-panel precision
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **🔒 Professional Grade**: Investor-ready documentation with exportable formats

---

## Technology Stack

### Frontend
- **Next.js 13** - React framework with pages router
- **TypeScript** - Type-safe development
- **Nextra 3** - Documentation theme with MDX support
- **Chart.js** - Interactive data visualizations
- **CSS Custom Properties** - Studio graphite dark theme

### Key Dependencies
- `react-chartjs-2` - Chart.js React integration
- `html2canvas` - Chart capture for exports  
- `jspdf` & `pptxgenjs` - PDF and PowerPoint generation
- `react-pdf` - PDF viewing capabilities

---

## Quick Start

### Prerequisites
- **Node.js** 18.x or 20.x (use `nvm` for version management)
- **npm** 8.0+ (preferred) or **pnpm** 7.0+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Noetic2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

### Development Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production  
npm run build           # Build for production
npm start              # Start production server

# Quality Assurance
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues automatically
npm run type-check     # Run TypeScript type checking

# Deployment
npm run deploy         # Custom deployment script
```

---

## Project Structure

```
Noetic2.0/
├── pages/                    # MDX pages and API routes
│   ├── index.mdx            # Landing page
│   ├── thesis-builder.mdx   # Interactive thesis builder
│   ├── market-intelligence.mdx
│   ├── cns-acquisition/     # CNS strategy documentation
│   └── api/                 # PDF/PPTX generation endpoints
├── components/              # React components
│   ├── thesis/             # Thesis builder components
│   │   ├── ThesisBuilder.tsx
│   │   ├── PreviewPanel.tsx # Enhanced dark preview
│   │   ├── DataSelector.tsx
│   │   └── ExportControls.tsx
│   ├── NoeticCharts.tsx    # Chart components
│   ├── ChartComponents.tsx # Dynamic imports
│   └── ErrorBoundary.tsx   # Error handling
├── lib/
│   └── chart-config.ts     # Chart.js dark theme configuration
├── data/
│   └── noetic-metrics.json # Canonical business data
├── hooks/
│   └── useMetricsData.ts   # Data access layer
├── styles/
│   └── global.css          # Studio graphite theme
├── types/
│   └── data.ts            # TypeScript definitions
└── theme.config.tsx       # Nextra theme configuration
```

---

## Features Deep Dive

### Interactive Charts

Six specialized chart types optimized for dark backgrounds:

- **MarketLine**: CNS market growth projections ($140B+ by 2030)
- **CapitalDoughnut**: Strategic capital allocation visualization
- **NoeticOsRadar**: Platform capability assessment
- **PlatformKpiBar**: Performance metrics comparison
- **ValueCreationDualAxis**: Revenue and margin progression
- **ReturnBar**: Investment scenario returns (15-25% IRR)

### Thesis Builder Workflow

1. **Data Selection**: Choose charts, phases, metrics, and risk assessments
2. **Template Selection**: Pick from investor-ready presentation formats
3. **Preview**: Enhanced dark preview with realistic thumbnails showing content structure
4. **Export**: Generate PDF or PowerPoint presentations

### Studio Graphite Design System

- **Color Palette**: Deep graphite backgrounds (#0f0f12) with confident primary blue (#667eea)
- **Typography**: Professional hierarchy with Inter + SF Pro Display
- **Components**: Instrument-panel inspired cards and controls
- **Interactions**: Subtle hover states and focus management
- **Loading States**: Calm skeleton animations replace spinners

---

## Development Workflow

### Adding New Charts

1. **Extend Data Model**: Update `data/noetic-metrics.json`
2. **Create Component**: Add to `components/NoeticCharts.tsx`
3. **Register Chart**: Wire through `ChartComponents.tsx`
4. **Update Types**: Extend TypeScript definitions in `types/data.ts`

### Customizing Theme

The platform uses CSS custom properties for consistent theming:

```css
:root {
  --bg: #0f0f12;           /* Deep graphite background */
  --surface: #1a1a1f;     /* Card surfaces */
  --elevated: #242429;     /* Elevated elements */
  --primary: #667eea;      /* Brand primary */
  --text: #e4e4e7;         /* Soft white text */
  --text-secondary: #a1a1aa; /* Muted text */
}
```

### Content Management

- **Pages**: Add `.mdx` files in `pages/` directory
- **Navigation**: Update `pages/_meta.tsx` for sidebar ordering
- **Data**: Modify `data/noetic-metrics.json` for business metrics

---

## Troubleshooting

### Development Server Issues

**Port conflicts or permission errors:**
```bash
npx next dev -H 127.0.0.1 -p 3000
```

**Cache issues:**
```bash
rm -rf .next && npm run dev
```

**Node version compatibility:**
- Prefer Node 18.x or 20.x
- Avoid experimental 22.x versions
- Use `nvm use 18` to switch versions

### Build Failures

**TypeScript compilation errors:**
- Run `npm run type-check` for detailed error information
- Recently fixed: duplicate conditional logic in `PreviewPanel.tsx`
- Ensure all props have proper TypeScript interfaces

**Chart rendering issues:**
- Charts are client-side only to prevent SSR issues
- Verify Chart.js components are properly registered
- Check for transparent backgrounds on dark surfaces

---

## Performance & Architecture

### Optimizations
- **Code Splitting**: Dynamic imports for chart components prevent TTI issues
- **SSR Prevention**: Charts render client-side only using dynamic imports
- **Bundle Optimization**: Tree shaking for Chart.js components
- **Error Boundaries**: Graceful fallbacks for chart rendering failures

### Accessibility Features
- **ARIA Support**: Comprehensive labeling for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility support
- **Reduced Motion**: Respects user motion preferences
- **Color Contrast**: WCAG AA compliant dark theme ratios

---

## Recent Updates

### Version 2.1 - Studio Graphite Transformation ✨

**Major UI/UX Overhaul:**
- 🎨 **Studio Graphite Theme**: Professional dark interface with instrument-panel precision
- 🖼️ **Enhanced Thumbnails**: 120px previews showing actual content structure (headers, charts, text blocks)
- 🌙 **Dark Preview Stage**: Elevated background with generous padding and subtle gradients
- 📊 **Chart Dark Optimization**: Transparent backgrounds, subtle grids, professional tooltips
- ✨ **Calm Loading States**: Skeleton animations replace harsh spinners
- 📝 **Typography Upgrade**: Inter + SF Pro Display with confident hierarchy
- 🏷️ **Brand Refresh**: "NOETIC 2.0" logo with restrained primary accents

**Technical Improvements:**
- Eliminated all white surfaces for consistent dark theme
- Enhanced TypeScript coverage and type safety
- Improved accessibility with proper focus management
- Optimized chart rendering for dark backgrounds
- Professional color palette with desaturated status indicators

---

## Deployment

### Vercel (Recommended)

The project includes Vercel configuration:

```bash
# Automatic deployment via GitHub integration
# Or manual deployment:
npm run build
# Deploy via Vercel dashboard
```

### Manual Deployment

```bash
npm run build
npm start
# Or deploy static files from .next/ directory
```

### Environment Configuration

- Development: Uses `.env.local` (not tracked)
- Production: Configure through deployment platform
- No external API keys required for basic functionality

---

## Contributing

### Development Standards
- **TypeScript**: Strict mode enabled, comprehensive type coverage
- **Code Quality**: ESLint + Next.js recommended configuration
- **Architecture**: Preserve existing data flows and SSR patterns
- **Testing**: Ensure `npm run type-check` and `npm run build` pass

### Pull Request Guidelines
1. Maintain surgical, additive changes
2. Preserve chart client-side rendering
3. Follow existing dark theme patterns
4. Include TypeScript interfaces for new components
5. Test responsive design on multiple screen sizes

---

## Support & Documentation

For questions about the investment thesis, platform architecture, or development:

- 📖 **Internal Docs**: See `CLAUDE.md` for detailed engineering guidelines
- 🔧 **Known Issues**: ESLint warnings in `ChartCapture.tsx` are documented as safe
- 💡 **Feature Requests**: Follow the established component patterns
- 🚀 **Performance**: Platform optimized for professional investor usage

---

## License

**Proprietary** - © 2024 David C. Nichols. All rights reserved.

This is proprietary investment platform software for CNS market analysis and presentation generation.

---

*Built with studio-quality precision for professional CNS market investors*
