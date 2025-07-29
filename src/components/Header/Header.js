import React from 'react';
import { MainLogo } from '../MainLogo/MainLogo';
import { SocialBar } from '../SocialBar/SocialBar';
import Link from 'next/link';
import { px } from 'framer-motion';
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="w-full py-7 flex justify-between items-center">
        <div className="self-center w-[92px] h-[106px] relative">
          <Link href="/">
            {/* use scale(600) */}
            <MainLogo classes={styles.scaleLogo} />
          </Link>
        </div>

        <div className="h-2/3 hidden md:flex flex-col justify-between self-center">
          <nav>
            <ul className="hidden md:flex justify-end space-x-6">
              <Link
                href="/lessons"
                className="text-sm font-display hover:text-accent font-medium"
              >
                Lessons
              </Link>
              <Link
                href="/journal"
                className="text-sm font-display hover:text-accent font-medium"
              >
                Journal
              </Link>
              <Link
                href="/backpage"
                className="text-sm font-display hover:text-accent font-medium"
              >
                Back Page
              </Link>
              <Link
                href="/calendar"
                className="text-sm font-display hover:text-accent font-medium"
              >
                Calendar
              </Link>
              <Link
                href="/contact"
                className="text-sm font-display hover:text-accent font-medium"
              >
                Contact
              </Link>
            </ul>
          </nav>
          <div className="flex justify-end">
            <SocialBar />
          </div>
        </div>
      </div>
    </header>
  );
};
