import type { Metadata } from 'next'

import { EventsSection } from '@/components/events/events-section'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { getEvents, type PopulatedEvent } from '@/lib/payload-data'

export const metadata: Metadata = {
  title: 'Events | Association of Manufacturing Engineers',
  description:
    'Workshops, symposiums and talks from the Association of Manufacturing Engineers (AME), CEG, Anna University — with dates, venues and registration links.',
}

function isUpcoming(value: string): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

export default async function EventsPage() {
  const events = await getEvents()

  const upcoming: PopulatedEvent[] = []
  const past: PopulatedEvent[] = []

  for (const event of events) {
    if (isUpcoming(event.eventDate)) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  }

  past.reverse()

  return (
    <>
      <Navbar />
      <main>
        <EventsSection upcoming={upcoming} past={past} />
      </main>
      <Footer />
    </>
  )
}