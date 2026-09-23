import Image from 'next/image'

import { Reveal } from '@/components/ui/reveal'
import { ImageReveal } from '@/components/ui/image-reveal'
import { Container } from '@/components/ui/container'
import { SectionDivider } from '@/components/ui/section-divider'
import type { PopulatedOfficeBearer } from '@/lib/payload-data'
import { cn } from '@/lib/utils'

const OFFICE_POSITION_LABELS: Record<string, string> = {
  'events-secretary': 'EVENTS SECRETARY',
  'head-of-alumni-relations': 'HEAD OF ALUMNI RELATIONS',
  'joint-secretary-male': 'JOINT SECRETARY — MALE',
  'joint-secretary-female': 'JOINT SECRETARY — FEMALE',
  'junior-head-of-alumni-relations': 'JUNIOR HEAD OF ALUMNI RELATIONS',
  'junior-events-secretary': 'JUNIOR EVENTS SECRETARY',
  'assistant-secretary-male': 'ASSISTANT SECRETARY — MALE',
  'assistant-secretary-female': 'ASSISTANT SECRETARY — FEMALE',
}

/** Order to sort positions within their group */
const POSITION_DISPLAY_ORDER: Record<string, number> = {
  'events-secretary': 0,
  'head-of-alumni-relations': 1,
  'joint-secretary-male': 2,
  'joint-secretary-female': 3,
  'junior-head-of-alumni-relations': 4,
  'junior-events-secretary': 5,
  'assistant-secretary-male': 6,
  'assistant-secretary-female': 7,
}

type OfficeBearerGroup = {
  label: string
  subLabel: string
  positions: string[]
}

const GROUPS: OfficeBearerGroup[] = [
  {
    label: 'Executive Leadership',
    subLabel: 'A',
    positions: ['events-secretary', 'head-of-alumni-relations'],
  },
  {
    label: 'Joint Secretaries',
    subLabel: 'B',
    positions: ['joint-secretary-male', 'joint-secretary-female'],
  },
  {
    label: 'Junior Leadership',
    subLabel: 'C',
    positions: ['junior-head-of-alumni-relations', 'junior-events-secretary'],
  },
  {
    label: 'Assistant Secretaries',
    subLabel: 'D',
    positions: ['assistant-secretary-male', 'assistant-secretary-female'],
  },
]

/** Alternating entrance directions per group */
const GROUP_DIRECTIONS: Array<'up' | 'left' | 'right'> = ['up', 'left', 'right', 'up']

function MemberPhoto({
  url,
  alt,
  className,
}: {
  url: string | null | undefined
  alt: string
  className?: string
}) {
  if (url) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className={cn('object-cover object-top', className)}
        loading="lazy"
      />
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <span className="relative font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
        Photo pending
      </span>
    </div>
  )
}

