'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ToastOpts {
  message: string;
  duration?: number;
  type?: 'default' | 'success' | 'error';
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOpts {
  id: number;
  exiting: boolean;
}

const ToastContext = createContext<{ toast: (opts: ToastOpts) => void }>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
  }, []);

  const toast = useCallback(
    (opts: ToastOpts) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { ...opts, id, exiting: false }]);
      setTimeout(() => dismiss(id), opts.duration ?? 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (toasts.length === 0) return null;

  return createPortal(
    <div
      ref={ref}
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-20 left-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm mx-auto pointer-events-none"
    >
      {toasts.map((t) => (
        <ToastItemComp key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}

function ToastItemComp({ toast: t, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  const TYPE_STYLES: Record<string, string> = {
    default: 'bg-[var(--color-deep)] text-white',
    success: 'bg-emerald-700 text-white',
    error: 'bg-[var(--color-flame)] text-white',
  };
  return (
    <div
      role="status"
      className={`pointer-events-auto rounded-dolbic-md px-4 py-3 font-sans text-sm leading-snug shadow-[0_4px_12px_rgba(10,39,64,0.18)] animate-in-slide-up ${TYPE_STYLES[t.type ?? 'default']} ${t.exiting ? 'animate-out-slide-down' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span>{t.message}</span>
        {t.action && (
          <button onClick={t.action.onClick} className="shrink-0 underline font-medium hover:opacity-80">
            {t.action.label}
          </button>
        )}
        <button
          onClick={() => onDismiss(t.id)}
          aria-label="Dismiss"
          className="shrink-0 ml-1 opacity-70 hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}