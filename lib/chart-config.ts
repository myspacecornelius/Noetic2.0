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

// Common chart options to reduce bundle duplication
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      cornerRadius: 8,
    },
  },
}

export const chartColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#10b981',
  warning: '#d97706',
  danger: '#dc2626',
  gray: '#e5e7eb',
}

export { ChartJS }