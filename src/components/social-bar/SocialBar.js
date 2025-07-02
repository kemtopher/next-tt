import React from 'react'
import IconInstagram from '../icons/IconInstagram'
import IconKofi from '../icons/IconKofi'
import IconOnlyfans from '../icons/IconOnlyfans'
import IconBluesky from '../icons/IconBluesky'
import IconYoutube from '../icons/IconYoutube'

export const SocialBar = () => {
  return (
    <div className="flex gap-y-3.5 justify-between">
        <IconInstagram />
        <IconOnlyfans />
        <IconBluesky />
        <IconYoutube />
        <IconKofi />
    </div>
  )
}
