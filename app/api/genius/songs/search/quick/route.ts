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
      { error: 'Missing Genius API token configuration' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(
        query
      )}&per_page=3&access_token=${GENIUS_ACCESS_TOKEN}`
    )

    if (!response.ok) {
      throw new Error(
        `Genius API Error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!data.response || !data.response.hits) {
      return NextResponse.json([], { status: 200 })
    }

    const filteredResults = data.response.hits.map((hit: any) => ({
      id: hit.result.id,
      title: hit.result.title,
      artist_name: hit.result.artist_names,
      url: hit.result.url,
      image: hit.result.header_image_thumbnail_url,
    }))

    return NextResponse.json(filteredResults)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to search songs' },
      { status: 500 }
    )
  }
}
