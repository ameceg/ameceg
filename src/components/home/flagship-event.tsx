'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDays, CircleChevronRight, MapPin } from 'lucide-react'

import { flagshipEvent } from '@/data/events'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function FlagshipEvent() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (reduceMotion) {
          setProgress(1)
          return
        }
        const rect = section.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        if (total <= 0) return
        setProgress(clamp(-rect.top / total, 0, 1))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const shutterHeight = `${(1 - progress) * 50}%`

  const reveal = clamp((progress - 0.12) / 0.5, 0, 1)
  const rise = (1 - reveal) * 40
  const titleScale = 0.96 + reveal * 0.04

  return (
    <section
      ref={sectionRef}
      id="flagship"
      aria-label="Manusys — flagship symposium"
      className="relative h-[300vh] w-full bg-black"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-black px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.16),transparent_60%)]" />
          <div className="relative flex flex-col items-center gap-5">
            <p
              className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-primary"
              style={{ opacity: reveal, transform: `translateY(${rise}px)` }}
            >
              AME presents
            </p>
            <h2
              className="text-5xl font-black tracking-tighter text-white drop-shadow-lg md:text-7xl lg:text-9xl"
              style={{
                opacity: reveal,
                transform: `translateY(${rise}px) scale(${titleScale})`,
              }}
            >
              MANU<span className="text-primary">SYS.</span>
            </h2>
            <p
              className="max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg"
              style={{ opacity: reveal, transform: `translateY(${rise}px)` }}
            >
              {flagshipEvent.tagline}
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-white/80"
              style={{ opacity: reveal, transform: `translateY(${rise}px)` }}
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                {flagshipEvent.date}
              </span>
              <span aria-hidden="true" className="hidden size-1 rounded-full bg-white/25 sm:block" />
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {flagshipEvent.venue}
              </span>
            </div>
            <a
              href={flagshipEvent.cta.href}
              className="group mt-2 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-2xl active:scale-95 md:px-10 md:py-4"
              style={{ opacity: reveal, transform: `translateY(${rise}px)` }}
            >
              <span className="text-sm font-bold md:text-base">{flagshipEvent.cta.label}</span>
              <CircleChevronRight
                className="size-5 transition-transform duration-300 group-hover:-rotate-15 md:size-6"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div
          className="relative z-10 w-full overflow-hidden border-b-2 border-primary/50 bg-gradient-to-b from-zinc-950 via-[#151238] to-primary shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
          style={{ height: shutterHeight, willChange: 'height', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
            <div className="flex w-full max-w-6xl items-end justify-between gap-6 px-6 md:px-8">
              <div className="text-left">
                <h3 className="mb-2 font-mono text-xs tracking-widest text-white/80 md:text-sm">
                  WHEN
                </h3>
                <div className="flex items-center gap-2 text-lg font-bold text-white md:text-4xl">
                  <span className="size-2 rounded-full bg-primary md:size-3" aria-hidden="true" />
                  {flagshipEvent.date}
                </div>
              </div>
              <div className="hidden text-center md:block">
                <h2 className="select-none text-4xl font-black text-white/20 lg:text-8xl">
                  GET READY...
                </h2>
              </div>
              <div className="text-right">
                <h3 className="mb-2 font-mono text-xs tracking-widest text-white/80 md:text-sm">
                  WHERE
                </h3>
                <div className="max-w-[24ch] text-right text-lg leading-tight text-white md:text-2xl lg:text-4xl">
                  {flagshipEvent.venue}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative z-10 w-full overflow-hidden border-t-2 border-primary/50 bg-gradient-to-t from-zinc-950 via-[#151238] to-primary shadow-[0_-10px_50px_rgba(0,0,0,0.8)]"
          style={{ height: shutterHeight, willChange: 'height', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-8">
            <div className="flex w-full max-w-6xl justify-between gap-4 px-6 md:px-8">
              <div className="font-mono text-xs leading-relaxed text-white/60">
                REACH: Pan-India
                <br />
                IMPACT: Nationwide
              </div>
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 md:text-xs">
                  CEG · ANNA UNIVERSITY
                </p>
              </div>
              <div className="text-right font-mono text-xs leading-relaxed text-white/60">
                OPEN: Every department
                <br />
                STATUS: National-level
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
                Scroll Down
              </span>
              <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}