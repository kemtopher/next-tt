import React from 'react';
import { createClient } from '../../prismicio';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import { ImageWithText } from '../../components/ImageWithText/ImageWithText';

export default async function Lessons() {
  const client = createClient();
  const lessonsPage = await client.getSingle('lessons_page');

  return (
    <>
      <main className="w-full">
        <PageHeader title="LESSONS" />
        <GridContainer classes="pt-16 flex flex-col">
          <PageIntro content={ lessonsPage.data.hero_intro } />
          <ImageWithText
            classes="col-span-6 md:col-span-12 min-h-[150px] md:min-h-[255px]"
            imageUrl="/lessons-piano.jpg"
            alt="Encouraging image of kite flying in the wind"
            content="Students are grounded in music theory, reading and ear training, and a fluent and effortless technique is cultivated from the first lesson. As with anything, we get out of music what we put into it, and T.T. teaches that a truly focused and intentional five minutes spent can change everything."
            endingQuote={lessonsPage.data.ending_quote}
          />
        </GridContainer>
      </main>
    </>
  );
}
