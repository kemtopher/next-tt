import React from 'react'
import { Header } from "../../components/Header/Header"
import { Footer } from '../../components/Footer/Footer'
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { JournalCard } from '../../components/JournalCard/JournalCard'
import { QuoteBlock } from '../../components/QuoteBlock/QuoteBlock'

export default function Journal() {
    const quote = `He who who binds to himself a joy\n\nDoes the winged life destroy;\n\nHe who kisses the joy as it flies\n\nLives in eternity’s sunrise.`;

    const quoteRich = quote.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
    ))

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
            <QuoteBlock content={quoteRich} />
        </main>
    </>    
  )
}
