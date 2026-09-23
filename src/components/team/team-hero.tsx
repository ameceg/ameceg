import { Reveal } from '@/components/ui/reveal'
import { Container } from '@/components/ui/container'
import { ParallaxText } from '@/components/ui/parallax-text'
import { SectionDivider } from '@/components/ui/section-divider'

export function TeamHero() {
  return (
    <section
      id="team-hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#080B18] text-white"
      aria-labelledby="team-hero-heading"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[5%] top-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-700/15 blur-[140px]" />
        <div className="absolute left-[-10%] bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-800/10 blur-[120px]" />
      </div>

      {/* Diagonal architectural lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] left-1/4 h-[160%] w-px rotate-[30deg] bg-gradient-to-b from-transparent via-white/6 to-transparent" />
        <div className="absolute -top-[30%] right-1/3 h-[160%] w-px rotate-[30deg] bg-gradient-to-b from-transparent via-white/4 to-transparent" />
      </div>

      {/* Giant background watermark — subtle parallax */}
      <ParallaxText range={30} className="pointer-events-none absolute bottom-0 left-0 z-0 select-none">
        <span
          aria-hidden="true"
          className="font-black leading-[0.85] tracking-tighter text-white/[0.025]"
          style={{ fontSize: 'clamp(8rem, 28vw, 30rem)' }}
        >
          AME
        </span>
      </ParallaxText>

      <Container className="relative z-10 flex flex-col items-start gap-0 py-20">
        {/* Technical label */}
        <Reveal from="right" duration={900}>
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-blue-500/60" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-blue-400/80">
              AME / PEOPLE
            </span>
          </div>
        </Reveal>

        {/* Main heading */}
        <Reveal delay={100} duration={900}>
          <h1
            id="team-hero-heading"
            className="max-w-4xl font-black leading-[0.92] tracking-tighter text-white"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
          >
            <span className="block">THE PEOPLE</span>
            <span className="block text-blue-400">BEHIND AME.</span>
          </h1>
        </Reveal>

        {/* Supporting text */}
        <Reveal delay={250} duration={900}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
            The students shaping the association, its leadership, and its domains.
          </p>
        </Reveal>

        {/* Metadata strip */}
        <Reveal delay={400} duration={900}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
            {[
              '2026 — 27',
              'CEG · ANNA UNIVERSITY',
              'DEPARTMENT OF MANUFACTURING ENGINEERING',
            ].map((meta, i) => (
              <span key={i} className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                {meta}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Bottom border line — animated */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider accent />
      </div>
    </section>
  )
}
