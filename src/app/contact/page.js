import React from 'react';

import { ContactCard } from '../../components/ContactCard/ContactCard';
import { GridContainer } from '../../components/GridContainer/GridContainer';
import { Header } from '../../components/Header/Header';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export default function Contact() {
    return (
        <>
            <Header />
            <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
                <PageHeader title="CONTACT" />
                <GridContainer classes="pt-16 pb-40 flex flex-col gap-8">
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
