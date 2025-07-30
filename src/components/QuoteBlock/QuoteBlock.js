import React from 'react';

export const QuoteBlock = ({ content, author }) => {
  return (
    <section className="pt-10 text-center col-span-6 md:col-span-12 border-t-1">
      <div className="py-12 px-10 font-display font-bold flex flex-col gap-8 relative">
        <div className="text-xl md:text-3xl text-black whitespace-pre-line">
          {content}
        </div>
        <p className="mt-8 text-sm tracking-wide font-medium uppercase">
          - {author}
        </p>
      </div>
    </section>
  );
};
