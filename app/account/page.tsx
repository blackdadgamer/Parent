import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AccountPage() {
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
  const name = profile?.full_name || metadataName || user.email?.split('@')[0] || 'Everest AI user'
  const plan = profile?.plan || 'free'
  const joinedAt = profile?.created_at || user.created_at

  return (
    <main className="min-h-screen bg-[#020617] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-lg">🏔️</span>
            Everest AI
          </Link>
          <Link href="/dashboard" className="text-sm text-white/40 transition hover:text-white">← Dashboard</Link>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/75">Account</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Your Everest AI account</h1>
          <p className="mt-2 text-sm text-white/45">Your identity is shared across the Everest AI ecosystem.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold">Profile</h2>
                <p className="mt-1 text-xs text-white/35">Update the name shown across Everest AI.</p>
              </div>
              <span className="rounded-full border border-violet-300/15 bg-violet-300/[0.07] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-200">{plan}</span>
            </div>

            <form action="/api/account/update" method="post" className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-white/55">Full name</span>
                <input name="full_name" type="text" defaultValue={name} maxLength={100} required className="w-full rounded-xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10" />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-white/55">Email</span>
                <input type="email" value={user.email ?? ''} disabled className="w-full cursor-not-allowed rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white/40 outline-none" />
              </label>

              <button type="submit" className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-bold shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30">Save changes</button>
            </form>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h2 className="font-bold">Account details</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-white/30">Current plan</dt>
                  <dd className="mt-1 font-semibold capitalize">{plan}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/30">Joined</dt>
                  <dd className="mt-1 font-semibold">{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(joinedAt))}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/30">Email</dt>
                  <dd className="mt-1 break-all font-semibold text-white/70">{user.email}</dd>
                </div>
              </dl>
            </section>

            <section id="billing" className="scroll-mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h2 className="font-bold">Billing</h2>
              <p className="mt-2 text-sm leading-6 text-white/40">Your current ecosystem plan is <span className="font-semibold capitalize text-white/70">{plan}</span>.</p>
              <p className="mt-3 text-xs leading-5 text-white/25">Billing management can be connected here without changing your shared account identity.</p>
            </section>
          </aside>
        </div>

        <div className="mt-6 flex justify-end">
          <form action="/logout" method="post">
            <button type="submit" className="rounded-xl border border-red-400/15 bg-red-400/[0.04] px-4 py-2.5 text-sm font-semibold text-red-200/75 transition hover:border-red-400/30 hover:bg-red-400/[0.08] hover:text-red-100">Log out</button>
          </form>
        </div>
      </div>
    </main>
  )
}
