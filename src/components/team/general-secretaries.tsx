import Image from 'next/image'

import { Reveal } from '@/components/ui/reveal'
import { ImageReveal } from '@/components/ui/image-reveal'
import { Container } from '@/components/ui/container'
import { SectionDivider } from '@/components/ui/section-divider'
import type { PopulatedOfficeBearer } from '@/lib/payload-data'

const DESIGNATION_LABELS: Record<string, string> = {
  'general-secretary-male': 'GENERAL SECRETARY — MALE',
  'general-secretary-female': 'GENERAL SECRETARY — FEMALE',
}

function GenSecPortrait({
  bearer,
  index,
}: {
  bearer: PopulatedOfficeBearer
  index: number
}) {
  const member = bearer.member
  const photo = typeof member.photo === 'object' ? member.photo : null
  const url = photo?.url ?? null
  const alt = photo?.alt || `${member.name} — AME`
  const label = DESIGNATION_LABELS[bearer.position] ?? bearer.position.toUpperCase()

  return (
    <Reveal delay={index * 150} from={index === 0 ? 'left' : 'right'} duration={900} className="flex-1">
      <figure className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02]">
        {/* Portrait image */}
        <ImageReveal className="relative aspect-[3/4] w-full" delay={index * 150 + 100}>
          {url ? (
            <>
              <Image
                src={url}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B18] via-[#080B18]/30 to-transparent" />
            </>
          ) : (
            /* Minimal placeholder when no photo */
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-white/[0.03]">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <span className="relative font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/20">
                Photo pending
              </span>
            </div>
          )}

          {/* Number marker */}
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/25"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </ImageReveal>

        {/* Caption */}
        <figcaption className="relative z-10 p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/80">
            {label}
          </p>
          <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {member.name}
          </p>
          <div className="mt-4 h-px w-12 bg-blue-500/40" />
        </figcaption>
      </figure>
    </Reveal>
  )
}

export function GeneralSecretaries({
  bearers,
}: {
  bearers: PopulatedOfficeBearer[]
}) {
  const genSecs = bearers.filter(
    (b) =>
      b.position === 'general-secretary-male' ||
      b.position === 'general-secretary-female',
  )

  return (
    <section
      aria-labelledby="gen-sec-heading"
      className="relative bg-[#080B18] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Section label */}
        <Reveal duration={900}>
          <div className="mb-14 flex items-end justify-between border-b border-white/8 pb-6">
            <div>
              <p className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-white/25">02</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
                  Leadership
                </span>
              </p>
              <h2
                id="gen-sec-heading"
                className="mt-4 font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                GENERAL SECRETARIES
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Editorial pair */}
        {genSecs.length === 0 ? (
          <Reveal>
            <p className="font-mono text-sm text-white/30">
              General Secretary information will be published soon.
            </p>
          </Reveal>
        ) : (
          <div className="flex flex-col gap-5 sm:flex-row">
            {genSecs.map((bearer, i) => (
              <GenSecPortrait key={bearer.id} bearer={bearer} index={i} />
            ))}
          </div>
        )}
      </Container>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider />
      </div>
    </section>
  )
}
