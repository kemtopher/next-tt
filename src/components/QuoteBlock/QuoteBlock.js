import React from 'react';

export const QuoteBlock = ({ content, author }) => {
  return (
    <section className="pt-16 text-center col-span-6 md:col-span-12">
      <div className="py-12 px-10 font-display font-bold flex flex-col gap-8 relative">
        {/* <div className="text-[250px] absolute -top-1/4">“</div> */}
        <div className="text-xl md:text-3xl text-black whitespace-pre-line">
          {content}
        </div>
        {/* <div className="text-[250px] absolute">”</div> */}
        <p className="mt-8 text-sm tracking-wide font-medium uppercase">
          - {author}
        </p>
      </div>
    </section>
  );
};
