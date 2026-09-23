import { ArrowUpRight, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'

import { ContactForm } from '@/components/contact/contact-form'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from '@/components/icons/social'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { siteConfig } from '@/data/site'

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  GitHub: GitHubIcon,
  YouTube: YouTubeIcon,
} as const

const contactCards = [
  {
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
  },
  {
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'Location',
    value: siteConfig.address,
    Icon: MapPin,
  },
]

export function ContactSection() {
  return (
<section className="border-b border-border bg-background py-14 sm:py-20">
      <Container>
        <Reveal className="mb-8 text-center sm:mb-10">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Get in touch
          </span>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-7xl">
            Let&rsquo;s start a <span className="text-primary">Conversation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-balance text-muted-foreground">
            Have questions about the {siteConfig.fullName}? Want to collaborate?
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-14">
          <Reveal className="order-2 lg:order-1 lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-2">
            <div className="space-y-7 lg:sticky lg:top-28">
              <div className="space-y-4">
                {contactCards.map((card) => {
                  const { label, value, Icon } = card
                  const content = (
                    <>
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                        <Icon className="size-5 text-primary" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted-foreground">{label}</span>
                        <span className="mt-0.5 block font-semibold text-foreground">{value}</span>
                      </span>
                    </>
                  )

                  if ('href' in card) {
                    return (
                      <a
                        key={label}
                        href={card.href}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/40"
                      >
                        {content}
                        <ArrowUpRight
                          className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </a>
                    )
                  }

                  return (
                    <div
                      key={label}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4"
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4 border-t border-border pt-8">
                <p className="mb-4 text-sm text-muted-foreground">Follow us</p>
                <div className="flex flex-wrap gap-3">
                  {siteConfig.socials.map((social) => {
                    const Icon = socialIcons[social.label as keyof typeof socialIcons]
                    if (!Icon) return null
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Icon className="size-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#1d1b4b] via-[#2a2a66] to-[#3b38a0] p-5 text-white">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                    <MessageSquare className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="mb-1 font-bold">Quick response</h4>
                    <p className="text-sm leading-relaxed text-white/80">
                      We typically respond within a couple of business days. For urgent matters, call
                      us directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}