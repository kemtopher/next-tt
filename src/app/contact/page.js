import React from 'react'
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { GridContainer } from '../../components/GridContainer/GridContainer'

export default function Contact() {

  return (
    <>
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="CONTACT" />
            <GridContainer classes="py-16 flex flex-col gap-8">
                <div></div>
            </GridContainer>
        </main>
    </>    
  )
}
