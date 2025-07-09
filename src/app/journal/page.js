import React from 'react'
import { Header } from "../../components/Header/Header"
import { Footer } from '../../components/Footer/Footer'
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { GridContainer } from '../../components/GridContainer/GridContainer'
import IconReadMore from '../../components/icons/IconReadMore'

export default function Journal() {
    function card(i) {
        return (
            <div className="w-full h-full p-3 md:p-6 border flex gap-4 md:gap-8" key={i}>
                <div className="h-full w-[125px]">
                    <div className="h-full flex flex-col justify-center gap-4 font-secondary">
                        <p className="text-center text-2xl md:text-3xl font-semibold">OCT</p>
                        <p className="text-center text-4xl md:text-5xl font-semibold">3</p>
                        <p className="text-center text-2xl md:text-3xl font-semibold">2021</p>
                    </div>
                </div>
                <div className="h-full w-full flex flex-col justify-between gap-4 lg:gap-8">
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">Journal Title</h2>
                    <p className="font-display text-base">Losing friends in your 40s seems to have maybe a higher price than before ...</p>
                    <div className="flex justify-end gap-2">
                        <span className="font-secondary">Read More</span>
                        <a href="#" className="flex flex-col justify-center">
                            <IconReadMore classes="hover:fill-accent"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const rows = [];
    for (let i =0; i < 6; i++) {
        rows.push(card(i));
    }

  return (
    <>
        <Header />
        <main className="w-full pt-8 md:pt-12 lg:pt-18">
            <PageHeader title="JOURNAL" />
            <GridContainer>
                <div className="h-full py-16 col-span-6 md:col-span-10 lg:col-span-9 xl:col-span-7 flex flex-col gap-8">
                    { rows }
                </div>
            </GridContainer>
        </main>
        <Footer />
    </>    
  )
}
