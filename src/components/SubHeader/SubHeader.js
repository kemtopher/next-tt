import React from 'react';
import { PrismicRichText } from '@prismicio/react';

export const SubHeader = ({ content }) => {
  console.log(JSON.stringify(content, null, 2))
  return (
    <div className="w-full py-2 md:py-4 lg:py-8 border-y-1 border-black">
        <PrismicRichText 
          field={content} 
          components={{
            heading3: ({ children }) => <h3 className="w-full font-display text-center text-1xl md:text-2xl lg:text-4xl">{children}</h3>,
          }} 
        />
    </div>
  );
};
