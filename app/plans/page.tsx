'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { plansRepository, bookTitleFor } from '@/lib/data/plans-repository';
import { usePlanProgress } from '@/lib/hooks/use-plan-progress';
import { useSaved } from '@/lib/hooks/use-saved';
import type { ReadingPlan } from '@/lib/data/types';
import { CheckIcon, ChevronRightIcon, BookOpenIcon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';

export default function PlansPage() {
  const [plans, setPlans] = useState<ReadingPlan[]>([]);
  const [tab, setTab] = useState<'current'|'all'>('current');
  useEffect(() => { void plansRepository.list().then(setPlans); }, []);
  const plan = plans[0];
  const progress = usePlanProgress(plan?.id ?? '');
  const saved = useSaved();
  const { toast } = useToast();
  const completed = progress?.completedDays.length ?? 0;
  const currentDay = progress?.currentDay ?? 1;

  if (!plan) return <div className="min-h-screen bg-[#F8FAFC] p-6"><div className="mx-auto max-w-[720px] space-y-3"><div className="h-32 rounded-[16px] bg-white border border-[#E2E8F0] skeleton" /></div></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[720px] mx-auto px-4 pt-4 pb-3">
          <h1 className="font-sans text-[22px] font-bold text-[#0F172A]">Reading Plans</h1>
          <div className="mt-3 inline-flex rounded-full bg-[#F1F5F9] p-1 gap-1">
            <button onClick={() => setTab('current')} className={`h-8 rounded-full px-5 font-sans text-[13px] font-semibold transition-colors ${tab==='current' ? 'bg-[#0B2E68] text-white shadow' : 'text-[#475569] hover:text-[#0F172A]'}`}>Current</button>
            <button onClick={() => setTab('all')} className={`h-8 rounded-full px-5 font-sans text-[13px] font-semibold transition-colors ${tab==='all' ? 'bg-[#0B2E68] text-white shadow' : 'text-[#475569] hover:text-[#0F172A]'}`}>All Plans</button>
          </div>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 py-4 space-y-4">
        {tab === 'current' ? (
          <>
            {/* Progress banner card */}
            <div className="rounded-[16px] bg-[#0B2E68] p-5 text-white shadow-[0px_4px_12px_rgba(0,0,0,0.12)]">
              <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-white/70">Featured</p>
              <h2 className="mt-1 font-sans text-[18px] font-bold leading-tight text-white">One Year Bible Plan</h2>
              <p className="mt-1 font-sans text-[13px] text-white/70">{plan.description}</p>
              <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: `${Math.round((completed/plan.durationDays)*100)}%` }} /></div>
              <p className="mt-2 font-sans text-[12px] font-medium text-white/80">{completed} of {plan.durationDays} days • Day {currentDay}</p>
            </div>

            {/* Daily assignment checklist */}
            <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="font-sans text-[14px] font-bold text-[#0F172A]">Daily Assignments</h3>
                <span className="font-sans text-[12px] text-[#64748B]">{completed}/{plan.durationDays}</span>
              </div>
              <ul className="divide-y divide-[#E2E8F0] max-h-[380px] overflow-auto">
                {plan.days.slice(0, 14).map((d) => {
                  const done = progress?.completedDays.includes(d.day) ?? false;
                  return (
                    <li key={d.day} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC]">
                      <button onClick={async () => { await saved.completeDay(plan.id, d.day, plan.durationDays); toast({ message: done ? 'Marked incomplete' : `Day ${d.day} marked read` }); }} aria-pressed={done} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${done ? 'bg-[#0B2E68] border-[#0B2E68] text-white' : 'border-[#CBD5E1] bg-white text-transparent hover:border-[#0B2E68]'}`}><CheckIcon size={12} strokeWidth={2.5} /></button>
                      <Link href={`/bible/${d.bookId}/${d.chapter}`} className="flex-1 min-w-0">
                        <span className={`block font-sans text-[14px] ${done ? 'font-medium text-[#94A3B8] line-through' : 'font-semibold text-[#0F172A]'}`}>{bookTitleFor(d.bookId)} {d.chapter}</span>
                        {d.note && <span className="block font-sans text-[12px] text-[#64748B] truncate">{d.note}</span>}
                      </Link>
                      <ChevronRightIcon size={16} className="text-[#CBD5E1]" />
                    </li>
                  );
                })}
              </ul>
              <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <button onClick={async () => { if (plan.days[currentDay-1]) { await saved.completeDay(plan.id, currentDay, plan.durationDays); toast({ message: `Day ${currentDay} marked read` }); } }} className="w-full h-11 rounded-full bg-[#0B2E68] text-white font-sans text-[14px] font-semibold hover:bg-[#0A2655]">Mark as Read — Day {currentDay}</button>
              </div>
            </div>
          </>
        ) : (
          <div className="grid gap-3">
            {plans.map((p) => (
              <Link key={p.id} href={`/plans/${p.id}`} className="rounded-[16px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:border-[#CBD5E1] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><BookOpenIcon size={16} /></span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">{p.durationDays} days • {p.translation.toUpperCase()}</span>
                </div>
                <h3 className="mt-2 font-sans text-[16px] font-bold text-[#0F172A]">{p.title}</h3>
                <p className="mt-1 font-sans text-[13px] leading-[1.5] text-[#475569] line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
