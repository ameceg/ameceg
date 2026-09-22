import type { Metadata } from 'next'
import React from 'react'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Association of Manufacturing Engineers',
  description:
    'Official website of AME, the manufacturing engineering student association at College of Engineering Guindy (CEG), Anna University.',
}

export default function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}