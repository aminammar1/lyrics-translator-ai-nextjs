export interface SearchResult {
  id: string
  title: string
  artist_name: string
  url: string
  image: string
  date?: string
  artists_images?: string[]
}

export interface SongDetails {
  id: string
  title: string
  artist_name: string
  url: string
  image: string
  release_date: string
  language: string
  featured_artists: Artist[]
  primary_artist: Artist
  lyrics: string
}

export interface Artist {
  id: string
  name: string
  image: string
}

export interface Translation {
  id: string
  user_id: string
  song_id: string
  title: string
  artist: string
  image_url: string
  original_language: string
  translation_language: string
  original_lyrics: string
  translated_lyrics: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  status?: number
}

export interface LoadingState {
  loading: boolean
  error: string | null
}

export interface SearchHookReturn {
  loading: boolean
  results: SearchResult[]
  searchQuick: (query: string) => Promise<SearchResult[]>
  searchFull: (query: string) => Promise<SearchResult[]>
  clearResults: () => void
}

export interface SongHookReturn {
  loading: boolean
  song: SongDetails | Record<string, never>
  fetchSong: (
    songId: string,
    songUrl: string
  ) => Promise<SongDetails | Record<string, never>>
  clearSong: () => void
}
