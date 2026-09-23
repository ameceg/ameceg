'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Reveals a photograph with a clip-overflow + subtle zoom settle.
 * The image container clips overflow; the image starts slightly zoomed-in
 * and translated, then settles into its final position.
 *
 * Respects prefers-reduced-motion.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div
        className={cn(
          'h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[1.04] opacity-80',
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  )
}
