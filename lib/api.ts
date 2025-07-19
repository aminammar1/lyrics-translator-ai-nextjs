import axios from 'axios'
import { handleApiError } from './errorHandler';
import { API_CONFIG } from './constants';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError = handleApiError(error.response?.data || error);

        console.error('API Error:', {
            url:    error.config?.url,
            status: error.response?.status,
            message: apiError.message,
        });

        throw new Error(apiError.message);
    }
)

export const geniusApi = {
    searchQuick: async (query: string) => {
        const response = await api.get(
            `/genius/songs/search/quick?q=${encodeURIComponent(query)}`
        );
        return response.data;
    },

    searchFull: async (query: string) => {
        const response = await api.get(
            `/genius/songs/search/full?q=${encodeURIComponent(query)}`
        );
        return response.data;
    },

    getSong: async (songId: string, songUrl: string) => {
        const response = await api.get(
            `/genius/songs/${songId}?url=${encodeURIComponent(songUrl)}`
        );
        return response.data;
    },
}

export default api
