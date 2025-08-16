'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from "./SignupForm.module.css";

export const SignupForm = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ['0vh', '-60vh']);
  const y = useSpring(yRaw, { stiffness: 120, damping: 20, mass: 0.35 });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = fd.get('email');
    const honeyPot = fd.get('company');
    if (honeyPot) return;

    setStatus('loading'); setMessage('');
    try {
      await new Promise(r => setTimeout(r, 800));
      setStatus('success'); setMessage('Thanks — check your inbox to confirm.');
      form.reset();
    } catch {
      setStatus('error'); setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section ref={sectionRef} className="signup-section">
      <div className="section-wrapper h-[45vh] relative overflow-hidden flex flex-col gap-6 justify-center items-center">

        <motion.div
          className="section-title absolute text-black leading-normal lg:leading-tight -left-4 -bottom-[30vh] lg:-bottom-[40vh] px-8 py-4 tracking-wider will-change-transform"
          style={{ y }}
          aria-hidden="true"
        >
          <h2 className="text-[8rem] md:text-[10rem] lg:text-[12.5rem] italic font-display">SIGNUP / NEWSLETTER</h2>
        </motion.div>

        <div className={`${styles.formBg} py-12 px-8 flex flex-col`}>
            <h3 className="text-xl mb-4">Signup for my newsletter</h3>
          <form onSubmit={onSubmit} className="flex w-full max-w-xl gap-3">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email" name="email" type="email" autoComplete="email" inputMode="email" required
              placeholder="you@example.com"
              className="flex-1 border px-4 py-3 text-base
                         focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-describedby="newsletter-help"
            />
            {/* hidden honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button
              type="submit" disabled={status === 'loading'}
              className="border px-5 py-3 text-base font-display
                         hover:bg-black hover:text-white
                         focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-black
                         disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Signup!'}
            </button>
          </form>

          <p id="newsletter-help" className="mt-2 text-sm text-gray-600">
            We'll only email when there's something worth reading.
          </p>
          <p role="status" aria-live="polite" className="mt-2 text-sm">{message}</p>
        </div>
      </div>
    </section>
  );
};
