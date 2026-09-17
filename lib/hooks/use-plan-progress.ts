'use client';

import { useEffect, useState } from 'react';
import { savedRepository } from '@/lib/data/saved-repository';
import type { PlanProgress } from '@/lib/data/types';

export function usePlanProgress(planId: string | undefined): PlanProgress | undefined | null {
  const [progress, setProgress] = useState<PlanProgress | undefined | null>(undefined);

  useEffect(() => {
    if (!planId) {
      setProgress(undefined);
      return;
    }
    let cancelled = false;
    setProgress(undefined);
    savedRepository.getPlanProgress(planId).then((p) => {
      if (!cancelled) setProgress(p);
    });
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith('dolbic.') && !cancelled) {
        savedRepository.getPlanProgress(planId).then(setProgress);
      }
    };
    const onFocus = () => {
      if (!cancelled) {
        savedRepository.getPlanProgress(planId).then(setProgress);
      }
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, [planId]);

  return progress;
}