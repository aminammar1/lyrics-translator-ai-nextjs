'use client'

import React from "react"
import { SearchSlash } from 'lucide-react'

export default function SearchBar() {
    return (
        <div className="sticky w-fit mx-auto z-[150] top-32 lg:top-[17px] rounded-[20px]">
            <input
                className="min-w-[380px] w-[55vw] max-w-[800px] text-lg pl-4 pr-12 py-3 bg-background border border-foreground rounded-full placeholder:text-foreground placeholder:opacity-40 outline-none shadow-lg lg:shadow-md transition-all duration-200 focus:shadow-xl focus:border-opacity-80"
                placeholder="Search song title or lyrics"
                onChange={(e) => {
                    // handleSearch(e.target.value);
                }}
                // value={lyricsToSearch}
            />
            <button
                className="border h-full aspect-square absolute top-[0] right-[0] flex justify-center items-center rounded-full border-foreground button hover:bg-foreground hover:bg-opacity-5 transition-colors duration-200"
                onClick={() => {
                    // router.push(`/search?q=${lyricsToSearch}`);
                    // setShowResults(false);
                }}
            >
                <SearchSlash size={22} />
            </button>
            {/* (results.length > 0 || loading == true) && showResults && (
                <FastSearchResults
                    results={results}
                    loading={loading}
                    setShowResults={setShowResults}
                />
            ) */}
        </div>
    )
}
