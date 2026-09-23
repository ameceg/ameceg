'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import type { Event, Media } from '@/payload-types'

export type HomeEvent = Omit<Event, 'featuredImage'> & {
  featuredImage: Media | null
  upcoming: boolean
}

function shortDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const year = date.toLocaleDateString('en-US', { year: '2-digit' })
  return `${month} ’${year}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const eventCardSizes =
  'min-w-55 w-70 md:min-w-85 md:w-85 lg:min-w-32 lg:w-64 xl:min-w-[350px] xl:w-[350px] 2xl:min-w-[360px] 2xl:w-[360px] h-95 lg:h-[300px] xl:h-[400px] 2xl:h-[420px]'

const ctaCardSizes =
  'min-w-55 w-70 md:min-w-85 md:w-85 lg:min-w-32 lg:w-64 xl:min-w-[420px] xl:w-[420px] 2xl:min-w-[460px] 2xl:w-[460px] h-95 lg:h-[300px] xl:h-[460px] 2xl:h-[500px]'

export function RecentEvents({ events }: { events: HomeEvent[] }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const [spacerHeight, setSpacerHeight] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const measure = () => {
      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth)
      setSpacerHeight(reduceMotion ? 120 : maxTranslate + 120)
    }

    let raf = 0
    const onScroll = () => {
      if (reduceMotion) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth)
        if (maxTranslate <= 0) return
        const startY = section.getBoundingClientRect().top + window.scrollY
        const progress = clamp((window.scrollY - startY) / maxTranslate, 0, 1)
        setTranslateX(-progress * maxTranslate)
      })
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const trackClassName =
    `flex items-center gap-4 px-4 pb-8 sm:pb-8 md:gap-6 md:px-8 ` +
    (translateX === 0 ? 'w-auto overflow-x-auto' : 'w-max overflow-visible')

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative scroll-mt-20 border-y border-border bg-background"
    >
      <div className="sticky top-0 mb-4 min-h-screen w-full overflow-hidden bg-background sm:min-h-[100svh]">
        <div className="absolute left-0 right-0 top-2 z-20 px-4 pt-8 md:px-8 md:pt-12">
          <div className="mx-auto max-w-4xl text-center md:mt-1 lg:mt-6">
            <h2 className="bg-linear-to-r from-foreground to-foreground bg-clip-text py-3 text-4xl font-extrabold tracking-tight text-transparent md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
              AME <span className="text-primary">in action.</span>
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground xl:text-lg">
              From your first 3D print to your first paper presentation &mdash; a look at what keeps
              the department moving. Every event is a room where{' '}
              <span className="font-bold text-primary">manufacturing comes alive.</span>
            </p>
          </div>
        </div>

        <div className="absolute -bottom-10 left-0 right-0 z-10 mb-10 flex h-1/2 items-center pb-10 lg:-bottom-12 xl:-bottom-8">
          <div
            ref={trackRef}
            className={trackClassName}
            style={{ transform: translateX !== 0 ? `translateX(${translateX}px)` : undefined }}
          >
            {events.length === 0 ? (
              <div
                className={`relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl bg-card text-center ${eventCardSizes}`}
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  No events yet
                </p>
                <h4 className="mt-3 max-w-[20ch] px-6 text-xl font-black tracking-tight text-foreground">
                  The first event is being planned.
                </h4>
                <a
                  href="/events"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Explore events
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            ) : (
              events.map((event, index) => {
                const media = event.featuredImage
                const isMany = events.length > 1
                const external = event.upcoming && Boolean(event.registrationLink)
                const href =
                  event.upcoming && event.registrationLink ? event.registrationLink : '/events'
                const label = !event.upcoming
                  ? 'Event wrapped'
                  : event.registrationLink
                    ? 'Register now'
                    : 'Details coming soon'

                return (
                  <a
                    key={event.id}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    aria-label={event.title}
                    className={`group relative block shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ${eventCardSizes}`}
                  >
                    {media?.url ? (
                      <Image
                        src={media.url}
                        alt={media.alt || event.title}
                        fill
                        sizes="(min-width: 2048px) 360px, (min-width: 1024px) 256px, (min-width: 768px) 340px, 280px"
                        className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary/60">
                          AME · Event
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                            {shortDate(event.eventDate)}
                          </span>
                          {event.upcoming ? (
                            <span className="rounded-full border border-white/25 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                              Upcoming
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mb-2 line-clamp-2 text-lg font-bold leading-snug xl:text-xl">
                          {event.title}
                        </h4>
                        <p className="flex items-center gap-1.5 text-xs font-medium text-primary sm:text-sm">
                          {label}
                          <ArrowRight
                            className="size-4 transition-transform duration-500 sm:group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                    </div>
                    {isMany ? (
                      <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    ) : null}
                  </a>
                )
              })
            )}

            <div
              className={`relative shrink-0 cursor-pointer overflow-hidden rounded-2xl ${ctaCardSizes}`}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-12 md:gap-10">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Beyond the lineup
                </p>
                <h3 className="text-balance text-center text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  There&rsquo;s always a seat in the front row.
                </h3>
                <div className="flex flex-col items-center gap-5">
                  <a
                    href="/events"
                    className="group inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-8 py-4 font-black shadow-xl transition-all duration-200 sm:hover:scale-105 sm:hover:shadow-2xl"
                  >
                    <span className="text-[15px] text-primary-foreground">Explore all events</span>
                    <ArrowRight
                      className="size-4 text-primary-foreground transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-foreground/25 bg-background px-8 py-4 font-black text-foreground transition-all duration-200 sm:hover:scale-105 sm:hover:border-foreground"
                  >
                    <span className="text-[15px]">Host an event</span>
                  </a>
                </div>

                <span
                  className="rotate-[-2deg] text-base font-bold leading-snug text-primary"
                  style={{ fontFamily: 'cursive' }}
                >
                  you can now host events with us...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="w-full" style={{ height: spacerHeight }} />
    </section>
  )
}