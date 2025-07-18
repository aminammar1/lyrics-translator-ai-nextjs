'use client'

import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import SongPage from '@/components/Song'
import { useSearchParams, usePathname } from 'next/navigation'

export default function Song() {
    const [songInfo, setSongInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        if (searchParams.has('url')) {
            const songUrl = searchParams.get('url')
            const songId = pathname.split('/').pop()

            const getSongPage = async (songId: string, songUrl: string) => {
                setLoading(true);
                const response = await fetch(
                    `/api/genius/${songId}/?url=${songUrl}`
                )
                const song = await response.json()
                setSongInfo(song)
                setLoading(false)
            }

            if (songUrl && songId) getSongPage(songId, songUrl);
        }
    }, [searchParams, pathname])

    return (
        <>
            <SearchBar />
            <SongPage song={songInfo} loading={loading} />
        </>
    )
}