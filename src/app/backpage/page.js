import React from 'react'
import { Header } from '../../components/Header/Header'
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { Footer } from '../../components/Footer/Footer'

export default function BackPage() {
  return (
    <>
        <Header />
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="BACK PAGE" />
            <GridContainer>
                <div className="h-full py-16 col-span-6 md:col-span-10 lg:col-span-9 xl:col-span-7 flex flex-col gap-8">
                    
                </div>
            </GridContainer>
        </main>
        <Footer />
    </>
  )
}
