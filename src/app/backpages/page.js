import React from 'react';
import { createClient } from '../../prismicio';
import { asDate, asText } from "@prismicio/client";
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { BackPageCard } from '../../components/BackPagCard/BackPageCard';
import { Header } from '../../components/Header/Header';

export default async function BackPages() {
  const client = createClient();
  const backpagesEntries = await client.getAllByType('back_pages_entry');

  const trueDate = (entry) =>
    asDate(entry?.data?.override_publish_date) ??
    asDate(entry?.first_publication_date);

  const sorted = backpagesEntries
    .slice()
    .sort((a, b) => (trueDate(b) - trueDate(a)));

  return (
    <>
      <Header />
      <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="BACK PAGES" />
        <GridContainer
          classes="gap-y-12 md:gap-y-20 pt-18"
          gapx="gap-x-8"
          gapxmd="md:gap-x-12"
        >
        {sorted.map((entry, i) => (
            <BackPageCard 
              key={i}
              title={asText(entry.data.title)}
              date={trueDate(entry)}
              link={`/backpages/${entry.uid}`}
            />          
          ))}
        </GridContainer>
      </main>
    </>
  );
}
