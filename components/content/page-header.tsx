import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, children, className = '' }: PageHeaderProps) {
  return (
    <header className={`border-b border-[var(--border)] bg-[var(--bg-surface)] ${className}`}>
      <div className="max-w-page mx-auto px-5 md:px-8 pt-5 pb-6 md:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-primary)] mb-1.5">{eyebrow}</p>
            )}
            <h1 className="font-sans text-[28px] md:text-[32px] font-bold leading-[0.95] tracking-[-0.02em] text-[var(--color-text)]">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-xl leading-relaxed font-sans text-[16px] text-[var(--text-muted)]">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}