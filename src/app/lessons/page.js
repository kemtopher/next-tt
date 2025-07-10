import React from 'react'
import { Header } from '../../components/Header/Header'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { Footer } from '../../components/Footer/Footer'
import { QuoteBlock } from '../../components/QuoteBlock/QuoteBlock'

export default function Lessons() {
  return (
    <>
        <Header />
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="LESSONS" />
            <GridContainer classes="py-16 flex flex-col gap-8">
                <QuoteBlock/>
            </GridContainer>
        </main>
        <Footer />
    </>
  )
}
