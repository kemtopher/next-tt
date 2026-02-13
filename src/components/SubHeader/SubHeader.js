import { PrismicRichText } from '@prismicio/react';
import React from 'react';

export const SubHeader = ({ content }) => {
  return (
    <div className="w-full py-2 md:py-4 lg:py-8 border-y-1 border-black relative z-8">
        <PrismicRichText 
          field={content} 
          components={{
            heading3: ({ children }) => <h3 className="w-full font-display text-center text-1xl md:text-2xl lg:text-4xl">{children}</h3>,
          }} 
        />
    </div>
  );
};
