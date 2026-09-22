import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { GitHubIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/icons/social'
import { siteConfig } from '@/data/site'

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  GitHub: GitHubIcon,
  YouTube: YouTubeIcon,
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="flex w-full items-center justify-center overflow-hidden bg-[#e8eaff] py-8 sm:py-12 md:min-h-[90dvh] md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="relative mt-8 flex min-h-0 flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#1d1b4b] via-[#2a2a66] to-[#3b38a0] p-6 pb-10 sm:min-h-[520px] sm:rounded-2xl sm:p-8 md:rounded-3xl md:p-12 lg:min-h-[480px] lg:flex-row lg:p-12">
          <div className="z-10 mb-8 flex flex-1 flex-col justify-start lg:mb-0 lg:flex-[0.4]">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt={`${siteConfig.name} logo`}
                width={48}
                height={48}
                className="size-12 shrink-0"
              />
              <span className="font-black leading-none tracking-tighter text-white">
                {siteConfig.name}
                <span className="mt-1.5 block text-[10px] font-bold tracking-[0.18em] text-white/50">
                  CEG · ANNA UNIVERSITY
                </span>
              </span>
            </div>
            <h2 className="mb-6 text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl xl:text-5xl">
              Built by engineers,
              <br />
              for engineers.
            </h2>
            <a
              href="/contact"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#4038c8] px-6 py-3 text-sm font-bold text-white transition-transform duration-200 hover:scale-105 md:px-9 md:py-3.5 md:text-base"
            >
              <span className="whitespace-nowrap">Contact us</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="z-10 flex flex-1 flex-col justify-end gap-8 sm:flex-row lg:flex-[0.6] lg:gap-16">
            <div className="min-w-0 flex-shrink-0">
              <h4 className="mb-4 text-lg font-bold text-white md:text-xl">Explore</h4>
              <ul className="space-y-2 text-sm text-white/90">
                {siteConfig.nav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="transition-colors hover:text-white"
                    >
                      {item.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 flex-shrink-0">
              <h4 className="mb-4 text-lg font-bold text-white md:text-xl">Socials</h4>
              <div className="flex gap-4 text-white/90">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="transition-colors hover:text-white"
                    >
                      <Icon className="size-6" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="min-w-0 flex-shrink-0">
              <h4 className="mb-4 text-lg font-bold text-white md:text-xl">Contact Info</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex w-full max-w-xs items-start gap-2">
                  <MapPin className="mt-0.5 size-4 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-snug">{siteConfig.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full select-none items-end justify-center">
            <span className="absolute -bottom-0 w-full whitespace-nowrap px-4 text-center text-4xl font-black leading-none text-[#0e0c2e] opacity-60 sm:-bottom-2 sm:text-6xl md:text-7xl lg:-bottom-6 lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
              AME CEG
            </span>
          </div>
        </div>

        <div className="relative mt-6 flex flex-col items-center justify-between gap-2 text-sm text-foreground/70 sm:mt-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#hero"
              className="whitespace-nowrap font-medium transition-colors hover:text-primary"
            >
              Privacy policy
            </a>
            <a
              href="#hero"
              className="whitespace-nowrap font-medium transition-colors hover:text-primary"
            >
              Terms &amp; conditions
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2">
            <span className="font-medium opacity-70">Powered by</span>
            <a
              href="https://thinkclub.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Thinkclub"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/powered.webp"
                alt="Thinkclub"
                width={256}
                height={39}
                className="h-5 w-auto select-none"
              />
            </a>
          </div>

          <div className="text-center font-medium opacity-80">
            © {year} {siteConfig.fullName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}