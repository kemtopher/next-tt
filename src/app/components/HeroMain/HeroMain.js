import React from 'react'
import { GridContainer } from '../GridContainer/GridContainer'

export const HeroMain = () => {
  return (
    <div className="w-full h-[581px]">
        <GridContainer>
            <div className="col-span-6">
                <div className="h-full flex flex-col gap-8 items-end">
                    <h2 className="font-display font-bold text-8xl">TT Mahony</h2>
                    <h3 className="font-display text-5xl/15">The Toppermost of the Poppermost</h3>
                </div>
            </div>                
        </GridContainer>
    </div>
  )
}
