'use client'

import React, { useState, useEffect } from 'react'
import { SearchSlash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/hooks/useApi'
import FastResults from './FastResults'

export default function SearchBar() {
    const [lyricsToSearch, setLyricsToSearch] = useState('')
    const [showResults, setShowResults] = useState(false)
    const { loading, results, searchQuick } = useSearch()
    const router = useRouter()

    const handleSearch = (value: string) => {
        setLyricsToSearch(value)
    }

    const fetchSongs = async () => {
        if (lyricsToSearch.trim() === '') {
            setShowResults(false)
            return
        }

        const data = await searchQuick(lyricsToSearch)
        setShowResults(data.length > 0)
    }

    useEffect(() => {
        if (lyricsToSearch.trim() === '') {
            setShowResults(false)
            return
        }

        const timeoutId = setTimeout(fetchSongs, 500)
        return () => clearTimeout(timeoutId)
    }, [lyricsToSearch])

    const handleInputFocus = () => {
        if (results.length > 0) {
            setShowResults(true)
        }
    }

    const handleInputBlur = () => {
        // Delay hiding results to allow for clicks
        setTimeout(() => setShowResults(false), 200)
    }

    const handleButtonClick = () => {
        if (lyricsToSearch.trim()) {
            router.push(`/search?q=${encodeURIComponent(lyricsToSearch)}`)
            setShowResults(false)
        }
    }

    return (
        <div
            className="
                sticky w-fit mx-auto z-[150] 
                top-32 lg:top-[17px] 
                rounded-[20px]
            "
        >
            <div className="relative">
                <input
                    className="
                        min-w-[380px] w-[55vw] max-w-[800px] 
                        text-lg pl-4 pr-12 py-3 
                        bg-background border border-foreground 
                        rounded-full 
                        placeholder:text-foreground placeholder:opacity-40 
                        outline-none shadow-lg lg:shadow-md 
                        transition-all duration-200 
                        focus:shadow-xl focus:border-opacity-80
                    "
                    placeholder="Search song title or lyrics"
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={lyricsToSearch}
                />
                <button
                    className="
                        border h-full aspect-square 
                        absolute top-0 right-0 
                        flex justify-center items-center 
                        rounded-full border-foreground button 
                        hover:bg-foreground hover:bg-opacity-5 
                        transition-colors duration-200
                    "
                    onClick={handleButtonClick}
                >
                    <SearchSlash size={22} />
                </button>
                {(results.length > 0 || loading) && showResults && (
                    <FastResults
                        results={results}
                        loading={loading}
                        setShowResults={setShowResults}
                    />
                )}
            </div>
        </div>
    )
}
