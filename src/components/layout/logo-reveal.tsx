'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const STAGE_TEXT_START = 0.22
const STAGE_TEXT_END = 0.55
const STAGE_REVEAL_START = 0.55

type LogoRevealProps = {
  dataReady?: boolean
}

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function normalize(progress: number, from: number, to: number) {
  return clamp01((progress - from) / (to - from))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function LogoReveal({ dataReady = true }: LogoRevealProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lockupRef = useRef<HTMLDivElement>(null)
  const ameRef = useRef<HTMLSpanElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [completed, setCompleted] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (completed) return

    let raf: number | null = null

    function render() {
      const overlay = overlayRef.current
      const lockup = lockupRef.current
      const ame = ameRef.current
      const logo = logoRef.current
      const label = labelRef.current
      if (!overlay || !lockup || !ame || !logo) return

      const vw = window.innerWidth
      const vh = window.innerHeight
      const p = progressRef.current

      const lockupWidth = lockup.getBoundingClientRect().width
      const logoCenter = logo.offsetLeft + logo.offsetWidth / 2
      const tLockup = easeOutCubic(normalize(p, STAGE_TEXT_START, STAGE_TEXT_END))
      const translateX = -logoCenter + (-lockupWidth / 2 - -logoCenter) * tLockup
      lockup.style.transform = `translate(${translateX}px, -50%)`
      lockup.style.opacity = '1'

      const ameVisible = normalize(p, STAGE_TEXT_START, STAGE_TEXT_END)
      ame.style.opacity = String(ameVisible)
      ame.style.transform = `translateX(${(1 - ameVisible) * 72}px)`

      const reveal = easeOutCubic(normalize(p, STAGE_REVEAL_START, 1))
      const logoRect = logo.getBoundingClientRect()
      const centerX = logoRect.left + logoRect.width / 2
      const centerY = logoRect.top + logoRect.height / 2
      const maxRadius =
        Math.max(
          Math.hypot(centerX, centerY),
          Math.hypot(vw - centerX, centerY),
          Math.hypot(centerX, vh - centerY),
          Math.hypot(vw - centerX, vh - centerY),
        ) * 1.05
      const radius = reveal * maxRadius
      const mask = `radial-gradient(circle at ${centerX.toFixed(1)}px ${centerY.toFixed(1)}px, transparent 0, transparent ${radius.toFixed(1)}px, black ${(radius + 1).toFixed(1)}px)`
      overlay.style.maskImage = mask
      overlay.style.webkitMaskImage = mask

      if (label) label.style.opacity = String(1 - Math.min(1, p * 6))
    }

    function requestRender() {
      if (raf != null) return
      raf = requestAnimationFrame(() => {
        raf = null
        render()
      })
    }

    function finish() {
      if (raf != null) cancelAnimationFrame(raf)
      raf = null
      setCompleted(true)
    }

    function applyProgress(delta: number) {
      const next = clamp01(progressRef.current + delta)
      progressRef.current = next
      if (next >= 1) {
        finish()
        return
      }
      requestRender()
    }

    function handleWheel(event: WheelEvent) {
      event.preventDefault()
      const delta = Math.max(-120, Math.min(120, event.deltaY))
      applyProgress(delta / 900)
    }

    let touchStartY: number | null = null
    function handleTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0].clientY
    }
    function handleTouchMove(event: TouchEvent) {
      if (touchStartY == null) return
      event.preventDefault()
      const y = event.touches[0].clientY
      const delta = touchStartY - y
      touchStartY = y
      applyProgress(delta / 900)
    }
    function handleTouchEnd() {
      touchStartY = null
    }

    requestRender()

    const fontsReady = document.fonts?.ready
    if (fontsReady) fontsReady.then(requestRender).catch(() => {})

    if (dataReady) {
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (raf != null) cancelAnimationFrame(raf)
      raf = null
    }
  }, [completed, dataReady])

  useEffect(() => {
    if (completed) return

    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousOverscroll = body.style.overscrollBehavior
    const previousScrollY = window.scrollY

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    return () => {
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
      body.style.overscrollBehavior = previousOverscroll
      window.scrollTo(0, previousScrollY)
    }
  }, [completed])

  if (completed) return null

  return (
    <div ref={overlayRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" style={{ willChange: 'mask-image' }}>
      <div className="absolute inset-0 bg-band" />

      <div
        ref={lockupRef}
        className="absolute left-1/2 top-1/2 flex items-center gap-[clamp(1.25rem,3vw,2.5rem)]"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <span
          ref={ameRef}
          className="font-black leading-none tracking-[-0.08em] text-white"
          style={{ fontSize: 'clamp(4rem, 11vw, 8rem)', opacity: 0, willChange: 'opacity, transform' }}
        >
          AME
        </span>
        <div ref={logoRef} className="size-[clamp(5rem,12vw,9rem)]">
          <Image
            src="/images/logo.svg"
            alt="AME"
            width={320}
            height={320}
            unoptimized
            draggable={false}
            className="block size-full select-none"
          />
        </div>
      </div>

      <div
        ref={labelRef}
        className="absolute inset-x-0 top-[calc(50%+clamp(5rem,11vw,9rem))] flex justify-center"
        style={{ willChange: 'opacity' }}
      >
        <div className="relative h-5 overflow-hidden text-center">
          <span
            className={cn(
              'absolute inset-0 text-xs font-semibold uppercase tracking-[0.35em] text-white transition-transform duration-500',
              dataReady ? '-translate-y-full' : 'translate-y-0',
            )}
          >
            LOADING
          </span>
          <span
            className={cn(
              'absolute inset-0 text-xs font-semibold uppercase tracking-[0.35em] text-white transition-transform duration-500',
              dataReady ? 'translate-y-0' : 'translate-y-full',
            )}
          >
            SCROLL NOW
          </span>
        </div>
      </div>
    </div>
  )
}