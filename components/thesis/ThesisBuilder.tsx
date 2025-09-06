import { useState, useCallback } from 'react'
import DataSelector from './DataSelector'
import TemplateSelector from './TemplateSelector'
import PreviewPanel from './PreviewPanel'
import ExportControls from './ExportControls'
import type { ThesisBuilderState, ThesisSelection, PresentationTemplate, ExportOptions } from '../../types/data'

const defaultExportOptions: ExportOptions = {
  format: 'pdf',
  template: 'executive-summary',
  branding: {
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    fontFamily: 'Inter'
  },
  customization: {
    includeCoverPage: true,
    includeExecutiveSummary: true,
    includeAppendix: false,
    pageNumbers: true
  }
}

export default function ThesisBuilder() {
  const [state, setState] = useState<ThesisBuilderState>({
    selections: [],
    template: null,
    exportOptions: defaultExportOptions,
    isPreviewMode: false
  })

  const [currentStep, setCurrentStep] = useState<'select' | 'template' | 'preview' | 'export'>('select')

  const handleSelectionChange = useCallback((selections: ThesisSelection[]) => {
    setState(prev => ({ ...prev, selections }))
  }, [])

  const handleTemplateChange = useCallback((template: PresentationTemplate) => {
    setState(prev => ({ ...prev, template }))
  }, [])

  const handleExportOptionsChange = useCallback((exportOptions: ExportOptions) => {
    setState(prev => ({ ...prev, exportOptions }))
  }, [])

  const togglePreviewMode = useCallback(() => {
    setState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }))
  }, [])

  const steps = [
    { key: 'select', label: 'Select Data', icon: '📊' },
    { key: 'template', label: 'Choose Template', icon: '📋' },
    { key: 'preview', label: 'Preview', icon: '👁️' },
    { key: 'export', label: 'Export', icon: '📤' }
  ]

  return (
    <div className="thesis-builder">
      {/* Step Navigation */}
      <div className="step-nav">
        {steps.map((step, index) => (
          <button
            key={step.key}
            onClick={() => setCurrentStep(step.key as any)}
            className={`step-button ${currentStep === step.key ? 'active' : ''} ${
              index < steps.findIndex(s => s.key === currentStep) ? 'completed' : ''
            }`}
            aria-label={`Step ${index + 1}: ${step.label}`}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-label">{step.label}</span>
            <span className="step-number">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="thesis-content">
        {currentStep === 'select' && (
          <DataSelector
            selections={state.selections}
            onChange={handleSelectionChange}
            onNext={() => setCurrentStep('template')}
          />
        )}

        {currentStep === 'template' && (
          <TemplateSelector
            selectedTemplate={state.template}
            selections={state.selections}
            onChange={handleTemplateChange}
            onNext={() => setCurrentStep('preview')}
            onBack={() => setCurrentStep('select')}
          />
        )}

        {currentStep === 'preview' && (
          <PreviewPanel
            state={state}
            onBack={() => setCurrentStep('template')}
            onNext={() => setCurrentStep('export')}
          />
        )}

        {currentStep === 'export' && (
          <ExportControls
            state={state}
            onOptionsChange={handleExportOptionsChange}
            onBack={() => setCurrentStep('preview')}
          />
        )}
      </div>

      {/* Progress Indicator */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${((steps.findIndex(s => s.key === currentStep) + 1) / steps.length) * 100}%` 
          }}
        />
      </div>
    </div>
  )
}