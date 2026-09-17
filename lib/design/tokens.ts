/**
 * DOLBIC Design Tokens — Translation-agnostic; theme-ready
 * Source: docs/bible-app-frontend-design.md
 */

export const COLORS = {
  deep: '#0A2740',
  medium: '#163A5F',
  light: '#2A5278',
  ivory: '#FAF9F6',
  cream: '#F5F0EB',
  gold: '#CFAE5D',
  flame: '#D93025',
  text: '#1A1A2E',
  muted: '#4A5568',
  'warm-gray': '#718096',
  charcoal: '#121212',
  surface: '#1E232A',
  white: '#FFFFFF',
};

export const FONTS = {
  serif: 'var(--font-display), Merriweather, Georgia, serif',
  sans: 'var(--font-sans), Inter, system-ui, sans-serif',
};

export const SPACING = {
  xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px',
};

export const RADIUS = {
  sm: '8px', md: '12px', lg: '16px', full: '9999px',
};

export const SHADOW = {
  card: '0 1px 3px rgba(10, 39, 64, 0.08), 0 4px 12px rgba(10, 39, 64, 0.05)',
  focus: '0 0 0 2px var(--color-gold)',
};

export const BREAKPOINTS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
