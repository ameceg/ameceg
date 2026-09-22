import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/data/site'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-1/2 select-none whitespace-nowrap font-black leading-[0.8] tracking-tighter text-foreground/[0.04] lg:bottom-28"
        style={{ fontSize: 'clamp(12rem, 28vw, 30rem)' }}
      >
        AME
      </span>

      <Container className="relative grid grid-cols-1 gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-8">
          <p className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            <span className="size-2 rotate-45 bg-primary" aria-hidden="true" />
            {siteConfig.fullName}
          </p>

          <h1 className="mt-7 text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl lg:text-[4.75rem]">
            for manufacturing
            <span className="block text-primary">engineering at CEG</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteConfig.description} We run workshops, technical visits and events that put
            manufacturing theory into practice.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#about"
              className={buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'group/cta h-11 gap-2.5 px-7',
              })}
            >
              Explore AME
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#team"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Meet the team
              <ArrowRight
                className="size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="relative">
            <figure className="group relative lg:-mt-24">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted transition-all duration-300 lg:group-hover:-rotate-[0.4deg] lg:group-hover:scale-[1.01]">
                <Image
                  src="/images/logo.png"
                  alt="Photograph placeholder — manufacturing workshop at CEG"
                  width={500}
                  height={500}
                  priority
                  className="size-full transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-md bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
                <span className="size-1.5 rotate-45 bg-primary" aria-hidden="true" />
                Dept. of Manufacturing Engineering · CEG
              </figcaption>
            </figure>

            <a
              href={siteConfig.manusys.href}
              target="_blank"
              rel="noreferrer"
              className="group absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary sm:inline-flex"
            >
              {siteConfig.manusys.label}
              <ArrowUpRight
                className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}