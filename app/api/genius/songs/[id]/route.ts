import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET(
  req: NextRequest,
  { params }: any
): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const songId = params.id
  const songUrl = searchParams.get('url')

  if (!songId) {
    return NextResponse.json(
      { error: 'Query parameter "id" is required' },
      { status: 400 }
    )
  }

  if (!songUrl) {
    return NextResponse.json(
      { error: 'Query parameter "url" is required' },
      { status: 400 }
    )
  }
  const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN

  if (!GENIUS_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Genius API token' },
      { status: 500 }
    )
  }

  try {
    // Try with access_token as query parameter first
    let response = await fetch(
      `https://api.genius.com/songs/${encodeURIComponent(
        songId
      )}?access_token=${GENIUS_ACCESS_TOKEN}`
    )

    // If that fails with 403, try with Bearer header as fallback
    if (!response.ok && response.status === 403) {
      console.log('Query param auth failed, trying Bearer header...')
      response = await fetch(
        `https://api.genius.com/songs/${encodeURIComponent(songId)}`,
        {
          headers: {
            Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
          },
        }
      )
    }

    if (!response.ok) {
      console.error(
        `Genius API Error: ${response.status} ${response.statusText}`
      )
      throw new Error(`Error Genius API: ${response.statusText}`)
    }

    const data = await response.json()

    const songPageResponse = await axios.get(songUrl)
    const $ = cheerio.load(songPageResponse.data)
    const lyricsContainer = $('[data-lyrics-container="true"]')
    $('br', lyricsContainer).replaceWith('\n')
    $('a', lyricsContainer).replaceWith((_i, el) => $(el).text())
    lyricsContainer.children().remove()
    const lyrics = lyricsContainer.text()

    const song = data.response.song

    const formattedSong = {
      id: song.id,
      title: song.title,
      artist_name: song.primary_artist.name,
      url: song.url,
      image: song.header_image_url,
      release_date: song.release_date_for_display,
      language: song.language,
      featured_artists:
        song.featured_artists?.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          image: artist.image_url,
        })) || [],
      primary_artist: {
        id: song.primary_artist.id,
        name: song.primary_artist.name,
        image: song.primary_artist.image_url,
      },
      lyrics: lyrics,
    }

    return NextResponse.json(formattedSong)
  } catch (error) {
    console.error('Error Genius API:', error as any)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
