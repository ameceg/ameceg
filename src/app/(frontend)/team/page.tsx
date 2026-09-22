import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { TeamSection } from '@/components/team/team-section'

export const metadata: Metadata = {
  title: 'Team | Association of Manufacturing Engineers',
  description:
    'Meet the office bearers and committee members behind the Association of Manufacturing Engineers (AME), CEG, Anna University.',
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}