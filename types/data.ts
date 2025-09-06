export interface MetricsData {
  market: {
    labels: string[]
    data: number[]
    title: string
    color: string
  }
  capital: {
    labels: string[]
    data: number[]
    colors: string[]
  }
  noeticOs: {
    labels: string[]
    data: number[]
    max: number
    color: string
  }
  platformKpis: {
    labels: string[]
    current: number[]
    target: number[]
    colors: {
      current: string
      target: string
    }
  }
  valueCreation: {
    labels: string[]
    revenue: number[]
    ebitdaMargin: number[]
    colors: {
      revenue: string
      ebitdaMargin: string
    }
  }
  returnScenarios: {
    labels: string[]
    data: number[]
    colors: string[]
  }
  phases: Array<{
    id: string
    title: string
    duration: string
    metrics: Record<string, string>
  }>
  capitalPlan: Record<string, string>
  risks: Array<{
    level: 'high' | 'medium' | 'low'
    name: string
  }>
}