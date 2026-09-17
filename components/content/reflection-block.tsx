import React from 'react';

interface ReflectionBlockProps {
  text: string;
  className?: string;
}

export function ReflectionBlock({ text, className = '' }: ReflectionBlockProps) {
  return (
    <div className={`rounded-[8px] bg-[var(--color-text)] text-white px-6 py-6 shadow-card ${className}`}>
      <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-primary)] mb-3">Reflection</p>
      <p className="font-sans text-[16px] leading-[1.6] text-white">{text}</p>
    </div>
  );
}