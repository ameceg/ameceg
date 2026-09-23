import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/ui/container'
import { ParallaxText } from '@/components/ui/parallax-text'
import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { manusys, manusysStats } from '@/data/about'

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 01 — HERO                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="about-hero"
      className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-[#080B18] pb-20 pt-28 text-white sm:pb-28"
      aria-labelledby="about-hero-heading"
    >
      {/* Faint technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      {/* Large background watermark */}
      <ParallaxText
        range={30}
        className="pointer-events-none absolute -bottom-4 left-0 z-0 select-none"
      >
        <span
          aria-hidden="true"
          className="font-black leading-[0.8] tracking-tighter text-white/[0.022]"
          style={{ fontSize: 'clamp(7rem, 24vw, 22rem)' }}
        >
          AME
        </span>
      </ParallaxText>

      <Container className="relative z-10">
        <Reveal from="right" duration={900}>
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400">
              About AME
            </span>
          </div>
        </Reveal>

        <Reveal delay={80} duration={900}>
          <h1
            id="about-hero-heading"
            className="font-black leading-[0.93] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 8rem)' }}
          >
            THE ASSOCIATION OF
            <br />
            <span className="text-blue-400">MANUFACTURING</span>
            <br />
            ENGINEERS
          </h1>
        </Reveal>

        <Reveal delay={220} duration={900}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 sm:text-xl">
            A student association of the Department of Manufacturing Engineering, College of
            Engineering Guindy — bringing students, faculty and industry together through technical
            learning, professional development and experiences beyond the classroom.
          </p>
        </Reveal>

        <Reveal delay={360} duration={900}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-8">
            {[
              'Department of Manufacturing Engineering',
              'College of Engineering Guindy',
              'Anna University',
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/35"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider accent />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 02 — WHAT IS AME                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

function WhatIsAme() {
  return (
    <section
      className="bg-[#080B18] py-24 text-white sm:py-32"
      aria-labelledby="what-is-ame-heading"
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/90">
              01
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + copy */}
          <div className="lg:col-span-6">
            <Reveal delay={60}>
              <h2
                id="what-is-ame-heading"
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                BUILT AROUND
                <br />
                MANUFACTURING.
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-white/60">
                <p>
                  AME is formed around the community of the Department of Manufacturing Engineering —
                  undergraduate students, postgraduate students and faculty, all part of the same
                  department at CEG.
                </p>
                <p>
                  It creates opportunities for students to explore engineering beyond their regular
                  academic curriculum: through technical events, industry interaction, professional
                  development activities and shared experiences over the course of the academic year.
                </p>
                <p>
                  AME is run by students. Its events, activities and initiatives are planned and
                  executed by the student body, with faculty support from within the department.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: typographic diagram */}
          <Reveal delay={180} className="lg:col-span-6 lg:flex lg:items-center">
            <figure
              className="w-full space-y-3"
              aria-label="How AME connects students, faculty and industry"
            >
              {/* Inputs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'STUDENTS', sub: 'UG · PG' },
                  { label: 'FACULTY', sub: 'Dept. of ME' },
                  { label: 'INDUSTRY', sub: 'Companies · Alumni' },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center"
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                      {n.label}
                    </span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                      {n.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow lines down */}
              <div className="flex justify-around px-6" aria-hidden="true">
                <div className="h-7 w-px bg-gradient-to-b from-white/15 to-blue-500/50" />
                <div className="h-7 w-px bg-gradient-to-b from-white/15 to-blue-500/50" />
                <div className="h-7 w-px bg-gradient-to-b from-white/15 to-blue-500/50" />
              </div>

              {/* AME */}
              <div className="flex justify-center">
                <div className="w-full max-w-xs rounded-xl border border-blue-500/30 bg-blue-950/20 px-6 py-5 text-center">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                    AME
                  </span>
                  <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                    Association of Manufacturing Engineers
                  </span>
                </div>
              </div>

              {/* Arrow lines down */}
              <div className="flex justify-around px-6" aria-hidden="true">
                <div className="h-7 w-px bg-gradient-to-b from-blue-500/50 to-white/10" />
                <div className="h-7 w-px bg-gradient-to-b from-blue-500/50 to-white/10" />
                <div className="h-7 w-px bg-gradient-to-b from-blue-500/50 to-white/10" />
              </div>

              {/* Outputs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'LEARN', sub: 'Technical sessions · Workshops' },
                  { label: 'EXPERIENCE', sub: 'Industry visits · MANUSYS' },
                  { label: 'PARTICIPATE', sub: 'Events · Conferences · Dev' },
                ].map((o) => (
                  <div
                    key={o.label}
                    className="rounded-lg border border-white/8 bg-white/[0.025] p-4 text-center"
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {o.label}
                    </span>
                    <span className="mt-1 block font-mono text-[8px] leading-relaxed text-white/25">
                      {o.sub}
                    </span>
                  </div>
                ))}
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>

      <div className="mt-24 sm:mt-32">
        <SectionDivider />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 03 — BEYOND THE CLASSROOM                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const activityGroups = [
  {
    category: 'TECHNICAL',
    items: [
      'Technical workshops',
      'Guest lectures',
      'Paper presentations',
      'Seminars',
      'Conferences',
    ],
  },
  {
    category: 'INDUSTRY',
    items: [
      'Industrial visits',
      'Industry interaction',
      'Professional development',
    ],
  },
  {
    category: 'COMMUNITY',
    items: [
      'Student activities',
      'Networking',
      'Conferences',
      'MANUSYS',
    ],
  },
]

function BeyondClassroom() {
  return (
    <section
      className="bg-[#060914] py-24 text-white sm:py-32"
      aria-labelledby="beyond-classroom-heading"
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/90">
              02
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={60} className="lg:col-span-5">
            <h2
              id="beyond-classroom-heading"
              className="font-black leading-[0.95] tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              BEYOND THE
              <br />
              CLASSROOM.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/55">
              AME organises a range of activities across the academic year — technical, industry-facing
              and community-driven.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {activityGroups.map((group, gi) => (
                <Reveal key={group.category} delay={100 + gi * 60}>
                  <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[140px_1fr] sm:gap-8">
                    {/* Category label */}
                    <div className="flex items-start sm:pt-0.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                        {group.category}
                      </span>
                    </div>
                    {/* Items — plain list, no fake descriptions */}
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm font-medium text-white/75"
                        >
                          <span
                            className="inline-block size-1 shrink-0 rounded-full bg-blue-500/60"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-24 sm:mt-32">
        <SectionDivider />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 04 — THE PEOPLE                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function ThePeople() {
  return (
    <section
      className="bg-[#080B18] py-24 text-white sm:py-32"
      aria-labelledby="the-people-heading"
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/90">
              03
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal delay={60}>
              <h2
                id="the-people-heading"
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                THE PEOPLE
                <br />
                MAKE AME.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-7 text-base leading-relaxed text-white/55">
                AME is, first and foremost, a community of people within the Department of
                Manufacturing Engineering. Its members are students at different stages of their
                academic journey — and faculty who mentor, guide and participate alongside them.
              </p>
              <p className="mt-5 text-base leading-relaxed text-white/55">
                Anyone from the department is part of what AME is. The association does not exist
                apart from them — it is built around them.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="flex flex-col justify-center">
            {/* Member types — listed clearly without inflated language */}
            <div className="space-y-px">
              {[
                {
                  label: 'Undergraduate Students',
                  note: 'B.E. Manufacturing Engineering',
                },
                {
                  label: 'Postgraduate Students',
                  note: 'M.E. Computer Integrated Manufacturing · M.S. by Research · Ph.D.',
                },
                {
                  label: 'Faculty',
                  note: 'Department of Manufacturing Engineering, CEG',
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="border border-white/8 bg-white/[0.025] px-6 py-5 first:rounded-t-xl last:rounded-b-xl"
                >
                  <p className="font-semibold text-white">{m.label}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>

            <Reveal delay={240}>
              <div className="mt-8">
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
                >
                  Meet the people behind AME
                  <ArrowRight
                    className="size-4 text-blue-400 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </Container>

      <div className="mt-24 sm:mt-32">
        <SectionDivider />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 05 — MANUSYS                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

function ManusysSection() {
  return (
    <section
      id="about-manusys"
      className="overflow-hidden bg-[#060914] py-24 text-white sm:py-32"
      aria-labelledby="about-manusys-heading"
    >
      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-700/8 blur-[150px]" />

      <Container className="relative">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/90">
              04
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal delay={60}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                AME&apos;s Flagship Technical Symposium
              </p>
              <h2
                id="about-manusys-heading"
                className="mt-3 font-black leading-[0.92] tracking-tight text-white"
                style={{ fontSize: 'clamp(3rem, 11vw, 8rem)' }}
              >
                {manusys.name}
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {manusys.summary}
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="lg:col-span-4">
            <Link
              href="/manusys"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
            >
              Explore MANUSYS
              <ArrowRight
                className="size-4 text-blue-400 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        {/* Stats — from actual project data */}
        <div className="mt-14 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Leading 3-day stat */}
          <Reveal
            delay={220}
            className="bg-[#060914] p-6 sm:p-8"
          >
            <p className="text-4xl font-black tracking-tight text-white">3</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              Days
            </p>
          </Reveal>
          {manusysStats.map((s, i) => (
            <Reveal key={s.label} delay={260 + i * 35} className="bg-[#060914] p-6 sm:p-8">
              <p className="text-4xl font-black tracking-tight text-white">{s.value}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="mt-24 sm:mt-32">
        <SectionDivider accent />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 06 — CLOSING                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

function Closing() {
  const nav = [
    { label: 'Explore Events', href: '/events' },
    { label: 'Meet the Team', href: '/team' },
    { label: 'Discover MANUSYS', href: '/manusys' },
  ]

  return (
    <section
      className="relative overflow-hidden bg-[#050812] py-32 text-white sm:py-44"
      aria-labelledby="about-closing-heading"
    >
      {/* Background watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] select-none text-center font-black leading-none tracking-tighter text-white/[0.014]"
        style={{ fontSize: 'clamp(5rem, 18vw, 19rem)' }}
      >
        AME CEG
      </span>

      <Container className="relative z-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/50" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/70">
              AME · CEG
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="about-closing-heading"
            className="mt-8 font-black uppercase leading-[0.93] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}
          >
            THIS IS AME.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-xl">
            A student association built around manufacturing, the people who study it, and the
            experiences that take learning beyond the classroom.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-12">
          <nav aria-label="About page footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowRight
                      className="size-3.5 text-blue-400 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </Container>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* MAIN EXPORT                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

export function AboutSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <WhatIsAme />
      <BeyondClassroom />
      <ThePeople />
      <ManusysSection />
      <Closing />
    </div>
  )
}