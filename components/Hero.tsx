import React from 'react'
import {italiana } from '@/app/layout'

export default function Hero() {
    return (
        <div
            className="
                flex
                flex-col
                justify-end
                items-center
                h-[50vh]
                mx-5
                mb-10
                text-center
            "
        >
            <h3 className="opacity-70 text-lg lg:text-2xl font-semibold">
                Music Know no Barriers
            </h3>
            <h1
                className={
                    `${italiana.className} text-7xl lg:text-9xl mb-5`
                }
            >
                Sing Lang
            </h1>
            <h3 className="text-xl lg:text-2xl text-center">
                Translate Any Song To Any Language
            </h3>
        </div>
    )
}
