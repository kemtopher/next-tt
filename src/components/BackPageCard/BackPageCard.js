import Link from 'next/link';
import React from 'react';

export const BackPageCard = ({ title, date, link, imgOnly }) => {
    const fullDate = new Date(date);
    const pubDate = fullDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            href={link}
            className="overflow-hidden relative p-4 md:p-7 col-span-3 md:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3 aspect-square flex flex-col justify-between border sm:border-2"
        >
            {imgOnly ? null : (
                <>
                    <p className="mb-12 md:mb-44 text-xl/7 sm:text-2xl md:text-2xl/10 lg:text-3xl/12 font-display underline">
                        {title}
                    </p>
                    <p className="text-2xl lg:text-4xl font-display">
                        {pubDate}
                    </p>
                </>
            )}
        </Link>
    );
};
