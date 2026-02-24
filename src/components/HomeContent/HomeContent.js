'use client';

import React, { useRef } from 'react';

import { AnimatedHeader } from '../AnimatedHeader/AnimatedHeader';
import { Ecommerce } from '../Ecommerce/Ecommerce';
import { HeroMain } from '../HeroMain/HeroMain';
import { PageCta } from '../PageCta/PageCta';
import { SubHeader } from '../SubHeader/SubHeader';
import { SoundCloud } from '../SoundCloud/SoundCloud';

export default function HomeContent({ homePage, soundCloudData }) {
    const heroRef = useRef();
    console.log("HP: ", homePage.data)

    return (
        <div className="pt-40">
            <AnimatedHeader heroRef={heroRef} />
            <main className="w-full">
                <HeroMain
                    heroRef={heroRef}
                    header={homePage.data.hero_header}
                    subheader={homePage.data.hero_sub_header}
                />
                <SubHeader content={homePage.data.divider_header} />
                <PageCta
                    title={homePage.data.page_links_header}
                    content={homePage.data.page_links_content}
                    images={homePage.data.welcome_nav}
                />
                <Ecommerce
                    image={homePage.data.ecommerce_section[0].product_image}
                    description={
                        homePage.data.ecommerce_section[0]
                            .product_form_description[0].text
                    }
                    header={
                        homePage.data.ecommerce_section[0]
                            .product_form_header[0].text
                    }
                />
                <SoundCloud soundCloudData={soundCloudData} content={homePage.data.soundcloud_section_content} />
            </main>
        </div>
    );
}
