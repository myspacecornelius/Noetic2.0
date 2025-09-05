import { PropsWithChildren } from 'react'

export default function DashboardCard({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}