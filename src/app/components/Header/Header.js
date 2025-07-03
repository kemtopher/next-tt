import React from 'react'
import { MainLogo } from '../MainLogo/MainLogo'

export const Header = () => {
  return (
    <header className="h-52 w-full grid-cols-12">
        <div className="flex justify-between">
            <div className="col-span-2 pt-7">
                <MainLogo />
            </div>

            <nav className="col-span-6 col-start-7 pt-14">
              <ul className="hidden md:flex justify-end space-x-6">
                <a href="#" className="text-sm font-display hover:text-accent font-medium">Lessons</a>
                <a href="#" className="text-sm font-display hover:text-accent font-medium">Journal</a>
                <a href="#" className="text-sm font-display hover:text-accent font-medium">Back Page</a>
                <a href="#" className="text-sm font-display hover:text-accent font-medium">Calendar</a>
                <a href="#" className="text-sm font-display hover:text-accent font-medium">Contact</a>
              </ul>
            </nav>
        </div>
    </header>
  )
}
