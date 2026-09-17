/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B2E68', light: '#123A7A', hover: '#0A2655' },
        dolbic: { deep: '#0B2E68', medium: '#123A7A', gold: '#C9A86A', flame: '#0B2E68' },
        surface: { DEFAULT: '#FFFFFF', warm: '#F8FAFC', subtle: '#F1F5F9' },
        ink: { DEFAULT: '#0F172A', body: '#475569', muted: '#94A3B8' },
        line: { DEFAULT: '#E2E8F0', strong: '#CBD5E1' },
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Merriweather"', 'Georgia', 'serif'],
        mono: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: { scripture: ['1.0625rem', { lineHeight: '1.75' }], body: ['1rem', { lineHeight: '1.6' }], label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }] },
      borderRadius: { 'dolbic-sm': '8px', 'dolbic-md': '12px', 'dolbic-lg': '16px', 'dolbic-full': '9999px' },
      boxShadow: { card: '0px 4px 12px rgba(0,0,0,0.05)', soft: '0 1px 3px rgba(0,0,0,0.06)', raise: '0 8px 24px rgba(11,46,104,0.12)' },
      maxWidth: { page: '720px', reader: '680px', wide: '1120px' },
      height: { nav: '64px' },
    },
  },
  plugins: [],
};
