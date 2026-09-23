'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Very subtle parallax for large decorative/background text.
 * Uses IntersectionObserver + a single rAF-throttled scroll listener
 * (only active while the element is in view) to translate the child
 * vertically by a small amount.
 *
 * Automatically disabled when prefers-reduced-motion is enabled.
 */
export function ParallaxText({
  children,
  className,
  /** How many pixels to shift in total (half up, half down). Default 40. */
  range = 40,
}: {
  children: ReactNode
  className?: string
  range?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let isInView = false
    let rafId: number | null = null

    function updatePosition() {
      if (!node || !isInView) return
      const rect = node.getBoundingClientRect()
      const viewH = window.innerHeight
      // Progress: 0 when element enters from bottom, 1 when it exits from top
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      const offset = (clamped - 0.5) * range
      node.style.transform = `translateY(${offset}px)`
    }

    function onScroll() {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updatePosition()
        rafId = null
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView = entry.isIntersecting
          if (isInView) {
            window.addEventListener('scroll', onScroll, { passive: true })
            updatePosition()
          } else {
            window.removeEventListener('scroll', onScroll)
          }
        })
      },
      { threshold: 0 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [range])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
