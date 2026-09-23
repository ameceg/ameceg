'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'figure' | 'article' | 'span'
  from?: 'up' | 'right' | 'left' | 'down' | 'scale'
  /** Add subtle scale-up (0.98 -> 1) alongside direction offset */
  scale?: boolean
  /** Duration in ms (default 750ms) */
  duration?: 500 | 700 | 750 | 800 | 900 | 1000
}

const hiddenStates = {
  up: 'translate-y-7',
  down: '-translate-y-7',
  left: 'translate-x-8',
  right: '-translate-x-8',
  scale: 'scale-[0.96]',
} as const

const durationClasses: Record<number, string> = {
  500: 'duration-500',
  700: 'duration-700',
  750: 'duration-[750ms]',
  800: 'duration-800',
  900: 'duration-[900ms]',
  1000: 'duration-1000',
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  from = 'up',
  scale = true,
  duration = 750,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn(
        'transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        durationClasses[duration] ?? 'duration-[750ms]',
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : cn(
              hiddenStates[from],
              scale && from !== 'scale' ? 'scale-[0.98]' : '',
              'opacity-0',
            ),
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}