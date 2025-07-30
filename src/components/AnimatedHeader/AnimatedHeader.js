'use client'

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { MainLogo } from '../MainLogo/MainLogo';
import { SocialBar } from '../SocialBar/SocialBar';
import styles from "./AnimatedHeader.module.css"

export const AnimatedHeader = ({heroRef}) => {
  const logoControls = useAnimation();
  const headerRef = useRef();
  const [initialScale, setInitialScale] = useState(1);
  const [intersectionRatio, setIntersectionRatio] = useState(1); // default to fully in view

  useEffect(() => {
    const w = window.innerWidth;
    if (w >= 1280) setInitialScale(6);        // xl
    else if (w >= 1024) setInitialScale(5.5); // lg
    else if (w >= 768) setInitialScale(4);    // md
    else if (w >= 640) setInitialScale(4.5);  // sm
    else setInitialScale(3.5);                // base
  }, []);

  // // create observer set to ref
  useEffect(() => {
    if (!heroRef?.current || !headerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        rootMargin: `-${headerRef.current.offsetHeight}px 0px 0px 0px`,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroRef]);

  // fire observer after mount
  useEffect(() => {
    const scale = 1 + (initialScale - 1) * intersectionRatio;
    logoControls.start({ scale });
  }, [intersectionRatio, initialScale]);


  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className="w-full py-7 flex justify-between items-center">
          {/* <div className="self-center w-[92px] h-[106px] relative"> */}
            <motion.div
              className="self-center w-[92px] h-[106px] relative origin-top-left"
              animate={logoControls}
              initial={{ scale: initialScale }}
              transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            >
              <Link href="/">
                <MainLogo classes={styles.scaleLogo} />
              </Link>
            </motion.div>
          {/* </div> */}

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
                  href="/backpages"
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
      </div>
    </header>
  );
};
