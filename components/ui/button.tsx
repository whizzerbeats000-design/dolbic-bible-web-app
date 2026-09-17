'use client';
import React from 'react';
import Link from 'next/link';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'icon'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; href?: string; }
const VARIANTS: Record<string, string> = {
  primary: 'bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] active:brightness-[0.98] font-semibold',
  secondary: 'border border-[var(--border-strong)] text-[var(--color-text)] bg-transparent hover:bg-[var(--bg-subtle)] active:bg-[var(--border)]',
  accent: 'bg-[var(--color-secondary)] text-white hover:brightness-[0.98] active:brightness-[0.95]',
  ghost: 'bg-transparent text-[var(--text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--bg-subtle)]',
  icon: 'rounded-full bg-[var(--bg-cream)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-white w-10 h-10',
};
const SIZES: Record<string, string> = {
  sm: 'h-9 px-3 text-[14px] rounded-[4px] gap-1.5',
  md: 'h-11 px-5 text-[14px] rounded-[8px] gap-2',
  lg: 'h-11 px-8 text-[16px] rounded-[8px] gap-2.5',
  icon: 'w-10 h-10 rounded-full',
};
export function Button({ variant = 'primary', size = 'md', fullWidth = false, href, className = '', disabled, ...rest }: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-[150ms] ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
    'disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none',
    'min-h-[44px]',
    VARIANTS[variant] ?? VARIANTS.primary,
    variant === 'icon' ? SIZES.icon : SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');
  if (href) return <Link href={href} className={classes} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : 0}>{rest.children}</Link>;
  return <button className={classes} disabled={disabled} {...rest} />;
}
