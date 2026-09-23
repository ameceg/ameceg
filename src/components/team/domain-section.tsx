import Image from 'next/image'

import { Reveal } from '@/components/ui/reveal'
import { Container } from '@/components/ui/container'
import type { PopulatedCommitteeMember } from '@/lib/payload-data'
import { cn } from '@/lib/utils'

function DomainPortrait({
  member: committeeMember,
  className,
  index,
  priority = false,
}: {
  member: PopulatedCommitteeMember
  className?: string
  index: number
  priority?: boolean
}) {
  const member = committeeMember.member
  const photo = typeof member.photo === 'object' ? member.photo : null
  const url = photo?.url ?? null
  const alt = photo?.alt || `${member.name} — AME`

  return (
    <Reveal delay={index * 80} className={cn('group relative overflow-hidden', className)}>
      <figure className="flex h-full flex-col">
        {/* Image wrapper */}
        <div className="relative h-full min-h-[240px] flex-1 overflow-hidden">
          {url ? (
            <>
              <Image
                src={url}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B18] via-[#080B18]/15 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.025]">
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

          {/* Thin blue hover accent */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
        </div>

        {/* Caption */}
        <figcaption className="border-t border-white/8 px-4 py-4">
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-blue-400/60">
            HEAD
          </p>
          <p className="mt-1 text-base font-bold tracking-tight text-white">
            {member.name}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

/** 
 * Layout variants based on number of domain heads.
 * Returns an array of Tailwind className strings for each portrait card.
 */
function getPortraitLayout(count: number): string[] {
  switch (count) {
    case 1:
      // Single: large centred portrait with max-width constraint
      return ['w-full max-w-sm mx-auto aspect-[3/4]']

    case 2:
      // Two equal portraits
      return ['flex-1 aspect-[3/4]', 'flex-1 aspect-[3/4]']

    case 3:
      // One hero + two smaller (hero takes 2/3 width on desktop via CSS)
      return [
        'hero-portrait',
        'side-portrait',
        'side-portrait',
      ]

    case 4:
      // Asymmetric: 2 taller on left + 2 shorter on right
      return [
        'asymmetric-tall',
        'asymmetric-tall',
        'asymmetric-short',
        'asymmetric-short',
      ]

    case 5:
      // One large + four grid
      return [
        'hero-portrait',
        'quad-portrait',
        'quad-portrait',
        'quad-portrait',
        'quad-portrait',
      ]

    default:
      // Fallback: equal flex columns
      return Array(count).fill('flex-1 aspect-[3/4]')
  }
}

/** Renders a 3-person layout: one hero portrait + 2 side portraits */
function ThreePersonLayout({ heads }: { heads: PopulatedCommitteeMember[] }) {
  const [hero, ...sides] = heads
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      {/* Hero — taller, takes ~55% width */}
      <div className="sm:w-[55%]">
        <DomainPortrait
          member={hero!}
          className="aspect-[3/4] sm:h-full"
          index={0}
          priority
        />
      </div>
      {/* Side column */}
      <div className="flex flex-col gap-4 sm:w-[45%]">
        {sides.map((m, i) => (
          <DomainPortrait
            key={m.id}
            member={m}
            className="flex-1 aspect-[4/3] sm:aspect-auto"
            index={i + 1}
          />
        ))}
      </div>
    </div>
  )
}

/** Renders a 4-person asymmetric 2+2 layout */
function FourPersonLayout({ heads }: { heads: PopulatedCommitteeMember[] }) {
  const [a, b, c, d] = heads
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Left pair — taller aspect */}
      <div className="flex flex-col gap-4 lg:w-1/2">
        {[a, b].filter(Boolean).map((m, i) => (
          <DomainPortrait
            key={m!.id}
            member={m!}
            className="flex-1 aspect-[4/3] lg:aspect-[4/3.5]"
            index={i}
            priority={i === 0}
          />
        ))}
      </div>
      {/* Right pair */}
      <div className="flex flex-col gap-4 lg:w-1/2">
        {[c, d].filter(Boolean).map((m, i) => (
          <DomainPortrait
            key={m!.id}
            member={m!}
            className="flex-1 aspect-[4/3] lg:aspect-[4/3.5]"
            index={i + 2}
          />
        ))}
      </div>
    </div>
  )
}

/** Renders a 5-person layout: one hero + 2x2 grid */
function FivePersonLayout({ heads }: { heads: PopulatedCommitteeMember[] }) {
  const [hero, ...rest] = heads
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Hero — taller left column */}
      <div className="lg:w-[45%]">
        <DomainPortrait
          member={hero!}
          className="aspect-[3/4] lg:h-full"
          index={0}
          priority
        />
      </div>
      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 lg:w-[55%]">
        {rest.map((m, i) => (
          <DomainPortrait
            key={m.id}
            member={m}
            className="aspect-[3/4]"
            index={i + 1}
          />
        ))}
      </div>
    </div>
  )
}

