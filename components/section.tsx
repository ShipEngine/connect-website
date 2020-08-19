import { ReactNode } from "react";

interface SectionProps {
  children?: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <div className="section">{ children }</div>;
}

export function Left({ children }: SectionProps) {
  return <div className="section-group left-group">{ children }</div>;
}

export function Right({ children }: SectionProps) {
  return <div className="section-group right-group">{ children }</div>;
}

// Also export as a named export
export { Section };
