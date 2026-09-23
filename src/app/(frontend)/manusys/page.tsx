import { ArrowDown, CalendarDays, CircleChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/data/site'

export const metadata = {
  title: 'MANUSYS | Association of Manufacturing Engineers',
  description:
    'MANUSYS (Manufacturing Systems) — the flagship 3-day technical symposium of the Association of Manufacturing Engineers, CEG, Anna University. Coming soon.',
}

export default function ManusysPage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-20 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18),transparent_60%)]"
      />

      <p className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
        <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
        Coming soon
      </p>

      <h1 className="relative z-10 mt-8 text-5xl font-black tracking-tighter text-white drop-shadow-lg sm:text-7xl md:text-8xl lg:text-[10rem]">
        MANU<span className="text-primary">SYS.</span>
      </h1>

      <p className="relative z-10 mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
        Manufacturing Systems · {siteConfig.fullName}
      </p>

      <p className="relative z-10 mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
        The flagship 3-day technical symposium of AME is being prepped — competitions, workshops,
        paper presentations, guest lectures, non-technical events and sports. The full lineup lands
        here soon.
      </p>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-white/80">
        <span className="flex items-center gap-2">
          <CalendarDays className="size-4 text-primary" aria-hidden="true" />
          Dates to be announced
        </span>
        <span aria-hidden="true" className="hidden size-1 rounded-full bg-white/25 sm:block" />
        <span className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          College of Engineering Guindy, Chennai
        </span>
      </div>

      <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-5">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-2xl active:scale-95"
        >
          <span className="text-sm font-bold md:text-base">Get notified</span>
          <CircleChevronRight
            className="size-5 transition-transform duration-300 group-hover:-rotate-15 md:size-6"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-3.5 font-bold text-white transition-colors duration-300 hover:border-white"
        >
          <span className="text-sm font-bold md:text-base">Back to AME</span>
        </Link>
      </div>

      <a
        href="#details"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">What&rsquo;s inside</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </a>

      <section
        id="details"
        className="relative z-10 mx-auto mt-40 max-w-3xl border-t border-white/10 pt-12 text-left"
      >
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Three days, <span className="text-primary">everything manufacturing.</span>
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-2">
          {[
            'Technical events & competitions',
            'Hands-on workshops',
            'Paper presentations',
            'Guest lectures from industry',
            'Non-technical events',
            'Cricket, football, badminton, basketball',
            'Professional development sessions',
            'Industrial visits',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2 size-1.5 shrink-0 rotate-45 bg-primary"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}