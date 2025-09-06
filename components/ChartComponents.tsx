import dynamic from 'next/dynamic'
import { ErrorBoundary } from './ErrorBoundary'

// Dynamically import charts for code splitting
export const MarketLineChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.MarketLine })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)

export const CapitalDoughnutChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.CapitalDoughnut })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)

export const NoeticOsRadarChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.NoeticOsRadar })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)

export const PlatformKpiBarChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.PlatformKpiBar })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)

export const ValueCreationDualAxisChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.ValueCreationDualAxis })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)

export const ReturnBarChart = dynamic(
  () => import('./NoeticCharts').then(mod => ({ default: mod.ReturnBar })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    ),
    ssr: false
  }
)