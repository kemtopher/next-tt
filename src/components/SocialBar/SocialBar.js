import React from 'react'
import IconInstagram from '../icons/IconInstagram'
import IconKofi from '../icons/IconKofi'
import IconOnlyfans from '../icons/IconOnlyfans'
import IconBluesky from '../icons/IconBluesky'
import IconYoutube from '../icons/IconYoutube'

export const SocialBar = ({ width= "w-[185px]" }) => {
  return (
    <div className={`${width} flex justify-between gap-2 mt-4`}>
        <IconInstagram />
        <IconOnlyfans />
        <IconBluesky />
        <IconYoutube />
        <IconKofi />
    </div>
  )
}
