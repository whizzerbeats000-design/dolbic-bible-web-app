// Data access — binds repositories to the app.
// Swap a repository's implementation here when Supabase lands;
// components only ever import from this module.

export { bibleRepository } from '@/lib/data/bible-repository';
export { dailyRepository } from '@/lib/data/daily-repository';
export { plansRepository, bookTitleFor } from '@/lib/data/plans-repository';
export { savedRepository } from '@/lib/data/saved-repository';
export type * from '@/lib/data/types';