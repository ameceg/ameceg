'use client'

import { AlertCircle, CalendarDays, Loader2, MapPin, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import { richTextToText } from '@/lib/richtext'
import type { Event, Media } from '@/payload-types'

type PopulatedEvent = Omit<Event, 'featuredImage'> & {
  featuredImage: Media | null
}

type ListResult<T> = {
  docs: T[]
  totalDocs: number
}

const eventCardSizes =
  'flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card'

function shortDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isUpcoming(value: string): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

function EventPhoto({ event }: { event: PopulatedEvent }) {
  const media = event.featuredImage

  if (media?.url) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={media.url}
          alt={media.alt || event.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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

function EventCard({ event }: { event: PopulatedEvent }) {
  const description = richTextToText(event.description)

  return (
    <article className={cn(eventCardSizes, 'group')}>
      <EventPhoto event={event} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {shortDate(event.eventDate)}
          </span>
          {isUpcoming(event.eventDate) ? (
            <span className="rounded-full border border-primary/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Upcoming
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold tracking-tight text-foreground">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Date</dt>
            <dd>{shortDate(event.eventDate)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Venue</dt>
            <dd>{event.venue}</dd>
          </div>
        </dl>

        {event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Register
          </a>
        ) : (
          <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground">
            Details coming soon
          </span>
        )}
      </div>
    </article>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
      <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      <span className="text-sm font-medium">Loading the events…</span>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
      <AlertCircle className="size-8 text-destructive" aria-hidden="true" />
      <div>
        <p className="text-lg font-bold text-foreground">Couldn&rsquo;t load the events</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching the calendar. Please try again.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  )
}

export function EventsSection() {
  const [events, setEvents] = useState<PopulatedEvent[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function fetchEvents() {
      try {
        const query = new URLSearchParams({
          depth: '2',
          limit: '0',
          'where[isPublished][equals]': 'true',
          sort: 'eventDate',
        })

        const response = await fetch(`/api/events?${query.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }

        const data = (await response.json()) as ListResult<PopulatedEvent>

        if (cancelled) return

        setEvents(data.docs ?? [])
        setStatus('ready')
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    void fetchEvents()

    return () => {
      cancelled = true
    }
  }, [attempt])

  const upcoming = useMemo(
    () => events.filter((event) => isUpcoming(event.eventDate)),
    [events],
  )

  const past = useMemo(() => events.filter((event) => !isUpcoming(event.eventDate)), [events])

  return (
    <section className="relative w-full overflow-hidden">
      <div className="border-b border-border bg-background">
        <Container className="py-14 sm:py-20">
          <Reveal className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Events
            </span>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-7xl">
              Where AME <span className="text-primary">shows up.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-balance text-muted-foreground">
              Workshops, symposiums and talks from across the department — with dates, venues and
              registration links for everything coming up.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">
        {status === 'loading' ? <LoadingState /> : null}
        {status === 'error' ? (
          <ErrorState
            onRetry={() => {
              setStatus('loading')
              setAttempt((current) => current + 1)
            }}
          />
        ) : null}

        {status === 'ready' ? (
          <div className="space-y-20">
            <section aria-labelledby="upcoming-events-heading">
              <Reveal className="mb-10">
                <h2
                  id="upcoming-events-heading"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  Upcoming events
                </h2>
              </Reveal>

              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  The next set of events will be announced soon.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((event, index) => (
                    <Reveal key={event.id} delay={index * 60} className="h-full">
                      <EventCard event={event} />
                    </Reveal>
                  ))}
                </div>
              )}
            </section>

            {past.length > 0 ? (
              <section aria-labelledby="past-events-heading">
                <Reveal className="mb-10">
                  <h2
                    id="past-events-heading"
                    className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                  >
                    Recently wrapped
                  </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((event, index) => (
                    <Reveal key={event.id} delay={index * 60} className="h-full">
                      <EventCard event={event} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  )
}