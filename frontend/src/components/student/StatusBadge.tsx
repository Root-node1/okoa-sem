import type { ReactNode } from 'react'

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'blue' | 'red' }) {
  return <span className={`status-badge status-${tone}`}><span className="status-dot" />{children}</span>
}
