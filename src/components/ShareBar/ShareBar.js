'use client';

import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';

import IconBluesky from '../icons/IconBluesky';
import IconClipboard from '../icons/IconClipboard';
import IconFacebook from '../icons/IconFacebook';
import IconX from '../icons/iconX';

// function openPopup(href) {
//   const w = 600, h = 560;
//   const y = window.top?.outerHeight ? (window.top.outerHeight - h) / 2 : 100;
//   const x = window.top?.outerWidth ? (window.top.outerWidth - w) / 2 : 100;
//   window.open(
//     href,
//     '_blank',
//     `popup=yes,toolbar=0,status=0,width=${w},height=${h},left=${x},top=${y}`
//   );
// }

export const ShareBar = ({
    url,
    title,
    via,
    hashtags = [],
    className = '',
    width = 'min-w-[80px] sm:min-w-[100px] md:min-w-[185px]',
    // showNativeShare = true,
}) => {
    const [copied, setCopied] = useState(false);
    const encodeUrl = encodeURIComponent;

    const hash = useMemo(
        () => (hashtags.length ? hashtags.join(',') : undefined),
        [hashtags]
    );

    const links = useMemo(() => {
        const encodedUrl = encodeUrl(url);
        const encodedTitle = encodeUrl(title);

        return {
            x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${
                via ? `&via=${E(via)}` : ''
            }${hash ? `&hashtags=${E(hash)}` : ''}`,
            bluesky: `https://bsky.app/intent/compose?text=${encodeUrl(`${title} ${url}`)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            //   email: `mailto:?subject=${encodedTitle}&body=${E(`${title}\n\n${url}`)}`,
        };
    }, [url, title, via, hash, encodeUrl]);

    const copyLink = useCallback(
        async (event) => {
            try {
                event.preventDefault();

                if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(url);
                } else {
                    const textA = document.createElement('textarea');
                    textA.value = url;
                    textA.setAttribute('readonly', '');
                    textA.style.position = 'absolute';
                    textA.style.left = '-9999px';
                    document.body.appendChild(textA);
                    textA.select();
                    document.execCommand('copy');
                    document.body.removeChild(textA);
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
            } catch {
                // swallow
            }
        },
        [url]
    );

    // const nativeShare = useCallback(async () => {
    //   if (typeof navigator !== 'undefined' && navigator.share) {
    //     try {
    //       await navigator.share({ title, url, text: title });
    //     } catch {
    //       /* user cancelled */
    //     }
    //   }
    // }, [title, url]);

    return (
        <div className={`${width} flex justify-between gap-2 ${className}`}>
            {/* {showNativeShare &&
        typeof navigator !== 'undefined' &&
        navigator.share && (
          <Btn onClick={nativeShare} label="Share with device">
            <span>Share…</span>
          </Btn>
        )} */}

            <Link href={links.bluesky} label="Share on Bluesky">
                <IconBluesky classes="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>

            <Link href={links.facebook} label="Share on Facebook">
                <IconFacebook classes="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>

            <Link href={links.x} label="Share on X (Twitter)">
                <IconX classes="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>

            <Link href="#" onClick={copyLink} label="Copy link to clipboard">
                {/* <span>{copied ? 'Copied!' : 'Copy link'}</span> */}
                <IconClipboard
                    classes="w-6 h-6 sm:w-8 sm:h-8"
                    fill={copied ? 'green' : '#000'}
                />
            </Link>
        </div>
    );
};
