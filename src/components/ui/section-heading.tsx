import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="size-2 rotate-45 bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}