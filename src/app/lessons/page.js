import React from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import { ImageWithText } from '../../components/ImageWithText/ImageWithText';

export default function Lessons() {
  return (
    <>
      <main className="w-full pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="LESSONS" />
        <GridContainer classes="pt-16 flex flex-col">
          <PageIntro content="T.T. has been teaching in various contexts since 2002. He has guided 3-year-olds in beginning Suzuki lessons, prepared students for competitions and college auditions, and many way-stations in between. The student's goals and personal strengths and weaknesses guide his approach." />

          <ImageWithText
            classes="col-span-6 md:col-span-12 min-h-[150px] md:min-h-[255px]"
            imageUrl="/lessons-piano.jpg"
            alt="Encouraging image of kite flying in the wind"
            content="Students are grounded in music theory, reading and ear training, and a fluent and effortless technique is cultivated from the first lesson. As with anything, we get out of music what we put into it, and T.T. teaches that a truly focused and intentional five minutes spent can change everything."
          />
        </GridContainer>
      </main>
    </>
  );
}
