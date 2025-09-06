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

// Thesis Builder Types
export interface ThesisSelection {
  id: string
  type: 'chart' | 'metric' | 'phase' | 'risk'
  title: string
  data?: any
  order: number
  selected: boolean
}

export interface PresentationTemplate {
  id: string
  name: string
  description: string
  preview: string
  sections: string[]
  defaultSelections: string[]
}

export interface ExportOptions {
  format: 'pdf' | 'pptx'
  template: string
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  customization: {
    includeCoverPage: boolean
    includeExecutiveSummary: boolean
    includeAppendix: boolean
    pageNumbers: boolean
  }
}

export interface ExportOptionsUpdate {
  format?: 'pdf' | 'pptx'
  template?: string
  branding?: Partial<ExportOptions['branding']>
  customization?: Partial<ExportOptions['customization']>
}

export interface ThesisBuilderState {
  selections: ThesisSelection[]
  template: PresentationTemplate | null
  exportOptions: ExportOptions
  isPreviewMode: boolean
}