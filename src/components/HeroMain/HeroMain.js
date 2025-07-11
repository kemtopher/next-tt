import React from 'react';
import { GridContainer } from '../GridContainer/GridContainer';

export const HeroMain = () => {
  return (
    <section className="w-full h-[581px] pt-8 md:pt-12 lg:pt-18 pb-15 md:pb-26">
      <GridContainer>
        <div className="col-span-4 md:col-span-6">
          <div className="h-full flex flex-col items-start md:items-center justify-end">
            <div className="compo flex flex-col max-w-xs md:max-w-full gap-4 md:gap-8">
              <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl">
                TT Mahony
              </h2>
              <h3 className="font-display text-2xl md:text-4xl/12 lg:text-5xl/15">
                The Toppermost of the Poppermost
              </h3>
            </div>
          </div>
        </div>
      </GridContainer>
    </section>
  );
};
