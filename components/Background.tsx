import React from "react"

export default function Background() {
    return (
    <>
      <div className="w-full h-full *:fixed">
        <div className="aspect-square rounded-full z-[-50] w-[200px] blur-[100px] left-0 top-0 md:w-[400px] bg-customblue md:blur-[200px] md:left-[-200px]"></div>
        <div className="aspect-square rounded-full z-[-50] w-[200px] blur-[100px] right-0 top-0 md:w-[400px] bg-custompink md:blur-[200px] md:right-[-200px]"></div>
        </div>
    </>
    )
}