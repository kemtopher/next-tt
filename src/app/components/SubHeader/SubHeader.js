import React from 'react'

export const SubHeader = ({ content }) => {
  return (
    <div className="w-full py-2 md:py-4 lg:py-8 border-y-1 border-black">
        <h3 className="w-full font-display text-center text-1xl md:text-2xl lg:text-4xl">{ content }</h3>
    </div>
  )
}
