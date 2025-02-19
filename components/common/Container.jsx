import React from 'react'

export default function container({children, className}) {
  return (
    <div className={`sm:max-w-[740px] sm:min-w-[630px] md:max-w-[1000px] md:min-w-[800px]  lg:max-w-[1300px] lg:min-w-[1300px] mx-auto lg:px-10 px-5 ${className}`}>
      {children}
    </div>
  )

} 
