'use client';
import Link from 'next/link';

export const JournalNav = ({ prev, next, className }) => {
  // leaving in here in case client decides to go alternate route
  function truncateContent(str, maxLength = 144) {
    if (!str) return 'Oh doth my heart yern for some content';
    if (str.length <= maxLength) return str;

    const truncated = str.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const trimmed = lastSpace > maxLength * 0.7 ? lastSpace : maxLength;

    return str.slice(0, trimmed) + '...';
  }

  return (
    <div className={`w-full flex justify-between gap-4 p-4 border-t pt-8 ${className}`}>
      {/* Previous (left) */}
      {prev ? (
          <Link
            href={prev.href}
            aria-label={`Previous: ${prev.title}`}
            className="text-xl font-display text-black hover:text-accent max-w-[48%]"
          >
            <p className="pb-2 text-sm font-medium italic text-black">previous:</p>
            <p className="truncate">{truncateContent(prev.title, 72)} ...</p>
          </Link>
      ) : null}

      {/* Next (right) */}
      {next ? (
          <Link
            href={next.href}
            aria-label={`Next: ${next.title}`}
            className={`text-xl font-display text-black hover:text-accent max-w-[48%] ${
              !prev ? 'ml-auto' : ''
            }`}
          >
            <p className="pb-2 text-sm font-medium italic text-black">next:</p>
            <p className="truncate">{truncateContent(next.title, 72)} ...</p>
          </Link>
      ) : null}
    </div>
  );
}