import { supabase } from '@/supabase/client'
import { createUserDocument } from '@/data/userDocument'

export const signUp = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) throw error

        if (data.user) {
            await createUserDocument(data.user.id, email)
        }

        return { user: data.user, error: null }
    } catch (error: any) {
        return { user: null, error: error.message }
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        return { user: data.user, error: null }
    } catch (error: any) {
        return { user: null, error: error.message }
    }
}

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        return { error: null }
    } catch (error: any) {
        return { error: error.message }
    }
}

export const getCurrentUser = async () => {
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (error) throw error

        return user
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}
