import { NextRequest, NextResponse } from 'next/server'

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
    console.error('GENIUS_ACCESS_TOKEN is not set in environment variables')
    return NextResponse.json(
      { error: 'Missing Genius API token configuration' },
      { status: 500 }
    )
  }

  console.log('Environment check - Token exists:', !!GENIUS_ACCESS_TOKEN)
  console.log('Token length:', GENIUS_ACCESS_TOKEN?.length)
  console.log('Making full search request to Genius API for query:', query)

  try {
    const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}&per_page=12`
    console.log('Request URL:', url)
    
    const headers = {
      'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`,
      'User-Agent': 'SingLang/1.0',
      'Accept': 'application/json',
    }
    
    console.log('Request headers:', Object.keys(headers))
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Genius API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries()),
      })

      // Return more specific error messages
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Genius API access forbidden. Check your API token.' },
          { status: 403 }
        )
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Unauthorized access to Genius API. Invalid token.' },
          { status: 401 }
        )
      }

      throw new Error(
        `Genius API Error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!data.response || !data.response.hits) {
      console.error('Invalid Genius API response structure:', data)
      return NextResponse.json([], { status: 200 })
    }

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

    return NextResponse.json(filteredResults, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error: any) {
    console.error('Error in full search API:', {
      message: error.message,
      stack: error.stack,
      query: query,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? error.message || 'Failed to search songs'
            : 'Failed to search songs',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}
