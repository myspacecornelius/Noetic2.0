import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register only the components we actually use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
)

// Common chart options optimized for dark backgrounds
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(26, 26, 31, 0.95)',
      titleColor: '#e4e4e7',
      bodyColor: '#a1a1aa',
      borderColor: '#27272a',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: {
        size: 13,
        weight: 600,
      },
      bodyFont: {
        size: 12,
      },
    },
    legend: {
      labels: {
        color: '#a1a1aa',
        font: {
          size: 12,
        },
        usePointStyle: true,
        padding: 16,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(39, 39, 42, 0.6)',
        borderColor: 'rgba(39, 39, 42, 0.8)',
      },
      ticks: {
        color: '#71717a',
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(39, 39, 42, 0.6)',
        borderColor: 'rgba(39, 39, 42, 0.8)',
      },
      ticks: {
        color: '#71717a',
        font: {
          size: 11,
        },
      },
    },
  },
}

export const chartColors = {
  primary: '#667eea',
  primaryLight: '#8693f3',
  secondary: '#a78bfa',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  gray: '#6b7280',
  // Gradient combinations for sophisticated looks
  gradients: {
    primary: 'linear-gradient(135deg, #667eea, #8693f3)',
    success: 'linear-gradient(135deg, #22c55e, #16a34a)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
    danger: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
}

export { ChartJS }