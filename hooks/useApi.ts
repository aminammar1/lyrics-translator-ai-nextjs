import { useState, useCallback } from 'react';
import { geniusApi } from '@/lib/api';

export const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const searchQuick = useCallback(async (query: string) => {
        if (!query.trim()) {
            setResults([])
            return []
        }

        try {
            setLoading(true);
            const data = await geniusApi.searchQuick(query);
            setResults(data);
            return data;
        } catch (error) {
            setResults([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, [])

    const searchFull = useCallback(async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return [];
        }

        try {
            setLoading(true);
            const data = await geniusApi.searchFull(query);
            setResults(data);
            return data;
        } catch (error) {
            setResults([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setResults([]);
    }, []);

    return {
        loading,
        results,
        searchQuick,
        searchFull,
        clearResults,
    }
}

export const useSong = () => {
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState({});

    const fetchSong = useCallback(async (songId: string, songUrl: string) => {
        try {
            setLoading(true);
            const data = await geniusApi.getSong(songId, songUrl);
            setSong(data);
            return data;
        } catch (error) {
            setSong({})
            return null
        } finally {
            setLoading(false);
        }
    }, [])

    const clearSong = useCallback(() => {
        setSong({});
    }, []);

    return {
        loading,
        song,
        fetchSong,
        clearSong,
    }
}
