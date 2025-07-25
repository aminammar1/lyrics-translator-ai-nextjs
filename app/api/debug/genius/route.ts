import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // This route helps debug environment variable issues
  const geniusToken = process.env.GENIUS_ACCESS_TOKEN

  return NextResponse.json({
    hasGeniusToken: !!geniusToken,
    tokenLength: geniusToken ? geniusToken.length : 0,
    tokenPrefix: geniusToken ? geniusToken.substring(0, 8) + '...' : 'not-set',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
