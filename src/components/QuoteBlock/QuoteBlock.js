import React from 'react';

export const QuoteBlock = ({ content, author }) => {
    return (
        <section className="pt-10 text-center col-span-6 md:col-span-12 border-t-1">
            <div className="py-12 px-8 md:px-10 font-display font-bold flex flex-col gap-8 relative">
                <div className="text-md sm:text-xl md:text-3xl text-black whitespace-pre-line">
                    {content}
                </div>
                <p className="mt-0 md:mt-8 text-sm md:text-md tracking-wide font-medium uppercase">
                    - {author}
                </p>
            </div>
        </section>
    );
};
