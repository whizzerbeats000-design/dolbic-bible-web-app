'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  side?: 'bottom' | 'top';
}

function focusTrap(containerRef: React.RefObject<HTMLDivElement | null>, isOpen: boolean) {
  if (!isOpen || !containerRef.current) return;
  const focusable = containerRef.current.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  first.focus();
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') {
      // handled by caller
      (e.currentTarget as HTMLElement).closest('[data-sheet]')?.dispatchEvent(new CustomEvent('sheet-escape'));
    }
  };
  containerRef.current.addEventListener('keydown', onKeyDown);
  return () => containerRef.current?.removeEventListener('keydown', onKeyDown);
}

export function Sheet({ open, onOpenChange, title, description, children, side = 'bottom' }: SheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => focusTrap(ref, open), [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onOpenChange]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-end justify-center ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
      data-sheet
    >
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
        className={`absolute inset-0 bg-black transition-opacity duration-250 ${open ? 'opacity-40' : 'opacity-0'}`}
      />
      {/* Panel */}
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-describedby={description ? `${title.replace(/\s+/g, '-').toLowerCase()}-desc` : undefined}
        className={[
          'relative w-full max-w-2xl mx-auto max-h-[85vh] overflow-y-auto rounded-t-dolbic-lg bg-[var(--bg-surface)] shadow-[0_-4px_24px_rgba(10,39,64,0.15)] flex flex-col',
          'transition-transform duration-[250ms] ease-out motion-reduce:transition-none',
          open ? 'animate-sheet-up' : 'translate-y-full',
        ].join(' ')}
      >
        <div className="sticky top-0 z-10 bg-[var(--bg-surface)] bg-gradient-to-b from-[var(--bg-surface)] to-transparent">
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-[var(--color-cream)] dark:bg-white/15" aria-hidden="true" />
          <div className="flex items-start justify-between px-5 pt-3 pb-2">
            <div>
              <h2 id="sheet-title" className="font-serif text-xl font-semibold text-[var(--text-main)]">{title}</h2>
              {description && (
                <p id={`${title.replace(/\s+/g, '-').toLowerCase()}-desc`} className="font-sans text-[13px] text-[var(--text-muted)] mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="shrink-0 ml-3 mt-1 flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--color-cream)] dark:hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-5 pb-8 flex-1">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export function Modal({ open, onOpenChange, title, description, children }: Omit<SheetProps, 'side'>) {
  return <Sheet open={open} onOpenChange={onOpenChange} title={title} description={description} side="top">{children}</Sheet>;
}