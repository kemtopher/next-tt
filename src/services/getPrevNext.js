import { asText } from '@prismicio/client'; // if you already use it

const getTitle = (doc) => {
    // Prismic Rich Text title (Array of blocks)
    if (Array.isArray(doc?.data?.title)) return asText(doc.data.title);
    // Plain string fallback
    if (typeof doc?.data?.title === 'string') return doc.data.title;
    // Last-ditch: from slug/uid
    return (doc?.slugs?.[0] || doc?.uid || '').replace(/-/g, ' ');
};

const getHref = (doc) => doc?.url || (doc?.uid ? `/journal/${doc.uid}` : '#');

/**
 * Get prev/next based on current uid.
 * @param {Array} docs - array of Prismic docs
 * @param {string} currentUid
 * @param {'asc'|'desc'|'as-is'} order - how `docs` is ordered
 *   'desc' (newest→oldest) is common for Prismic queries
 */

export function getPrevNext(docs = [], currentUid, order = 'desc') {
    if (!Array.isArray(docs) || !currentUid) return { prev: null, next: null };

    // Normalize order so index math is predictable:
    const list =
        order === 'asc'
            ? docs.slice()
            : order === 'desc'
              ? docs.slice().reverse() // make it oldest→newest for indexing
              : docs;

    const i = list.findIndex((d) => d?.uid === currentUid);
    if (i === -1) return { prev: null, next: null };

    const prevDoc = list[i - 1] || null; // previous chronologically
    const nextDoc = list[i + 1] || null; // next chronologically

    const map = (d) => (d ? { title: getTitle(d), href: getHref(d) } : null);
    return { prev: map(prevDoc), next: map(nextDoc) };
}
