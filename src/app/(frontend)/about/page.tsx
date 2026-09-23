import type { Metadata } from 'next'

import { AboutSection } from '@/components/about/about-section'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'About | Association of Manufacturing Engineers',
  description:
    'Learn about AME, the Association of Manufacturing Engineers — the student association of the Department of Manufacturing Engineering, CEG, Anna University. Our mission, our people, MANUSYS and sponsorship opportunities.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-[#080B18]">
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}