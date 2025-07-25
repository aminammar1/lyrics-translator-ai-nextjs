'use client'

import React, { useEffect } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { useSong } from '@/hooks/useApi'
import SongPage from '@/components/Song'

export default function Song() {
  const { loading, song: songInfo, fetchSong } = useSong()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if (searchParams.has('url')) {
      const songUrl = searchParams.get('url')
      const songId = pathname.split('/').pop()

      if (songUrl && songId) {
        fetchSong(songId, songUrl)
      }
    }
  }, [searchParams, pathname, fetchSong])

  return (
    <>
      <SongPage song={songInfo} loading={loading} />
    </>
  )
}
