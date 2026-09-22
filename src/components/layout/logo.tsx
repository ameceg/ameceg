import Image from 'next/image'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="AME — Association of Manufacturing Engineers"
      width={320}
      height={320}
      className={className}
      priority
    />
  )
}