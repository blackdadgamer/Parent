"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  Lock,
  MessageSquare,
  Presentation,
  School,
  Sparkles,
  Languages,
  Cpu,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const products = [
  {
    name: "Everest Chat",
    description:
      "Ask anything. Get instant help with homework, coding, research, and lesson prep.",
    icon: MessageSquare,
    href: "https://chat.everestai.cloud",
    action: "Open Chat",
    gradient: "from-violet-500 to-blue-500",
  },
  {
    name: "QGen",
    description:
      "Generate NEB/CDC-aligned question papers with answer keys in seconds.",
    icon: FileText,
    href: "https://qgen.everestai.cloud",
    action: "Open QGen",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "PPTgen",
    description:
      "Turn any topic into a polished slide deck. Export to PowerPoint.",
    icon: Presentation,
    href: "https://pptgen.everestai.cloud",
    action: "Join waitlist",
    comingSoon: true,
    gradient: "from-fuchsia-500 to-violet-500",
  },
];

const features = [
  {
    icon: Users,
    title: "One login. Every tool.",
    description:
      "Move between Chat, QGen, PPTgen, and future products without managing separate accounts.",
  },
  {
    icon: GraduationCap,
    title: "Built for Nepal's curriculum",
    description:
      "Designed around the way educators actually work with NEB and CDC-aligned content.",
  },
  {
    icon: Languages,
    title: "Multilingual by design",
    description:
      "Work naturally across English, Nepali, and Hindi as your classroom requires.",
  },
  {
    icon: Cpu,
    title: "Open-source AI",
    description:
      "Powered by modern open-source AI infrastructure including Gemma-family models.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    description:
      "Student and school data stays private with security and responsible AI at the core.",
  },
  {
    icon: Zap,
    title: "10× more affordable",
    description:
      "Premium AI tools without the premium price tag. Built to be accessible to schools.",
  },
];

const faqs = [
  {
    question: "Is Everest AI free?",
    answer:
      "Yes. Everest AI has a free plan for individual teachers. It includes daily chat usage plus monthly access to QGen and PPTgen where available.",
  },
  {
    question: "Does it support the NEB curriculum?",
    answer:
      "Yes. QGen is designed around Nepal's education ecosystem and supports NEB/CDC-aligned question paper generation.",
  },
  {
    question: "Is my data private?",
    answer:
      "Privacy is a core part of the platform. School and student information is handled responsibly, with privacy and security considered throughout the product.",
  },
  {
    question: "Can my whole school use one account?",
    answer:
      "The School plan is designed for entire institutions, with centralized billing, teacher access, unlimited students, and school-level onboarding.",
  },
  {
    question: "What AI models power Everest AI?",
    answer:
      "Everest AI uses modern AI infrastructure and open-source models, including Gemma-family models, while selecting the right technology for each product.",
  },
  {
    question: "Can I export question papers?",
    answer:
      "Yes. QGen generates polished question papers and answer keys that can be used for classroom and assessment workflows.",
  },
];

