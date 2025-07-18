'use client'

import React, { useState, useEffect } from "react"
import { SearchSlash } from 'lucide-react'
import { useRouter } from "next/navigation"
import FastResults from "./FastResults"

export default function SearchBar() {
    const [lyricsToSearch, setLyricsToSearch] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const router = useRouter()

    const handleSearch = (value: string) => {
        setLyricsToSearch(value)
    }

    const fetchSongs = async () => {
        if (lyricsToSearch.trim() === "") {
            setResults([])
            setLoading(false)
            setShowResults(false)
            return
        }

        try {
            setLoading(true)
            const res = await fetch(
                `/api/genius/songs/search/quick?q=${encodeURIComponent(lyricsToSearch)}`
            )
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            
            const contentType = res.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON')
            }
            
            const data = await res.json()
            setResults(data)
            setShowResults(true)
        } catch (error) {
            console.error("Error fetching songs:", error)
            setResults([])
            setShowResults(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (lyricsToSearch.trim() === "") {
            setResults([])
            setShowResults(false)
            return
        }

        const timeoutId = setTimeout(() => {
            fetchSongs()
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [lyricsToSearch])

    const handleInputFocus = () => {
        if (results.length > 0) {
            setShowResults(true)
        }
    }

    const handleInputBlur = () => {
        // Delay hiding results to allow for clicks
        setTimeout(() => {
            setShowResults(false)
        }, 200)
    }

    return (
        <div className="sticky w-fit mx-auto z-[150] top-32 lg:top-[17px] rounded-[20px]">
            <div className="relative">
                <input
                    className="min-w-[380px] w-[55vw] max-w-[800px] text-lg pl-4 pr-12 py-3 bg-background border border-foreground rounded-full placeholder:text-foreground placeholder:opacity-40 outline-none shadow-lg lg:shadow-md transition-all duration-200 focus:shadow-xl focus:border-opacity-80"
                    placeholder="Search song title or lyrics"
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={lyricsToSearch}
                />
                <button
                    className="border h-full aspect-square absolute top-[0] right-[0] flex justify-center items-center rounded-full border-foreground button hover:bg-foreground hover:bg-opacity-5 transition-colors duration-200"
                    onClick={() => {
                        if (lyricsToSearch.trim()) {
                            router.push(`/search?q=${encodeURIComponent(lyricsToSearch)}`)
                            setShowResults(false)
                        }
                    }}
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