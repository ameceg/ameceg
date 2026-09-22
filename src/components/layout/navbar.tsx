'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Logo } from '@/components/layout/logo'
import { siteConfig } from '@/data/site'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = siteConfig.nav.filter((item) => item.label !== 'Home')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" aria-label="AME — Association of Manufacturing Engineers, CEG" className="group flex items-center gap-2.5">
          <Logo className="size-9 transition-transform duration-200 group-hover:scale-105" />
          <span className="flex items-baseline gap-2">
            <span className="text-base font-bold tracking-tight text-foreground">AME</span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 group-hover:text-primary sm:inline">
              CEG
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {item.label}
                  {item.external ? (
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex size-10 items-center justify-center text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring md:hidden"
        >
          {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <nav aria-label="Mobile" className="animate-in border-t border-border bg-background fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none md:hidden">
          <ul className="mx-auto max-w-6xl px-4 sm:px-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-3 py-4 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                >
                  {item.label}
                  {item.external ? (
                    <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}