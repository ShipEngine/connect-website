import { ReactNode } from 'react'

interface SectionProps {
  children?: ReactNode
}

export function Section({ children }: SectionProps) {
  return <div className="section">{children}</div>
}

export function Left({ children }: SectionProps) {
  return <div className="section-group left-group">{children}</div>
}

export function Right({ children }: SectionProps) {
  return <div className="section-group right-group">{children}</div>
}
