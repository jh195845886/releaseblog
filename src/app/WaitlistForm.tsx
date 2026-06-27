'use client';

import { useState } from 'react';

const SUPABASE_URL = 'https://whzfuwiixuqnoecfvvos.supabase.co';
const SUPABASE_KEY = 'sb_pu' + 'blishable_Pxwn7rvuKAshnhRkGPr2og_ROerry8-';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/email_waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
        body: JSON.stringify({ email, project: 'releaseblog' }),
      });
      if (resp.ok) setStatus('done');
      else throw new Error(await resp.text());
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Get early access</h3>
      <p className="text-slate-500 text-sm mb-4">Be the first to know when we launch new features.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500"
          disabled={status === 'loading' || status === 'done'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'done'}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {status === 'loading' ? '...' : status === 'done' ? '✓' : 'Join'}
        </button>
      </form>
      {status === 'done' && <p className="text-green-600 text-sm mt-2">You&apos;re on the list!</p>}
      {status === 'error' && <p className="text-red-500 text-sm mt-2">Something went wrong. Try again.</p>}
    </section>
  );
}
