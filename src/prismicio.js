import { createClient as baseCreateClient } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'tt-mahony';
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {import("@prismicio/client").Route[]}
 */
const routes = [
  { type: "home_page", path: "/" },
  { type: "lessons_page", path: "/lessons" },
  { type: "journal_entry", path: "/journal/:uid" },
  { type: "back_pages_entry", path: "/backpages/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {import("@prismicio/client").ClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { cache: 'no-store'},
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
