import { useState, useCallback, useEffect } from 'react'

export interface Phase {
  key: string
  label: string
}

export interface PhaseTabsProps {
  phases: Phase[]
  defaultActive?: string
  onChange?: (key: string) => void
  className?: string
  'aria-label'?: string
}

export default function PhaseTabs({ 
  phases, 
  defaultActive, 
  onChange, 
  className = '', 
  'aria-label': ariaLabel = 'Phase navigation'
}: PhaseTabsProps) {
  const [active, setActive] = useState(() => {
    if (defaultActive && phases.some(p => p.key === defaultActive)) {
      return defaultActive
    }
    return phases[0]?.key || ''
  })

  const handlePhaseChange = useCallback((key: string) => {
    setActive(key)
    onChange?.(key)
  }, [onChange])

  useEffect(() => {
    if (defaultActive && phases.some(p => p.key === defaultActive)) {
      setActive(defaultActive)
    }
  }, [defaultActive, phases])

  if (!phases || phases.length === 0) {
    return null
  }

  return (
    <nav className={`phase-tabs ${className}`} aria-label={ariaLabel}>
      {phases.map(p => (
        <button
          key={p.key}
          className={`phase-tab ${active === p.key ? 'active' : ''}`}
          onClick={() => handlePhaseChange(p.key)}
          aria-pressed={active === p.key}
          type="button"
        >
          {p.label}
        </button>
      ))}
    </nav>
  )
}