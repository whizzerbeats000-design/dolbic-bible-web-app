'use client';

import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  color?: 'accent' | 'deep' | 'gold';
}

const COLORS: Record<string, string> = {
  accent: 'bg-[var(--color-flame)]',
  deep: 'bg-[var(--color-deep)]',
  gold: 'bg-[var(--color-gold)]',
};

export function Progress({ value, max = 100, label, className = '', color = 'accent' }: ProgressProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label ?? `Progress ${pct}%`}>
      <div className="flex items-center justify-between mb-1.5">
        {label && <span className="font-sans text-[13px] font-medium text-[var(--text-main)]">{label}</span>}
        <span className="font-sans text-[12px] tabular-nums text-[var(--text-muted)]">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-cream)] dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${COLORS[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface InlineProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'accent' | 'deep' | 'gold';
}

export function InlineProgress({ value, max = 100, className = '', color = 'accent' }: InlineProgressProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`h-1 w-full rounded-full bg-[var(--color-cream)] dark:bg-white/10 overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className={`h-full rounded-full ${COLORS[color]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}