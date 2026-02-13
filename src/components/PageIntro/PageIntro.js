import { PrismicRichText } from '@prismicio/react';
import React from 'react';

export const PageIntro = ({ content }) => {
  return (
    <section className="min-h-[150px] md:min-h-[255px] pb-16 col-span-6 md:col-span-12 border-b">
      <PrismicRichText
        field={content}
        components={{
          heading2: ({children}) => <h2 className="font-display text-2xl/9 md:text-3xl/10 lg:text-4xl/13 xl:text-5xl/15 2xl:text-6xl/18">{children}</h2>
        }}
      />
    </section>
  );
};
