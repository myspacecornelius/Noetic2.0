import React, { useState } from 'react'
import { ConnectionPrediction } from '../../../lib/ai/prediction-engine'
import { Alert, AnomalyType } from '../../../lib/ai/anomaly-detector'
import { MarketHealth } from '../../../lib/ai/market-analyzer'

interface InsightsSidebarProps {
  predictions: ConnectionPrediction[]
  alerts: Alert[]
  marketHealth: MarketHealth
  insights: string[]
  isVisible: boolean
  onToggle: () => void
  className?: string
}

export default function InsightsSidebar({ 
  predictions, 
  alerts,
  marketHealth, 
  insights,
  isVisible, 
  onToggle,
  className = ''
}: InsightsSidebarProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'alerts' | 'insights'>('overview')

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'medium': return '#3b82f6'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getConnectionTypeIcon = (type: ConnectionPrediction['connectionType']) => {
    switch (type) {
      case 'acquisition': return '🎯'
      case 'partnership': return '🤝'
      case 'merger': return '🔗'
      case 'investment': return '💰'
      default: return '🔮'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'var(--success-500)'
    if (health >= 60) return 'var(--warning-500)'
    return 'var(--danger-500)'
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    return `$${(value / 1000).toFixed(0)}K`
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffHours > 24) return `${Math.floor(diffHours / 24)}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    return `${diffMins}m ago`
  }

  return (
    <div className={`insights-sidebar ${isVisible ? 'visible' : ''} ${className}`}>
      <div className="sidebar-header">
        <h3>🧠 AI Insights</h3>
        <button onClick={onToggle} className="close-button" aria-label="Close insights">
          ×
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="sidebar-tabs">
        {[
          { id: 'overview', label: '📊 Overview', count: null },
          { id: 'predictions', label: '🔮 Predictions', count: predictions.length },
          { id: 'alerts', label: '⚠️ Alerts', count: alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length },
          { id: 'insights', label: '💡 Insights', count: insights.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="sidebar-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="market-health-card">
              <h4>Market Health</h4>
              <div className="health-display">
                <div className="health-meter">
                  <div 
                    className="health-fill" 
                    style={{ 
                      width: `${marketHealth.overall}%`,
                      background: getHealthColor(marketHealth.overall)
                    }}
                  />
                </div>
                <span className="health-score">{marketHealth.overall}%</span>
              </div>
              <div className="volatility-badge volatility-${marketHealth.volatility}">
                {marketHealth.volatility.toUpperCase()} VOLATILITY
              </div>
            </div>

            <div className="sector-health">
              <h4>Sector Performance</h4>
              {Object.entries(marketHealth.sectors).map(([sector, health]) => (
                <div key={sector} className="sector-row">
                  <span className="sector-name">
                    {sector.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <div className="sector-health-bar">
                    <div 
                      className="sector-fill"
                      style={{ 
                        width: `${health}%`,
                        background: getHealthColor(health)
                      }}
                    />
                  </div>
                  <span className="sector-score">{health}%</span>
                </div>
              ))}
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-value">{predictions.length}</span>
                <span className="stat-label">Active Predictions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{alerts.length}</span>
                <span className="stat-label">Recent Alerts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{marketHealth.networkDensity.toFixed(2)}</span>
                <span className="stat-label">Network Density</span>
              </div>
            </div>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="predictions-tab">
            <div className="tab-header">
              <h4>Connection Predictions</h4>
              <span className="item-count">{predictions.length} active</span>
            </div>
            
            {predictions.length > 0 ? (
              <div className="predictions-list">
                {predictions.map((pred, idx) => (
                  <div key={idx} className="prediction-item">
                    <div className="prediction-header">
                      <div className="prediction-type">
                        {getConnectionTypeIcon(pred.connectionType)}
                        <span className="connection-type">{pred.connectionType}</span>
                      </div>
                      <div className="prediction-probability">
                        <span className="probability-value">{pred.probability}%</span>
                        <span className={`confidence confidence-${pred.confidence}`}>
                          {pred.confidence}
                        </span>
                      </div>
                    </div>
                    
                    <div className="prediction-companies">
                      <span className="company-name">{pred.company1}</span>
                      <span className="connection-arrow">→</span>
                      <span className="company-name">{pred.company2}</span>
                    </div>
                    
                    <div className="prediction-details">
                      <div className="detail-row">
                        <span className="detail-label">Timeframe:</span>
                        <span className="detail-value">{pred.timeframe}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Est. Value:</span>
                        <span className="detail-value">{formatCurrency(pred.value)}</span>
                      </div>
                    </div>
                    
                    {pred.catalysts.length > 0 && (
                      <div className="prediction-catalysts">
                        <span className="catalysts-label">Key Catalysts:</span>
                        <ul className="catalysts-list">
                          {pred.catalysts.slice(0, 2).map((catalyst, catIdx) => (
                            <li key={catIdx} className="catalyst-item">{catalyst}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🔮</span>
                <p>No predictions available</p>
                <small>Enable predictions in AI Controls</small>
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="alerts-tab">
            <div className="tab-header">
              <h4>Anomaly Alerts</h4>
              <span className="item-count">{alerts.length} recent</span>
            </div>
            
            {alerts.length > 0 ? (
              <div className="alerts-list">
                {alerts.map((alert, idx) => (
                  <div key={alert.id} className={`alert-item severity-${alert.severity}`}>
                    <div className="alert-header">
                      <div className="alert-indicator">
                        <div 
                          className="severity-dot"
                          style={{ backgroundColor: getSeverityColor(alert.severity) }}
                        />
                        <span className="alert-title">{alert.title}</span>
                      </div>
                      <span className="alert-time">{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                    
                    <p className="alert-description">{alert.description}</p>
                    
                    {alert.affectedCompanies.length > 0 && (
                      <div className="affected-companies">
                        <span className="companies-label">Affected:</span>
                        <div className="companies-tags">
                          {alert.affectedCompanies.map(company => (
                            <span key={company} className="company-tag">{company}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {alert.suggestedActions.length > 0 && (
                      <details className="alert-actions">
                        <summary>Suggested Actions ({alert.suggestedActions.length})</summary>
                        <ul className="actions-list">
                          {alert.suggestedActions.map((action, actIdx) => (
                            <li key={actIdx} className="action-item">{action}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">✅</span>
                <p>No alerts detected</p>
                <small>Market patterns appear normal</small>
              </div>
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="insights-tab">
            <div className="tab-header">
              <h4>Market Insights</h4>
              <span className="item-count">{insights.length} insights</span>
            </div>
            
            {insights.length > 0 ? (
              <div className="insights-list">
                {insights.map((insight, idx) => (
                  <div key={idx} className="insight-item">
                    <div className="insight-icon">💡</div>
                    <div className="insight-content">
                      <p className="insight-text">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🤔</span>
                <p>Generating insights...</p>
                <small>AI analysis in progress</small>
              </div>
            )}

            {/* Risk Factors & Opportunities */}
            <div className="risk-opportunities">
              <div className="risk-section">
                <h5>🚨 Risk Factors</h5>
                <ul className="risk-list">
                  {marketHealth.riskFactors.slice(0, 3).map((risk, idx) => (
                    <li key={idx} className="risk-item">{risk}</li>
                  ))}
                </ul>
              </div>
              
              <div className="opportunities-section">
                <h5>🚀 Opportunities</h5>
                <ul className="opportunities-list">
                  {marketHealth.opportunities.slice(0, 3).map((opp, idx) => (
                    <li key={idx} className="opportunity-item">{opp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}