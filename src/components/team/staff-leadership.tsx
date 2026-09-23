import { Reveal } from '@/components/ui/reveal'
import { Container } from '@/components/ui/container'
import { SectionDivider } from '@/components/ui/section-divider'

function StaffPlaceholderCard({
  title,
  index,
}: {
  title: string
  index: number
}) {
  return (
    <Reveal delay={index * 120} from={index === 0 ? 'left' : 'right'} duration={900} className="flex-1">
      <figure className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02]">
        {/* Photo placeholder */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/[0.03]">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Centre mark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="h-px w-16 bg-white/10" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/20">
              To be confirmed
            </span>
            <div className="h-px w-16 bg-white/10" />
          </div>
        </div>

        {/* Card footer */}
        <figcaption className="flex items-start justify-between gap-4 border-t border-white/10 p-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
              {title}
            </p>
            <p className="mt-2 font-mono text-[11px] italic tracking-wide text-white/20">
              Name to be announced
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 h-px w-8 flex-shrink-0 bg-white/10"
          />
        </figcaption>
      </figure>
    </Reveal>
  )
}

export function StaffLeadership() {
  return (
    <section
      aria-labelledby="staff-heading"
      className="relative bg-[#080B18] py-24 sm:py-32"
    >
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section label */}
        <Reveal duration={900}>
          <div className="mb-14 flex items-end justify-between border-b border-white/8 pb-6">
            <div>
              <p className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-white/25">01</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
                  Staff
                </span>
              </p>
              <h2
                id="staff-heading"
                className="mt-4 font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                STAFF LEADERSHIP
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/15 sm:block">
              CEG · AME
            </span>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="flex flex-col gap-5 sm:flex-row">
          <StaffPlaceholderCard title="President" index={0} />
          <StaffPlaceholderCard title="Treasurer" index={1} />
        </div>
      </Container>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider />
      </div>
    </section>
  )
}
