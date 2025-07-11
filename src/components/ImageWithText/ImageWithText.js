'use client';

import React from 'react';
import Image from 'next/image';

export const ImageWithText = ({
  imageUrl,
  alt = '',
  imagePosition = 'left',
  imageStackOrder = 'top',
  content,
  classes,
}) => {
  const desktopDirection =
    imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';
  const mobileDirection =
    imageStackOrder === 'top' ? 'flex-col' : 'flex-col-reverse';

  return (
    <section
      className={`flex gap-8 lg:gap-14 py-18 lg:py-20 justify-between ${mobileDirection} ${desktopDirection} w-full h-full border-b ${classes}`}
    >
      <div className="relative w-full md:w-1/2 aspect-square">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-between justify-between gap-6">
        <div className="max-w-prose text-left font-display text-xl md:text-xl/9 lg:text-2xl/9 xl:text-3xl/12">
          {content}
        </div>

        <div className="max-w-prose text-left italic font-display font-semibold text-xl md:text-2xl/9 lg:text-2xl/9 xl:text-4xl/12 2xl:text-5xl/18">
          Anything is possible ...
        </div>
      </div>
    </section>
  );
};
