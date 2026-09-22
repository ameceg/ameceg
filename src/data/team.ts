export type TeamMember = {
  name: string
  position: string
  bio: string
  image: string
  links?: {
    linkedin?: string
    instagram?: string
    github?: string
  }
}

// TODO: Replace with members from the Payload `members` / `office-bearers` collections.
export const teamMembers: TeamMember[] = [
  {
    name: 'Aarav Sharma',
    position: 'President',
    bio: 'Leads the association and steers AME events and initiatives for the year.',
    image: '/images/placeholder-team.svg',
    links: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    name: 'Meera Krishnan',
    position: 'Vice President',
    bio: 'Coordinates committees, industry outreach and cross-department collaboration.',
    image: '/images/placeholder-team.svg',
    links: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Vikram Iyer',
    position: 'General Secretary',
    bio: 'Manages the day-to-day functioning, records and communication of AME.',
    image: '/images/placeholder-team.svg',
    links: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Sneha Ramesh',
    position: 'Events Secretary',
    bio: 'Plans and executes workshops, technical events and the Manusys symposium.',
    image: '/images/placeholder-team.svg',
    links: {
      instagram: 'https://instagram.com',
    },
  },
  {
    name: 'Arjun Nair',
    position: 'Treasurer',
    bio: 'Manages the association finances, sponsorships and budget allocation.',
    image: '/images/placeholder-team.svg',
    links: {
      linkedin: 'https://linkedin.com',
    },
  },
]