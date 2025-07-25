import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function GET(
  req: NextRequest,
  { params }: any
): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const resolvedParams = await params
  const songId = resolvedParams.id
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
    console.error('GENIUS_ACCESS_TOKEN is not set in environment variables')
    return NextResponse.json(
      { error: 'Missing Genius API token configuration' },
      { status: 500 }
    )
  }

  console.log('Environment check - Token exists:', !!GENIUS_ACCESS_TOKEN)
  console.log('Fetching song details for ID:', songId)

  try {
    const [songResponse, songPageResponse] = await Promise.all([
      fetch(`https://api.genius.com/songs/${encodeURIComponent(songId)}`, {
        headers: {
          Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }),
      axios.get(songUrl, { timeout: 15000 }),
    ])

    if (!songResponse.ok) {
      const errorText = await songResponse.text()
      console.error('Genius API Error Details:', {
        status: songResponse.status,
        statusText: songResponse.statusText,
        body: errorText,
        songId: songId,
        url: songResponse.url,
      })

      // Return more specific error messages
      if (songResponse.status === 403) {
        return NextResponse.json(
          { error: 'Genius API access forbidden. Check your API token.' },
          { status: 403 }
        )
      }

      if (songResponse.status === 401) {
        return NextResponse.json(
          { error: 'Unauthorized access to Genius API. Invalid token.' },
          { status: 401 }
        )
      }

      throw new Error(
        `Genius API Error: ${songResponse.status} ${songResponse.statusText}`
      )
    }

    const data = await songResponse.json()

    if (!data.response || !data.response.song) {
      console.error('Invalid Genius API response structure:', data)
      throw new Error('Invalid song data received')
    }

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

    return NextResponse.json(formattedSong, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error: any) {
    console.error('Error in song details API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch song details' },
      { status: 500 }
    )
  }
}
