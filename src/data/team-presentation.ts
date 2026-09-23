import type {
  PopulatedCommitteeMember,
  PopulatedMember,
  PopulatedOfficeBearer,
} from '@/lib/payload-data'

// TODO: Temporary AME 2026–27 presentation mapping.
// Remove once Payload team records are corrected.

/**
 * Normalizes a name for matching (lowercased, punctuation removed, single spaces).
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

type HardcodedOfficeBearer = {
  name: string
  position: PopulatedOfficeBearer['position']
}

const AUTHORITATIVE_OFFICE_BEARERS: HardcodedOfficeBearer[] = [
  { name: 'Partha Sarathi', position: 'general-secretary-male' },
  { name: 'Chandhini', position: 'general-secretary-female' },
  { name: 'Naveen', position: 'events-secretary' },
  { name: 'Dakshina Gopi', position: 'head-of-alumni-relations' },
  { name: 'Sarvesh', position: 'student-treasurer' },
  { name: 'Dhushyant', position: 'joint-secretary-male' },
  { name: 'Mathu Mithra', position: 'joint-secretary-female' },
  { name: 'Jayanth', position: 'junior-head-of-alumni-relations' },
  { name: 'MD Yasar', position: 'junior-events-secretary' },
  { name: 'Prathesh Kumar', position: 'assistant-secretary-male' },
  { name: 'Manjula', position: 'assistant-secretary-female' },
]

const AUTHORITATIVE_DOMAINS: Record<string, string[]> = {
  'Logistics': ['Israr W Hag', 'Lokesh', 'Mukesh Babu'],
  'HR & Hospitality': ['Dharanesh', 'Roshini', 'Praveen', 'Praneshwar', 'Bhuvanesh'],
  'Marketing & Media': ['Dhanush', 'Gokul', 'Divya'],
  'Design & Promo': ['Vishnupriya', 'Dharshan', 'Anto', 'Nithesh'],
  'Contents & Documentation': ['Keerthana', 'Mansha', 'Diffrin Benu'],
  'Industrial Relations': ['Keerthana P', 'Vishalakshi', 'Naveena Bharathi', 'Jadzia Helan'],
  'Web Development': ['Saran Jayan'],
  'Events': ['Vishwa Karthick', 'Manoj Kumar', 'Maitheeshwaran', 'Janani'],
}

function findMember(members: PopulatedMember[], name: string): PopulatedMember {
  const normalizedTarget = normalizeName(name)
  const match = members.find((m) => normalizeName(m.name) === normalizedTarget)

  if (match) {
    // Return a clone to prevent mutation issues, though we don't mutate here
    return { ...match, name } as unknown as PopulatedMember // Ensure correct display name capitalization
  }

  // Fallback if not found in CMS
  return {
    id: Math.random(),
    name,
    photo: null,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as PopulatedMember
}

export function buildTeamPresentationData(members: PopulatedMember[]): {
  officeBearers: PopulatedOfficeBearer[]
  domainHeadsMap: Map<string, PopulatedCommitteeMember[]>
} {
  const officeBearers: PopulatedOfficeBearer[] = AUTHORITATIVE_OFFICE_BEARERS.map((ob, i) => {
    const member = findMember(members, ob.name)
    return {
      id: i,
      member,
      position: ob.position,
      academicYear: '2026-27',
      displayOrder: i,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as PopulatedOfficeBearer
  })

  const domainHeadsMap = new Map<string, PopulatedCommitteeMember[]>()

  Object.entries(AUTHORITATIVE_DOMAINS).forEach(([domainName, headNames]) => {
    const heads: PopulatedCommitteeMember[] = headNames.map((name, i) => {
      const member = findMember(members, name)
      return {
        id: Math.random(),
        member,
        domain: {
          id: Math.random(),
          name: domainName,
          slug: normalizeName(domainName).replace(/\s+/g, '-'),
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        position: 'head',
        academicYear: '2026-27',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as unknown as PopulatedCommitteeMember
    })
    domainHeadsMap.set(domainName, heads)
  })

  return { officeBearers, domainHeadsMap }
}
