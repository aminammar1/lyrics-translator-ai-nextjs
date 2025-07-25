'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useSearch } from '@/hooks/useApi'
import FastResults from './FastResults'

export default function SearchBar() {
  const [lyricsToSearch, setLyricsToSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { loading, results, searchQuick } = useSearch()
  const router = useRouter()
  const pathname = usePathname()

  // Check if we're on a song page
  const isOnSongPage = pathname.startsWith('/song/')

  const handleSearch = (value: string) => {
    setLyricsToSearch(value)
  }

  const fetchSongs = useCallback(async () => {
    if (lyricsToSearch.trim() === '') {
      setShowResults(false)
      return
    }

    const data = await searchQuick(lyricsToSearch)
    setShowResults(data.length > 0 || loading)
  }, [lyricsToSearch, searchQuick, loading])

  useEffect(() => {
    if (lyricsToSearch.trim() === '') {
      setShowResults(false)
      return
    }

    setShowResults(true)
    const timeoutId = setTimeout(fetchSongs, 300)
    return () => clearTimeout(timeoutId)
  }, [lyricsToSearch])

  const handleInputFocus = () => {
    if (isOnSongPage) {
      setIsExpanded(true)
    }
    if (results.length > 0) {
      setShowResults(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowResults(false)
      if (isOnSongPage && !lyricsToSearch.trim()) {
        setIsExpanded(false)
      }
    }, 200)
  }

  const handleClose = () => {
    setIsExpanded(false)
    setLyricsToSearch('')
    setShowResults(false)
  }

  const handleButtonClick = () => {
    if (lyricsToSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(lyricsToSearch)}`)
      setShowResults(false)
      if (isOnSongPage) {
        setIsExpanded(false)
      }
    }
  }

  return (
    <>
      {/* Only show SearchBar on non-song pages */}
      {!isOnSongPage && (
        <div
          className="
                    sticky w-fit mx-auto z-[150] 
                    top-16 lg:top-5
                    rounded-full
                "
        >
          <div className="relative group">
            <input
              className="
                            w-[280px] sm:w-[320px] md:w-[400px] 
                            lg:w-[600px] xl:w-[700px]
                            h-12 text-sm px-5 pr-14
                            bg-foreground/5 backdrop-blur-xl
                            border border-foreground/10
                            rounded-full 
                            placeholder:text-foreground/40 text-foreground
                            outline-none shadow-lg shadow-black/5
                            transition-all duration-500 ease-out
                            focus:bg-foreground/8 focus:border-custom-orange/30
                            focus:shadow-xl focus:shadow-custom-pink/10
                            focus:scale-[1.02]
                            hover:bg-foreground/7 hover:border-foreground/20
                            hover:shadow-xl hover:shadow-custom-pink/5
                            group-hover:scale-[1.01]
                        "
              placeholder="Search songs, artists, lyrics..."
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={lyricsToSearch}
            />
            <button
              className="
                            w-10 h-10 absolute top-1 right-1
                            flex justify-center items-center 
                            rounded-full 
                            bg-gradient-to-r from-custom-orange to-custom-pink
                            text-white
                            hover:shadow-lg hover:shadow-custom-pink/30
                            hover:scale-110
                            active:scale-95
                            transition-all duration-300 ease-out
                            group-hover:rotate-6
                        "
              onClick={handleButtonClick}
            >
              <Search size={16} strokeWidth={2.5} />
            </button>
            {showResults && lyricsToSearch.trim() && (
              <FastResults
                results={results}
                loading={loading}
                setShowResults={setShowResults}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
