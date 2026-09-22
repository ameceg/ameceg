export type NavItem = {
  label: string
  href: string
  external?: boolean
}

export const siteConfig = {
  name: 'AME',
  fullName: 'Association of Manufacturing Engineers',
  tagline: 'The student association for manufacturing engineering at CEG.',
  description:
    'The Association of Manufacturing Engineers (AME) is the official student association of the Department of Manufacturing Engineering, CEG, Anna University.',
  email: 'ame.ceg@example.com',
  phone: '+91 00000 00000',
  address: 'Department of Manufacturing Engineering, CEG, Anna University, Chennai',
  manusys: {
    label: 'Manusys',
    href: 'https://manusys.ame.example',
    description: 'The flagship national-level technical symposium of AME.',
  },
  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Manusys', href: 'https://manusys.ame.example', external: true },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
}