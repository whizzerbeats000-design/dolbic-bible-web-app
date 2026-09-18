// @ts-nocheck
'use client';
import { createBrowserClient } from '@supabase/ssr';

// Browser client — anon key only, for auth UI (sign-in, sign-up)
// Never use service_role here. Writes go via Server Actions.

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
