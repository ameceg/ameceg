import { revalidateTag } from 'next/cache'

/**
 * Cache tags used with `unstable_cache` across the server-rendered event and
 * team sections. Collection hooks call `revalidateTag(tag, 'max')` after any
 * document change/delete so the cached payload data is invalidated the next
 * time a request hits it. Keep these in sync with the tags passed to the
 * getters in `@/lib/payload-data` and to `unstable_cache` in the hooks.
 */
export const CACHE_TAG_EVENTS = 'ameceg-events'
export const CACHE_TAG_TEAM = 'ameceg-team'

/**
 * Revalidate the events data cache (Events + Events.* published filters).
 * `'max'` opts into the Next.js stale-while-revalidate cache-life profile and
 * silences the deprecation warning that omitting the profile triggers.
 */
export function revalidateEventsCache(): void {
  revalidateTag(CACHE_TAG_EVENTS, 'max')
}

/**
 * Revalidate the team data cache (office bearers, committee members, members
 * and domains all feed the same team sections).
 */
export function revalidateTeamCache(): void {
  revalidateTag(CACHE_TAG_TEAM, 'max')
}
