import React from 'react';

interface QuoteBlockProps {
  text: string;
  source?: string;
  className?: string;
  tone?: 'deep' | 'gold' | 'flame';
}

const TONES: Record<string, string> = {
  deep: 'border-l-[var(--color-text)] text-[var(--color-text)]',
  gold: 'border-l-[var(--color-primary)] text-[var(--color-text)]',
  flame: 'border-l-[var(--color-secondary)] text-[var(--color-text)]',
};

export function QuoteBlock({ text, source, className = '', tone = 'gold' }: QuoteBlockProps) {
  return (
    <figure className={`border-l-[3px] pl-5 ${TONES[tone]} ${className}`}>
      <blockquote className="font-sans text-[16px] md:text-[20px] leading-relaxed font-medium tracking-[-0.01em]">
        “{text}”
      </blockquote>
      {source && (
        <figcaption className="mt-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted)]">
          {source}
        </figcaption>
      )}
    </figure>
  );
}