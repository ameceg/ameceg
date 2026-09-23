import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { TeamHero } from '@/components/team/team-hero'
import { StaffLeadership } from '@/components/team/staff-leadership'
import { GeneralSecretaries } from '@/components/team/general-secretaries'
import { OfficeBearersSection } from '@/components/team/office-bearers-section'
import { DomainsIntro } from '@/components/team/domains-intro'
import { DomainSection } from '@/components/team/domain-section'
import { TeamClosing } from '@/components/team/team-closing'
import { DomainChapterTracker } from '@/components/team/domain-chapter-tracker'
import { getMembers } from '@/lib/payload-data'
import { buildTeamPresentationData } from '@/data/team-presentation'

export const metadata: Metadata = {
  title: 'Team | Association of Manufacturing Engineers',
  description:
    'Meet the people behind AME — the staff leadership, general secretaries, office bearers, and domain heads of the Association of Manufacturing Engineers, CEG, Anna University. 2026–27.',
}

/**
 * The 8 AME domains in display order.
 * These slugs should match the domain slugs in the CMS (or the domain names
 * are matched case-insensitively as a fallback).
 */
const DOMAIN_ORDER = [
  { number: '01', name: 'Logistics' },
  { number: '02', name: 'HR & Hospitality' },
  { number: '03', name: 'Marketing & Media' },
  { number: '04', name: 'Design & Promo' },
  { number: '05', name: 'Contents & Documentation' },
  { number: '06', name: 'Industrial Relations' },
  { number: '07', name: 'Web Development' },
  { number: '08', name: 'Events' },
] as const

export default async function TeamPage() {
  // Server-side data fetch — cached via unstable_cache in payload-data.ts
  const members = await getMembers()

  // Apply presentation mapping layer
  const { officeBearers, domainHeadsMap } = buildTeamPresentationData(members)

  return (
    <>
      <Navbar />
      <main className="relative bg-[#080B18]">
        {/* Floating chapter navigation for domains */}
        <DomainChapterTracker />

        {/* 01 — Hero */}
        <TeamHero />

        {/* 02 — Staff Leadership (President & Treasurer placeholder) */}
        <StaffLeadership />

        {/* 03 — General Secretaries */}
        <GeneralSecretaries bearers={officeBearers} />

        {/* 04 — Office Bearers (hierarchically grouped) */}
        <OfficeBearersSection bearers={officeBearers} />

        {/* 05 — Domains chapter transition */}
        <DomainsIntro />

        {/* 06 — The eight domain sections */}
        {DOMAIN_ORDER.map(({ number, name }, index) => {
          const heads = domainHeadsMap.get(name) || []
          return (
            <DomainSection
              key={number}
              domainNumber={number}
              domainName={name}
              heads={heads}
              alt={index % 2 === 1}
            />
          )
        })}

        {/* 07 — Closing */}
        <TeamClosing />
      </main>
      <Footer />
    </>
  )
}