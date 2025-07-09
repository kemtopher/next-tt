import React from 'react'
import IconInstagram from '../icons/IconInstagram'
import IconKofi from '../icons/IconKofi'
import IconOnlyfans from '../icons/IconOnlyfans'
import IconBluesky from '../icons/IconBluesky'
import IconYoutube from '../icons/IconYoutube'
import Link from 'next/link'

export const SocialBar = ({ width= "min-w-[100px] md:min-w-[185px]" }) => {
  return (
    <div className={`${width} flex justify-between gap-2 mt-4`}>
        <Link href=""><IconInstagram classes="w-6 h-6 sm:w-8 sm:h-8"/></Link>
        <Link href=""><IconOnlyfans classes="w-6 h-6 sm:w-8 sm:h-8"/></Link>
        <Link href=""><IconBluesky classes="w-6 h-6 sm:w-8 sm:h-8"/></Link>
        <Link href=""><IconYoutube classes="w-6 h-6 sm:w-8 sm:h-8"/></Link>
        <Link href=""><IconKofi classes="w-6 h-6 sm:w-8 sm:h-8"/></Link>
    </div>
  )
}
