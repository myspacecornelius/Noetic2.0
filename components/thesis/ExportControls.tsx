import { useState, useCallback } from 'react'
import type { ThesisBuilderState, ExportOptions, ExportOptionsUpdate } from '../../types/data'

interface ExportControlsProps {
  state: ThesisBuilderState
  onOptionsChange: (options: ExportOptions) => void
  onBack: () => void
}

export default function ExportControls({ state, onOptionsChange, onBack }: ExportControlsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleOptionChange = useCallback((updates: ExportOptionsUpdate) => {
    const newOptions = {
      ...state.exportOptions,
      ...updates,
      branding: { ...state.exportOptions.branding, ...(updates.branding || {}) },
      customization: { ...state.exportOptions.customization, ...(updates.customization || {}) }
    }
    onOptionsChange(newOptions)
  }, [state.exportOptions, onOptionsChange])

  const handleExport = async () => {
    if (!state.template || state.selections.length === 0) return

    setIsExporting(true)
    setExportStatus('generating')
    setDownloadUrl(null)

    try {
      const exportData = {
        selections: state.selections,
        template: state.template,
        options: state.exportOptions
      }

      const endpoint = state.exportOptions.format === 'pdf' 
        ? '/api/thesis/generate-pdf' 
        : '/api/thesis/generate-pptx'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exportData)
      })

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`)
      }

      // Create download link
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setExportStatus('success')

      // Auto-download
      const link = document.createElement('a')
      link.href = url
      link.download = `noetic-2.0-thesis.${state.exportOptions.format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (error) {
      console.error('Export error:', error)
      setExportStatus('error')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="export-controls">
      <div className="export-header">
        <h2>Export Options</h2>
        <p>Customize your presentation and download in your preferred format.</p>
      </div>

      <div className="export-configuration">
        {/* Format Selection */}
        <div className="config-section">
          <h3>Export Format</h3>
          <div className="format-options">
            <label className="format-option">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={state.exportOptions.format === 'pdf'}
                onChange={(e) => handleOptionChange({ format: e.target.value as 'pdf' })}
              />
              <div className="format-details">
                <span className="format-icon">📄</span>
                <div>
                  <strong>PDF</strong>
                  <p>High-quality static presentation, perfect for email and printing</p>
                </div>
              </div>
            </label>

            <label className="format-option">
              <input
                type="radio"
                name="format"
                value="pptx"
                checked={state.exportOptions.format === 'pptx'}
                onChange={(e) => handleOptionChange({ format: e.target.value as 'pptx' })}
              />
              <div className="format-details">
                <span className="format-icon">📊</span>
                <div>
                  <strong>PowerPoint</strong>
                  <p>Editable slides for presentations and further customization</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Branding Options */}
        <div className="config-section">
          <h3>Branding & Style</h3>
          <div className="branding-options">
            <div className="color-inputs">
              <div className="color-input">
                <label htmlFor="primary-color">Primary Color</label>
                <input
                  id="primary-color"
                  type="color"
                  value={state.exportOptions.branding.primaryColor}
                  onChange={(e) => handleOptionChange({ 
                    branding: { primaryColor: e.target.value } 
                  })}
                />
                <span className="color-value">{state.exportOptions.branding.primaryColor}</span>
              </div>

              <div className="color-input">
                <label htmlFor="secondary-color">Secondary Color</label>
                <input
                  id="secondary-color"
                  type="color"
                  value={state.exportOptions.branding.secondaryColor}
                  onChange={(e) => handleOptionChange({ 
                    branding: { secondaryColor: e.target.value } 
                  })}
                />
                <span className="color-value">{state.exportOptions.branding.secondaryColor}</span>
              </div>
            </div>

            <div className="font-selection">
              <label htmlFor="font-family">Font Family</label>
              <select
                id="font-family"
                value={state.exportOptions.branding.fontFamily}
                onChange={(e) => handleOptionChange({ 
                  branding: { fontFamily: e.target.value } 
                })}
              >
                <option value="Inter">Inter (Default)</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Options */}
        <div className="config-section">
          <h3>Content Options</h3>
          <div className="content-options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={state.exportOptions.customization.includeCoverPage}
                onChange={(e) => handleOptionChange({ 
                  customization: { includeCoverPage: e.target.checked } 
                })}
              />
              <span>Include Cover Page</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={state.exportOptions.customization.includeExecutiveSummary}
                onChange={(e) => handleOptionChange({ 
                  customization: { includeExecutiveSummary: e.target.checked } 
                })}
              />
              <span>Include Executive Summary</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={state.exportOptions.customization.includeAppendix}
                onChange={(e) => handleOptionChange({ 
                  customization: { includeAppendix: e.target.checked } 
                })}
              />
              <span>Include Appendix with Raw Data</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={state.exportOptions.customization.pageNumbers}
                onChange={(e) => handleOptionChange({ 
                  customization: { pageNumbers: e.target.checked } 
                })}
              />
              <span>Include Page Numbers</span>
            </label>
          </div>
        </div>
      </div>

      {/* Export Summary */}
      <div className="export-summary">
        <h3>Export Summary</h3>
        <div className="summary-details">
          <div className="detail-row">
            <span>Format:</span>
            <span>{state.exportOptions.format.toUpperCase()}</span>
          </div>
          <div className="detail-row">
            <span>Template:</span>
            <span>{state.template?.name || 'None selected'}</span>
          </div>
          <div className="detail-row">
            <span>Selected Items:</span>
            <span>{state.selections.length}</span>
          </div>
          <div className="detail-row">
            <span>Estimated Pages:</span>
            <span>
              {1 + // Cover page
               (state.exportOptions.customization.includeExecutiveSummary ? 1 : 0) +
               state.selections.length +
               (state.exportOptions.customization.includeAppendix ? 1 : 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Export Status */}
      {exportStatus !== 'idle' && (
        <div className={`export-status status-${exportStatus}`}>
          {exportStatus === 'generating' && (
            <div className="status-generating">
              <div className="loading-spinner" />
              <span>Generating presentation...</span>
            </div>
          )}
          
          {exportStatus === 'success' && (
            <div className="status-success">
              <span className="success-icon">✅</span>
              <span>Presentation generated successfully!</span>
              {downloadUrl && (
                <a 
                  href={downloadUrl} 
                  download={`noetic-2.0-thesis.${state.exportOptions.format}`}
                  className="download-link"
                >
                  Download Again
                </a>
              )}
            </div>
          )}
          
          {exportStatus === 'error' && (
            <div className="status-error">
              <span className="error-icon">❌</span>
              <span>Export failed. Please try again.</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="export-actions">
        <button onClick={onBack} className="button secondary">
          Back: Preview
        </button>
        
        <button
          onClick={handleExport}
          disabled={isExporting || !state.template || state.selections.length === 0}
          className="button primary export-button"
        >
          {isExporting ? (
            <>
              <div className="button-spinner" />
              Generating {state.exportOptions.format.toUpperCase()}...
            </>
          ) : (
            <>
              Export as {state.exportOptions.format.toUpperCase()}
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="export-tips">
        <h4>💡 Tips</h4>
        <ul>
          <li>PDF format is best for sharing via email or printing</li>
          <li>PowerPoint format allows further editing and customization</li>
          <li>High-resolution charts will automatically be included</li>
          <li>The download will start automatically when generation is complete</li>
        </ul>
      </div>
    </div>
  )
}