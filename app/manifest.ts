import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DOLBIC Bible',
    short_name: 'DOLBIC Bible',
    description: 'Read, reflect, pray, and grow with DOLBIC Bible. KJV, devotionals, prayers, and reading plans offline.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0B2E68',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    categories: ['religion', 'lifestyle', 'books'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', formFactor: 'wide' },
    ],
  };
}
