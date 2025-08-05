import React from 'react';
import { asText } from '@prismicio/client';
import IconReadMore from '../icons/IconReadMore';
import Link from 'next/link';
import styles from "./JournalCard.module.css";

export const JournalCard = ({
  fullDate,
  title,
  excerpt,
  link = '/',
}) => {
  const date = new Date(fullDate);

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  // leaving in here in case client decides to go alternate route
  function truncateContent(str, maxLength = 144) {
    if (!str) return 'Oh doth my heart yern for some content';
    if (str.length <= maxLength) return str;

    const truncated = str.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const trimmed = lastSpace > maxLength * 0.7 ? lastSpace : maxLength;

    return str.slice(0, trimmed) + '...';
  }

  return (
    <Link
      href="/"
      className={styles.JournalCard}
    >
      <div className="h-full w-[125px]">
        <div className={styles.CardContent}>
          <p className="text-center text-2xl md:text-3xl font-semibold uppercase">
            {month ? month : "no month"}
          </p>
          <p className="text-center text-4xl md:text-5xl font-semibold">
            {day ? day : "no day"}
          </p>
          <p className="text-center text-2xl md:text-3xl font-semibold">
            {year ? year : "no year"}
          </p>
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-between gap-4 lg:gap-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">{title ? asText(title) : "Untitled"}</h2>
        {excerpt?.length > 0 ? <p className="font-display text-base">{ asText(excerpt) }</p> : <p className="font-display text-base">Click to read more</p>}
        <div className="flex justify-end gap-2 hover:text-accent group">
          <span className="font-secondary group-hover:text-accent">
            Read More
          </span>
          <div className="flex flex-col justify-center">
            <IconReadMore classes="group-hover:fill-accent" />
          </div>
        </div>
      </div>
    </Link>
  );
};
