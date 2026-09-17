import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { BottomNav } from './navigation/BottomNav';
import { Header } from './navigation/Header';
export const metadata: Metadata = { title: 'DOLBIC Bible — Read • Reflect • Pray • Grow', description: 'DOLBIC Bible by Dominion Life Bible Church, Abuja.', applicationName: 'DOLBIC Bible', manifest: '/manifest.json' };
export const viewport: Viewport = { themeColor: '#0B2E68', width: 'device-width', initialScale: 1, viewportFit: 'cover' };
const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@600;700&display=swap';
const themeScript = `(function(){try{document.documentElement.dataset.theme='light';}catch(e){}})();`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontLink} rel="stylesheet" />
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
