    import { handleApiError } from './errorHandler'

    const API_BASE_URL = '/api'
    const API_TIMEOUT = 30000

    const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    try {
        const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const apiError = handleApiError(errorData)

        console.error('API Error:', {
            url: response.url,
            status: response.status,
            data: errorData,
            message: apiError.message,
        })

        throw new Error(apiError.message || 'API request failed')
        }

        return response
    } catch (error) {
        clearTimeout(timeoutId)
        throw error
    }
    }

    export const geniusApi = {
    searchQuick: async (query: string) => {
        const response = await fetchWithTimeout(
        `${API_BASE_URL}/genius/songs/search/quick?q=${encodeURIComponent(query)}`
        )
        return response.json()
    },

    searchFull: async (query: string) => {
        const response = await fetchWithTimeout(
        `${API_BASE_URL}/genius/songs/search/full?q=${encodeURIComponent(query)}`
        )
        return response.json()
    },

    getSong: async (songId: string, songUrl: string) => {
        const response = await fetchWithTimeout(
        `${API_BASE_URL}/genius/songs/${songId}?url=${(
            songUrl
        )}`
        )
        return response.json()
    },
    }

    export default { geniusApi }
