import React from 'react';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, eyebrow, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <p className="eyebrow mb-1.5 text-[var(--color-flame)]">{eyebrow}</p>
        )}
        <h2 className="font-sans text-[20px] md:text-[22px] leading-tight font-semibold text-[var(--text-main)] tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}