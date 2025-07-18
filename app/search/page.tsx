'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'

export default function SearchPage() {
    const [fullResults, setFullResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const searchParams = useSearchParams()

    useEffect(() => {
        const query = searchParams.get('q')
        if (query) {
            fetchFullList(query)
        }
    }, [searchParams])

    const fetchFullList = async (query: string) => {
        if (!query.trim()) {
            setFullResults([])
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError('')
            setFullResults([])

            const response = await fetch(
                `/api/genius/songs/search/full?q=${encodeURIComponent(query)}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON')
            }

            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }

            setFullResults(data)
        } catch (err) {
            console.error('Error fetching full results:', err)
            setError(err instanceof Error ? err.message : 'An error occurred')
            setFullResults([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SearchBar />
            {error && (
                <div className="max-w-md mx-auto mt-10 p-4 bg-red-500/15 border border-red-400/40 rounded-2xl text-red-300 text-sm">
                    Error: {error}
                </div>
            )}
            <SearchResults results={fullResults} loading={loading} />
        </>
    )
}