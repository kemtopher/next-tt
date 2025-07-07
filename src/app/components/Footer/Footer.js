import React from 'react'
import { GridContainer } from '../GridContainer/GridContainer'
import { SocialBar } from '../SocialBar/SocialBar'

export const Footer = () => {
  return (
    <footer className="w-full pt-6 sm:pt-8 md:pt-12 border-t flex flex-col justify-center">
      <div className="h-[150px] sm:h-[180px] md:h-[200px]">
        <GridContainer classes="footer-top">
          <div className="col-span-3 md:col-span-6">
            <div className="h-full flex flex-col">
              <p className="font-display text-xs sm:text-base mb-4">Contact:</p>
              <a className="font-display text-base sm:text-xl" href="mailto:teentabernacle@gmail.com">teentabernacle@gmail.com</a>
              <a className="font-display text-base sm:text-xl" href="tel:+16783607349">678.360.7349</a>
            </div>
          </div>

          <div className="h-full col-span-3 md:col-span-6 flex justify-end">
            <div className="text-left">
              <p className="font-display text-xs sm:text-base">Find me on the web</p>
              <SocialBar mt="4" />
            </div>
          </div>
        </GridContainer>
      </div>
      
      <div className="h-[69px] hidden md:block">
          <nav className="w-full h-full">
            <ul className="flex flex-row gap-4 sm:gap-8 justify-center">
              <li><a href="" className="font-display text-xs sm:text-sm md:text-base">LESSONS</a></li>
              <li><a href="" className="font-display text-xs sm:text-sm md:text-base">JOURNAL</a></li>
              <li><a href="" className="font-display text-xs sm:text-sm md:text-base">BACK PAGE</a></li>
              <li><a href="" className="font-display text-xs sm:text-sm md:text-base">CALENDAR</a></li>
              <li><a href="" className="font-display text-xs sm:text-sm md:text-base">CONTACT</a></li>
            </ul>
          </nav>
          {/* <div className="">
            <p>©ttmahony, All rights reserved</p>
          </div> */}
      </div>
    </footer>
  )
}
