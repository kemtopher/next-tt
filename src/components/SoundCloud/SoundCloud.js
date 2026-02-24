'use client';

import { PrismicLink, PrismicRichText } from '@prismicio/react';
import React from 'react';

export const SoundCloud = ({ soundCloudData, content }) => {
    const src =
        'https://w.soundcloud.com/player/?visual=false&scrolling=false&show_artwork=true' +
        '&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1195714738';

    return (
        <section className="soundcloud-section py-16">
            <div className="h-full w-full flex flex-col items-center gap-16">
                <div className="w-full">
                    <PrismicRichText
                        field={content ? content : null}
                        components={{
                            heading3: ({ children }) => (
                                <h3
                                    id="cta-heading"
                                    className="text-3xl/10 md:text-4xl/12 lg:text-5xl/15 mb-6 md:mb-4 font-display font-bold md:font-medium"
                                >
                                    {children}
                                </h3>
                            ),
                            paragraph: ({ children }) => (
                                <p className="text-lg md:text-xl font-display mb-8 last:mb-0">
                                    {children}
                                </p>
                            ),
                            hyperlink: ({ node, children }) => (
                                <PrismicLink
                                    field={node.data}
                                    className="text-black underline underline-offset-2 hover:text-accent"
                                    target={node.data.target ?? undefined}
                                    rel={
                                        node.data.target
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                >
                                    {children}
                                </PrismicLink>
                            ),
                        }}
                    />
                </div>
                <div className="h-full w-full">
                    {soundCloudData?.embedHtml && (
                        <iframe
                            title="SoundCloud playlist"
                            width="100%"
                            height="600"
                            scrolling="no"
                            frameBorder="0"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            src={src}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
