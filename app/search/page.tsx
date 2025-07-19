'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearch } from '@/hooks/useApi'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'

export default function SearchPage() {
  const { loading, results: fullResults, searchFull } = useSearch()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      searchFull(query)
    }
  }, [searchParams, searchFull])

  return (
    <>
      <SearchBar />
      <SearchResults results={fullResults} loading={loading} />
    </>
  )
}
