'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type DomainInfo = {
  number: string
  name: string
}

const DOMAINS: DomainInfo[] = [
  { number: '01', name: 'Logistics' },
  { number: '02', name: 'HR & Hospitality' },
  { number: '03', name: 'Marketing & Media' },
  { number: '04', name: 'Design & Promo' },
  { number: '05', name: 'Contents & Documentation' },
  { number: '06', name: 'Industrial Relations' },
  { number: '07', name: 'Web Development' },
  { number: '08', name: 'Events' },
]

export function DomainChapterTracker() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Find all domain sections by ID
      const elements = DOMAINS.map((d) => document.getElementById(`domain-${d.number}`))
      const viewportHeight = window.innerHeight

      let currentActive: number | null = null

      elements.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        // Section is considered active if its top is above 60% of viewport and bottom is below 20%
        if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.2) {
          currentActive = index
        }
      })

      // Also check if domain intro is visible
      const introEl = document.getElementById('domains-intro-heading')
      const introRect = introEl?.getBoundingClientRect()

      if (introRect && introRect.top <= viewportHeight * 0.8 && introRect.bottom >= 0) {
        setVisible(true)
        if (currentActive === null) currentActive = 0
      } else if (currentActive !== null) {
        setVisible(true)
      } else {
        setVisible(false)
      }

      setActiveIndex(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible || activeIndex === null) return null

  const activeDomain = DOMAINS[activeIndex] || DOMAINS[0]!

  return (
    <div
      aria-live="polite"
      aria-label={`Current domain section: ${activeDomain.name}`}
      className={cn(
        'fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-white/12 bg-[#080B18]/90 px-4 py-2.5 backdrop-blur-md transition-all duration-500 sm:flex',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 border-r border-white/10 pr-3">
        <span className="font-mono text-[10px] font-bold text-blue-400">
          {activeDomain.number}
        </span>
        <span className="font-mono text-[10px] text-white/30">/</span>
        <span className="font-mono text-[10px] text-white/30">08</span>
      </div>

      {/* Active Domain Name */}
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
        {activeDomain.name}
      </span>

      {/* Mini Progress Dots */}
      <div className="ml-1 flex items-center gap-1">
        {DOMAINS.map((d, i) => (
          <button
            key={d.number}
            onClick={() => {
              const el = document.getElementById(`domain-${d.number}`)
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            title={`Scroll to Domain ${d.number}: ${d.name}`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-4 bg-blue-400'
                : 'w-1.5 bg-white/20 hover:bg-white/40',
            )}
          />
        ))}
      </div>
    </div>
  )
}
