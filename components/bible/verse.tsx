'use client';

import React from 'react';
import { BookmarkFilledIcon } from '@/components/ui/icons';
import type { HighlightColor } from '@/lib/data/types';

interface VerseProps {
  num: number;
  text: string;
  showVerseNumber?: boolean;
  isSelected?: boolean;
  isBookmarked?: boolean;
  highlight?: HighlightColor;
  onSelect?: () => void;
}

const HIGHLIGHT_CLASSES: Record<HighlightColor, string> = {
  gold: 'bg-[#FFF7ED]',
  flame: 'bg-[#FEF2F2]',
  blue: 'bg-[#EFF6FF]',
};

export function Verse({ num, text, showVerseNumber = true, isSelected = false, isBookmarked = false, highlight, onSelect }: VerseProps) {
  const Tag = onSelect ? 'button' : 'p';
  return (
    <div className={`group relative ${isSelected ? 'bg-[#F1F5F9] mx-[-0.5rem] px-2 rounded-[8px]' : ''}`}>
      {isBookmarked && (
        <span className="absolute -left-[1.15rem] top-[0.55rem] w-3 h-3 rounded-full bg-[#0B2E68]" aria-hidden="true" />
      )}
      <Tag
        type={onSelect ? 'button' : undefined}
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`Verse ${num}${isSelected ? ', selected' : ''}`}
        className={[
          'text-left w-full font-serif leading-[1.85] transition-colors duration-150 text-[16px] text-[#0F172A]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]/20 rounded-[4px]',
          highlight ? HIGHLIGHT_CLASSES[highlight] + ' rounded-[4px] px-1' : '',
        ].join(' ')}
      >
        {showVerseNumber && (
          <sup className="mr-1.5 font-serif text-[11px] font-bold text-[#0B2E68] select-none">
            {num}
          </sup>
        )}
        {text}
      </Tag>
    </div>
  );
}