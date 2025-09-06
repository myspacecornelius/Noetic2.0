import dynamic from 'next/dynamic'
import { ErrorBoundary } from '../ErrorBoundary'

// Dynamic import with SSR disabled to prevent hydration issues
const ThesisBuilder = dynamic(() => import('./ThesisBuilder'), {
  ssr: false,
  loading: () => (
    <div className="thesis-builder-loading">
      <div className="loading-container">
        <div className="neural-pulse"></div>
        <p>Loading Investment Thesis Builder...</p>
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
      </div>
    </div>
  )
})

export default function DynamicThesisBuilder() {
  return (
    <ErrorBoundary
      fallback={
        <div className="thesis-builder-error">
          <h3>Unable to load Investment Thesis Builder</h3>
          <p>Please refresh the page to try again. If the problem persists, ensure JavaScript is enabled in your browser.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="button primary"
          >
            Reload Page
          </button>
        </div>
      }
    >
      <ThesisBuilder />
    </ErrorBoundary>
  )
}