import React from 'react'
import IconReadMore from '../icons/IconReadMore'
import Link from 'next/link'

export const JournalCard = ({
    month,
    day,
    year,
    title,
    exerpt,
    content,
    link= "/"
}) => {
    function truncateContent(str, maxLength = 144) {
        if (!str) return "Oh doth my heart yern for some content";
        if (str.length <= maxLength) return str;

        const truncated = str.slice(0, maxLength);
        const lastSpace = truncated.lastIndexOf(" ");

        const trimmed = lastSpace > maxLength * 0.7 ? lastSpace : maxLength;

        return str.slice(0, trimmed) + "...";
    }

  return (
    <Link href="" className="w-full h-full p-3 md:p-6 border md:border-2 flex gap-4 md:gap-8 group col-span-6 md:col-span-10 xl:col-span-8 2xl:col-span-7">
        <div className="h-full w-[125px]">
            <div className="h-full flex flex-col justify-center gap-4 font-secondary pr-6 border-r md:border-r-2 border-black">
                <p className="text-center text-2xl md:text-3xl font-semibold uppercase">{month}</p>
                <p className="text-center text-4xl md:text-5xl font-semibold">{day.toString().padStart(2,"0")}</p>
                <p className="text-center text-2xl md:text-3xl font-semibold">{year}</p>
            </div>
        </div>
        <div className="h-full w-full flex flex-col justify-between gap-4 lg:gap-8">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">{title ? (title.length <= 144 ? title : truncateContent(title)) : "Untitled"}</h2>
            <p className="font-display text-base">{exerpt ? (exerpt.length <= 144 ? exerpt : truncateContent(exerpt)) : truncateContent(content)}</p>
            <div className="flex justify-end gap-2 hover:text-accent group">
                <span className="font-secondary group-hover:text-accent">Read More</span>
                <div className="flex flex-col justify-center">
                    <IconReadMore classes="group-hover:fill-accent"/>
                </div>
            </div>
        </div>
    </Link>
  )
}
