import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'genius-lyrics'

export async function GET(
  req: NextRequest,
  { params }: any
): Promise<NextResponse> {
  const { id } = await params
  const songId = id

  if (!songId) {
    return NextResponse.json(
      { error: 'Query parameter "id" is required' },
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
    const client = new Client(GENIUS_ACCESS_TOKEN)
    const song = await client.songs.get(parseInt(songId))

    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }

    const lyrics = await song.lyrics()

    const formattedSong = {
      id: song.id,
      title: song.title,
      artist_name: song.artist.name,
      url: song.url,
      image: song.image,
      release_date: song.releasedAt,
      language: null,
      featured_artists: [],
      primary_artist: {
        id: song.artist.id,
        name: song.artist.name,
        image: song.artist.image,
      },
      lyrics: lyrics,
    }

    return NextResponse.json(formattedSong)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
