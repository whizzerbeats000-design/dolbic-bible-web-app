'use client';

import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  id?: string;
}

export function Switch({ checked, onChange, label, description, id }: SwitchProps) {
  const switchId = id ?? `switch-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="min-w-0">
        <label htmlFor={switchId} className="font-sans text-[15px] font-medium text-[var(--text-main)] cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="font-sans text-[13px] text-[var(--text-muted)] mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-[150ms] ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2',
          checked ? 'bg-[var(--color-deep)]' : 'bg-[var(--color-cream)] border-[var(--border)]',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-[0_1px_2px_rgba(10,39,64,0.25)] transition-transform duration-[150ms] ease-out',
            checked ? 'translate-x-[25px]' : 'translate-x-[2px]',
          ].join(' ')}
        />
      </button>
    </div>
  );
}