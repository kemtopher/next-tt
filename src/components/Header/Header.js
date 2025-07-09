import React from 'react'
import { MainLogo } from '../MainLogo/MainLogo'
import { SocialBar } from '../SocialBar/SocialBar'
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="h-45 w-full border-b-1 border-black">
        <div className="w-full flex justify-between">
            <div className="col-span-2 pt-7 self-center">
                <Link href="/"><MainLogo /></Link>
            </div>

            <div className="hidden md:flex flex-col col-span-6 col-start-7 pt-14 self-start">
              <nav>
                <ul className="hidden md:flex justify-end space-x-6">
                  <Link href="/lessons" className="text-sm font-display hover:text-accent font-medium">Lessons</Link>
                  <Link href="/journal" className="text-sm font-display hover:text-accent font-medium">Journal</Link>
                  <Link href="/backpage" className="text-sm font-display hover:text-accent font-medium">Back Page</Link>
                  <Link href="/calendar" className="text-sm font-display hover:text-accent font-medium">Calendar</Link>
                  <Link href="/contact" className="text-sm font-display hover:text-accent font-medium">Contact</Link>
                </ul>
              </nav>
              <div className="flex justify-end">
                <SocialBar />
              </div>
            </div>
        </div>
    </header>
  )
}
