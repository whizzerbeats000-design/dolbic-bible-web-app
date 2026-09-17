'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { DOLBICScriptureSurface } from '@/components/bible/Surface';
import { ArrowLeftIcon } from '@/components/ui/icons';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setSent(true);
    toast({ message: `Reset link sent to ${email}` });
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
              <p className="eyebrow mb-1 text-[var(--color-flame)]">Account recovery</p>
              <h1 className="font-sans text-[26px] font-semibold text-[var(--color-deep)] dark:text-white tracking-[-0.02em]">Reset password</h1>
              <p className="mt-1 font-sans text-[14px] text-[var(--text-muted)] leading-relaxed">
                Enter the email on your account and we'll send a reset link.
              </p>

              {sent ? (
                <div className="mt-6 rounded-[8px] bg-[var(--color-cream)] px-4 py-4">
                  <p className="font-sans text-[14px] text-[var(--text-main)]">
                    Check <span className="font-semibold">{email}</span> for the reset link.
                  </p>
                  <p className="mt-1 font-sans text-[12px] text-[var(--text-muted)]">
                    Delivery is handled by Supabase Auth.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <Field
                    label="Email address"
                    id="reset-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <p role="alert" className="font-sans text-[13px] text-[var(--color-flame)]">{error}</p>}
                  <Button type="submit" fullWidth disabled={submitting} className="min-h-[48px]">
                    {submitting ? 'Sending…' : 'Send reset link'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </main>
      </DOLBICScriptureSurface>
    </div>
  );
}