import type { Metadata } from 'next'

import { EventsSection } from '@/components/events/events-section'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Events | Association of Manufacturing Engineers',
  description:
    'Workshops, symposiums and talks from the Association of Manufacturing Engineers (AME), CEG, Anna University — with dates, venues and registration links.',
}

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <EventsSection />
      </main>
      <Footer />
    </>
  )
}