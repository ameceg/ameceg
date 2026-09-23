import { Reveal } from '@/components/ui/reveal'
import { Container } from '@/components/ui/container'

export function TeamClosing() {
  return (
    <section
      aria-labelledby="team-closing-heading"
      className="relative overflow-hidden bg-[#050812] py-32 sm:py-44"
    >
      {/* Border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/15 blur-[160px]" />
      </div>

      {/* Giant background watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-8%] z-0 select-none text-center font-black uppercase leading-none tracking-tighter text-white/[0.018]"
        style={{ fontSize: 'clamp(6rem, 22vw, 24rem)' }}
      >
        AME CEG
      </span>

      {/* Diagonal lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/4 h-[140%] w-px rotate-[20deg] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute -top-[20%] right-1/3 h-[140%] w-px rotate-[20deg] bg-gradient-to-b from-transparent via-white/4 to-transparent" />
      </div>

      <Container className="relative z-10 flex flex-col items-start">
        {/* Eyebrow line */}
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-blue-500/50" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-blue-400/70">
              AME · 2026 — 27
            </span>
          </div>
        </Reveal>

        {/* Main closing text */}
        <Reveal delay={80}>
          <h2
            id="team-closing-heading"
            className="font-black uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            <span className="block">BUILT BY</span>
            <span className="block text-blue-400">STUDENTS.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p
            className="mt-4 font-black uppercase leading-[0.9] tracking-tight text-white/30"
            style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}
          >
            DRIVEN BY MANUFACTURING.
          </p>
        </Reveal>

        {/* Metadata */}
        <Reveal delay={240}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/8 pt-8">
            {['AME CEG', '2026 — 27', 'Anna University'].map((meta) => (
              <span
                key={meta}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/25"
              >
                {meta}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
