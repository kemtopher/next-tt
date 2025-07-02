import React from 'react'
import { MainLogo } from '../MainLogo/MainLogo'

export const Header = () => {
  return (
    <header className="h-52 w-full grid-cols-12">
        <div className="flex justify-between">
            <div className="col-span-2 pt-7">
                <MainLogo />
            </div>

            <div className="col-span-6 col-start-7 flex justify-end space-x-6 pt-14">
                <a href="#" className="text-sm font-medium">Lessons</a>
                <a href="#" className="text-sm font-medium">Journal</a>
                <a href="#" className="text-sm font-medium">Back Page</a>
                <a href="#" className="text-sm font-medium">Calendar</a>
                <a href="#" className="text-sm font-medium">Contact</a>
            </div>
        </div>
    </header>
  )
}
