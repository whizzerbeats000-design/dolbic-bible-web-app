import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { BottomNav } from './navigation/BottomNav';
import { Header } from './navigation/Header';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dolbic-bible.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DOLBIC Bible: KJV, Daily Devotionals & Prayers',
    template: '%s | DOLBIC Bible',
  },
  description: 'Read, reflect, pray, and grow with DOLBIC Bible. Access the King James Version (KJV), daily devotionals, guided prayers, and reading plans offline.',
  applicationName: 'DOLBIC Bible',
  manifest: '/manifest.webmanifest',
  keywords: ['DOLBIC Bible', 'KJV', 'Daily Devotional', 'Prayer', 'Reading Plans', 'Dominion Life Bible Church'],
  authors: [{ name: 'Dominion Life Bible Church, Abuja' }],
  creator: 'DOLBIC Bible',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteUrl,
    title: 'DOLBIC Bible: KJV, Daily Devotionals & Prayers',
    description: 'Read, reflect, pray, and grow with DOLBIC Bible. Access the King James Version (KJV), daily devotionals, guided prayers, and reading plans offline.',
    siteName: 'DOLBIC Bible',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'DOLBIC Bible' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOLBIC Bible: KJV, Daily Devotionals & Prayers',
    description: 'Read, reflect, pray, and grow with DOLBIC Bible. Access the King James Version (KJV), daily devotionals, guided prayers, and reading plans offline.',
    images: ['/icons/icon-512.png'],
  },
  icons: {
    icon: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192' }],
  },
};

export const viewport: Viewport = { themeColor: '#0B2E68', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@600;700&display=swap';
const themeScript = `(function(){try{document.documentElement.dataset.theme='light';}catch(e){}})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DOLBIC Bible',
  applicationCategory: 'Religion',
  applicationSubCategory: 'MobileApplication',
  operatingSystem: 'iOS, Android, Web',
  description: 'Read, reflect, pray, and grow with DOLBIC Bible. Access the King James Version (KJV), daily devotionals, guided prayers, and reading plans offline.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
  publisher: { '@type': 'Organization', name: 'Dominion Life Bible Church, Abuja' },
  url: siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontLink} rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#FFFFFF] text-[#0F172A] antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <div id="main" className="pb-[calc(64px+env(safe-area-inset-bottom)+16px)] md:pb-8">
          <ToastProvider>{children}</ToastProvider>
        </div>
        <BottomNav />
        <footer className="hidden md:block border-t border-[#E2E8F0] mt-8 bg-[#F8FAFC]">
          <div className="max-w-[1120px] mx-auto px-8 py-6 flex justify-between gap-4 text-[#94A3B8] font-sans text-[12px]">
            <span>© {new Date().getFullYear()} Dominion Life Bible Church, Abuja</span>
            <span>KJV &amp; WEB — public domain</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
