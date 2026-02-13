'use client';
import React, { useEffect, useMemo, useState } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

function Dot() {
    // generate style only on client (component is mounted)
    const style = useMemo(
        () => ({
            left: `${rand(0, 100)}%`,
            top: `${rand(0, 100)}%`,
            ['--dur']: `${rand(4, 8)}s`,
            ['--delay']: `${rand(0, 2)}s`,
        }),
        []
    );

    return (
        <span
            aria-hidden="true"
            className="absolute block rounded-full bg-black w-[2px] h-[2px] pointer-events-none"
            style={style}
            onAnimationIteration={(e) => {
                // re-randomize each cycle
                e.currentTarget.style.left = `${rand(0, 100)}%`;
                e.currentTarget.style.top = `${rand(0, 100)}%`;
                e.currentTarget.style.setProperty('--dur', `${rand(4, 8)}s`);
                e.currentTarget.style.setProperty('--delay', `${rand(0, 2)}s`);
            }}
        />
    );
}

export const TwinklingStars = ({ count = 20, className = '' }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null; // <-- no SSR, so no hydration mismatch

    return (
        <div
            className={`dots-layer pointer-events-none fixed inset-0 z-10 ${className}`}
        >
            {Array.from({ length: count }).map((_, i) => (
                <Dot key={i} />
            ))}
            <style jsx global>{`
                @keyframes dot-pop {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    20% {
                        transform: scale(1.8);
                        opacity: 0.9;
                    }
                    35% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    80% {
                        transform: scale(2);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
                .dots-layer > span {
                    animation: dot-pop var(--dur, 6s)
                        cubic-bezier(0.33, 0, 0.2, 1) var(--delay, 0s) infinite;
                    transform-origin: center;
                    will-change: transform, opacity;
                }
            `}</style>
        </div>
    );
};
