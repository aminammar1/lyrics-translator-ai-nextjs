import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
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
    // Try with access_token as query parameter first (recommended for Vercel)
    let response = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(
        query
      )}&per_page=12&access_token=${GENIUS_ACCESS_TOKEN}`
    )

    // If that fails with 403, try with Bearer header as fallback
    if (!response.ok && response.status === 403) {
      console.log('Query param auth failed, trying Bearer header...')
      response = await fetch(
        `https://api.genius.com/search?q=${encodeURIComponent(
          query
        )}&per_page=12`,
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
    const filteredResults = data.response.hits.map((hit: any) => ({
      id: hit.result.id,
      title: hit.result.title,
      artist_name: hit.result.artist_names,
      url: hit.result.url,
      image: hit.result.header_image_url,
      date: hit.result.release_date_for_display,
      artists_images:
        hit.result.primary_artists?.map((artist: any) => artist.image_url) ||
        [],
    }))
    return NextResponse.json(filteredResults)
  } catch (error) {
    console.error('Error Genius API Full Search:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      query: query,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
