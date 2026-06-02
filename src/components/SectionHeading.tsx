import type { ReactNode } from "react";

export default function SectionHeading({
  number,
  title,
  action,
  className = "mb-8",
}: {
  number: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <div className="flex items-baseline gap-3.5">
        <span className="font-mono text-[13px] text-ink-faint">{number}</span>
        <h2 className="font-display text-[27px] font-medium tracking-tight text-ink">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