const testimonials = [
  {
    quote:
      "Everest AI feels like it was actually designed around the problems teachers face every day.",
    name: "Priya Sharma",
    school: "Kathmandu Valley School",
    role: "Secondary Teacher",
  },
  {
    quote:
      "Creating question papers used to take hours. Having an AI workflow built around our curriculum changes that completely.",
    name: "Rajesh Adhikari",
    school: "Himalayan Academy",
    role: "Academic Coordinator",
  },
  {
    quote:
      "The biggest advantage is simplicity. One platform instead of five different AI tools.",
    name: "Anita Thapa",
    school: "Everest International School",
    role: "School Administrator",
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-320px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute right-[-250px] top-[35%] h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[140px]" />
        <div className="absolute bottom-[-300px] left-[-200px] h-[600px] w-[600px] rounded-full bg-violet-700/8 blur-[150px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:pb-32">
        {/* Hero background image */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: "500px" }}>
            <img
              src="/bg.png"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-0 -translate-x-1/2 opacity-40"
              style={{
                width: "1983px",
                height: "793px",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/95 to-[#020617]" />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <FadeUp>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-xs font-medium text-white/65 shadow-xl shadow-violet-950/20 backdrop-blur">
              <span>🏔️</span>
              <span>Built in Nepal</span>
              <span className="text-white/20">·</span>
              <span>Used across South Asia</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[88px]">
              The complete AI
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">
                ecosystem for educators.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Chat, question papers, presentations, and more — all under one
              login. Priced so every school can afford it.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://chat.everestai.cloud"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/30 sm:w-auto"
              >
                Start free
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="https://schools.everestai.cloud"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:w-auto"
              >
                For Schools
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45">
              <span>10 free messages</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
              <span>NEB/CDC ready</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
              <span>No credit card</span>
            </div>
          </FadeUp>

          {/* Product mockup */}
          <FadeUp delay={0.38} className="mx-auto mt-20 max-w-5xl">
            <div className="relative">
              <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-r from-violet-600/15 via-blue-600/10 to-violet-600/15 blur-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07101f]/90 p-2 shadow-2xl shadow-black/50 sm:rounded-3xl sm:p-3">
                <div className="rounded-xl border border-white/[0.06] bg-[#040b17] p-4 sm:rounded-2xl sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="hidden rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[10px] text-white/30 sm:block">
                      everestai.cloud
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1fr_1.3fr]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Everest Chat</p>
                          <p className="text-[10px] text-white/30">
                            AI assistant
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-3">
                        <div className="ml-auto h-8 w-3/4 rounded-lg bg-violet-500/10" />
                        <div className="h-10 w-11/12 rounded-lg bg-white/[0.035]" />
                        <div className="h-8 w-2/3 rounded-lg bg-white/[0.035]" />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left">
                        <div className="w-fit rounded-lg bg-blue-500/10 p-2 text-blue-400">
                          <FileText size={18} />
                        </div>
                        <p className="mt-5 text-sm font-semibold">QGen</p>
                        <p className="mt-1 text-[11px] leading-5 text-white/35">
                          NEB question papers
                        </p>
                        <div className="mt-6 h-1.5 rounded-full bg-white/[0.05]">
                          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left">
                        <div className="w-fit rounded-lg bg-fuchsia-500/10 p-2 text-fuchsia-400">
                          <Presentation size={18} />
                        </div>
                        <p className="mt-5 text-sm font-semibold">PPTgen</p>
                        <p className="mt-1 text-[11px] leading-5 text-white/35">
                          AI-powered presentations
                        </p>
                        <div className="mt-5 flex gap-1">
                          <div className="h-10 flex-1 rounded-md bg-white/[0.035]" />
                          <div className="h-10 flex-1 rounded-md bg-white/[0.035]" />
                          <div className="h-10 flex-1 rounded-md bg-white/[0.035]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="border-t border-white/[0.05] px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                The ecosystem
              </p>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                One ecosystem.
                <br />
                <span className="text-white/35">Every tool.</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-white/45">
                Everything educators need to plan, create, teach, and move
                faster — without jumping between disconnected AI products.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-4 lg:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;

              return (
                <FadeUp key={product.name} delay={index * 0.08}>
                  <a
                    href={product.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/[0.13] hover:bg-white/[0.035]"
                  >
                    <div
                      className={`absolute right-[-70px] top-[-70px] h-40 w-40 rounded-full bg-gradient-to-br ${product.gradient} opacity-[0.08] blur-3xl transition duration-500 group-hover:opacity-[0.16]`}
                    />

                    <div className="relative">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg`}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="mt-8 flex items-center gap-3">
                        <h3 className="text-xl font-bold tracking-tight">
                          {product.name}
                        </h3>

                        {product.comingSoon && (
                          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-300">
                            Coming soon
                          </span>
                        )}
                      </div>

                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/40">
                        {product.description}
                      </p>

                      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/65 transition group-hover:text-white">
                        {product.action}
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </a>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section
        id="why"
        className="px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Why Everest
              </p>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Built different.
                <br />
                <span className="text-white/35">Priced different.</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <FadeUp key={feature.title} delay={index * 0.04}>
                  <div className="h-full bg-[#020617] p-7 transition hover:bg-white/[0.025]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-violet-400">
                      <Icon size={19} />
                    </div>

                    <h3 className="mt-6 text-base font-bold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/38">
                      {feature.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schools CTA */}
      <section id="schools" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-600/[0.11] via-white/[0.025] to-blue-600/[0.08] p-7 sm:p-10 lg:p-14">
            <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <FadeUp>
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-violet-300">
                    <School size={22} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                    For schools
                  </p>

                  <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                    Equip your entire school for{" "}
                    <span className="text-violet-300">$1 per student.</span>
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
                    Give teachers modern AI tools without forcing every
                    educator to figure out a separate platform.
                  </p>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      "Unlimited teachers",
                      "Centralized billing",
                      "Curriculum alignment",
                      "Private data",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-white/65"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                          <Check size={13} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://schools.everestai.cloud"
                    className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-violet-600/20 transition hover:-translate-y-1"
                  >
                    Visit schools portal
                    <ArrowRight size={15} />
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.12}>
                <div className="rounded-2xl border border-white/[0.08] bg-[#020617]/70 p-6 backdrop-blur-xl">
                  <p className="text-sm font-bold">Bring Everest AI to your school.</p>
                  <p className="mt-2 text-xs leading-5 text-white/35">
                    Tell us a little about your school and we&apos;ll walk you
                    through the platform in a 15-minute demo.
                  </p>

                  <div className="mt-6 space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-500/40"
                    />
                    <input
                      type="email"
                      placeholder="School email"
                      className="w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-500/40"
                    />
                    <input
                      type="text"
                      placeholder="School name"
                      className="w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-500/40"
                    />
                  </div>

                  <a
                    href="https://schools.everestai.cloud"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-bold shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5"
                  >
                    Book a 15-minute demo
                    <ArrowRight size={15} />
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/[0.05] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                From educators
              </p>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Built for people
                <br />
                <span className="text-white/35">who teach.</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeUp key={testimonial.name} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                  <div className="flex gap-1 text-violet-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>✦</span>
                    ))}
                  </div>

                  <p className="mt-6 text-[15px] leading-7 text-white/65">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="mt-8 border-t border-white/[0.06] pt-5">
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="mt-1 text-xs text-white/30">
                      {testimonial.role} · {testimonial.school}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                FAQ
              </p>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Questions,
                <br />
                <span className="text-white/35">answered.</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FadeUp key={faq.question} delay={index * 0.03}>
                <details className="group rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-sm font-semibold text-white/80 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown
                      size={17}
                      className="shrink-0 text-white/30 transition-transform group-open:rotate-180"
                    />
                  </summary>

                  <div className="border-t border-white/[0.05] px-5 pb-5 pt-4 text-sm leading-6 text-white/40">
                    {faq.answer}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <FadeUp>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-600/15 via-white/[0.025] to-blue-600/10 px-6 py-16 text-center sm:px-10 sm:py-20">
            <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/15 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                <Sparkles size={20} className="text-violet-300" />
              </div>

              <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-6xl">
                Start building with
                <br />
                <span className="bg-gradient-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                  Everest AI today.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40">
                One login. Every educator. A smarter way to work.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://chat.everestai.cloud"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-violet-600/20 transition hover:-translate-y-1"
                >
                  Start free
                  <ArrowRight size={15} />
                </a>

                <a
                  href="https://schools.everestai.cloud"
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:-translate-y-1 hover:bg-white/[0.05] hover:text-white"
                >
                  For Schools
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-5 pb-8 pt-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <a href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <span>🏔️</span>
                </div>
                <span className="font-bold tracking-tight">
                  Everest <span className="text-white/40">AI</span>
                </span>
              </a>

              <p className="mt-5 max-w-xs text-sm leading-6 text-white/35">
                The complete AI ecosystem for educators. Built in Nepal,
                designed for the world.
              </p>

              <p className="mt-5 text-xs font-medium text-white/45">
                Made in Nepal 🇳🇵
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                Products
              </h3>
              <div className="mt-5 space-y-3">
                <a
                  href="https://chat.everestai.cloud"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  Everest Chat
                </a>
                <a
                  href="https://qgen.everestai.cloud"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  QGen
                </a>
                <a
                  href="https://pptgen.everestai.cloud"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  PPTgen
                </a>
                <a
                  href="https://developers.everestai.cloud"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  Developers
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                Company
              </h3>
              <div className="mt-5 space-y-3">
                <a
                  href="https://schools.everestai.cloud"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  For Schools
                </a>
                <a
                  href="https://chat.everestai.cloud/pricing"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  About
                </a>
                <a
                  href="mailto:everest.ai.cloud@gmail.com"
                  className="block text-sm text-white/35 transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                Legal
              </h3>
              <div className="mt-5 space-y-3">
                {["Terms", "Privacy", "Security"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm text-white/35 transition hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-7 text-xs text-white/25 sm:flex-row">
            <p>© 2026 Everest AI. All rights reserved.</p>
            <p>AI infrastructure for the next generation of educators.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}