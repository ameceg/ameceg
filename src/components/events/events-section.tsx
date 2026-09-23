'use client'

import { ArrowUpRight, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import { richTextToText } from '@/lib/richtext'
import type { Event, Media } from '@/payload-types'

type PopulatedEvent = Omit<Event, 'featuredImage'> & {
  featuredImage: Media | null
}

type DateParts = {
  day: string
  month: string
  year: string
  short: string
  full: string
}

function dateParts(value: string): DateParts | null {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return {
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.toLocaleDateString('en-US', { year: 'numeric' }),
    short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    full: date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }
}

function DateTile({ parts }: { parts: DateParts }) {
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-background shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
        {parts.month}
      </span>
      <span className="text-2xl font-black leading-none text-foreground">{parts.day}</span>
    </div>
  )
}

function EventPhoto({ event, dim }: { event: PopulatedEvent; dim?: boolean }) {
  const media = event.featuredImage

  if (media?.url) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={media.url}
          alt={media.alt || event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            'object-cover transition-transform duration-700 group-hover:scale-105',
            dim && 'saturate-[0.65]',
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 to-primary/5">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">
        AME · Event
      </span>
    </div>
  )
}

function EventCard({ event, dim }: { event: PopulatedEvent; dim?: boolean }) {
  const description = richTextToText(event.description)
  const parts = dateParts(event.eventDate)

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300',
        'hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_60px_-32px_rgba(31,35,58,0.45)]',
        dim && 'opacity-80 hover:opacity-100',
      )}
    >
      <div className="relative">
        <EventPhoto event={event} dim={dim} />

        {parts ? (
          <div className="absolute bottom-3 left-3">
            <DateTile parts={parts} />
          </div>
        ) : null}

        {!dim ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="size-3" aria-hidden="true" />
            Upcoming
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-foreground">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Date</dt>
            <dd>{parts?.short ?? event.eventDate}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Venue</dt>
            <dd className="truncate">{event.venue}</dd>
          </div>
        </dl>

        {dim ? (
          <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground">
            Event wrapped
          </span>
        ) : event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Register
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground">
            Details coming soon
          </span>
        )}
      </div>
    </article>
  )
}

function FeaturedEvent({ event }: { event: PopulatedEvent }) {
  const description = richTextToText(event.description)
  const parts = dateParts(event.eventDate)
  const media = event.featuredImage

  return (
    <Reveal>
      <article className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-5">
        <div className="relative aspect-[16/10] overflow-hidden lg:col-span-2 lg:aspect-auto">
          {media?.url ? (
            <Image
              src={media.url}
              alt={media.alt || event.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">
                AME · Event
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />

          {parts ? (
            <div className="absolute bottom-4 left-4">
              <DateTile parts={parts} />
            </div>
          ) : null}

          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="size-3" aria-hidden="true" />
            Next up
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-3 lg:p-10">
          <p className="flex items-center gap-3">
            <span className="font-mono text-[12px] font-bold text-foreground/40">FEATURED</span>
            <span className="h-px w-10 bg-border" aria-hidden="true" />
          </p>

          <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-balance text-foreground sm:text-3xl">
            {event.title}
          </h3>

          <p className="mt-3 line-clamp-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>

          <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <dt className="sr-only">Date</dt>
              <dd className="font-medium text-foreground">{parts?.full ?? event.eventDate}</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <dt className="sr-only">Venue</dt>
              <dd className="truncate font-medium text-foreground">{event.venue}</dd>
            </div>
          </dl>

          <div className="mt-8">
            {event.registrationLink ? (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Register for this event
                <ArrowUpRight
                  className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground">
                Details coming soon
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function UpcomingEmptyState() {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CalendarDays className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">The next lineup is brewing.</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Our upcoming events will be announced here soon. In the meantime, reach out to the
            executive council if you&rsquo;d like to collaborate.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Get in touch
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </Reveal>
  )
}

function SectionTitle({
  number,
  eyebrow,
  title,
  count,
  id,
}: {
  number: string
  eyebrow: string
  title: string
  count: number
  id: string
}) {
  return (
    <Reveal className="mb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3">
            <span className="font-mono text-[12px] font-bold text-foreground/40">{number}</span>
            <span className="h-px w-10 bg-border" aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-primary">
              {eyebrow}
            </span>
          </p>
          <h2
            id={id}
            className="mt-6 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </h2>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold tabular-nums text-muted-foreground">
          {count} event{count === 1 ? '' : 's'}
        </span>
      </div>
    </Reveal>
  )
}

export function EventsSection({
  upcoming,
  past,
}: {
  upcoming: PopulatedEvent[]
  past: PopulatedEvent[]
}) {
  const featured = upcoming[0]
  const rest = upcoming.slice(1)

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative overflow-hidden border-b border-border bg-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-40%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <Container className="relative py-16 text-center sm:py-24">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              AME · Events
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-black leading-[0.92] tracking-tight text-balance text-foreground">
              Where AME <span className="text-primary">shows up.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-muted-foreground">
              Workshops, symposiums and talks from across the department — with dates, venues and
              registration links for everything coming up.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <span>{upcoming.length} upcoming</span>
              <span className="size-1 rounded-full bg-primary/40" aria-hidden="true" />
              <span>{past.length} wrapped</span>
            </div>
          </Reveal>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">
        <div className="space-y-20">
          <section aria-labelledby="upcoming-heading" id="upcoming">
            <SectionTitle
              id="upcoming-heading"
              number="01"
              eyebrow="Live now"
              title="Upcoming events"
              count={upcoming.length}
            />

            {featured ? <FeaturedEvent event={featured} /> : <UpcomingEmptyState />}

            {rest.length > 0 ? (
              <Reveal delay={120} className="mt-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </Reveal>
            ) : null}
          </section>

          {past.length > 0 ? (
            <section aria-labelledby="past-heading" id="past">
              <SectionTitle
                id="past-heading"
                number="02"
                eyebrow="Archive"
                title="Recently wrapped"
                count={past.length}
              />

              <Reveal>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} dim />
                  ))}
                </div>
              </Reveal>
            </section>
          ) : null}
        </div>
      </Container>
    </section>
  )
}