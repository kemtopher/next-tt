import React from 'react'
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { QuoteBlock } from '../../components/QuoteBlock/QuoteBlock'

export default function Contact() {
    const quote = `He who who binds to himself a joy\n\nDoes the winged life destroy;\n\nHe who kisses the joy as it flies\n\nLives in eternity’s sunrise.`;

    const quoteRich = quote.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
    ))

  return (
    <>
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="CONTACT" />
            <GridContainer classes="py-16 flex flex-col gap-8">
                <div></div>
            </GridContainer>
            <QuoteBlock content={quoteRich} />
        </main>
    </>    
  )
}
