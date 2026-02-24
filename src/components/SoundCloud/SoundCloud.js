'use client';

import React from 'react';
import { PrismicRichText } from '@prismicio/react';

export const SoundCloud = ({ soundCloudData, content }) => {
    return (
        <section className="soundcloud-section py-16">
            <div className="h-full w-full flex flex-col md:flex-row gap-16 wrap md:no-wrap">
                <div className="w-full md:w-2/3 order-1 order-2">
                    { soundCloudData?.embedHtml && (
                        <div
                            dangerouslySetInnerHTML={{ __html: soundCloudData?.embedHtml }}
                        />
                    )}
                </div>
                <div className="w-full md:w-1/3 order-2md:order-1">
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
            </div>
        </section>
    );
};
