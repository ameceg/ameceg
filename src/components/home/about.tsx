import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-[#080B18] py-24 sm:py-32"
      aria-labelledby="home-about-heading"
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      <Container className="relative">
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-blue-400/90">
              01 / About AME
            </span>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">

          {/* Left: heading + copy + CTA */}
          <div>
            <Reveal delay={60}>
              <h2
                id="home-about-heading"
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
              >
                THE ASSOCIATION OF
                <br />
                <span className="text-blue-400">MANUFACTURING</span>
                <br />
                ENGINEERS
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
                AME is the student association of the Department of Manufacturing Engineering, CEG —
                bringing students, faculty and industry together through technical learning,
                professional development and experiences beyond the classroom.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
              >
                Discover AME
                <ArrowRight
                  className="size-4 text-blue-400 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          {/* Right: typographic relationship diagram */}
          <Reveal delay={180} className="flex items-center">
            <figure className="w-full" aria-label="AME relationship diagram">
              {/* Top: inputs */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {['STUDENTS', 'FACULTY', 'INDUSTRY'].map((node) => (
                  <div
                    key={node}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-4"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                      {node}
                    </span>
                  </div>
                ))}
              </div>

              {/* Converging lines */}
              <div className="relative my-3 flex justify-center" aria-hidden="true">
                <div className="flex w-full items-end justify-around">
                  <div className="h-8 w-px origin-bottom -rotate-[20deg] bg-gradient-to-b from-white/10 to-blue-500/40" />
                  <div className="h-8 w-px bg-gradient-to-b from-white/10 to-blue-500/40" />
                  <div className="h-8 w-px origin-bottom rotate-[20deg] bg-gradient-to-b from-white/10 to-blue-500/40" />
                </div>
              </div>

              {/* Central: AME */}
              <div className="flex justify-center">
                <div className="rounded-xl border border-blue-500/30 bg-blue-950/25 px-10 py-5 text-center">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                    AME
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Dept. of Manufacturing Engineering · CEG
                  </span>
                </div>
              </div>

              {/* Diverging lines */}
              <div className="relative my-3 flex justify-center" aria-hidden="true">
                <div className="flex w-full items-start justify-around">
                  <div className="h-8 w-px origin-top rotate-[20deg] bg-gradient-to-b from-blue-500/40 to-white/10" />
                  <div className="h-8 w-px bg-gradient-to-b from-blue-500/40 to-white/10" />
                  <div className="h-8 w-px origin-top -rotate-[20deg] bg-gradient-to-b from-blue-500/40 to-white/10" />
                </div>
              </div>

              {/* Bottom: outputs */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'LEARN', sub: 'Workshops · Lectures · Seminars' },
                  { label: 'EXPERIENCE', sub: 'Industrial visits · MANUSYS' },
                  { label: 'INTERACT', sub: 'Industry · Conferences · Dev' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-4"
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block font-mono text-[8px] leading-relaxed text-white/30">
                      {item.sub}
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