/** Large pair card used for executive leadership */
function LargeCard({
  bearer,
  index,
  from,
}: {
  bearer: PopulatedOfficeBearer
  index: number
  from: 'up' | 'left' | 'right'
}) {
  const member = bearer.member
  const photo = typeof member.photo === 'object' ? member.photo : null
  const url = photo?.url ?? null
  const alt = photo?.alt || `${member.name} — AME`
  const label = OFFICE_POSITION_LABELS[bearer.position] ?? bearer.position.toUpperCase()

  return (
    <Reveal delay={index * 100} from={from} duration={900} className="flex-1">
      <figure className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02]">
        <ImageReveal className="relative aspect-[3/4] w-full" delay={index * 100 + 80}>
          <MemberPhoto
            url={url}
            alt={alt}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04] grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B18] via-[#080B18]/20 to-transparent" />
          {/* Blue accent bar */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
        </ImageReveal>
        <figcaption className="p-5">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
            {label}
          </p>
          <p className="mt-1.5 text-xl font-black tracking-tight text-white">
            {member.name}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

/** Compact card for joint / junior / assistant pairs */
function CompactCard({
  bearer,
  index,
  from,
}: {
  bearer: PopulatedOfficeBearer
  index: number
  from: 'up' | 'left' | 'right'
}) {
  const member = bearer.member
  const photo = typeof member.photo === 'object' ? member.photo : null
  const url = photo?.url ?? null
  const alt = photo?.alt || `${member.name} — AME`
  const label = OFFICE_POSITION_LABELS[bearer.position] ?? bearer.position.toUpperCase()

  return (
    <Reveal delay={index * 80} from={from} duration={900} className="flex-1">
      <figure className="group flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02]">
        <ImageReveal className="relative aspect-[4/5] w-full" delay={index * 80 + 60}>
          <MemberPhoto
            url={url}
            alt={alt}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B18]/80 via-transparent to-transparent" />
        </ImageReveal>
        <figcaption className="p-4">
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-blue-400/60">
            {label}
          </p>
          <p className="mt-1 text-base font-bold tracking-tight text-white">
            {member.name}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

function OfficeBearerGroupComponent({
  group,
  bearers,
  groupIndex,
  isLarge,
}: {
  group: OfficeBearerGroup
  bearers: PopulatedOfficeBearer[]
  groupIndex: number
  isLarge: boolean
}) {
  if (bearers.length === 0) return null

  const direction = GROUP_DIRECTIONS[groupIndex % GROUP_DIRECTIONS.length]!

  return (
    <div className="space-y-6">
      <Reveal delay={groupIndex * 80} from={direction} duration={900}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
            {group.subLabel}
          </span>
          <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
            {group.label}
          </span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-5 sm:flex-row">
        {bearers.map((bearer, i) =>
          isLarge ? (
            <LargeCard key={bearer.id} bearer={bearer} index={i} from={direction} />
          ) : (
            <CompactCard key={bearer.id} bearer={bearer} index={i} from={direction} />
          ),
        )}
      </div>
    </div>
  )
}

export function OfficeBearersSection({
  bearers,
}: {
  bearers: PopulatedOfficeBearer[]
}) {
  // Only the office bearer roles (exclude president/treasurer/gen secs which have their own sections)
  const officeBearers = bearers.filter(
    (b) =>
      !['president', 'treasurer', 'general-secretary-male', 'general-secretary-female'].includes(
        b.position,
      ),
  )

  return (
    <section
      aria-labelledby="office-bearers-heading"
      className="relative bg-[#080B18] py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/3 top-0 h-[350px] w-[600px] rounded-full bg-indigo-900/10 blur-[130px]" />
      </div>

      <Container className="relative z-10 space-y-16">
        {/* Section label */}
        <Reveal duration={900}>
          <div className="flex items-end justify-between border-b border-white/8 pb-6">
            <div>
              <p className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-white/25">03</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
                  Committee
                </span>
              </p>
              <h2
                id="office-bearers-heading"
                className="mt-4 font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                OFFICE BEARERS
              </h2>
            </div>
          </div>
        </Reveal>

        {officeBearers.length === 0 ? (
          <Reveal>
            <p className="font-mono text-sm text-white/30">
              Office bearer information will be published soon.
            </p>
          </Reveal>
        ) : (
          <div className="space-y-16">
            {GROUPS.map((group, groupIndex) => {
              const groupBearers = officeBearers
                .filter((b) => group.positions.includes(b.position))
                .sort(
                  (a, b) =>
                    (POSITION_DISPLAY_ORDER[a.position] ?? 99) -
                    (POSITION_DISPLAY_ORDER[b.position] ?? 99),
                )
              return (
                <OfficeBearerGroupComponent
                  key={group.label}
                  group={group}
                  bearers={groupBearers}
                  groupIndex={groupIndex}
                  isLarge={groupIndex === 0}
                />
              )
            })}
          </div>
        )}
      </Container>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider accent />
      </div>
    </section>
  )
}
