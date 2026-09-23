import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/data/site'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#0A0C1B] text-slate-100 border-b border-slate-800/60"
    >
      {/* Background Ambient Glows & Diagonal Lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] sm:w-[800px] sm:h-[800px]" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[100px] sm:w-[500px] sm:h-[500px]" />
        <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute -top-[20%] left-1/3 h-[140%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-[35deg]" />
        <div className="absolute -top-[20%] right-1/4 h-[140%] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-[35deg]" />
      </div>

      {/* Giant "AME" Watermark Typography */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-6 z-0 select-none font-black leading-none tracking-tighter text-slate-800/20 sm:bottom-8 sm:left-12 text-[18vw]"
      >
        AME
      </span>

      <Container className="relative z-10 grid grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">

        {/* Left Content Column */}
        <div className="lg:col-span-7 xl:col-span-7">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-blue-200 shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] backdrop-blur-md ring-1 ring-white/5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </span>
            <span>Association of Manufacturing Engineers</span>
          </div>

          {/* Headline - Added padding and safe line heights to prevent clipping */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
            <span className="block text-slate-100">Shaping the future of</span>
            <span className="block bg-blue-400 bg-clip-text text-transparent pb-3 pt-1">
              Manufacturing
            </span>
          </h1>

          {/* Description */}
          <p className="mt-2 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            {siteConfig.description} Bridging the gap between academic theory and industrial excellence.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#about"
              className={buttonVariants({
                variant: 'default',
                size: 'lg',
                className:
                  'group/cta relative flex h-12 sm:h-14 items-center gap-2.5 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/50 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)]',
              })}
            >
              Discover AME
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <a
              href="#team"
              className="group inline-flex h-12 sm:h-14 items-center gap-2.5 rounded-xl border border-slate-700/50 bg-slate-800/30 px-6 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/80 hover:text-white"
            >
              Meet the Board
            </a>
          </div>
        </div>

        {/* Right Graphic/Logo Visual Column (Untouched) */}
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">

            <div className="relative group">
              <Image
                src="/images/hero.png"
                alt="AME Manufacturing Engineering Logo"
                width={340}
                height={340}
                priority
                className="relative z-10 size-auto max-h-72 object-contain filter drop-shadow-[0_10px_25px_rgba(59,130,246,0.35)] transition-transform duration-500 group-hover:scale-105"
              />

              <figcaption className="absolute -bottom-4 left-2 z-20 inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                Dept. of Manufacturing Engineering · CEG
              </figcaption>
            </div>

          </div>
        </div>

      </Container>
    </section>
  )
}