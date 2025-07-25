import { supabase } from '../client'

export interface Translation {
  id?: string
  user_id: string
  song_id: string
  title: string
  artist: string
  image_url: string
  original_language: string
  translation_language: string
  original_lyrics: string
  translated_lyrics: string
  created_at?: string
  updated_at?: string
}

export const saveTranslation = async (
  translation: Omit<Translation, 'id' | 'created_at' | 'updated_at'>
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User must be authenticated to save translations')
    }

    const translationData = {
      ...translation,
      user_id: user.id,
    }

    const { data, error } = await supabase
      .from('translations')
      .insert([translationData])
      .select()
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'Failed to save translation',
    }
  }
}

export const getTranslation = async (id: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User must be authenticated to access translations')
    }

    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'Failed to fetch translation',
    }
  }
}

export const getUserTranslations = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User must be authenticated to access translations')
    }

    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'Failed to fetch translations',
    }
  }
}

export const deleteTranslation = async (id: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User must be authenticated to delete translations')
    }

    const { error } = await supabase
      .from('translations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      throw error
    }

    return { error: null }
  } catch (error: any) {
    return {
      error: error.message || 'Failed to delete translation',
    }
  }
}
