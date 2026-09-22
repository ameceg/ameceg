import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@/components/icons/social'
import { Reveal } from '@/components/ui/reveal'
import { teamMembers } from '@/data/team'
import { cn } from '@/lib/utils'

const socialIcons = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  github: GitHubIcon,
} as const

const bentoSizes = [
  'sm:col-span-1 sm:row-span-3',
  'sm:col-span-1 sm:row-span-3',
  'sm:col-span-2 sm:row-span-4',
  'sm:col-span-2 sm:row-span-3',
  'sm:col-span-2 sm:row-span-2',
]

export function Team() {
  return (
    <section id="team" className="relative w-full overflow-hidden py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-[95%] flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 2xl:max-w-screen-2xl">
        <div className="flex w-full flex-col justify-center lg:w-[35%] lg:shrink-0 lg:pr-12 xl:pr-20">
          <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-6xl">
            The people behind{' '}
            <span className="text-primary">AME</span>
          </h2>

          <p className="mb-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every event, idea and experience is built by the people behind it.
          </p>

          <a
            href="#team"
            className="group flex w-max items-center gap-4 text-base font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-80"
          >
            <span>Meet the team</span>
            <span className="h-0.5 w-16 bg-primary transition-all duration-300 group-hover:w-20" />
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="flex w-full items-center justify-center lg:w-[65%]">
          <div className="w-full">
            <div className="grid grid-flow-row-dense grid-cols-1 gap-4 auto-rows-[250px] sm:grid-cols-4 sm:auto-rows-[45px] md:auto-rows-[60px] md:gap-5 lg:auto-rows-[75px] xl:auto-rows-[90px]">
              {teamMembers.map((member, index) => (
                <Reveal
                  key={member.name}
                  delay={index * 80}
                  className={cn(bentoSizes[index] ?? bentoSizes[3], 'h-full')}
                >
                  <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.position}`}
                      width={800}
                      height={1000}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 z-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                      <div className="flex size-9 scale-50 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 ease-out will-change-transform group-hover:scale-100 group-hover:opacity-100">
                        {member.links ? (
                          (() => {
                            const [network, href] = Object.entries(member.links)[0]
                            const NetworkIcon =
                              socialIcons[network as keyof typeof socialIcons]
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${member.name} on ${network}`}
                                className="pointer-events-auto"
                              >
                                <NetworkIcon className="size-5" aria-hidden="true" />
                              </a>
                            )
                          })()
                        ) : null}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                          {member.position}
                        </p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm font-bold leading-tight drop-shadow-md md:text-base">
                        {member.name}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}