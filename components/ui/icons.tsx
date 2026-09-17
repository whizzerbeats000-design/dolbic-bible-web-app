import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
}

function base(size: number, className?: string, strokeWidth = 2) {
  return {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    className,
    'aria-hidden': true,
  };
}

export const BookOpenIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
    <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const HomeIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const FlameIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M12 22c4.2 0 7-3 7-7 0-3.5-2-5.7-4-8.2C13 4.4 12 2 12 2 9 6 5 8.5 5 15c0 4 2.8 7 7 7z" />
    <circle cx="12" cy="15" r="2.5" />
  </svg>
);

export const PrayerHandsIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M12 20c-1-3-3-4.5-6-4.5V12c0-2 1.5-3.5 3.5-3.5S13 10 13 12" />
    <path d="M12 20c1-3 3-4.5 6-4.5V12c0-2-1.5-3.5-3.5-3.5S11 10 11 12" />
    <path d="M6 8V5a3 3 0 0 1 6 0v1" />
    <path d="M18 8V5a3 3 0 0 0-6 0v1" />
  </svg>
);

export const BookmarkIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
  </svg>
);

export const BookmarkFilledIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
  </svg>
);

export const SearchIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const SettingsIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const CheckIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const XIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const TrashIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const SunIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
  </svg>
);

export const HeartIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.5 12c-2.5 4.5-9.5 9-9.5 9z" />
  </svg>
);

export const CalendarIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 9h18" />
  </svg>
);

export const ClockIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export const BellIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export const UserIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowRightIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ShareIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

export const CopyIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const PlusIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const LibraryIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M3 5a2 2 0 0 1 2-2h4v18H5a2 2 0 0 1-2-2z" />
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4z" />
    <path d="M11 3h2v18h-2z" />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 5-6" />
  </svg>
);

export const FilterIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const SpringIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const RefreshIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
  </svg>
);

export const PenIcon = ({ size = 20, className, strokeWidth }: IconProps) => (
  <svg {...base(size, className, strokeWidth)}>
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  </svg>
);

export { base as svgBaseProps };