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
        <div className="chart-placeholder">
          <div className="placeholder-icon">📊</div>
          <p>Chart failed to load</p>
          <button className="retry-capture-btn">Retry</button>
        </div>
      )}
    >
      <div style={{ background: 'transparent' }}>
        {children}
      </div>
    </ErrorBoundary>
  )
}

export function MarketLine() {
  const { market } = data
  return (
    <ChartWrapper>
      <Line data={{
        labels: market.labels,
        datasets: [{ 
          label: market.title, 
          data: market.data, 
          borderColor: market.color, 
          backgroundColor: `${market.color}20`, 
          fill: true, 
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: market.color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        }]
      }} options={{
        ...commonChartOptions,
        plugins: { 
          ...commonChartOptions.plugins,
          legend: { display: false }
        }, 
        scales: { 
          ...commonChartOptions.scales,
          y: { 
            ...commonChartOptions.scales?.y,
            beginAtZero: false, 
            ticks: { 
              ...commonChartOptions.scales?.y?.ticks,
              callback: (v: any) => `$${v}B` 
            } 
          } 
        } 
      }} />
    </ChartWrapper>
  )
}

export function CapitalDoughnut() {
  const { capital } = data
  return (
    <ChartWrapper>
      <Doughnut data={{ 
        labels: capital.labels, 
        datasets: [{ 
          data: capital.data, 
          backgroundColor: capital.colors, 
          borderWidth: 2,
          borderColor: '#27272a',
          hoverBorderWidth: 3,
          hoverBorderColor: '#667eea',
        }] 
      }} options={{
        ...commonChartOptions,
        plugins: { 
          ...commonChartOptions.plugins,
          legend: { 
            ...commonChartOptions.plugins?.legend,
            position: 'bottom' as const,
            labels: {
              ...commonChartOptions.plugins?.legend?.labels,
              boxWidth: 12,
              boxHeight: 12,
            }
          }
        }
      }} />
    </ChartWrapper>
  )
}

export function NoeticOsRadar() {
  const { noeticOs } = data
  return (
    <ChartWrapper>
      <Radar data={{
        labels: noeticOs.labels,
        datasets: [{ 
          label: 'Implementation Progress', 
          data: noeticOs.data, 
          borderColor: noeticOs.color, 
          backgroundColor: `${noeticOs.color}25`, 
          pointBackgroundColor: noeticOs.color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
        }]
      }} options={{
        ...commonChartOptions,
        plugins: {
          ...commonChartOptions.plugins,
          legend: {
            ...commonChartOptions.plugins?.legend,
            display: true,
          }
        },
        scales: { 
          r: { 
            beginAtZero: true, 
            max: noeticOs.max, 
            ticks: { 
              color: '#71717a',
              font: { size: 10 },
              callback: (v: any) => `${v}%` 
            },
            grid: {
              color: 'rgba(39, 39, 42, 0.6)',
            },
            angleLines: {
              color: 'rgba(39, 39, 42, 0.6)',
            },
            pointLabels: {
              color: '#a1a1aa',
              font: { size: 11 },
            }
          } 
        }
      }} />
    </ChartWrapper>
  )
}

export function PlatformKpiBar() {
  const { platformKpis } = data
  return (
    <ChartWrapper>
      <Bar data={{ 
        labels: platformKpis.labels, 
        datasets: [ 
          { 
            label: 'Current', 
            data: platformKpis.current, 
            backgroundColor: platformKpis.colors.current,
            borderColor: platformKpis.colors.current,
            borderWidth: 1,
            borderRadius: 4,
          }, 
          { 
            label: 'Target', 
            data: platformKpis.target, 
            backgroundColor: platformKpis.colors.target,
            borderColor: platformKpis.colors.target,
            borderWidth: 1,
            borderRadius: 4,
          } 
        ] 
      }} options={{
        ...commonChartOptions,
        scales: { 
          ...commonChartOptions.scales,
          y: { 
            ...commonChartOptions.scales?.y,
            beginAtZero: true 
          } 
        }
      }} />
    </ChartWrapper>
  )
}

export function ValueCreationDualAxis() {
  const { valueCreation } = data
  return (
    <ChartWrapper>
      <Line data={{ 
        labels: valueCreation.labels, 
        datasets: [ 
          { 
            label: 'Revenue ($M)', 
            data: valueCreation.revenue, 
            borderColor: valueCreation.colors.revenue, 
            backgroundColor: `${valueCreation.colors.revenue}15`,
            yAxisID: 'y',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: valueCreation.colors.revenue,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          }, 
          { 
            label: 'EBITDA Margin (%)', 
            data: valueCreation.ebitdaMargin, 
            borderColor: valueCreation.colors.ebitdaMargin, 
            backgroundColor: `${valueCreation.colors.ebitdaMargin}15`,
            yAxisID: 'y1',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: valueCreation.colors.ebitdaMargin,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          } 
        ] 
      }} options={{
        ...commonChartOptions,
        scales: { 
          ...commonChartOptions.scales,
          y: { 
            ...commonChartOptions.scales?.y,
            type: 'linear' as const, 
            position: 'left' as const 
          }, 
          y1: { 
            ...commonChartOptions.scales?.y,
            type: 'linear' as const, 
            position: 'right' as const, 
            grid: { drawOnChartArea: false } 
          } 
        }
      }} />
    </ChartWrapper>
  )
}

export function ReturnBar() {
  const { returnScenarios } = data
  return (
    <ChartWrapper>
      <Bar data={{ 
        labels: returnScenarios.labels, 
        datasets: [{ 
          label: 'IRR (%)', 
          data: returnScenarios.data, 
          backgroundColor: returnScenarios.colors,
          borderColor: returnScenarios.colors.map((color: string) => color),
          borderWidth: 1,
          borderRadius: 6,
        }] 
      }} options={{
        ...commonChartOptions,
        scales: { 
          ...commonChartOptions.scales,
          y: { 
            ...commonChartOptions.scales?.y,
            beginAtZero: true, 
            ticks: { 
              ...commonChartOptions.scales?.y?.ticks,
              callback: (v: any) => `${v}%` 
            } 
          } 
        }
      }} />
    </ChartWrapper>
  )
}