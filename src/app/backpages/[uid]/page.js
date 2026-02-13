import { asText } from '@prismicio/client';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation';

import { GridContainer } from '../../../components/GridContainer/GridContainer';
import { Header } from '../../../components/Header/Header';
import { JournalNav } from '../../../components/JournalNav/JournalNav';
import { ShareBar } from '../../../components/ShareBar/ShareBar';
import { createClient } from '../../../prismicio';
import { getPrevNext } from '../../../services/getPrevNext';

export default async function BackPagesEntry({ params }) {
    const client = createClient();
    const { uid } = await params;
    const backpagesEntries = await client.getAllByType('back_pages_entry');
    // const entry = await client.getByUID('back_pages_entry', uid).catch((err) => notFound());
    let entry;
    try {
        entry = await client.getByUID('back_pages_entry', uid);
    } catch {
        notFound();
    }

    const date = new Date(entry.first_publication_date);
    const pubDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const { prev, next } = getPrevNext(backpagesEntries, uid, 'asc');

    return (
        <>
            <Header />
            <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
                <GridContainer classes="py-16 flex flex-col gap-8">
                    <div className="entry-container col-span-12 xl:col-span-8 col-start-1 xl:col-start-3">
                        <h1 className="heading-secondary pb-6 pb-10 lg:pb-18">
                            {asText(entry.data.title)}
                        </h1>
                        <div className="w-full flex justify-between items-end pb-8 mb-16 border-b">
                            <p className="text-base md:text-xl font-light">
                                {pubDate}
                            </p>
                            <div className="flex-col items-end">
                                <p className="text-xs font-light">
                                    Share Elsewhere:
                                </p>
                                <ShareBar
                                    className="mt-4"
                                    title={asText(entry.data.title)}
                                />
                            </div>
                        </div>
                        <PrismicRichText
                            field={entry.data.post_content}
                            components={{
                                heading1: ({ children }) => (
                                    <h1 className="mb-4 text-3xl font-bold">
                                        {children}
                                    </h1>
                                ),
                                heading2: ({ children }) => (
                                    <h2 className="mb-3 text-2xl font-semibold">
                                        {children}
                                    </h2>
                                ),
                                paragraph: ({ children }) => (
                                    <p className="mb-4 text-base md:text-xl lg:text-md">
                                        {children}
                                    </p>
                                ),
                                listItem: ({ children }) => (
                                    <li className="mb-2">{children}</li>
                                ),
                                embed: ({ node }) => {
                                    const html = node.oembed?.html ?? '';
                                    const src =
                                        html.match(/src="([^"]+)"/)?.[1];

                                    if (!src) return null;

                                    return (
                                        <div className="relative my-14 w-full aspect-video overflow-hidden">
                                            <iframe
                                                src={src}
                                                className="absolute inset-0 h-full w-full"
                                                title={
                                                    node.oembed?.title ||
                                                    'Embedded video'
                                                }
                                                loading="lazy"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </div>
                                    );
                                },
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
                                preformatted: ({ children }) => (
                                    <div className="flex justify-center">
                                        <pre className="font-display text-lg italic leading-relaxed border px-4 py-3 my-16 inline-block rounded overflow-x-auto">
                                            {children}
                                        </pre>
                                    </div>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-bold">
                                        {children}
                                    </strong>
                                ),
                            }}
                        />

                        <JournalNav prev={prev} next={next} className="mt-60" />
                    </div>
                </GridContainer>
            </main>
        </>
    );
}

export async function generateStaticParams() {
    const client = createClient();
    const entries = await client.getAllByType('back_pages_entry');

    return entries.map((entry) => ({
        uid: entry.uid,
    }));
}
