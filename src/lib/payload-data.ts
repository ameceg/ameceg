import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import config from "@payload-config";

import { CACHE_TAG_EVENTS, CACHE_TAG_TEAM } from "@/lib/cache-tags";

import type {
  CommitteeMember,
  Domain,
  Event,
  Media,
  Member,
  OfficeBearer,
} from "@/payload-types";

/**
 * Populated shapes returned by the cached getters below. They mirror exactly
 * what the old client components fetched from the REST API at `depth: 2` —
 * relationships (featuredImage, office bearer member, committee member +
 * domain) are resolved to their full documents so the server components can
 * render them without further lookups.
 */

export type PopulatedEvent = Omit<Event, "featuredImage"> & {
  featuredImage: Media | null;
};

export type PopulatedOfficeBearer = OfficeBearer & {
  member: Member & {
    photo?: Media | null;
  };
};

export type PopulatedCommitteeMember = CommitteeMember & {
  member: Member & {
    photo?: Media | null;
  };
  domain: Domain;
};

export type PopulatedMember = Member & {
  photo?: Media | null;
};

async function getEventsData(): Promise<PopulatedEvent[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "events",
    depth: 2,
    limit: 0,
    sort: "eventDate",
    where: {
      isPublished: {
        equals: true,
      },
    },
  });

  return result.docs as PopulatedEvent[];
}

async function getOfficeBearersData(): Promise<PopulatedOfficeBearer[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "office-bearers",
    depth: 2,
    limit: 0,
    sort: "displayOrder",
    where: {
      isActive: {
        equals: true,
      },
    },
  });

  return result.docs as PopulatedOfficeBearer[];
}

async function getCommitteeMembersData(): Promise<PopulatedCommitteeMember[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "committee-members",
    depth: 2,
    limit: 0,
    sort: "displayOrder",
    where: {
      isActive: {
        equals: true,
      },
    },
  });

  return result.docs as PopulatedCommitteeMember[];
}

async function getMembersData(): Promise<PopulatedMember[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "members",
    depth: 2,
    limit: 0,
    sort: "displayOrder",
    where: {
      isActive: {
        equals: true,
      },
    },
  });

  return result.docs as PopulatedMember[];
}

/**
 * Server-only getters wrapped in `unstable_cache`. Route handlers and
 * server components call these instead of hitting the REST API — the results
 * are cached under the shared cache tags so any collection change revalidates
 * the whole group. See `@/lib/cache-tags` for the revalidation side.
 *
 * `keyParts` are literal and stable so the cache keys are identical across
 * every server instance.
 */
export const getEvents = unstable_cache(getEventsData, ["ameceg-events"], {
  tags: [CACHE_TAG_EVENTS],
  revalidate: 300,
});

export const getOfficeBearers = unstable_cache(
  getOfficeBearersData,
  ["ameceg-office-bearers"],
  {
    tags: [CACHE_TAG_TEAM],
    revalidate: 300,
  },
);

export const getCommitteeMembers = unstable_cache(
  getCommitteeMembersData,
  ["ameceg-committee-members"],
  {
    tags: [CACHE_TAG_TEAM],
    revalidate: 300,
  },
);

export const getMembers = unstable_cache(getMembersData, ["ameceg-members"], {
  tags: [CACHE_TAG_TEAM],
  revalidate: 300,
});
