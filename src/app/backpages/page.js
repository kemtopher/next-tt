import React from 'react';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { BackPageCard } from '../../components/BackPagCard/BackPageCard';

export default function BackPages() {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(<BackPageCard key={i} />);
  }
  return (
    <>
      <main className="w-full pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="BACK PAGE" />
        <GridContainer
          classes="gap-y-12 md:gap-y-20 pt-18"
          gapx="gap-x-8"
          gapxmd="md:gap-x-12"
        >
          {rows}
        </GridContainer>
      </main>
    </>
  );
}
