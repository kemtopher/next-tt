import Link from 'next/link';
import React from 'react';

import IconBluesky from '../icons/IconBluesky';
import IconInstagram from '../icons/IconInstagram';
import IconKofi from '../icons/IconKofi';
import IconOnlyfans from '../icons/IconOnlyfans';
import IconYoutube from '../icons/IconYoutube';

export const SocialBar = ({ width = 'min-w-[80px] sm:min-w-[100px] md:min-w-[185px]' }) => {
  return (
    <div className={`${width} flex justify-between gap-2 mt-6`}>
      <Link href="https://www.instagram.com/bonimoroni?igsh=djZoZXE0ZXZ6ZDFr" className="hover:fill-accent">
        <IconInstagram classes="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>
      <Link href="#" className="hover:fill-accent">
        <IconOnlyfans classes="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>
      <Link href="#" className="hover:fill-accent">
        <IconBluesky classes="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>
      <Link href="https://www.youtube.com/@TeenTabernacle" className="hover:fill-accent">
        <IconYoutube classes="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>
      <Link href="https://ko-fi.com/ttmahony" className="hover:fill-accent">
        <IconKofi classes="w-6 h-6 sm:w-8 sm:h-8" />
      </Link>
    </div>
  );
};
