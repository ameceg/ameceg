export type Event = {
  title: string
  date: string
  description: string
  image: string
  cta: {
    label: string
    href: string
  }
}

// TODO: Replace with data from the Payload `events` collection.
export const recentEvents: Event[] = [
  {
    title: 'Introduction to Additive Manufacturing',
    date: 'September 2026',
    description:
      'A hands-on session introducing students to 3D printing, materials and design-for-AM workflows.',
    image: '/images/placeholder-event.svg',
    cta: {
      label: 'View event',
      href: '#events',
    },
  },
  {
    title: 'Smart Manufacturing Workshop',
    date: 'August 2026',
    description:
      'A workshop exploring IoT-enabled production, data collection and digital twins in factories.',
    image: '/images/placeholder-event.svg',
    cta: {
      label: 'View event',
      href: '#events',
    },
  },
  {
    title: 'Campus Recruitment & Career Talk',
    date: 'August 2026',
    description:
      'Industry mentors share insights on careers in manufacturing, supply chain and engineering management.',
    image: '/images/placeholder-event.svg',
    cta: {
      label: 'View event',
      href: '#events',
    },
  },
]

export const flagshipEvent = {
  name: 'Manusys',
  tagline: 'The flagship national-level technical symposium of AME.',
  description:
    'Manusys brings students, researchers and industries together for competitions, paper presentations, workshops and keynote sessions across manufacturing engineering.',
  date: 'To be announced',
  venue: 'College of Engineering Guindy, Anna University',
  image: '/images/placeholder-flagship.svg',
  cta: {
    label: 'Register interest',
    href: '#contact',
  },
}