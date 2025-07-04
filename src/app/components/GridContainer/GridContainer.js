import React from 'react'

export const GridContainer = ({ children, classes }) => {
  return (
    <div className={`w-full h-full grid grid-cols-6 md:grid-cols-12 gap-x-2.5 md:gap-x-5 ${classes}`}>
        { children }
    </div>
  )
}
