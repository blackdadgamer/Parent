import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const PRODUCTS = [
  { name: 'Everest Chat', description: 'Ask anything, in Nepali or English.', url: 'https://chat.everestai.cloud', icon: '💬', accent: 'purple' },
  { name: 'QGen', description: 'Generate question papers in seconds.', url: 'https://qgen.everestai.cloud', icon: '📄', accent: 'blue' },
  { name: 'Everest Schools', description: 'AI for schools and institutions.', url: 'https://school.everestai.cloud', icon: '🏫', accent: 'green' },
  { name: 'Everest Developers', description: 'APIs, keys, and platform tools.', url: 'https://developers.everestai.cloud', icon: '⚡', accent: 'orange' },
] as const

const ACCENT_STYLES: Record<(typeof PRODUCTS)[number]['accent'], string> = {
  purple: 'border-violet-400/15 bg-violet-400/[0.06] shadow-violet-900/10',
  blue: 'border-blue-400/15 bg-blue-400/[0.06] shadow-blue-900/10',
  green: 'border-emerald-400/15 bg-emerald-400/[0.06] shadow-emerald-900/10',
  orange: 'border-orange-400/15 bg-orange-400/[0.06] shadow-orange-900/10',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan, created_at')
    .eq('id', user.id)
    .maybeSingle()

  const metadataName = typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : ''
  const name = profile?.full_name || metadataName || user.email?.split('@')[0] || 'there'
  const plan = profile?.plan || 'free'
  const firstName = name.split(' ')[0]

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[-20rem] h-[40rem] w-[40rem] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-[-15rem] top-[30%] h-[35rem] w-[35rem] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#020617]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">🏔️</span>
            <span className="font-bold tracking-tight">Everest <span className="text-white/45">AI</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/account" className="hidden rounded-xl px-3 py-2 text-sm text-white/55 transition hover:bg-white/[0.05] hover:text-white sm:block">Account</Link>
            <form action="/logout" method="post">
              <button type="submit" className="rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">Log out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.07] p-7 shadow-2xl shadow-black/20 sm:p-10">
          <div className="absolute right-[-5rem] top-[-7rem] h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative">
            <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/75">Your workspace</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {firstName}.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">Everything Everest AI, organized in one place. Jump straight into the tool you need.</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.07] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-violet-200">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                {plan} plan
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">Ecosystem</p>
              <h2 className="mt-1 text-xl font-bold tracking-tight">Your Everest AI products</h2>
            </div>
            <span className="text-xs text-white/30">{PRODUCTS.length} products</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.name}
                href={product.url}
                className={`group rounded-2xl border p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${ACCENT_STYLES[product.accent]}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#020617]/60 text-2xl shadow-lg">{product.icon}</div>
                  <span className="text-lg text-white/25 transition group-hover:translate-x-1 group-hover:text-white/60">↗</span>
                </div>
                <h3 className="mt-7 text-lg font-bold">{product.name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">{product.description}</p>
                <div className="mt-6 text-xs font-bold uppercase tracking-wider text-white/35 transition group-hover:text-white/70">Open product →</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/account" className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/15 hover:bg-white/[0.045]">
            <p className="text-sm font-semibold">Account settings</p>
            <p className="mt-1 text-xs leading-5 text-white/40">Manage your profile, email, and plan details.</p>
          </Link>
          <Link href="/account#billing" className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/15 hover:bg-white/[0.045]">
            <p className="text-sm font-semibold">Billing</p>
            <p className="mt-1 text-xs leading-5 text-white/40">View your current plan and billing information.</p>
          </Link>
        </section>

        <footer className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>Signed in as {user.email}</span>
          <span>Everest AI · One login. Every tool.</span>
        </footer>
      </div>
    </main>
  )
}
