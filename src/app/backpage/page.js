import React from 'react'
import { Header } from '../../components/Header/Header'
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { Footer } from '../../components/Footer/Footer'
import Link from 'next/link'

export default function BackPage() {
    function card(i) {
        return (
            <Link href="" className="p-4 md:p-7 col-span-3 md:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3 aspect-square flex flex-col justify-between border sm:border-2" key={i}>
                <p className="mb-12 md:mb-44 text-xl/7 sm:text-2xl md:text-2xl/10 lg:text-3xl/12 font-display underline">Toccata and ------------Fugue in F major,____ BWV 540, J.S. Bach***z</p>
                <p className="text-2xl lg:text-4xl font-display">05/11/20</p>
            </Link>
        )
    }

    const rows = [];
    for (let i = 0; i < 6; i++) {
        rows.push(card(i));
    }
  return (
    <>
        <Header />
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="BACK PAGE" />
            <GridContainer classes="gap-y-20 pt-18" gapx="gap-x-8" gapxmd="md:gap-x-12">
                {rows}
                {/* <div className="h-full py-16 col-span-6 md:col-span-10 lg:col-span-9 xl:col-span-7 flex flex-wrap">
                    
                </div> */}
            </GridContainer>
        </main>
        <Footer />
    </>
  )
}
