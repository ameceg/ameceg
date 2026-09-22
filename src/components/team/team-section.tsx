'use client'

import { AlertCircle, Link2, Loader2, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from '@/components/icons/social'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import type {
  CommitteeMember,
  Domain,
  Media,
  Member,
  OfficeBearer,
} from '@/payload-types'
import { cn } from '@/lib/utils'
import { richTextToText } from '@/lib/richtext'

type PopulatedMember = Omit<Member, 'photo'> & { photo: Media }
type PopulatedOfficeBearer = Omit<OfficeBearer, 'member'> & { member: PopulatedMember }
type PopulatedCommitteeMember = Omit<CommitteeMember, 'member' | 'domain'> & {
  member: PopulatedMember
  domain: Domain
}

type ListResult<T> = {
  docs: T[]
  totalDocs: number
}

const OFFICE_POSITION_LABELS: Record<string, string> = {
  president: 'President',
  treasurer: 'Treasurer',
  'general-secretary-male': 'General Secretary (Male)',
  'general-secretary-female': 'General Secretary (Female)',
  'joint-secretary-male': 'Joint Secretary (Male)',
  'joint-secretary-female': 'Joint Secretary (Female)',
  'joint-secretary-pg': 'Joint Secretary (PG)',
  'assistant-secretary-male': 'Assistant Secretary (Male)',
  'assistant-secretary-female': 'Assistant Secretary (Female)',
  'student-treasurer': 'Student Treasurer',
  'events-secretary': 'Events Secretary',
}

const COMMITTEE_POSITION_LABELS: Record<string, string> = {
  head: 'Head',
  'junior-head': 'Junior Head',
  'sub-junior-head': 'Sub-Junior Head',
}

const COMMITTEE_POSITION_ORDER: Record<string, number> = {
  head: 0,
  'junior-head': 1,
  'sub-junior-head': 2,
}

const socialIcons: Record<string, (props: { className?: string }) => ReactNode> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  github: GitHubIcon,
  youtube: YouTubeIcon,
}

function SocialIcon({ platform }: { platform: string }) {
  const Icon = socialIcons[platform]
  if (!Icon) {
    return <Link2 className="size-4" aria-hidden="true" />
  }
  return <>{Icon({ className: 'size-4' })}</>
}

function MemberPhoto({ member, className }: { member: PopulatedMember; className?: string }) {
  const photo = member.photo
  const url = photo?.url
  const alt = photo?.alt || `${member.name} — AME`

  if (!url) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5 text-4xl font-bold text-primary/60',
          className,
        )}
      >
        {member.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={800}
      height={1000}
      className={cn('object-cover', className)}
      loading="lazy"
    />
  )
}

function SocialLinks({ member }: { member: PopulatedMember }) {
  const links = member.socialLinks
  if (!links || links.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={`${link.platform}-${link.id ?? link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on ${link.platform}`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
      <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      <span className="text-sm font-medium">Loading the team…</span>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
      <AlertCircle className="size-8 text-destructive" aria-hidden="true" />
      <div>
        <p className="text-lg font-bold text-foreground">Couldn&rsquo;t load the team</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching the roster. Please try again.
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

export function TeamSection() {
  const [bearers, setBearers] = useState<PopulatedOfficeBearer[]>([])
  const [committee, setCommittee] = useState<PopulatedCommitteeMember[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function fetchTeam() {
      try {
        const query = new URLSearchParams({
          depth: '2',
          limit: '0',
          'where[isActive][equals]': 'true',
        })

        const [bearersResponse, committeeResponse] = await Promise.all([
          fetch(`/api/office-bearers?${query.toString()}&sort=displayOrder`),
          fetch(`/api/committee-members?${query.toString()}`),
        ])

        if (!bearersResponse.ok || !committeeResponse.ok) {
          throw new Error('Failed to fetch team data')
        }

        const [bearersData, committeeData] = (await Promise.all([
          bearersResponse.json(),
          committeeResponse.json(),
        ])) as [ListResult<PopulatedOfficeBearer>, ListResult<PopulatedCommitteeMember>]

        if (cancelled) return

        setBearers(bearersData.docs ?? [])
        setCommittee(committeeData.docs ?? [])
        setStatus('ready')
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    void fetchTeam()

    return () => {
      cancelled = true
    }
  }, [attempt])

  const groupedCommittees = useMemo(() => {
    const groups = new Map<string, PopulatedCommitteeMember[]>()

    committee.forEach((member) => {
      const domain = member.domain
      const key = typeof domain === 'object' && domain ? String(domain.id) : 'general'
      const list = groups.get(key) ?? []
      list.push(member)
      groups.set(key, list)
    })

    return Array.from(groups.entries())
      .map(([key, members]) => {
        const domain = members[0]?.domain
        const name = typeof domain === 'object' && domain ? domain.name : 'General Committee'
        const description =
          typeof domain === 'object' && domain ? domain.description ?? '' : ''
        const id = typeof domain === 'object' && domain ? Number(domain.id) : null

        members.sort((a, b) => {
          const orderA = COMMITTEE_POSITION_ORDER[a.position] ?? 9
          const orderB = COMMITTEE_POSITION_ORDER[b.position] ?? 9
          if (orderA !== orderB) return orderA - orderB
          return (a.member.name ?? '').localeCompare(b.member.name ?? '')
        })

        return { key, id, name, description, members }
      })
      .sort((a, b) => {
        if (a.id !== null && b.id !== null) return a.id - b.id
        return a.name.localeCompare(b.name)
      })
  }, [committee])

  const officeLabel = (position: PopulatedOfficeBearer['position']) =>
    OFFICE_POSITION_LABELS[position] ?? position

  return (
    <section className="relative w-full overflow-hidden">
      <div className="border-b border-border bg-background">
        <Container className="py-14 sm:py-20">
          <Reveal className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Our team
            </span>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-7xl">
              The people behind <span className="text-primary">AME</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-balance text-muted-foreground">
              The office bearers and committee leads who run AME — every event, domain and
              initiative is driven by this team.
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
            <section aria-labelledby="office-bearers-heading">
              <Reveal className="mb-10">
                <h2
                  id="office-bearers-heading"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  Office bearers
                </h2>
              </Reveal>

              {bearers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  The office bearers for this year will be announced soon.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {bearers.map((bearer, index) => (
                    <Reveal
                      key={bearer.id}
                      delay={index * 60}
                      className="h-full"
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <MemberPhoto
                            member={bearer.member}
                            className="size-full transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur">
                            {officeLabel(bearer.position)}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-bold text-foreground">{bearer.member.name}</h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {richTextToText(bearer.member.bio)}
                          </p>
                          <div className="mt-auto">
                            <SocialLinks member={bearer.member} />
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </section>

            <section aria-labelledby="committees-heading">
              <Reveal className="mb-10">
                <h2
                  id="committees-heading"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  Domain committees
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Each domain is led by heads who drive AME&rsquo;s core verticals.
                </p>
              </Reveal>

              {groupedCommittees.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  The domain committees will be announced soon.
                </p>
              ) : (
                <div className="space-y-12">
                  {groupedCommittees.map((group, index) => (
                    <Reveal key={group.key} delay={index * 60}>
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">
                          {group.name}
                        </h3>
                        {group.description ? (
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {group.description}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {group.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4"
                          >
                            <MemberPhoto
                              member={member.member}
                              className="size-16 shrink-0 rounded-xl"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                {COMMITTEE_POSITION_LABELS[member.position] ?? member.position}
                              </span>
                              <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
                                {member.member.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : null}
      </Container>
    </section>
  )
}