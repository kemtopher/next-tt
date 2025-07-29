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

export const PageCta = ({title, content}) => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null); // null = show default
  const y = useMotionValue(0);
  const yParallax = useTransform(y, [0, 1], [-20, 20]);
  const defaultImage = '/journal-photograph.png';

  const links = [
    { label: 'Lessons', href: '#', image: '/pull-form.jpg' },
    { label: 'Journal', href: '#', image: '/journal-photograph.png' },
    { label: 'Back Page', href: '#', image: '/pull-form.jpg' },
  ];

  <div className="hidden">
    {[defaultImage, ...links.map((link) => link.image)].map((src, i) => (
      <Image
        key={i}
        src={src}
        alt=""
        width={1}
        height={1}
        loading={i === 0 ? 'eager' : 'eager'}
        priority={i === 0}
        aria-hidden="true"
      />
    ))}
  </div>;

  // Detect screen size for disabling hover logic on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle parallax on mousemove
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relY = (e.clientY - rect.top) / rect.height;
      y.set(relY);
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, y]);

  const activeImage =
    hoveredIndex !== null && !isMobile
      ? links[hoveredIndex].image
      : defaultImage;

  return (
    <section
      ref={sectionRef}
      className="h-[555px] relative col-span-6 md:col-span-12 py-16 flex flex-col md:flex-row justify-between gap-16 overflow-hidden border-b"
      aria-labelledby="cta-heading"
    >
      {/* Crossfading Background Image */}
      {/* <motion.div
        style={{ y: yParallax }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] z-0"
        aria-hidden="true"
      >
        <div className="relative w-full aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src={activeImage}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div> */}

      <div className="w-full md:w-1/3 h-full flex flex-col justify-between z-10">
        <PrismicRichText 
          field={title} 
          components={{
            heading3: ({children}) => <h3 id="cta-heading" className="text-2xl md:text-4xl/12 lg:text-5xl/15 font-display">{children}</h3>
          }}
        />
        <div>
          <PrismicRichText 
            field={content} 
            components={{
              paragraph: ({children}) => <p className="text-xl font-display mb-8 last:mb-0">{children}</p>
            }}
          />
          {/* <p className="mt-8 text-base font-display">
            “People just like the way he says 'ham' . . ."
          </p> */}
        </div>
      </div>

      <div className="w-[40%] h-full flex flex-col justify-between z-10">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            role="link"
            aria-label={link.label}
            onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onFocus={() => !isMobile && setHoveredIndex(idx)}
            onBlur={() => !isMobile && setHoveredIndex(null)}
            className="group flex justify-between items-center font-display text-6xl/20 hover:text-accent group"
          >
            <span>{link.label}</span>
            <span
              className={`w-1/4 h-[2em] flex items-center justify-center ${
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
