'use client';

import React from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  type?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export function Field({ label, id, hint, error, type = 'text', as = 'input', rows, className = '', ...rest }: FieldProps) {
  const describedBy = [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ');
  const baseClasses = [
    'w-full h-12 rounded-dolbic-sm border bg-[var(--bg-surface)] px-3.5 font-sans text-[15px] text-[var(--text-main)]',
    'transition-colors duration-[150ms] outline-none',
    'focus:ring-2 focus:ring-[var(--color-gold)]/60 focus:border-[var(--color-gold)]',
    'placeholder:text-[var(--text-muted)]/70',
    error ? 'border-[var(--color-flame)]' : 'border-[var(--border)] focus:border-[var(--color-medium)]',
  ];
  if (as === 'textarea') {
    baseClasses.push('py-3 h-auto min-h-24 leading-relaxed resize-none');
  }
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-sans text-[13px] font-medium text-[var(--text-main)]">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={baseClasses.join(' ')}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={baseClasses.join(' ')}
          {...rest}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 font-sans text-[13px] text-[var(--color-flame)]">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 font-sans text-[13px] text-[var(--text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  children: React.ReactNode;
  hint?: string;
}

export function SelectField({ label, id, children, hint, className = '', ...rest }: SelectFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-sans text-[13px] font-medium text-[var(--text-main)]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={[
            'w-full h-12 appearance-none rounded-dolbic-sm border border-[var(--border)] bg-[var(--bg-surface)] px-3.5 pr-10 font-sans text-[15px] text-[var(--text-main)]',
            'transition-colors duration-[150ms] outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 focus:border-[var(--color-gold)]',
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'%230A2740\' d=\'M6 0l6 8H0z\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center]',
          ].join(' ')}
          {...rest}
        >
          {children}
        </select>
      </div>
      {hint && <p className="mt-1.5 font-sans text-[13px] text-[var(--text-muted)]">{hint}</p>}
    </div>
  );
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
  fullWidth?: boolean;
}

export function SegmentedControl<T extends string>({ options, value, onChange, label, className = '', fullWidth = false }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={`${fullWidth ? 'flex' : 'inline-flex'} rounded-dolbic-md bg-[var(--color-cream)] dark:bg-white/10 p-1 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            'min-h-[38px] rounded-dolbic-sm px-4 font-sans text-[13px] font-medium transition-colors duration-[150ms]',
            fullWidth ? 'flex-1' : '',
            value === opt.value
              ? 'bg-[var(--bg-surface)] text-[var(--color-deep)] shadow-sm dark:bg-white/15'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]',
          ].join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}