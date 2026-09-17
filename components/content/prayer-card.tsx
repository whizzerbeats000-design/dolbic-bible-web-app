import React from 'react';
import { CheckIcon, TrashIcon } from '../ui/icons';

interface PrayerCardProps {
  id: string;
  title?: string;
  content: string;
  createdAt: string;
  answered?: boolean;
  onToggleAnswered?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

function formatLagos(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' });
  } catch {
    return iso;
  }
}

export function PrayerCard({ id, title, content, createdAt, answered = false, onToggleAnswered, onDelete, className = '' }: PrayerCardProps) {
  return (
    <article
      className={`surface-card rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-card ${className}`}
      aria-label={title ?? 'Prayer entry'}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          {title && <h3 className="font-serif text-lg font-semibold text-[var(--text-main)]">{title}</h3>}
          <p className="font-sans text-[13px] text-[var(--text-muted)] mt-0.5">
            {formatLagos(createdAt)}
            {answered && <span className="ml-2 font-medium text-emerald-700">· Answered</span>}
          </p>
        </div>
        {(onToggleAnswered || onDelete) && (
          <div className="flex shrink-0 gap-1">
            {onToggleAnswered && (
              <button
                onClick={() => onToggleAnswered(id)}
                aria-pressed={answered}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${answered ? 'bg-emerald-100 text-emerald-700' : 'bg-[var(--color-cream)] text-[var(--text-muted)] hover:text-[var(--color-deep)]'}`}
                title={answered ? 'Mark unanswered' : 'Mark answered'}
              >
                <CheckIcon size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                aria-label="Delete prayer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--text-muted)] hover:bg-[var(--color-flame)] hover:text-white transition-colors"
                title="Delete"
              >
                <TrashIcon size={16} />
              </button>
            )}
          </div>
        )}
      </div>
      <p className="font-serif text-[17px] leading-relaxed text-[var(--text-main)] whitespace-pre-wrap">
        {content}
      </p>
    </article>
  );
}