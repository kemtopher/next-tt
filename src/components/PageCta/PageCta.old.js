'use client';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';


export const PageCta = ({
  text,
  links = [
    { label: 'Lessons', href: '/lessons' },
    { label: 'Journal', href: '/journal' },
    { label: 'Back Pages', href: '/backpages' },
  ],
  images=[],
}) => {
  const sectionRef = useRef(null);
  const [floatingImages, setFloatingImages] = useState([]);

  const spawnImage = () => {
    if (!sectionRef.current || images.length === 0) return;
    const img = images[Math.floor(Math.random() * images.length)];
    const top = Math.floor(10 + Math.random() * 80);  // 10–90%
    const left = Math.floor(10 + Math.random() * 80); // 10–90%
    // eslint-disable-next-line
    const rotation = Math.floor(-15 + Math.random() * 30); // -15deg to +15deg
    const id = `${Date.now()}-${Math.random()}`;

    const stylesObj = {
      top: `${top}%`,
      left: `${left}%`,
      transform: 'rotate(`${rotation}deg`)'
    }

    const newImage = { ...img, ['classList']: stylesObj };

    setFloatingImages(prev => [...prev, newImage]);

    // Remove after 2.5s
    setTimeout(() => {
      setFloatingImages(prev => prev.filter(item => item.id !== id));
    }, 2500);
  };

  const handleLinkEnter = () => {
    spawnImage();
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[555px] relative col-span-6 md:col-span-12 py-16 flex flex-col md:flex-row justify-between gap-8 lg:gap-16 overflow-hidden"
    >
      {/* Floating background images */}
      <div className="absolute pointer-events-none inset-0">
        <AnimatePresence>
          {floatingImages.map(img => (
            <motion.div
              key={Math.random()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              // className={`${img.classList} absolute transform-(translate(-50%, -50%))`}
              style={img.classList}
            >
              <div className="relative w-40 h-32 md:w-48 md:h-36
                              shadow-[8px_8px_0_rgba(0,0,0,0.7)]
                              border border-neutral-900
                              mix-blend-screen">
                <Image
                  src={img.nav_image.url}
                  alt=""
                  fill
                  className={`object-cover`}
                  sizes="(min-width: 768px) 200px, 160px"
                  style={img.classList}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Left column: paragraph */}
      <div className="relative z-10 flex items-center">
        <p className="text-lg md:text-xl leading-relaxed max-w-prose">
          {text}
        </p>
      </div>

      {/* Right column: links */}
      <div className="relative z-10 flex flex-col gap-6 md:items-end">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={handleLinkEnter}
            onFocus={handleLinkEnter}
            className="group inline-flex items-center justify-between w-full md:w-auto
                       text-3xl md:text-4xl font-semibold tracking-tight
                       hover:text-lime-300 transition-colors"
          >
            <span className="uppercase">{link.label}</span>
            <span className="ml-4 text-sm md:text-base opacity-60 group-hover:opacity-100">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
