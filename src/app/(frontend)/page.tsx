import { About } from '@/components/home/about'
import { FlagshipEvent } from '@/components/home/flagship-event'
import { Hero } from '@/components/home/hero'
import { RecentEvents } from '@/components/home/recent-events'
import { Team } from '@/components/home/team'
import { Footer } from '@/components/layout/footer'
import { LogoReveal } from '@/components/layout/logo-reveal'
import { Navbar } from '@/components/layout/navbar'
import { buildTeamPresentationData } from '@/data/team-presentation'
import {
  getEvents,
  getMembers,
  type PopulatedEvent,
  type PopulatedOfficeBearer,
} from '@/lib/payload-data'

function isUpcoming(value: string): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

const HOME_TEAM_POSITIONS: PopulatedOfficeBearer['position'][] = [
  'general-secretary-male',
  'general-secretary-female',
  'student-treasurer',
  'events-secretary',
  'head-of-alumni-relations',
]

export default async function HomePage() {
  const events = await getEvents()

  // Fetch members and apply the presentation mapping layer (same as /team page)
  const members = await getMembers()

  const { officeBearers } = buildTeamPresentationData(members)

  const teamBearers = HOME_TEAM_POSITIONS.map((position) =>
    officeBearers.find((bearer) => bearer.position === position),
  ).filter((bearer): bearer is PopulatedOfficeBearer => Boolean(bearer))

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

  const showcase = [...upcoming, ...past].slice(0, 8).map((event) => ({
    ...event,
    upcoming: isUpcoming(event.eventDate),
  }))

  return (
    <>
      <LogoReveal dataReady={true} />
      <Navbar />

      <main>
        <Hero />
        <About />
        <RecentEvents events={showcase} />
        <FlagshipEvent />
        <Team bearers={teamBearers} />
      </main>

      <Footer />
    </>
  )
}