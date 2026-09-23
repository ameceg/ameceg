'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * Animated horizontal divider line that expands from 0 to full width
 * when it enters the viewport. Optionally has a subtle accent color.
 */
export function SectionDivider({
  className,
  accent = false,
  tick = false,
}: {
  className?: string
  /** When true, uses AME blue tint instead of white */
  accent?: boolean
  /** When true, renders a subtle centered technical tick mark */
  tick?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={cn('relative w-full overflow-hidden', className)}>
      <div
        className={cn(
          'h-px transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
          accent
            ? 'bg-gradient-to-r from-transparent via-blue-500/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/12 to-transparent',
          visible ? 'w-full opacity-100' : 'w-0 opacity-0 mx-auto',
        )}
      />
      {tick && (
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 delay-500',
            accent ? 'bg-blue-400/60' : 'bg-white/20',
            visible ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  )
}
