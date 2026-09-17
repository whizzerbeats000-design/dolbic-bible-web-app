import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  body?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, body, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-12 rounded-dolbic-lg border border-dashed border-[var(--border-strong)] bg-[var(--bg-cream)]/60 ${className}`}
      role="status"
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-deep)] dark:text-[var(--text-on-brand)]" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-lg font-medium text-[var(--text-main)]">{title}</h3>
      {body && <p className="mt-1.5 max-w-xs font-sans text-sm text-[var(--text-muted)] leading-relaxed">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}