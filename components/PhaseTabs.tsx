import { useState } from 'react'

type Phase = { key: string; label: string }

export default function PhaseTabs({ phases, onChange }: { phases: Phase[]; onChange?: (key: string) => void }) {
  const [active, setActive] = useState(phases[0]?.key)
  return (
    <div className="phase-tabs">
      {phases.map(p => (
        <button
          key={p.key}
          className={`phase-tab ${active === p.key ? 'active' : ''}`}
          onClick={() => { setActive(p.key); onChange?.(p.key) }}
        >{p.label}</button>
      ))}
    </div>
  )
}