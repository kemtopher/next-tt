'use client'

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { MainLogo } from '../MainLogo/MainLogo';
import { SocialBar } from '../SocialBar/SocialBar';
import styles from "./AnimatedHeader.module.css";

export const AnimatedHeader = ({heroRef}) => {
  const logoControls = useAnimation();
  const headerRef = useRef(); 

  const [initialScale, setInitialScale] = useState(1);
  const [intersectionRatio, setIntersectionRatio] = useState(1); // default to fully in view 

  useLayoutEffect(() => {
    // Globally available
    const getInitialScale = () => {
      if (typeof window === 'undefined') return 1;
      const w = window.innerWidth;
      if (w >= 1280) return 6;
      if (w >= 1024) return 5.5;
      if (w >= 768) return 4;
      if (w >= 640) return 4.5;
      return 3.5;
    };

    setInitialScale(getInitialScale())
  },[])

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
    logoControls.start({ scale , opacity: 1});
  }, [intersectionRatio, initialScale, logoControls]);


  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className="w-full py-7 flex justify-between items-center">
          <motion.div
            className="self-center w-[92px] h-[106px] relative origin-top-left"
            animate={logoControls}
            initial={{ scale: initialScale, opacity: 0 }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          >
            <Link href="/">
              <MainLogo classes={styles.scaleLogo} />
            </Link>
          </motion.div>

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
