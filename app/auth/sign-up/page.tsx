'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { DOLBICScriptureSurface } from '@/components/bible/Surface';
import { ArrowLeftIcon } from '@/components/ui/icons';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    toast({ message: 'Account creation lands in Phase 3 with Supabase Auth' });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
      <DOLBICScriptureSurface>
        <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12">
          <div className="w-full max-w-sm">
            <Link href="/auth/sign-in" className="mb-3 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--color-flame)] underline-offset-2 hover:underline min-h-[44px]">
              <ArrowLeftIcon size={14} aria-hidden="true" /> Back to sign in
            </Link>
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-7 shadow-card">
              <p className="eyebrow mb-1 text-[var(--color-flame)]">Join DOLBIC Bible</p>
              <h1 className="font-sans text-[26px] font-semibold text-[var(--color-deep)] dark:text-white tracking-[-0.02em]">Create account</h1>
              <p className="mt-1 font-sans text-[14px] text-[var(--text-muted)] leading-relaxed">
                Back up your bookmarks, highlights and prayers across devices.
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                <Field
                  label="Display name"
                  id="signup-name"
                  autoComplete="name"
                  placeholder="Ada Okoro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Field
                  label="Email address"
                  id="signup-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                  label="Password"
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p role="alert" className="font-sans text-[13px] text-[var(--color-flame)]">{error}</p>}
                <Button type="submit" fullWidth disabled={submitting} className="min-h-[48px]">
                  {submitting ? 'Creating…' : 'Create account'}
                </Button>
              </form>
            </div>
          </div>
        </main>
      </DOLBICScriptureSurface>
    </div>
  );
}