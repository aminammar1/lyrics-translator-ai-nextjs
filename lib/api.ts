import axios from 'axios'
import { handleApiError } from './errorHandler'

const api = axios.create({
    baseURL: '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError = handleApiError(error.response?.data || error)

        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: apiError.message
        })

        throw new Error(apiError.message || 'API request failed')
    }
)

export const geniusApi = {
    searchQuick: async (query: string) => {
        const response = await api.get(
            `/genius/songs/search/quick?q=${encodeURIComponent(query)}`
        )
        return response.data
    },

    searchFull: async (query: string) => {
        const response = await api.get(
            `/genius/songs/search/full?q=${encodeURIComponent(query)}`
        )
        return response.data
    },

    getSong: async (songId: string, songUrl: string) => {
        const response = await api.get(
            `/genius/songs/${songId}?url=${encodeURIComponent(songUrl)}`
        )
        return response.data
    }
}

export default api
