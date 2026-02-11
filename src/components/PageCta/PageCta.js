'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import styles from "./PageCta.module.css";

export const PageCta = ({title, content, images}) => {
  console.log("Images: ", images)
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null); // null = show default
  const y = useMotionValue(0);
  const yParallax = useTransform(y, [0, 1], [-20, 20]);
    // Detect screen size for disabling hover logic on mobile
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    { label: 'Lessons', href: '/lessons', image: '/pull-form.jpg' },
    { label: 'Journal', href: '/journal', image: '/journal-photograph.png' },
    { label: 'Back Pages', href: '/backpages', image: '/pull-form.jpg' },
  ];
  // const links = images.map((img, i) => (
  //   { label: img.link_destination, href: }
  // ))

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeImage =
    hoveredIndex !== null && !isMobile
      ? links[hoveredIndex].image
      : null;


  const linkImages = images.map((img, i) => (
    <Image
      key={i}
      src={activeImage}
      alt=""
      fill
      className="object-contain"
      priority
      //       loading={i === 0 ? 'eager' : 'eager'}
      //       priority={i === 0}
      //       aria-hidden="true"
      //       width={1}
      //       height={1}
    />
  ))

  return (
    <section
      ref={sectionRef}
      className="min-h-[555px] relative col-span-6 md:col-span-12 py-16 flex flex-col md:flex-row justify-between gap-8 lg:gap-16 overflow-visible"
      aria-labelledby="cta-heading"
    >
      { images ? (
        <motion.div
          style={{ y: yParallax }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-[50vh] z-0"
          aria-hidden="true"
        >
          <div className="relative w-full h-full aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              >
                { activeImage ? linkImages : null }
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null }

      <div className="h-full w-full md:w-[50%] lg:w-1/3 max-w-[500px] lg:max-w-full flex flex-col text-center md:text-left m-auto md:m-0 justify-between z-10">
        <PrismicRichText 
          field={title} 
          components={{
            heading3: ({children}) => <h3 id="cta-heading" className="text-3xl/10 md:text-4xl/12 lg:text-5xl/15 mb-6 md:mb-4 font-display font-bold md:font-medium">{children}</h3>
          }}
        />
        <div>
          <PrismicRichText 
            field={content} 
            components={{
              paragraph: ({children}) => <p className="text-lg md:text-xl font-display mb-8 last:mb-0">{children}</p>
            }}
          />
        </div>
      </div>

      <div className="w-full md:w-[45%] lg:w-[50%] 2xl:w-[35%] h-full flex flex-col items-center md:items-stretch justify-between z-10">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            role="link"
            aria-label={link.label}
            onMouseEnter={() => !isMobile && setHoveredIndex(i)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onFocus={() => !isMobile && setHoveredIndex(i)}
            onBlur={() => !isMobile && setHoveredIndex(null)}
            className="group flex justify-between items-center font-display text-5xl/24 md:text-5xl/20 lg:text-6xl/20 hover:text-accent group"
          >
            <span>{link.label}</span>
            <span
              className={`w-1/4 h-[2em] hidden md:flex items-center justify-center ${
                isMobile ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1136.1 1135.9"
                className="h-[50%] group-hover:fill-accent"
              >
                <polygon points="565.4 0 516.3 49 1002.9 535.7 .4 530.5 0 599.9 1003.8 605 521.9 1086.9 571 1136 1136.1 570.8 565.4 0" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
