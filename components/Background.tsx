import React from 'react'

export default function Background() {
  return (
    <>
      <div className="w-full h-full *:fixed pointer-events-none">
        <div
          className="animated-circle aspect-square rounded-full z-[-50] w-[200px] blur-[100px] left-0 top-0 md:w-[400px] bg-custom-blue md:blur-[200px] md:left-[-200px]"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="animated-circle aspect-square rounded-full z-[-50] w-[200px] blur-[100px] right-0 top-0 md:w-[400px] bg-custom-pink md:blur-[200px] md:right-[-200px]"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="animated-circle aspect-square rounded-full z-[-50] w-[150px] blur-[80px] left-1/2 top-1/2 md:w-[300px] bg-custom-light-blue md:blur-[160px] md:left-[40%] md:top-[60%]"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </>
  )
}
