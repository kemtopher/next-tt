'use client';

import React, { useRef } from 'react';

import { AnimatedHeader } from '../AnimatedHeader/AnimatedHeader';
import { HeroMain } from '../HeroMain/HeroMain';
import { PageCta } from '../PageCta/PageCta';
import { SubHeader } from '../SubHeader/SubHeader';

export default function HomeContent({ homePage }) {
    const heroRef = useRef();

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
            </main>
        </div>
    );
}
