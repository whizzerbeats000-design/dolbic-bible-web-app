import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'pending' | 'warning' | 'flame' | 'muted';
  className?: string;
  dot?: boolean;
}

const VARIANTS: Record<string, string> = {
  default: 'bg-[var(--color-deep)] text-white',
  success: 'bg-emerald-600 text-white',
  pending: 'bg-[var(--color-gold)] text-[var(--color-deep)]',
  warning: 'bg-[var(--color-flame)]/10 text-[var(--color-flame)]',
  flame: 'bg-[var(--color-flame)] text-white',
  muted: 'bg-[var(--color-cream)] text-[var(--color-muted)]',
};

export function Badge({ children, variant = 'default', className = '', dot = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-sans font-medium text-[0.6875rem] uppercase tracking-[0.12em] px-2.5 py-[3px] rounded-full leading-none ${VARIANTS[variant] ?? VARIANTS.default} ${className}`}
      role="status"
    >
      {dot && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived';
  className?: string;
}

const STATUS_VARIANTS: Record<string, { variant: BadgeProps['variant']; label: string }> = {
  draft: { variant: 'muted', label: 'Draft' },
  review: { variant: 'warning', label: 'In Review' },
  approved: { variant: 'default', label: 'Approved' },
  scheduled: { variant: 'pending', label: 'Scheduled' },
  published: { variant: 'success', label: 'Published' },
  archived: { variant: 'muted', label: 'Archived' },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { variant, label } = STATUS_VARIANTS[status] ?? STATUS_VARIANTS.draft;
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}