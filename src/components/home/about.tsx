import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { siteConfig } from '@/data/site'

const identity = [
  { label: 'Department', value: 'Manufacturing Engineering' },
  { label: 'University', value: 'Anna University' },
  { label: 'College', value: 'College of Engineering Guindy' },
  { label: 'Campus', value: 'Chennai' },
]

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <span
        aria-hidden="true"
        className="txt-outline-faint pointer-events-none absolute -right-8 top-16 select-none whitespace-nowrap font-black leading-[0.8] tracking-tighter lg:top-24"
        style={{ fontSize: 'clamp(10rem, 22vw, 24rem)' }}
      >
        AME
      </span>

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal from="right" className="lg:col-span-5">
          <figure className="group">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src="/images/placeholder-about.svg"
                alt="Placeholder — AME members at CEG"
                width={800}
                height={1000}
                className="aspect-[4/5] size-full object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-md bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
              <span className="size-1.5 rotate-45 bg-primary" aria-hidden="true" />
              CEG · Anna University
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <ChapterHeading
            number="01"
            eyebrow="Discover"
            title={
              <>
                More than a club —{' '}
                <span className="text-primary">where engineers are made.</span>
              </>
            }
            description={`${siteConfig.description} We aim to give members practical, hands-on experience that complements their academic work.`}
          />

          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {identity.map((item) => (
              <div key={item.label} className="bg-background p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold tracking-tight text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#events"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'group/cta h-11 gap-2 px-7',
              })}
            >
              See what we do
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href={siteConfig.manusys.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Our flagship — {siteConfig.manusys.label}
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}