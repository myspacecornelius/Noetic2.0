import { useRef, useEffect, useState, useCallback } from 'react'
import html2canvas from 'html2canvas'
import Image from 'next/image'
import { ErrorBoundary } from '../ErrorBoundary'

interface ChartCaptureProps {
  readonly chartId: string
  readonly component: React.ComponentType
  readonly height?: number
  readonly onCapture?: (dataUrl: string) => void
}

export default function ChartCapture({ 
  chartId, 
  component: ChartComponent, 
  height = 200,
  onCapture 
}: ChartCaptureProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const captureChart = useCallback(async () => {
    if (!chartRef.current || isCapturing) return

    setIsCapturing(true)
    
    try {
      // Wait for chart to fully render
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const canvas = await html2canvas(chartRef.current, {
        // Use dark background to match app theme
        backgroundColor: '#0E0F12',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        height: height,
        width: chartRef.current.offsetWidth
      })

      const dataUrl = canvas.toDataURL('image/png')
      setCapturedImage(dataUrl)
      
      if (onCapture) {
        onCapture(dataUrl)
      }
    } catch (error) {
      console.error('Failed to capture chart:', error)
    } finally {
      setIsCapturing(false)
    }
  }, [chartRef, isCapturing, height, onCapture])

  useEffect(() => {
    // Auto-capture after chart renders
    const timer = setTimeout(() => {
      captureChart()
    }, 1000)

    return () => clearTimeout(timer)
  }, [chartId, captureChart])

  return (
    <div className="chart-capture">
      {/* Hidden chart for rendering */}
      <div 
        ref={chartRef}
        className="chart-render-area"
        style={{ 
          height: `${height}px`,
          width: '100%',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          backgroundColor: '#0E0F12'
        }}
      >
        <ErrorBoundary
          fallback={
            <div className="chart-error">
              <p>Chart failed to render</p>
            </div>
          }
        >
          <ChartComponent />
        </ErrorBoundary>
      </div>

      {/* Display captured image or loading state */}
      <div 
        className="chart-preview-display"
        style={{ height: `${height}px`, width: '100%' }}
      >
        {isCapturing && (
          <div className="capture-loading">
            <div className="loading-spinner" />
            <p>Capturing chart...</p>
          </div>
        )}
        
        {capturedImage && !isCapturing && (
          <Image 
            src={capturedImage} 
            alt={`Chart preview for ${chartId}`}
            className="captured-chart-image"
            fill
            style={{ 
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        )}
        
        {!capturedImage && !isCapturing && (
          <div className="chart-placeholder">
            <div className="placeholder-icon">📊</div>
            <p>Chart preview loading...</p>
            <button 
              onClick={captureChart}
              className="retry-capture-btn"
            >
              Retry Capture
            </button>
          </div>
        )}
      </div>

      {/* Manual capture button for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <button 
          onClick={captureChart}
          disabled={isCapturing}
          className="debug-capture-btn"
          style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            fontSize: '12px',
            padding: '4px 8px'
          }}
        >
          {isCapturing ? 'Capturing...' : 'Capture'}
        </button>
      )}
    </div>
  )
}

// Utility function to capture chart as blob for API uploads
export async function captureChartAsBlob(
  element: HTMLElement, 
  options?: {
    width?: number
    height?: number
    scale?: number
  }
): Promise<Blob | null> {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: options?.scale || 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: options?.width,
      height: options?.height
    })

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png', 1.0)
    })
  } catch (error) {
    console.error('Failed to capture chart as blob:', error)
    return null
  }
}
