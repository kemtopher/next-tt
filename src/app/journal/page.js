import React from 'react';
import Image from 'next/image';
import { asDate } from "@prismicio/client";
import { createClient } from '../../prismicio';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { JournalCard } from '../../components/JournalCard/JournalCard';
import { Header } from '../../components/Header/Header';
import styles from './Journal.module.css';

export default async function Journal() {
  const client = createClient();
  const journalEntries = await client.getAllByType('journal_entry');

  const trueDate = (entry) =>
    asDate(entry?.data?.override_publish_date) ??
    asDate(entry?.first_publication_date);

  const sorted = journalEntries
    .slice()
    .sort((a, b) => (trueDate(b) - trueDate(a))); 

  return (
    <>
      <Header />
      <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="JOURNAL" />
        <GridContainer classes="py-16 flex flex-col gap-8">
          {sorted.map((entry) => (
            <JournalCard
              key={entry.id}
              fullDate={trueDate(entry)?.toISOString?.() || entry.first_publication_date}
              title={entry.data.title}
              excerpt={entry.data.excerpt}
              link={`/journal/${entry.uid}`}
            />
          ))}
        </GridContainer>
      </main>
      <div className={styles.journalBgPhoto}>
        <Image
          src="/journal-bg-image.png"
          alt="image of knickknack"
          fill
          className="object-cover xl:object-contain left-[20vw]"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
    </>
  );
}
