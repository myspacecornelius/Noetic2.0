import { useMemo } from 'react'
import metricsData from '../data/noetic-metrics.json'
import type { MetricsData } from '../types/data'

export function useMetricsData(): MetricsData {
  return useMemo(() => metricsData as MetricsData, [])
}

export function usePhaseData(phaseId: string) {
  const data = useMetricsData()
  return useMemo(() => 
    data.phases.find(phase => phase.id === phaseId),
    [data.phases, phaseId]
  )
}

export function useRisksByLevel(level?: 'high' | 'medium' | 'low') {
  const data = useMetricsData()
  return useMemo(() => 
    level ? data.risks.filter(risk => risk.level === level) : data.risks,
    [data.risks, level]
  )
}