"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  full_name: string | null;
  avatar_url: string | null;
  plan: string | null;
};

type UserStats = {
  xp: number | null;
  level: number | null;
  current_streak: number | null;
};

type ActivityItem = {
  id: string;
  type: "chat" | "qgen";
  title: string;
  createdAt: string;
};

type DashboardData = {
  profile: Profile | null;
  messagesThisMonth: number | null;
  papersThisMonth: number | null;
  stats: UserStats | null;
  activity: ActivityItem[];
};

const supabase = createClient();

const PRODUCTS = [
  {
    name: "Everest Chat",
    description: "Ask anything, research faster, and get instant help in Nepali or English.",
    href: "https://chat.everestai.cloud/",
    icon: MessageSquare,
    eyebrow: "AI assistant",
    gradient: "from-violet-500 to-blue-500",
    iconClass: "text-violet-300",
  },
  {
    name: "QGen",
    description: "Generate polished NEB/CDC-aligned question papers and answer keys in seconds.",
    href: "https://qgen.everestai.cloud/",
    icon: FileText,
    eyebrow: "Question papers",
    gradient: "from-blue-500 to-cyan-500",
    iconClass: "text-blue-300",
  },
  {
    name: "Everest Schools",
    description: "Bring modern AI workflows to teachers, administrators, and entire institutions.",
    href: "https://schools.everestai.cloud/",
    icon: GraduationCap,
    eyebrow: "For institutions",
    gradient: "from-fuchsia-500 to-violet-500",
    iconClass: "text-fuchsia-300",
  },
  {
    name: "Everest Developers",
    description: "Build with Everest AI APIs, platform tools, and developer infrastructure.",
    href: "https://developers.everestai.cloud/",
    icon: Zap,
    eyebrow: "Developer platform",
    gradient: "from-indigo-500 to-blue-500",
    iconClass: "text-indigo-300",
  },
] as const;

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  base: "Base",
  camp: "Camp",
  summit: "Summit",
  pro: "Pro",
  enterprise: "Enterprise",
};

