import React from 'react'
import { MainLogo } from '../MainLogo/MainLogo'
import { SocialBar } from '../social-bar/SocialBar'

export const Header = () => {
  return (
    <header className="h-45 w-full border-b-1 border-black">
        <div className="w-full flex justify-between">
            <div className="col-span-2 pt-7 self-center">
                <MainLogo />
            </div>

            <div className="hidden md:flex flex-col col-span-6 col-start-7 pt-14 self-start">
              <nav>
                <ul className="hidden md:flex justify-end space-x-6">
                  <a href="#" className="text-sm font-display hover:text-accent font-medium">Lessons</a>
                  <a href="#" className="text-sm font-display hover:text-accent font-medium">Journal</a>
                  <a href="#" className="text-sm font-display hover:text-accent font-medium">Back Page</a>
                  <a href="#" className="text-sm font-display hover:text-accent font-medium">Calendar</a>
                  <a href="#" className="text-sm font-display hover:text-accent font-medium">Contact</a>
                </ul>
              </nav>
              <div className="flex justify-end mt-8">
                <SocialBar />
              </div>
            </div>
        </div>
    </header>
  )
}
