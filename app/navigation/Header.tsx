'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Bible', href: '/bible' },
  { label: 'Devotional', href: '/daily' },
  { label: 'Prayers', href: '/prayer' },
  { label: 'More', href: '/profile' },
];
export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header sticky top-0 z-40 bg-[#0B2E68] border-b border-[#0B2E68]">
      <div className="max-w-[720px] mx-auto px-4 h-[56px] md:h-[64px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E68] rounded-[8px]" aria-label="DOLBIC Bible home">
          <span className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center overflow-hidden bg-transparent">
            <Image src="/logos/dolbic-mark.png" alt="DOLBIC logo" width={44} height={44} className="h-full w-full object-contain" priority />
          </span>
          <span className="leading-tight">
            <span className="block font-sans text-[16px] md:text-[18px] font-extrabold tracking-[-0.02em] text-white">DOLBIC BIBLE</span>
            <span className="hidden sm:block font-sans text-[11px] font-medium tracking-[0.08em] uppercase text-white/70">Read • Reflect • Pray • Grow</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/');
            return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center px-3 rounded-full font-sans text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${active ? 'bg-white text-[#0B2E68]' : 'text-white/75 hover:text-white hover:bg-white/10'}`}>{item.label}</Link>;
          })}
        </nav>
        <Link href="/profile" className="hidden md:inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#0B2E68] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" /></svg>
        </Link>
      </div>
    </header>
  );
}
