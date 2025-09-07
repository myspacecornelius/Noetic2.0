export interface Alert {
  id: string
  type: AnomalyType
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  timestamp: Date
  affectedCompanies: string[]
  suggestedActions: string[]
}

export type AnomalyType = 
  | 'network_disruption' 
  | 'unusual_activity' 
  | 'valuation_disconnect' 
  | 'regulatory_shift'
  | 'market_consolidation'
  | 'funding_drought'

export interface AnomalyThresholds {
  networkDisruption: number
  unusualActivity: number
  valuationDisconnect: number
  regulatoryShift: number
}

export class AnomalyDetector {
  private thresholds: Record<AnomalyType, number>
  
  constructor() {
    this.thresholds = {
      network_disruption: 2.5,
      unusual_activity: 3.0,
      valuation_disconnect: 2.0,
      regulatory_shift: 1.5,
      market_consolidation: 2.2,
      funding_drought: 1.8
    }
  }

  detectAnomalies(marketState: any = {}): Alert[] {
    // Mock implementation for Phase 1
    const currentTime = new Date()
    
    return [
      {
        id: "anom_001",
        type: "unusual_activity",
        severity: "medium",
        title: "Unusual Trading Activity Detected",
        description: "3 CNS companies showing correlated 15%+ volume increases over 48h period",
        timestamp: currentTime,
        affectedCompanies: ["NeuroCorp", "SynapseInc", "BrainTech"],
        suggestedActions: [
          "Monitor for news catalyst or partnership announcements",
          "Check for regulatory filing updates",
          "Analyze insider trading patterns"
        ]
      },
      {
        id: "anom_002", 
        type: "valuation_disconnect",
        severity: "low",
        title: "Valuation Gap Identified",
        description: "BrainWave Diagnostics trading 25% below comparable companies despite strong fundamentals",
        timestamp: new Date(currentTime.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        affectedCompanies: ["BrainWave Diagnostics"],
        suggestedActions: [
          "Research potential acquisition target",
          "Analyze market sentiment factors",
          "Review recent earnings guidance"
        ]
      },
      {
        id: "anom_003",
        type: "network_disruption", 
        severity: "high",
        title: "Key Partnership Dissolution",
        description: "Major distribution partnership between Neural Dynamics and hospital network terminated unexpectedly",
        timestamp: new Date(currentTime.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        affectedCompanies: ["Neural Dynamics", "MedTech Partners"],
        suggestedActions: [
          "Assess impact on revenue projections",
          "Investigate alternative distribution channels",
          "Monitor competitive positioning changes"
        ]
      }
    ]
  }

  analyzeMarketHealth(companies: any[] = []): {
    overall: number
    riskLevel: 'low' | 'medium' | 'high'
    activeAnomalies: number
    trends: string[]
  } {
    // Mock implementation for Phase 1
    return {
      overall: 72,
      riskLevel: 'medium',
      activeAnomalies: 3,
      trends: [
        "Increased M&A speculation in neurodiagnostics sector",
        "Regulatory scrutiny affecting AI diagnostic approvals", 
        "Venture funding concentrating in later-stage companies"
      ]
    }
  }

  setThreshold(anomalyType: AnomalyType, threshold: number): void {
    this.thresholds[anomalyType] = threshold
  }

  getThreshold(anomalyType: AnomalyType): number {
    return this.thresholds[anomalyType]
  }
}