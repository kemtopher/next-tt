import React from 'react';
import { createClient } from '../../prismicio';
import { asDate, asText } from "@prismicio/client";
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { BackPageCard } from '../../components/BackPageCard/BackPageCard';
import { Header } from '../../components/Header/Header';

export default async function BackPages() {
  const client = createClient();
  const backpagesEntries = await client.getAllByType('back_pages_entry');

  const trueDate = (entry) =>
    asDate(entry?.data?.override_publish_date) ??
    asDate(entry?.first_publication_date);

  const sorted = backpagesEntries.slice().sort((a, b) => trueDate(b) - trueDate(a));

  return (
    <>
      <Header />
      <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="BACK PAGES" />
        {/* <GridContainer
          classes="pt-[4.5rem]"
          gapx="gap-x-8"
          gapxmd="md:gap-x-12"
        > */}
          <div className="pt-[4.5rem] columns-1 sm:columns-2 lg:columns-3 gap-6">
            {sorted.map((entry) => (
              <div key={entry.id} className="mb-6 break-inside-avoid">
                <BackPageCard
                  title={asText(entry.data.title)}
                  date={trueDate(entry)?.toISOString?.() ?? null}
                  link={`/backpages/${entry.uid}`}
                />
              </div>
            ))}
          </div>
        {/* </GridContainer> */}
      </main>
    </>
  );
}
