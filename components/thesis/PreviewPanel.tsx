import { useState, useMemo } from 'react'
import ChartCapture from './ChartCapture'
import { MarketLine, CapitalDoughnut, NoeticOsRadar, PlatformKpiBar, ValueCreationDualAxis, ReturnBar } from '../NoeticCharts'
import { useMetricsData } from '../../hooks/useMetricsData'
import type { ThesisBuilderState } from '../../types/data'

interface PreviewPanelProps {
  readonly state: ThesisBuilderState
  readonly onBack: () => void
  readonly onNext: () => void
}

// Chart components moved outside to avoid dependency issues
const chartComponents = {
  'market-line': MarketLine,
  'capital-doughnut': CapitalDoughnut,
  'noetic-os-radar': NoeticOsRadar,
  'platform-kpi-bar': PlatformKpiBar,
  'value-creation-dual': ValueCreationDualAxis,
  'return-bar': ReturnBar
}

// Helper function to format metric keys
function formatMetricKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

// Helper function to render risk items by level
function renderRiskItems(risks: Array<{level: string, name: string}>, level: string) {
  return risks
    .filter(risk => risk.level === level)
    .map(risk => (
      <div key={risk.name} className="risk-item">
        {risk.name}
      </div>
    ))
}

export default function PreviewPanel({ state, onBack, onNext }: PreviewPanelProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [zoom, setZoom] = useState(1)
  const metricsData = useMetricsData()

  // Define before usage inside useMemo to avoid TDZ errors
  function getChartInsights(chartId: string) {
    const insights = {
      'market-line': 'The CNS market shows consistent growth at 10.4% CAGR, reaching $254.6B by 2030, providing substantial runway for consolidation strategy.',
      'capital-doughnut': 'Strategic capital allocation prioritizes anchor acquisition (45%) and bolt-on growth (35%) with prudent reserves (20%).',
      'noetic-os-radar': 'NoeticOS platform capabilities span all critical operational areas, with particular strength in data/AI and go-to-market functions.',
      'platform-kpi-bar': 'Significant improvement opportunities exist across all KPIs, with integration speed and cross-sell rate showing highest potential impact.',
      'value-creation-dual': 'Value creation accelerates through systematic revenue growth and margin expansion, reaching optimal scale by Year 4.',
      'return-bar': 'Multiple return scenarios demonstrate strong downside protection with significant upside potential in favorable market conditions.'
    } as const
    return insights[chartId as keyof typeof insights] || 'Key insights and analysis for this metric.'
  }

  // Generate preview pages based on template and selections
  const previewPages = useMemo(() => {
    if (!state.template) return []

    const pages = []

    // Cover page
    if (state.exportOptions.customization.includeCoverPage) {
      pages.push({
        id: 'cover',
        title: 'Cover Page',
        content: (
          <div className="preview-page cover-page">
            <div className="cover-header">
              <h1>NOETIC 2.0</h1>
              <h2>Investment Thesis</h2>
              <p>Strategic Transformation: From Venture Fund to CNS Operating Company</p>
            </div>
            <div className="cover-highlights">
              <div className="highlight">$140B+ Market</div>
              <div className="highlight">10.4% CAGR</div>
              <div className="highlight">Infrastructure-Led Strategy</div>
            </div>
            <div className="cover-footer">
              <p>Prepared by: David C. Nichols</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )
      })
    }

    // Executive summary
    if (state.exportOptions.customization.includeExecutiveSummary) {
      pages.push({
        id: 'executive-summary',
        title: 'Executive Summary',
        content: (
          <div className="preview-page exec-summary-page">
            <h2>Executive Summary</h2>
            <div className="summary-content">
              <div className="summary-section">
                <h3>Investment Opportunity</h3>
                <p>
                  Noetic 2.0 represents a strategic transformation from venture fund to CNS operating company,
                  targeting the $140B+ central nervous system market with an infrastructure-led consolidation strategy.
                </p>
              </div>
              
              <div className="summary-metrics">
                <div className="metric-box">
                  <span className="metric-value">{metricsData.capitalPlan.targetFundSize}</span>
                  <span className="metric-label">Target Fund Size</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">25%+</span>
                  <span className="metric-label">Revenue CAGR</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">15-25%</span>
                  <span className="metric-label">Target IRR</span>
                </div>
              </div>

              <div className="summary-section">
                <h3>Key Value Drivers</h3>
                <ul>
                  <li>Market-leading anchor acquisition in neurodiagnostics</li>
                  <li>Systematic bolt-on acquisition program</li>
                  <li>Platform-wide operational improvements via NoeticOS</li>
                  <li>Multiple exit pathways with 6-8x revenue multiples</li>
                </ul>
              </div>
            </div>
          </div>
        )
      })
    }

    // Content pages based on selections
    type ChartComponentKey = keyof typeof chartComponents
    
    state.selections
      .toSorted((a, b) => a.order - b.order)
      .forEach(selection => {
        if (selection.type === 'chart' && selection.id in chartComponents) {
          const chartKey = selection.id as ChartComponentKey
          const ChartComponent = chartComponents[chartKey]
          if (ChartComponent) {
            pages.push({
              id: selection.id,
              title: selection.title,
              content: (
                <div className="preview-page chart-page">
                  <h2>{selection.title}</h2>
                  <div className="chart-container">
                    <ChartCapture
                      chartId={selection.id}
                      component={ChartComponent}
                      height={400}
                    />
                  </div>
                  <div className="chart-insights">
                    {getChartInsights(selection.id)}
                  </div>
                </div>
              )
            })
          }
        } else if (selection.type === 'phase') {
          const phaseData = metricsData.phases.find(p => p.id === selection.id)
          if (phaseData) {
            pages.push({
              id: selection.id,
              title: selection.title,
              content: (
                <div className="preview-page phase-page">
                  <h2>{phaseData.title}</h2>
                  <div className="phase-details">
                    <div className="phase-timeline">
                      <span className="timeline-label">Duration:</span>
                      <span className="timeline-value">{phaseData.duration}</span>
                    </div>
                    
                    <div className="phase-metrics">
                      <h3>Key Metrics</h3>
                      <div className="metrics-grid">
                        {Object.entries(phaseData.metrics).map(([key, value]) => (
                          <div key={key} className="metric-item">
                            <span className="metric-key">{formatMetricKey(key)}</span>
                            <span className="metric-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        } else if (selection.type === 'risk') {
          pages.push({
            id: 'risk-assessment',
            title: 'Risk Assessment',
            content: (
              <div className="preview-page risk-page">
                <h2>Risk Assessment</h2>
                <div className="risk-analysis">
                  <div className="risk-matrix">
                    {['high', 'medium', 'low'].map(level => (
                      <div key={level} className={`risk-category risk-${level}`}>
                        <h3>{level.toUpperCase()} RISK</h3>
                        <div className="risk-items">
                          {renderRiskItems(metricsData.risks, level)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="risk-mitigation">
                    <h3>Mitigation Strategies</h3>
                    <ul>
                      <li>Experienced management team with proven track record</li>
                      <li>Conservative financial modeling with stress testing</li>
                      <li>Diversified acquisition pipeline across CNS verticals</li>
                      <li>Strong operational playbook via NoeticOS platform</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          })
        }
      })

    return pages
  }, [state.template, state.selections, state.exportOptions, metricsData])

  

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2>Preview Presentation</h2>
        <p>Review your generated presentation before exporting.</p>
        
        <div className="preview-controls">
          <div className="page-navigation">
            <button 
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="nav-button"
            >
              ← Previous
            </button>
            <span className="page-indicator">
              Page {currentPage + 1} of {previewPages.length}
            </span>
            <button 
              onClick={() => setCurrentPage(Math.min(previewPages.length - 1, currentPage + 1))}
              disabled={currentPage === previewPages.length - 1}
              className="nav-button"
            >
              Next →
            </button>
          </div>

          <div className="zoom-controls">
            <button 
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="zoom-button"
            >
              -
            </button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
              className="zoom-button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="preview-content">
        <div className="page-thumbnails">
          {previewPages.map((page, index) => (
            <button
              key={page.id}
              className={`thumbnail ${currentPage === index ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setCurrentPage(index)
                }
              }}
              aria-label={`Go to page ${index + 1}: ${page.title}`}
              type="button"
            >
              <div className="thumbnail-preview">
                <div className="thumbnail-header">
                  <div className="header-bar"></div>
                  <div className="page-number">{index + 1}</div>
                </div>
                <div className="thumbnail-content">
                  <div className="content-blocks">
                    {page.id === 'cover' && (
                      <>
                        <div className="block title-block"></div>
                        <div className="block subtitle-block"></div>
                        <div className="block metrics-block"></div>
                      </>
                    )}
                    {page.id === 'executive-summary' && (
                      <>
                        <div className="block title-block"></div>
                        <div className="block text-block"></div>
                        <div className="block metrics-grid"></div>
                        <div className="block text-block"></div>
                      </>
                    )}
                    {page.id.includes('chart') || Object.keys(chartComponents).includes(page.id) && (
                      <>
                        <div className="block title-block"></div>
                        <div className="block chart-block"></div>
                        <div className="block insight-block"></div>
                      </>
                    )}
                    {!page.id.includes('chart') && page.id !== 'cover' && page.id !== 'executive-summary' && !Object.keys(chartComponents).includes(page.id) && (
                      <>
                        <div className="block title-block"></div>
                        <div className="block text-block"></div>
                        <div className="block text-block"></div>
                      </>
                    )}
                  </div>
                </div>
                <div className="thumbnail-title">{page.title}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="main-preview">
          {previewPages[currentPage] && (
            <div 
              className="preview-page-container"
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: 'top left'
              }}
            >
              {previewPages[currentPage].content}
            </div>
          )}
          
          {previewPages.length === 0 && (
            <div className="empty-preview">
              <p>No content to preview. Please select data and template first.</p>
            </div>
          )}
        </div>
      </div>

      <div className="preview-summary">
        <h3>Presentation Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{previewPages.length}</span>
            <span className="stat-label">Total Pages</span>
          </div>
          <div className="stat">
            <span className="stat-value">{state.selections.filter(s => s.type === 'chart').length}</span>
            <span className="stat-label">Charts</span>
          </div>
          <div className="stat">
            <span className="stat-value">{state.selections.filter(s => s.type === 'phase').length}</span>
            <span className="stat-label">Phases</span>
          </div>
          <div className="stat">
            <span className="stat-value">{state.template?.name || 'None'}</span>
            <span className="stat-label">Template</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="preview-actions">
        <button onClick={onBack} className="button secondary">
          Back: Choose Template
        </button>
        <button
          onClick={onNext}
          disabled={previewPages.length === 0}
          className="button primary"
        >
          Next: Export Options
        </button>
      </div>
    </div>
  )
}
