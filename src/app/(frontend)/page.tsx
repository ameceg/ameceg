import { About } from '@/components/home/about'
import { FlagshipEvent } from '@/components/home/flagship-event'
import { Hero } from '@/components/home/hero'
import { RecentEvents } from '@/components/home/recent-events'
import { Team } from '@/components/home/team'
import { Footer } from '@/components/layout/footer'
import { LogoReveal } from '@/components/layout/logo-reveal'
import { Navbar } from '@/components/layout/navbar'

export default async function HomePage() {
  return (
    <>
      <LogoReveal dataReady={true} />
      <Navbar />

      <main>
        <Hero />
        <About />
        <RecentEvents />
        <FlagshipEvent />
        <Team />
      </main>

      <Footer />
    </>
  )
}