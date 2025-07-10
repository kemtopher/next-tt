import React from 'react'
import Link from 'next/link'

export const BackPageCard = ({title, date, link}) => {
  return (
    <Link href="" className="p-4 md:p-7 col-span-3 md:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3 aspect-square flex flex-col justify-between border sm:border-2">
        <p className="mb-12 md:mb-44 text-xl/7 sm:text-2xl md:text-2xl/10 lg:text-3xl/12 font-display underline">Toccata and ------------Fugue in F major,____ BWV 540, J.S. Bach***z</p>
        <p className="text-2xl lg:text-4xl font-display">05/11/20</p>
    </Link>
  )
}
