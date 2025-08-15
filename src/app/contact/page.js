import React from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { ContactCard } from '../../components/ContactCard/ContactCard';
import { Header } from '../../components/Header/Header';

export default function Contact() {
  return (
    <>
      <Header />
      <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
        <PageHeader title="CONTACT" />
        <GridContainer classes="py-16 flex flex-col gap-8">
          <div className="pt-14 col-span-6 md:col-span-12 flex justify-center">
            <ContactCard
              name="T.T. Mahony"
              title="Pianist, Teacher, Raconteur, Poncey Lad"
              phone="678-370-7349"
              email="teentabernacle@gmail.com"
              website="ttmahony.com"
            />
          </div>
        </GridContainer>
      </main>
    </>
  );
}
