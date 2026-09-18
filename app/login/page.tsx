'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'
  const errorParam = searchParams.get('error')
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(errorParam === 'auth_failed' ? 'Authentication failed. Please try again.' : '')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.replace(next.startsWith('/') ? next : '/dashboard')
    router.refresh()
  }

  async function handleGoogle() {
    setError('')
    setGoogleLoading(true)

    const callbackUrl = new URL('/auth/callback', window.location.origin)
    callbackUrl.searchParams.set('next', next.startsWith('/') ? next : '/dashboard')

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl.toString() },
    })

    if (oauthError) {
      setError(oauthError.message)
      setGoogleLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-5 py-12 text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-20rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-[140px]" />

      <section className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-white/80">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl shadow-lg shadow-violet-500/10">🏔️</span>
            Everest AI
          </Link>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">
          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">Welcome back</p>
            <h1 className="text-3xl font-bold tracking-tight">Sign in to Everest AI</h1>
            <p className="mt-2 text-sm leading-6 text-white/45">One account for the entire Everest AI ecosystem.</p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-slate-900">G</span>
            {googleLoading ? 'Connecting…' : 'Continue with Google'}
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-white/25">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span>OR</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60">Password</span>
                <span className="text-[11px] text-white/30">Keep it secure</span>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2.5 text-xs leading-5 text-red-200">{error}</p>}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3.5 text-sm font-bold shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-white/40">
            New to Everest AI?{' '}
            <Link href="/signup" className="font-semibold text-violet-300 transition hover:text-violet-200">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500" />
            <p className="text-sm text-white/50">Loading…</p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