const STATS = [
  {
    key: "messages",
    label: "Messages sent",
    caption: "This month",
    icon: MessageSquare,
    iconClass: "text-violet-300",
    iconBg: "bg-violet-500/10",
  },
  {
    key: "papers",
    label: "Papers generated",
    caption: "This month",
    icon: FileText,
    iconClass: "text-blue-300",
    iconBg: "bg-blue-500/10",
  },
  {
    key: "streak",
    label: "Active streak",
    caption: "Days",
    icon: Flame,
    iconClass: "text-orange-300",
    iconBg: "bg-orange-500/10",
  },
  {
    key: "xp",
    label: "XP / Level",
    caption: "Progress",
    icon: TrendingUp,
    iconClass: "text-cyan-300",
    iconBg: "bg-cyan-500/10",
  },
] as const;

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-64 rounded-3xl border border-white/[0.06] bg-white/[0.025]" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
          />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
  actionLabel,
  href,
}: {
  icon: typeof Sparkles;
  message: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-violet-300">
        <Icon size={19} />
      </div>
      <p className="mt-4 text-sm font-semibold text-white/75">Nothing here yet</p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-white/35">{message}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-violet-600/15 transition hover:-translate-y-0.5 hover:shadow-violet-500/25"
      >
        {actionLabel}
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function formatActivityTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function DashboardContent({
  user,
  data,
  today,
}: {
  user: User;
  data: DashboardData;
  today: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const fullName = data.profile?.full_name?.trim() || "";
  const firstName = fullName.split(/\s+/)[0] || "there";
  const plan = data.profile?.plan ? PLAN_LABELS[data.profile.plan.toLowerCase()] ?? data.profile.plan : null;
  const avatarUrl = data.profile?.avatar_url || user.user_metadata?.avatar_url;
  const initials = (fullName || user.email || "EA")
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statValues = useMemo(
    () => ({
      messages: data.messagesThisMonth === null ? "—" : data.messagesThisMonth.toLocaleString(),
      papers: data.papersThisMonth === null ? "—" : data.papersThisMonth.toLocaleString(),
      streak:
        data.stats?.current_streak === null || data.stats?.current_streak === undefined
          ? "—"
          : data.stats.current_streak.toLocaleString(),
      xp:
        data.stats?.xp === null || data.stats?.xp === undefined
          ? "—"
          : `${data.stats.xp.toLocaleString()} XP${data.stats.level ? ` · Lv. ${data.stats.level}` : ""}`,
    }),
    [data]
  );

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-[-18rem] h-[42rem] w-[42rem] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute right-[-14rem] top-[28%] h-[38rem] w-[38rem] rounded-full bg-blue-600/10 blur-[155px]" />
        <div className="absolute bottom-[-20rem] left-[20%] h-[36rem] w-[36rem] rounded-full bg-fuchsia-600/[0.06] blur-[150px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#020617]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-lg shadow-lg shadow-black/20 transition group-hover:border-violet-400/20 group-hover:bg-white/[0.07]">
              🏔️
            </span>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Everest <span className="text-white/40">AI</span>
            </span>
          </Link>

          <div className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-xl border border-transparent bg-white/[0.025] p-1.5 pr-2 transition hover:border-white/[0.08] hover:bg-white/[0.05]"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-8 w-8 rounded-lg object-cover ring-1 ring-white/10"
                />
              ) : (
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500/80 to-blue-500/80 text-[11px] font-black ring-1 ring-white/10">
                  {initials}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`hidden text-white/35 transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07101f]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
              >
                <div className="border-b border-white/[0.06] px-3 py-3">
                  <p className="truncate text-xs font-semibold text-white/80">
                    {fullName || user.email || "Everest AI user"}
                  </p>
                  {user.email && (
                    <p className="mt-1 truncate text-[11px] text-white/30">{user.email}</p>
                  )}
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.05] hover:text-white"
                  role="menuitem"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.05] hover:text-white"
                  role="menuitem"
                >
                  <UserRound size={15} />
                  Account
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-white/50 transition hover:bg-white/[0.05] hover:text-white"
                  role="menuitem"
                >
                  <LogOut size={15} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-7 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pt-12">
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-blue-500/[0.08] p-6 shadow-2xl shadow-black/20 sm:p-9 lg:p-10">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-violet-500/15 blur-[90px]" />
          <div className="absolute -bottom-36 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]" />
                  Today
                </span>
                <span className="hidden text-white/15 sm:inline">·</span>
                <span className="hidden sm:inline">{today}</span>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/75">
                Your Everest workspace
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Welcome back, {firstName}.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/45 sm:text-[15px]">
                One login. Every tool. Pick up where you left off and keep moving.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Current plan
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.07] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-100 shadow-lg shadow-violet-950/20">
                <Sparkles size={13} className="text-violet-300" />
                {plan ?? "—"}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                At a glance
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-tight sm:text-xl">Your activity</h2>
            </div>
            <BarChart3 size={18} className="text-white/20" />
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              const value = statValues[stat.key];

              return (
                <div
                  key={stat.key}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.11] hover:bg-white/[0.035] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-xl ${stat.iconBg} ${stat.iconClass}`}>
                      <Icon size={17} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/20">
                      {stat.caption}
                    </span>
                  </div>
                  <p className="mt-6 truncate text-xl font-black tracking-tight sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-white/35">{stat.label}</p>
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-violet-500/[0.05] blur-2xl transition group-hover:bg-violet-500/10" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Ecosystem
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                Everything you need
              </h2>
            </div>
            <span className="hidden text-xs text-white/25 sm:block">One account · four tools</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;

              return (
                <a
                  key={product.name}
                  href={product.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.045] hover:shadow-2xl hover:shadow-violet-950/20 sm:p-6"
                >
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${product.gradient} opacity-0 transition duration-300 group-hover:opacity-80`} />
                  <div className="flex items-start justify-between gap-5">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.07] bg-white/[0.035] shadow-inner ${product.iconClass}`}>
                      <Icon size={21} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
                      {product.eyebrow}
                    </span>
                  </div>

                  <div className="mt-7 flex items-end justify-between gap-5">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{product.name}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                        {product.description}
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 text-xs font-bold text-white/35 transition group-hover:translate-x-1 group-hover:text-white/75 sm:inline-flex">
                      Open
                      <ArrowRight size={14} />
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/35 sm:hidden">
                    Open
                    <ArrowRight size={13} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Timeline
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight">Recent activity</h2>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-violet-300">
                <BookOpen size={16} />
              </div>
            </div>

            {data.activity.length > 0 ? (
              <div className="divide-y divide-white/[0.05]">
                {data.activity.map((item) => {
                  const Icon = item.type === "qgen" ? FileText : MessageSquare;

                  return (
                    <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-white/45">
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white/75">{item.title}</p>
                        <p className="mt-0.5 text-[11px] text-white/25">{formatActivityTime(item.createdAt)}</p>
                      </div>
                      <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-white/20 sm:block">
                        {item.type === "qgen" ? "QGen" : "Chat"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={BookOpen}
                message="Your activity will appear here as you use Everest AI."
                actionLabel="Open Chat"
                href="https://chat.everestai.cloud/"
              />
            )}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-violet-400/[0.12] bg-gradient-to-br from-violet-500/[0.09] via-white/[0.025] to-blue-500/[0.08] p-5 shadow-xl shadow-black/10 sm:p-6">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-300/10 bg-violet-400/10 text-violet-200">
                <Sparkles size={17} />
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/70">
                Next move
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">Make your next session count.</h2>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Start with Chat for ideas, or go straight to QGen when you need a paper ready for class.
              </p>
              <div className="mt-6 grid gap-2">
                <a
                  href="https://chat.everestai.cloud/"
                  className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-xs font-bold shadow-lg shadow-violet-600/15 transition hover:-translate-y-0.5"
                >
                  Open Chat
                  <ArrowRight size={14} />
                </a>
                <a
                  href="https://qgen.everestai.cloud/"
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-bold text-white/70 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  Generate a paper
                  <FileText size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/billing"
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/10 bg-violet-500/10 text-violet-300">
                <TrendingUp size={17} />
              </div>
              <ArrowRight size={15} className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60" />
            </div>
            <h3 className="mt-5 text-sm font-bold">Upgrade your plan</h3>
            <p className="mt-1 text-xs leading-5 text-white/35">
              Unlock more capacity and keep more of Everest AI working for you.
            </p>
          </Link>

          <Link
            href="/account"
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-300">
                <Settings size={17} />
              </div>
              <ArrowRight size={15} className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60" />
            </div>
            <h3 className="mt-5 text-sm font-bold">Manage your account</h3>
            <p className="mt-1 text-xs leading-5 text-white/35">
              Update profile details and keep your Everest AI account in sync.
            </p>
          </Link>
        </section>

        <footer className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[11px] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span className="truncate">Signed in as {user.email || "Everest AI user"}</span>
          <span>Everest AI · One login. Every tool.</span>
        </footer>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DashboardData>({
    profile: null,
    messagesThisMonth: null,
    papersThisMonth: null,
    stats: null,
    activity: [],
  });
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date())
    );

    let active = true;

    async function loadDashboard() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (active) setUser(currentUser);

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const monthStart = startOfMonth.toISOString();

      const [profileResult, statsResult, messageCountResult, paperCountResult, messageActivityResult, paperActivityResult] =
        await Promise.all([
          supabase
            .from("profiles")
            .select("full_name, avatar_url, plan")
            .eq("id", currentUser.id)
            .maybeSingle(),
          supabase
            .from("user_stats")
            .select("xp, level, current_streak")
            .eq("user_id", currentUser.id)
            .maybeSingle(),
          supabase
            .from("message_logs")
            .select("id", { count: "exact", head: true })
            .eq("user_id", currentUser.id)
            .gte("created_at", monthStart),
          supabase
            .from("qgen_papers")
            .select("id", { count: "exact", head: true })
            .eq("user_id", currentUser.id)
            .gte("created_at", monthStart),
          supabase
            .from("message_logs")
            .select("id, message, created_at")
            .eq("user_id", currentUser.id)
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("qgen_papers")
            .select("id, title, created_at")
            .eq("user_id", currentUser.id)
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      const activity: ActivityItem[] = [];

      if (!messageActivityResult.error && messageActivityResult.data) {
        for (const item of messageActivityResult.data) {
          activity.push({
            id: item.id,
            type: "chat",
            title: "Sent a chat message",
            createdAt: item.created_at,
          });
        }
      }

      if (!paperActivityResult.error && paperActivityResult.data) {
        for (const item of paperActivityResult.data) {
          activity.push({
            id: item.id,
            type: "qgen",
            title: item.title?.trim() || "Generated a QGen paper",
            createdAt: item.created_at,
          });
        }
      }

      activity.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      if (!active) return;

      setData({
        profile: profileResult.error ? null : profileResult.data,
        messagesThisMonth: messageCountResult.error ? null : messageCountResult.count,
        papersThisMonth: paperCountResult.error ? null : paperCountResult.count,
        stats: statsResult.error ? null : statsResult.data,
        activity: activity.slice(0, 5),
      });
      setLoading(false);
    }

    loadDashboard().catch(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] p-4 sm:p-8"><div className="mx-auto max-w-7xl"><DashboardSkeleton /></div></div>}>
      {loading || !user ? (
        <div className="min-h-screen bg-[#020617] p-4 sm:p-8">
          <div className="mx-auto max-w-7xl">
            <DashboardSkeleton />
          </div>
        </div>
      ) : (
        <DashboardContent user={user} data={data} today={today} />
      )}
    </Suspense>
  );
}
