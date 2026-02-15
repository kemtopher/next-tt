'use client';

import React, { useEffect, useMemo, useRef,useState } from 'react';

const SIZES = [
    { id: 'sm', label: 'SM' },
    { id: 'md', label: 'MD' },
    { id: 'lg', label: 'LG' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
];

const COLORS = [
    { id: 'yellow', label: 'Yellow', className: 'pastel-yellow' },
    { id: 'blue', label: 'Blue', className: 'pastel-blue' },
    { id: 'pink', label: 'Pink', className: 'pastel-pink' },
    { id: 'green', label: 'Green', className: 'pastel-green' },
];

export const OrderForm = ({ header, description }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');
    const [size, setSize] = useState('md');
    const [color, setColor] = useState('');

    useEffect(() => {
        if (!COLORS.some((c) => c.id === color)) setColor('yellow');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // not for you hoomnan
    const [company, setCompany] = useState('');

    // status: 'idle' | 'sending' | 'sent' | 'error'
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    // turnstile refs
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileContainerRef = useRef(null);
    const turnstileWidgetIdRef = useRef(null);

    const canSubmit = useMemo(() => {
        return (
            name.trim().length > 1 &&
            email.trim().includes('@') &&
            !!size &&
            !!color &&
            status !== 'sending'
        );
    }, [name, email, size, color, status]);


    // loading turnstile widget
    useEffect(() => {
        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        if (!siteKey) {
            console.warn('Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY');
            return;
        }

        // If script already exists, just try rendering
        const existing = document.querySelector('script[data-turnstile]');
        if (!existing) {
            const s = document.createElement('script');
            s.src =
                'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            s.async = true;
            s.defer = true;
            s.setAttribute('data-turnstile', 'true');
            document.head.appendChild(s);
            s.onload = () => renderTurnstile(siteKey);
        } else {
            // script loaded?
            renderTurnstile(siteKey);
        }

        function renderTurnstile(key) {
            if (!turnstileContainerRef.current) return;

            // wait until window.turnstile available
            const tryRender = () => {
                if (!window.turnstile) return false;

                // avoid double render
                if (turnstileWidgetIdRef.current) return true;

                turnstileWidgetIdRef.current = window.turnstile.render(
                    turnstileContainerRef.current,
                    {
                        sitekey: key,
                        callback: (token) => setTurnstileToken(token),
                        'expired-callback': () => setTurnstileToken(''),
                        'error-callback': () => setTurnstileToken(''),
                        theme: 'light',
                    }
                );

                return true;
            };

            if (tryRender()) return;

            const interval = setInterval(() => {
                if (tryRender()) clearInterval(interval);
            }, 100);

            setTimeout(() => clearInterval(interval), 5000);
        }
    }, []);

    async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          size,
          color,
          notes,
          company,
          turnstileToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');

      setStatus('sent');
      setMessage('Sent. He’ll reply by email to confirm payment + shipping.');

      setName('');
      setEmail('');
      setNotes('');
      setCompany('');
      setSize('md');
      setColor('yellow');

      // reset Turnstile after 200
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setTurnstileToken('');
    } catch (err) {
      setStatus('error');
      setMessage(err?.message || 'Something went wrong. Try again.');

      // reset token
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setTurnstileToken('');
    }
  }

    return (
        <section className="w-full max-w-2xl border-0 md:border-1 border-black bg-white text-black p-5 md:p-7">
            <header className="">
                <h2 className="font-black uppercase tracking-tight font-display text-3xl/10 md:text-4xl/12 xl:text-5xl/15">
                    {header}
                </h2>
                <p className="mt-2 text-sm leading-relaxed font-display">
                    {/* No checkout. Send your size + color. We’ll confirm details by email. */}
                    {description}
                </p>
            </header>

            <form onSubmit={onSubmit} className="space-y-6 mt-6">
                {/* not for you hooman */}
                <div className="hidden">
                    <label className="block text-xs font-bold font-display uppercase">
                        Company
                    </label>
                    <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border-1 border-black p-2"
                        autoComplete="off"
                        tabIndex={-1}
                    />
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full border-1 border-black bg-white p-3 text-base focus:ring-0"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full border-1 border-black bg-white p-3 text-base focus:ring-0"
                            placeholder="you@email.com"
                            type="email"
                            required
                        />
                    </div>
                </div>

                {/* SIZE */}
                <fieldset className="py-4">
                    <legend className="px-2 text-xs font-black uppercase tracking-widest">
                        Size
                    </legend>

                    <div className="mt-2 flex flex-wrap gap-3">
                        {SIZES.map((s) => {
                            const selected = s.id === size;

                            return (
                                <label
                                    key={s.id}
                                    className={[
                                        'size-labels',
                                        'relative inline-flex select-none items-center justify-center',
                                        'border-1 border-black bg-white px-4 py-3',
                                        'font-black uppercase tracking-wide',
                                        'cursor-pointer',
                                        // selected ? 'outline outline-2 outline-black' : '',
                                    ].join(' ')}
                                >
                                    <input
                                        type="radio"
                                        name="size"
                                        value={s.id}
                                        checked={selected}
                                        onChange={() => setSize(s.id)}
                                        className="sr-only"
                                    />

                                    <span className="text-sm lg:text-md xl:text-lg">
                                        {s.label}
                                    </span>

                                    {/* Oversized X overlay when selected */}
                                    {selected && (
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                        >
                                            <span className="text-6xl md:text-7xl font-black leading-none opacity-90">
                                                X
                                            </span>
                                        </span>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </fieldset>

                {/* COLOR */}
                <fieldset className="py-4">
                    <legend className="px-2 text-xs font-black uppercase tracking-widest">
                        Color
                    </legend>

                    <div className="mt-3 flex flex-wrap gap-3">
                        {COLORS.map((c) => {
                            const selected = c.id === color;

                            return (
                                <label
                                    key={c.id}
                                    className={[
                                        'relative cursor-pointer',
                                        // 'border-1 border-black',
                                        'flex items-center justify-center',
                                        // 'w-20 h-20 md:w-24 md:h-24',
                                        'bg-white',
                                    ].join(' ')}
                                    title={c.label}
                                >
                                    <p className="text-lg font-bold uppercase text-black">
                                        {c.label}
                                    </p>
                                    <input
                                        type="radio"
                                        name="color"
                                        value={c.id}
                                        checked={selected}
                                        onChange={() => setColor(c.id)}
                                        className="sr-only"
                                    />

                                    {selected && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl md:text-7xl font-black leading-none text-black opacity-90">
                                                X
                                            </span>
                                        </div>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </fieldset>

                <div>
                    <label className="block text-xs font-black uppercase tracking-widest">
                        Notes (optional)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-2 w-full min-h-[110px] border-1 border-black bg-white p-3 text-base focus:ring-0"
                        placeholder="Shipping region, quantity, questions…"
                    />
                </div>

                {/* turnstile */}
                <div>
                    <div className="text-xs font-black uppercase tracking-widest mb-2">
                        Anti-spam check
                    </div>

                    <div ref={turnstileContainerRef} />

                    {!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                        <p className="mt-2 text-xs opacity-70">
                            Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={[
                            'border-1 border-black bg-black text-white px-5 py-3',
                            'font-black uppercase tracking-widest',
                            'disabled:opacity-40 disabled:cursor-not-allowed',
                        ].join(' ')}
                    >
                        {status === 'sending'
                            ? 'Sending…'
                            : 'Email Order Request'}
                    </button>

                    <div className="text-sm" aria-live="polite">
                        {message ? (
                            <span className="inline-block border-1 border-black px-3 py-2 bg-white">
                                {message}
                            </span>
                        ) : (
                            <span className="text-xs opacity-70">
                                I'll email back with next steps.
                            </span>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
};
