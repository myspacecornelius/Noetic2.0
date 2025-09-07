import React, { useState } from 'react'

export interface AISettings {
  predictions: {
    enabled: boolean
    timeHorizon: '1M' | '3M' | '6M' | '1Y'
    minProbability: number
    showGhostSynapses: boolean
  }
  anomalies: {
    enabled: boolean
    sensitivity: 'low' | 'medium' | 'high'
    realTimeAlerts: boolean
    alertTypes: string[]
  }
  display: {
    showProbabilities: boolean
    animateAlerts: boolean
    heatmapIntensity: number
  }
}

interface AIControlPanelProps {
  settings: AISettings
  onSettingsChange: (settings: AISettings) => void
  className?: string
}

export default function AIControlPanel({ 
  settings, 
  onSettingsChange, 
  className = '' 
}: AIControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const updateSettings = <K extends keyof AISettings>(
    category: K,
    updates: Partial<AISettings[K]>
  ) => {
    onSettingsChange({
      ...settings,
      [category]: { ...settings[category], ...updates }
    })
  }

  return (
    <div className={`ai-control-panel ${className}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="ai-toggle-button"
        aria-expanded={isExpanded}
        aria-controls="ai-settings-panel"
      >
        🧠 AI Controls
      </button>
      
      {isExpanded && (
        <div className="ai-settings-panel" id="ai-settings-panel">
          {/* Predictions Section */}
          <div className="setting-group">
            <h4>Predictive Modeling</h4>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={settings.predictions.enabled}
                onChange={(e) => updateSettings('predictions', { 
                  enabled: e.target.checked 
                })}
              />
              <span>Show Connection Predictions</span>
            </label>
            
            {settings.predictions.enabled && (
              <>
                <label className="select-label">
                  <span>Time Horizon:</span>
                  <select 
                    value={settings.predictions.timeHorizon}
                    onChange={(e) => updateSettings('predictions', { 
                      timeHorizon: e.target.value as AISettings['predictions']['timeHorizon']
                    })}
                    className="control-select"
                  >
                    <option value="1M">1 Month</option>
                    <option value="3M">3 Months</option>
                    <option value="6M">6 Months</option>
                    <option value="1Y">1 Year</option>
                  </select>
                </label>
                
                <label className="range-label">
                  <span>Min Probability: {settings.predictions.minProbability}%</span>
                  <input 
                    type="range"
                    min="10"
                    max="90"
                    value={settings.predictions.minProbability}
                    onChange={(e) => updateSettings('predictions', { 
                      minProbability: parseInt(e.target.value)
                    })}
                    className="control-range"
                  />
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={settings.predictions.showGhostSynapses}
                    onChange={(e) => updateSettings('predictions', { 
                      showGhostSynapses: e.target.checked
                    })}
                  />
                  <span>Show Ghost Connections</span>
                </label>
              </>
            )}
          </div>
          
          {/* Anomaly Detection Section */}
          <div className="setting-group">
            <h4>Anomaly Detection</h4>
            
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={settings.anomalies.enabled}
                onChange={(e) => updateSettings('anomalies', { 
                  enabled: e.target.checked
                })}
              />
              <span>Enable Anomaly Alerts</span>
            </label>
            
            {settings.anomalies.enabled && (
              <>
                <label className="select-label">
                  <span>Sensitivity:</span>
                  <select 
                    value={settings.anomalies.sensitivity}
                    onChange={(e) => updateSettings('anomalies', { 
                      sensitivity: e.target.value as AISettings['anomalies']['sensitivity']
                    })}
                    className="control-select"
                  >
                    <option value="low">Low (High Confidence)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (All Patterns)</option>
                  </select>
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={settings.anomalies.realTimeAlerts}
                    onChange={(e) => updateSettings('anomalies', { 
                      realTimeAlerts: e.target.checked
                    })}
                  />
                  <span>Real-time Notifications</span>
                </label>
              </>
            )}
          </div>
          
          {/* Display Options */}
          <div className="setting-group">
            <h4>Visualization</h4>
            
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={settings.display.showProbabilities}
                onChange={(e) => updateSettings('display', { 
                  showProbabilities: e.target.checked
                })}
              />
              <span>Show Probability Labels</span>
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={settings.display.animateAlerts}
                onChange={(e) => updateSettings('display', { 
                  animateAlerts: e.target.checked
                })}
              />
              <span>Animate Alerts</span>
            </label>
            
            <label className="range-label">
              <span>Heatmap Intensity: {Math.round(settings.display.heatmapIntensity * 100)}%</span>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.display.heatmapIntensity}
                onChange={(e) => updateSettings('display', { 
                  heatmapIntensity: parseFloat(e.target.value)
                })}
                className="control-range"
              />
            </label>
          </div>
          
          {/* Quick Actions */}
          <div className="setting-group">
            <div className="quick-actions">
              <button 
                onClick={() => {
                  onSettingsChange({
                    predictions: { enabled: true, timeHorizon: '6M', minProbability: 70, showGhostSynapses: true },
                    anomalies: { enabled: true, sensitivity: 'medium', realTimeAlerts: true, alertTypes: [] },
                    display: { showProbabilities: true, animateAlerts: true, heatmapIntensity: 0.7 }
                  })
                }}
                className="preset-button"
              >
                🎯 High Confidence
              </button>
              <button 
                onClick={() => {
                  onSettingsChange({
                    predictions: { enabled: true, timeHorizon: '3M', minProbability: 30, showGhostSynapses: true },
                    anomalies: { enabled: true, sensitivity: 'high', realTimeAlerts: true, alertTypes: [] },
                    display: { showProbabilities: true, animateAlerts: true, heatmapIntensity: 0.9 }
                  })
                }}
                className="preset-button"
              >
                🔍 Discovery Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}