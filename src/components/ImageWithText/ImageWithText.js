import React from 'react';
import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';

export const ImageWithText = ({
  imageUrl,
  alt = '',
  imagePosition = 'left',
  imageStackOrder = 'top',
  content,
  classes,
  endingQuote
}) => {
  const desktopDirection =
    imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';
  const mobileDirection =
    imageStackOrder === 'top' ? 'flex-col' : 'flex-col-reverse';

  return (
    <section
      className={`flex gap-8 lg:gap-14 py-18 lg:py-20 justify-end ${mobileDirection} ${desktopDirection} w-full h-full border-b relative ${classes}`}
    >
      <div className="h-[35vh] md:h-[55vh] lg:h-[45vh] sm:h-[60%] md:min-h-full w-full md:w-1/2 aspect-square absolute left-[20%] md:left-[15%] top-[15%] sm:top-1/5 md:top-1/2 -translate-1/2 rotate-2 -z-1">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover xl:object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-between justify-between gap-6">
        <div className="max-w-prose text-left font-display text-xl md:text-xl/9 lg:text-2xl/9 xl:text-3xl/12">
          {content}
        </div>
        <PrismicRichText
          field={endingQuote}
          components={{
            paragraph: ({children}) => <p className="max-w-prose text-left italic font-display font-semibold text-xl md:text-2xl/9 lg:text-2xl/9 xl:text-4xl/12 2xl:text-5xl/18">{children}</p>
          }}
        />
      </div>
    </section>
  );
};
