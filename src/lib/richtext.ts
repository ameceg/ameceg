export type LexicalValue =
  | {
      root?: {
        children?: unknown[]
      }
    }
  | null
  | undefined

export function richTextToText(value: LexicalValue): string {
  if (!value) return ''
  const root = value.root
  if (!root || typeof root !== 'object') return ''

  const fragments: string[] = []

  const walk = (node: unknown): void => {
    if (!node || typeof node !== 'object') return
    const item = node as Record<string, unknown>
    if (typeof item.text === 'string') {
      fragments.push(item.text)
    }
    if (Array.isArray(item.children)) {
      item.children.forEach(walk)
    }
  }

  walk(root)
  return fragments.join(' ').replace(/\s+/g, ' ').trim()
}