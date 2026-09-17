import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
  'data-testid'?: string;
}

export function Skeleton({ className = '', lines = 1, ...rest }: SkeletonProps) {
  return (
    <div role="status" aria-live="polite" data-testid={rest['data-testid']}>
      <span className="sr-only">Loading</span>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton mb-2 ${i === lines - 1 ? 'mb-0' : ''} ${className}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function VerseSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading Scripture">
      <Skeleton className="h-[24px] w-2/3" />
      <Skeleton className="h-[24px] w-full" />
      <Skeleton className="h-[24px] w-5/6" />
      <Skeleton className="h-[24px] w-4/5" />
      <Skeleton className="h-[24px] w-full" />
      <Skeleton className="h-[24px] w-3/5" />
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading list">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="mb-3 rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3 mt-2" />
        </div>
      ))}
    </div>
  );
}