import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'
import { ErrorBoundary } from './ErrorBoundary'
import { commonChartOptions } from '../lib/chart-config'
import metricsData from '../data/noetic-metrics.json'
import type { MetricsData } from '../types/data'

const data = metricsData as MetricsData

interface ChartWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

function ChartWrapper({ children, fallback }: ChartWrapperProps) {
  return (
    <ErrorBoundary 
      fallback={fallback || (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
          <p className="text-gray-500">Chart failed to load</p>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

export function MarketLine() {
  const { market } = data
  return (
    <ChartWrapper>
      <Line data={{
        labels: market.labels,
        datasets: [{ label: market.title, data: market.data, borderColor: market.color, backgroundColor: `${market.color}1A`, fill: true, tension: .4 }]
      }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, ticks: { callback: (v: any) => `$${v}B` } } } }} />
    </ChartWrapper>
  )
}

export function CapitalDoughnut() {
  const { capital } = data
  return (
    <ChartWrapper>
      <Doughnut data={{ labels: capital.labels, datasets: [{ data: capital.data, backgroundColor: capital.colors, borderWidth: 0 }] }} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
    </ChartWrapper>
  )
}

export function NoeticOsRadar() {
  const { noeticOs } = data
  return (
    <ChartWrapper>
      <Radar data={{
        labels: noeticOs.labels,
        datasets: [{ label: 'Implementation Progress', data: noeticOs.data, borderColor: noeticOs.color, backgroundColor: `${noeticOs.color}33`, pointBackgroundColor: noeticOs.color }]
      }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: noeticOs.max, ticks: { callback: (v: any) => `${v}%` } } } }} />
    </ChartWrapper>
  )
}

export function PlatformKpiBar() {
  const { platformKpis } = data
  return (
    <ChartWrapper>
      <Bar data={{ labels: platformKpis.labels, datasets: [ { label: 'Current', data: platformKpis.current, backgroundColor: platformKpis.colors.current }, { label: 'Target', data: platformKpis.target, backgroundColor: platformKpis.colors.target } ] }} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </ChartWrapper>
  )
}

export function ValueCreationDualAxis() {
  const { valueCreation } = data
  return (
    <ChartWrapper>
      <Line data={{ labels: valueCreation.labels, datasets: [ { label: 'Revenue ($M)', data: valueCreation.revenue, borderColor: valueCreation.colors.revenue, yAxisID: 'y' }, { label: 'EBITDA Margin (%)', data: valueCreation.ebitdaMargin, borderColor: valueCreation.colors.ebitdaMargin, yAxisID: 'y1' } ] }} options={{ responsive: true, scales: { y: { type:'linear' as const, position:'left' as const }, y1: { type:'linear' as const, position:'right' as const, grid: { drawOnChartArea: false } } } }} />
    </ChartWrapper>
  )
}

export function ReturnBar() {
  const { returnScenarios } = data
  return (
    <ChartWrapper>
      <Bar data={{ labels: returnScenarios.labels, datasets: [{ label: 'IRR (%)', data: returnScenarios.data, backgroundColor: returnScenarios.colors }] }} options={{ responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: (v: any) => `${v}%` } } } }} />
    </ChartWrapper>
  )
}