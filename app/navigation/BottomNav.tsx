'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BookOpenIcon, BookmarkIcon } from '@/components/ui/icons';

function PrayIcon(props: any) { return <svg width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5l-1.5 3L6 9l3.5 1 1.5 3 1.5-3L16 9l-3.5-1z" /><path d="M12 13a4 4 0 0 0 4 4H8a4 4 0 0 0 4-4z" /><path d="M8 17h8" /></svg>; }
function DevotionalIcon(props: any) { return <svg width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 7a4 4 0 0 0 -4 4v6h8v-6a4 4 0 0 0 -4 -4z" /><path d="M12 7V5" /><path d="M8 21h8" /></svg>; }
function MoreIcon(props: any) { return <svg width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth||1.7} strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>; }

const navItems = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Bible', href: '/bible', icon: BookOpenIcon },
  { label: 'Devotional', href: '/daily', icon: DevotionalIcon },
  { label: 'Prayers', href: '/prayer', icon: PrayIcon },
  { label: 'More', href: '/profile', icon: MoreIcon },
];
function isActive(pathname: string, href: string) { if (href === '/') return pathname === '/'; if (href === '/profile') return pathname === '/profile' || pathname.startsWith('/profile') || pathname.startsWith('/notifications') || pathname.startsWith('/admin') || pathname.startsWith('/saved'); return pathname === href || pathname.startsWith(href + '/'); }
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation" className="bottom-nav fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_12px_rgba(15,23,42,0.06)]">
      <ol className="flex items-stretch justify-around max-w-md mx-auto px-1 py-1">
        {navItems.map((item) => {
          const Icon = item.icon; const active = isActive(pathname, item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link href={item.href} aria-current={active ? 'page' : undefined} className={`flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] rounded-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68] ${active ? 'text-[#0B2E68]' : 'text-[#94A3B8] hover:text-[#475569]'}`}>
                <Icon size={22} strokeWidth={active ? 2 : 1.7} aria-hidden="true" />
                <span className="font-sans text-[10px] font-semibold tracking-[0.04em]">{item.label}</span>
                <span aria-hidden="true" className={`h-1 w-6 rounded-full transition-colors ${active ? 'bg-[#0B2E68]' : 'bg-transparent'}`} />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
