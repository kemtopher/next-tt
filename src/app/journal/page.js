import React from 'react'
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { JournalCard } from '../../components/JournalCard/JournalCard'

export default function Journal() {

    const rows = [];
    for (let i =0; i < 6; i++) {
        rows.push(
            <JournalCard
                key={i}
                month="OCT"
                day="3"
                year="2021"
                title="I call heaven and earth to record this day against you, that I have set before you life and death, blessing and cursing: therefore choose life I call heaven and earth to record this day against you, that I have set before you life and death, blessing and cursing: therefore choose life"
                exerpt="I thought at first that I would “write something” about the utterly shocking but wholly unsurprising events of the last few days I call heaven and earth to record this day against you, that I have set before you life and death, blessing and cursing: therefore choose life"
                link="/"
            />
        );
    }

  return (
    <>
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="JOURNAL" />
            <GridContainer classes="py-16 flex flex-col gap-8">
                { rows }
            </GridContainer>
        </main>
    </>    
  )
}
