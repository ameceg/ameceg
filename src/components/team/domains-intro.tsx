import { Reveal } from '@/components/ui/reveal'
import { Container } from '@/components/ui/container'
import { ParallaxText } from '@/components/ui/parallax-text'
import { SectionDivider } from '@/components/ui/section-divider'

export function DomainsIntro() {
  return (
    <section
      aria-labelledby="domains-intro-heading"
      className="relative overflow-hidden bg-[#050812] py-32 sm:py-40"
    >
      {/* Large ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/20 blur-[160px]" />
      </div>

      {/* Thin full-width horizontal border lines */}
      <div className="absolute inset-x-0 top-0">
        <SectionDivider accent />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <SectionDivider />
      </div>

      {/* Diagonal structural lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] right-1/4 h-[160%] w-px rotate-[25deg] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute -top-[30%] left-1/3 h-[160%] w-px rotate-[25deg] bg-gradient-to-b from-transparent via-white/4 to-transparent" />
      </div>

      {/* Giant background watermark — subtle parallax */}
      <ParallaxText range={35} className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 select-none">
        <span
          aria-hidden="true"
          className="font-black uppercase leading-none tracking-tighter text-white/[0.018]"
          style={{ fontSize: 'clamp(8rem, 30vw, 32rem)' }}
        >
          08
        </span>
      </ParallaxText>

      <Container className="relative z-10">
        {/* Eyebrow */}
        <Reveal from="right" duration={900}>
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-blue-500/50" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-blue-400/70">
              AME · Structure
            </span>
          </div>
        </Reveal>

        {/* Main heading */}
        <Reveal delay={120} duration={900}>
          <h2
            id="domains-intro-heading"
            className="font-black uppercase leading-[0.9] tracking-tighter text-white"
            style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
          >
            <span className="block">THE</span>
            <span className="block text-blue-400">DOMAINS</span>
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={250} duration={900}>
          <p className="mt-10 font-mono text-lg font-bold uppercase tracking-[0.3em] text-white/30 sm:text-xl">
            08 DOMAINS · ONE ASSOCIATION
          </p>
        </Reveal>

        {/* Domain name marquee strip */}
        <Reveal delay={400} duration={900}>
          <div className="mt-16 border-t border-white/8 pt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                'Logistics',
                'HR & Hospitality',
                'Marketing & Media',
                'Design & Promo',
                'Contents & Documentation',
                'Industrial Relations',
                'Web Development',
                'Events',
              ].map((domain, i) => (
                <span
                  key={domain}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/20"
                >
                  <span className="mr-2 text-blue-500/40">{String(i + 1).padStart(2, '0')}</span>
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
