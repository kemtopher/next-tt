import React from 'react';
import Link from 'next/link';
import { GridContainer } from '../GridContainer/GridContainer';
import { SocialBar } from '../SocialBar/SocialBar';

export const Footer = () => {
  return (
    <footer className="w-full pb-24 md:pb-0 pt-6 sm:pt-8 md:pt-12 border-t flex flex-col justify-center">
      <div className="h-[150px] sm:h-[180px] md:h-[200px]">
        {/* <GridContainer classes="footer-top"> */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <div className="h-full flex flex-col text-center md:text-left mb-8 md:mb-0">
              <p className="font-display text-base mb-4">Contact:</p>
              <a
                className="font-display text-xl mb-2"
                href="mailto:teentabernacle@gmail.com"
              >
                teentabernacle@gmail.com
              </a>
              <a
                className="font-display text-base sm:text-xl"
                href="tel:+16783607349"
              >
                678.360.7349
              </a>
            </div>
          </div>

          <div className="h-full w-full flex justify-center md:justify-end">
            <div className="text-center md:text-left">
              <p className="font-display text-xl">
                Find me on the web
              </p>
              <SocialBar />
            </div>
          </div>
        </div>
          
        {/* </GridContainer> */}
      </div>

      <div className="h-[69px] hidden md:block">
        <nav className="w-full h-full">
          <ul className="flex flex-row gap-4 sm:gap-8 justify-center">
            <li>
              <Link
                href="/lessons"
                className="font-display text-xs sm:text-sm md:text-base hover:text-accent"
              >
                LESSONS
              </Link>
            </li>
            <li>
              <Link
                href="/journal"
                className="font-display text-xs sm:text-sm md:text-base hover:text-accent"
              >
                JOURNAL
              </Link>
            </li>
            <li>
              <Link
                href="/backpages"
                className="font-display text-xs sm:text-sm md:text-base hover:text-accent"
              >
                MY BACK PAGES
              </Link>
            </li>
            <li>
              <Link
                href="/calendar"
                className="font-display text-xs sm:text-sm md:text-base hover:text-accent"
              >
                CALENDAR
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-display text-xs sm:text-sm md:text-base hover:text-accent">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        {/* <div className="">
            <p>©ttmahony, All rights reserved</p>
          </div> */}
      </div>
    </footer>
  );
};