function DomainPortraitGrid({ heads }: { heads: PopulatedCommitteeMember[] }) {
  const count = heads.length

  if (count === 1) {
    // Single person — dramatic centered portrait
    return (
      <div className="flex justify-start">
        <div className="w-full max-w-xs sm:max-w-sm">
          <DomainPortrait member={heads[0]!} className="aspect-[3/4]" index={0} priority />
        </div>
      </div>
    )
  }

  if (count === 2) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        {heads.map((m, i) => (
          <DomainPortrait
            key={m.id}
            member={m}
            className="flex-1 aspect-[3/4]"
            index={i}
            priority={i === 0}
          />
        ))}
      </div>
    )
  }

  if (count === 3) {
    return <ThreePersonLayout heads={heads} />
  }

  if (count === 4) {
    return <FourPersonLayout heads={heads} />
  }

  if (count === 5) {
    return <FivePersonLayout heads={heads} />
  }

  // Fallback: responsive grid
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {heads.map((m, i) => (
        <DomainPortrait key={m.id} member={m} className="aspect-[3/4]" index={i} priority={i === 0} />
      ))}
    </div>
  )
}

type DomainSectionProps = {
  domainNumber: string
  domainName: string
  heads: PopulatedCommitteeMember[]
  /** Alternate background intensity for visual rhythm */
  alt?: boolean
}

export function DomainSection({ domainNumber, domainName, heads, alt = false }: DomainSectionProps) {
  return (
    <section
      id={`domain-${domainNumber}`}
      aria-labelledby={`domain-${domainNumber}-heading`}
      className={cn(
        'relative py-24 sm:py-32 overflow-hidden',
        alt ? 'bg-[#060914]' : 'bg-[#080B18]',
      )}
    >
      {/* Section border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ambient glow — position varies per section via domain number parity */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {parseInt(domainNumber, 10) % 2 === 0 ? (
          <div className="absolute right-0 top-1/3 h-[350px] w-[400px] -translate-y-1/3 rounded-full bg-blue-900/12 blur-[130px]" />
        ) : (
          <div className="absolute left-0 bottom-1/3 h-[350px] w-[400px] translate-y-1/3 rounded-full bg-indigo-900/10 blur-[130px]" />
        )}
      </div>

      {/* Giant domain number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-1/2 z-0 -translate-y-1/2 select-none font-black leading-none tracking-tighter text-white/[0.02]"
        style={{ fontSize: 'clamp(10rem, 30vw, 32rem)' }}
      >
        {domainNumber}
      </span>

      <Container className="relative z-10">
        {/* Domain heading */}
        <Reveal>
          <div className="mb-12 flex items-end justify-between border-b border-white/8 pb-6">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400/60">
                Domain {domainNumber}
              </p>
              <h2
                id={`domain-${domainNumber}-heading`}
                className="mt-3 font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
              >
                {domainName}
              </h2>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-px w-6 bg-white/15" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                {heads.length} {heads.length === 1 ? 'Head' : 'Heads'}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Portrait grid */}
        {heads.length === 0 ? (
          <Reveal>
            <p className="font-mono text-sm text-white/30">
              Team members for this domain will be announced soon.
            </p>
          </Reveal>
        ) : (
          <DomainPortraitGrid heads={heads} />
        )}
      </Container>
    </section>
  )
}
