import { useState, useMemo } from 'react'
import type { PresentationTemplate, ThesisSelection } from '../../types/data'

interface TemplateSelectorProps {
  selectedTemplate: PresentationTemplate | null
  selections: ThesisSelection[]
  onChange: (template: PresentationTemplate) => void
  onNext: () => void
  onBack: () => void
}

const availableTemplates: PresentationTemplate[] = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'Concise overview perfect for board presentations and initial investor meetings',
    preview: '/templates/executive-summary-preview.png',
    sections: [
      'Cover Page',
      'Investment Thesis',
      'Market Opportunity', 
      'Capital Strategy',
      'Key Metrics',
      'Risk Assessment',
      'Expected Returns'
    ],
    defaultSelections: [
      'market-line',
      'capital-doughnut', 
      'return-bar',
      'risk-assessment',
      'target-fund-size'
    ]
  },
  {
    id: 'detailed-analysis',
    name: 'Detailed Analysis',
    description: 'Comprehensive analysis with all phases and metrics for thorough due diligence',
    preview: '/templates/detailed-analysis-preview.png',
    sections: [
      'Cover Page',
      'Executive Summary',
      'Market Analysis',
      'Investment Strategy',
      'Phase 0: Foundation',
      'Phase 1: Anchor',
      'Phase 2: Bolt-Ons', 
      'Phase 3: Scale',
      'Phase 4: Exit',
      'Financial Projections',
      'Risk Analysis',
      'Appendix'
    ],
    defaultSelections: [
      'market-line',
      'capital-doughnut',
      'noetic-os-radar',
      'platform-kpi-bar',
      'value-creation-dual',
      'return-bar',
      'p0', 'p1', 'p2', 'p3', 'p4',
      'risk-assessment'
    ]
  },
  {
    id: 'investor-pitch',
    name: 'Investor Pitch',
    description: 'Focused pitch deck designed to generate investor interest and commitment',
    preview: '/templates/investor-pitch-preview.png', 
    sections: [
      'Title Slide',
      'Problem & Opportunity',
      'Solution Overview',
      'Market Size & Growth',
      'Business Model',
      'Competitive Advantage',
      'Financial Projections',
      'Investment Ask',
      'Use of Funds',
      'Team & Advisors',
      'Next Steps'
    ],
    defaultSelections: [
      'market-line',
      'value-creation-dual',
      'return-bar',
      'target-fund-size',
      'anchor-allocation'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Template',
    description: 'Flexible template that adapts to your selected content with minimal structure',
    preview: '/templates/custom-preview.png',
    sections: [
      'Cover Page',
      'Selected Content',
      'Appendix'
    ],
    defaultSelections: []
  }
]

export default function TemplateSelector({ 
  selectedTemplate, 
  selections, 
  onChange, 
  onNext, 
  onBack 
}: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<PresentationTemplate | null>(selectedTemplate)

  // Calculate template compatibility scores
  const templateScores = useMemo(() => {
    return availableTemplates.map(template => {
      const matchingSelections = template.defaultSelections.filter(defaultId =>
        selections.some(selection => selection.id === defaultId)
      )
      const score = template.defaultSelections.length > 0 
        ? matchingSelections.length / template.defaultSelections.length 
        : 1
      
      return {
        template,
        score,
        matchingCount: matchingSelections.length,
        missingSelections: template.defaultSelections.filter(defaultId =>
          !selections.some(selection => selection.id === defaultId)
        )
      }
    })
  }, [selections])

  const handleTemplateSelect = (template: PresentationTemplate) => {
    onChange(template)
    setPreviewTemplate(template)
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 0.8) return '#10b981' // green
    if (score >= 0.6) return '#d97706' // orange  
    if (score >= 0.4) return '#dc2626' // red
    return '#64748b' // gray
  }

  return (
    <div className="template-selector">
      <div className="selector-header">
        <h2>Choose Template</h2>
        <p>Select a presentation template that best fits your selected data and audience.</p>
      </div>

      <div className="template-grid">
        {templateScores.map(({ template, score, matchingCount, missingSelections }) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Template Preview */}
            <div className="template-preview">
              <div className="preview-placeholder">
                <div className="template-icon">
                  {template.id === 'executive-summary' && '📋'}
                  {template.id === 'detailed-analysis' && '📊'}
                  {template.id === 'investor-pitch' && '💼'}
                  {template.id === 'custom' && '🎨'}
                </div>
                <div className="preview-pages">
                  {template.sections.slice(0, 3).map((section, index) => (
                    <div key={index} className="preview-page">
                      <div className="page-header">{section}</div>
                      <div className="page-content">
                        {template.defaultSelections.includes('market-line') && index === 1 && 
                          <div className="preview-chart">📈</div>
                        }
                        {template.defaultSelections.includes('capital-doughnut') && index === 2 && 
                          <div className="preview-chart">🍩</div>
                        }
                      </div>
                    </div>
                  ))}
                  {template.sections.length > 3 && (
                    <div className="more-pages">+{template.sections.length - 3} more</div>
                  )}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              
              <div className="template-sections">
                <strong>Sections ({template.sections.length}):</strong>
                <div className="section-tags">
                  {template.sections.slice(0, 4).map(section => (
                    <span key={section} className="section-tag">{section}</span>
                  ))}
                  {template.sections.length > 4 && (
                    <span className="section-tag more">+{template.sections.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="template-compatibility">
                <div className="compatibility-header">
                  <span>Content Match</span>
                  <span 
                    className="compatibility-score"
                    style={{ color: getCompatibilityColor(score) }}
                  >
                    {matchingCount}/{template.defaultSelections.length}
                  </span>
                </div>
                
                <div className="compatibility-bar">
                  <div 
                    className="compatibility-fill"
                    style={{ 
                      width: `${score * 100}%`,
                      backgroundColor: getCompatibilityColor(score)
                    }}
                  />
                </div>

                {missingSelections.length > 0 && (
                  <div className="missing-content">
                    <small>Recommended additions: {missingSelections.slice(0, 2).join(', ')}
                      {missingSelections.length > 2 && ` +${missingSelections.length - 2} more`}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            <div className="template-selector-indicator">
              <input
                type="radio"
                name="template"
                checked={selectedTemplate?.id === template.id}
                onChange={() => handleTemplateSelect(template)}
                aria-label={`Select ${template.name} template`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Details */}
      {selectedTemplate && (
        <div className="selected-template-details">
          <h3>Selected: {selectedTemplate.name}</h3>
          <div className="template-structure">
            <h4>Presentation Structure:</h4>
            <ol className="section-list">
              {selectedTemplate.sections.map(section => (
                <li key={section}>{section}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="selector-actions">
        <button onClick={onBack} className="button secondary">
          Back: Select Data
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTemplate}
          className="button primary"
        >
          Next: Preview Presentation
        </button>
      </div>
    </div>
  )
}