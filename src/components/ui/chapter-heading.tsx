import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ChapterHeadingProps = {
  number: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function ChapterHeading({
  number,
  eyebrow,
  title,
  description,
  tone = 'light',
  className,
}: ChapterHeadingProps) {
  const isDark = tone === 'dark'

  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="flex items-center gap-3">
        <span
          className={cn(
            'font-mono text-[12px] font-bold leading-none',
            isDark ? 'text-primary-foreground' : 'text-foreground/40',
          )}
        >
          {number}
        </span>
        <span
          className={cn('h-px w-10', isDark ? 'bg-primary-foreground/30' : 'bg-border')}
          aria-hidden="true"
        />
        <span
          className={cn('size-1.5 rotate-45', isDark ? 'bg-primary' : 'bg-primary')}
          aria-hidden="true"
        />
        <span
          className={cn(
            'text-[12px] font-semibold uppercase tracking-[0.25em]',
            isDark ? 'text-primary-foreground/70' : 'text-primary',
          )}
        >
          {eyebrow}
        </span>
      </p>
      <h2
        className={cn(
          'mt-6 text-3xl font-black leading-[1.06] tracking-tight text-balance sm:text-4xl lg:text-[3.3rem] lg:leading-[1.02]',
          isDark ? 'text-primary-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 max-w-xl text-base leading-relaxed text-balance sm:text-lg',
            isDark ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}