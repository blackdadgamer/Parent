'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type Profile = {
  full_name: string | null
  avatar_url: string | null
  plan: string | null
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let mounted = true

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!mounted) return

      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, plan')
          .eq('id', user.id)
          .maybeSingle()

        if (mounted) setProfile(data)
      } else {
        setProfile(null)
      }
    }

    void load()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load()
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (!menuOpen) return

    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [menuOpen])

  const displayName =
    profile?.full_name || user?.email?.split('@')[0] || 'Account'

  const initial = displayName[0]?.toUpperCase() || '?'
  const avatarUrl =
    profile?.avatar_url ||
    (typeof user?.user_metadata?.avatar_url === 'string'
      ? user.user_metadata.avatar_url
      : null)

  const closeMobile = () => {
    setMobileOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#020617]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] shadow-lg shadow-violet-500/10">
            <span className="text-lg">🏔️</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight">
            Everest <span className="text-white/50">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#products"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            Products
          </a>
          <a
            href="#why"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            Why Everest
          </a>
          <a
            href="https://schools.everestai.cloud"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            For Schools
          </a>
          <a
            href="https://chat.everestai.cloud/pricing"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            FAQ
          </a>
        </nav>

        {user ? (
          <div className="relative hidden sm:block" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-2 py-1.5 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold">
                  {initial}
                </span>
              )}
              <span className="max-w-36 truncate text-sm font-medium text-white/75">
                {displayName}
              </span>
              <ChevronDown
                size={15}
                className={`text-white/40 transition-transform ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#07101f] shadow-2xl shadow-black/40"
              >
                <Link
                  href="/dashboard"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <UserRound size={16} className="text-violet-300" />
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <UserRound size={16} className="text-blue-300" />
                  Account
                </Link>
                <form action="/logout" method="post">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 border-t border-white/[0.06] px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/[0.08]"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-5 sm:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-white/65 transition hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg border border-white/10 p-2 text-white/70 sm:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#020617]/95 px-5 py-5 sm:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#products"
              onClick={closeMobile}
              className="py-1 text-sm font-medium text-white/65"
            >
              Products
            </a>
            <a
              href="#why"
              onClick={closeMobile}
              className="py-1 text-sm font-medium text-white/65"
            >
              Why Everest
            </a>
            <a
              href="https://schools.everestai.cloud"
              onClick={closeMobile}
              className="py-1 text-sm font-medium text-white/65"
            >
              For Schools
            </a>
            <a
              href="https://chat.everestai.cloud/pricing"
              onClick={closeMobile}
              className="py-1 text-sm font-medium text-white/65"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={closeMobile}
              className="py-1 text-sm font-medium text-white/65"
            >
              FAQ
            </a>

            {user ? (
              <div className="mt-2 border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold">
                      {initial}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white/85">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-white/35">
                      {user.email || 'Signed in'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Account
                  </Link>
                  <form action="/logout" method="post">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/[0.08]"
                    >
                      Log out
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-3 border-t border-white/[0.06] pt-4">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-center text-sm font-semibold text-white/75 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobile}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-center text-sm font-semibold shadow-lg shadow-violet-600/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
