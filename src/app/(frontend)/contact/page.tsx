import type { Metadata } from 'next'

import { ContactSection } from '@/components/contact/contact-section'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Contact | Association of Manufacturing Engineers',
  description:
    'Get in touch with the Association of Manufacturing Engineers (AME), Department of Manufacturing Engineering, CEG, Anna University.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}