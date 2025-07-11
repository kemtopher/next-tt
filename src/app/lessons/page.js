import React from 'react'
import { Header } from '../../components/Header/Header'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { GridContainer } from '../../components/GridContainer/GridContainer'
import { Footer } from '../../components/Footer/Footer'
import { PageIntro } from '../../components/PageIntro/PageIntro'
import { ImageWithText } from '../../components/ImageWithText/ImageWithText'
import Image from 'next/image'
import { QuoteBlock } from '../../components/QuoteBlock/QuoteBlock'

export default function Lessons() {
    const quote = `He who who binds to himself a joy\n\nDoes the winged life destroy;\n\nHe who kisses the joy as it flies\n\nLives in eternity’s sunrise.`;

    const quoteRich = quote.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))
  return (
    <>
        <main className="w-full pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="LESSONS" />
            <GridContainer classes="pt-16 flex flex-col">
                <PageIntro content="T.T. has been teaching in various contexts since 2002. He has guided 3-year-olds in beginning Suzuki lessons, prepared students for competitions and college auditions, and many way-stations in between. The student's goals and personal strengths and weaknesses guide his approach."/>
                
                <ImageWithText
                    classes="col-span-6 md:col-span-12 min-h-[150px] md:min-h-[255px]"
                    imageUrl='/lessons-piano.jpg'
                    alt="Encouraging image of kite flying in the wind"
                    content="Students are grounded in music theory, reading and ear training, and a fluent and effortless technique is cultivated from the first lesson. As with anything, we get out of music what we put into it, and T.T. teaches that a truly focused and intentional five minutes spent can change everything."
                />
                <QuoteBlock
                    content={quoteRich}

                    author="William Blake"
                />
            </GridContainer>
        </main>
    </>
  )
}
