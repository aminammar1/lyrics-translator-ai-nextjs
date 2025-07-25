import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN

  if (!GENIUS_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'No token found' }, { status: 500 })
  }

  try {
    console.log('Testing Genius API connection...')
    console.log('Token length:', GENIUS_ACCESS_TOKEN.length)
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Vercel region:', process.env.VERCEL_REGION || 'local')

    // Test with a simple search
    const testUrl = 'https://api.genius.com/search?q=hello&per_page=1'

    const startTime = Date.now()
    const response = await fetch(testUrl, {
      headers: {
        Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
        'User-Agent': 'SingLang/1.0',
        Accept: 'application/json',
      },
    })
    const requestTime = Date.now() - startTime

    console.log('Response status:', response.status)
    console.log(
      'Response headers:',
      Object.fromEntries(response.headers.entries())
    )
    console.log('Request time:', requestTime + 'ms')

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)

      return NextResponse.json(
        {
          success: false,
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          requestTime,
          environment: process.env.NODE_ENV,
          region: process.env.VERCEL_REGION || 'local',
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      status: response.status,
      requestTime,
      environment: process.env.NODE_ENV,
      region: process.env.VERCEL_REGION || 'local',
      resultCount: data.response?.hits?.length || 0,
      rateLimit: {
        remaining: response.headers.get('x-ratelimit-remaining'),
        limit: response.headers.get('x-ratelimit-limit'),
        reset: response.headers.get('x-ratelimit-reset'),
      },
    })
  } catch (error: any) {
    console.error('Test request failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        environment: process.env.NODE_ENV,
        region: process.env.VERCEL_REGION || 'local',
      },
      { status: 500 }
    )
  }
}
