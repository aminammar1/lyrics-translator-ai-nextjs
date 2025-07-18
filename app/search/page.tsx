'use client'

import React, {useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'

export default function SearchPage() {
    const [fullResults, setFullResults] = useState([])
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.has('q')) {
            const query = searchParams.get('q')
            const fetchFullList = async (query: string) => {
                setFullResults([])
                if (!query.trim()) {
                    setLoading(false)
                    return
                }
                try {
                    setLoading(true)
                    const response = await fetch(
                        `/api/genius/search/full?q=${encodeURIComponent(query)}`
                    )
                    if (!response.ok) {
                        console.log('Error fetching full results:', response.statusText)
                    }
                    const data = await response.json()
                    setFullResults(data)
                    setLoading(false)
                } catch (err) {
                    console.error(err)
                }
            }
            if (query) fetchFullList(query)
        }
    }, [searchParams])

    return (
        <>
            <SearchBar />
            <SearchResults results={fullResults} loading={loading} />
        </>
    )
}