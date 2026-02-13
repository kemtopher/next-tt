'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

import { MainLogo } from '../MainLogo/MainLogo';

const Countdown = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
            <motion.div
                className="origin-center transform-gpu"
                animate={
                    prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.2, 1] }
                }
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                aria-hidden="true"
            >
                {/* Adjust size with Tailwind; CSS wins over SVG width/height attrs */}
                <MainLogo className="w-40 md:w-56 h-auto z-99999" />
            </motion.div>

            <div
                className="font-display font-bold text-xl md:text-2xl mt-20 text-center"
                role="status"
                aria-live="polite"
            >
                Unfolding the Mahonyverse ...
            </div>
        </div>
    );
};

export default Countdown;
