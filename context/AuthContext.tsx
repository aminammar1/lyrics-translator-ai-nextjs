'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/supabase/client'
import { UserDocument, getUserDocument } from '@/data/userDocument'

interface AuthContextType {
    user: User | null
    userDocument: UserDocument | null
    userId: string | null
    loading: boolean
    signUp: (
        email: string,
        password: string
    ) => Promise<{ user: User | null; error: string | null }>
    signIn: (
        email: string,
        password: string
    ) => Promise<{ user: User | null; error: string | null }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [userDocument, setUserDocument] = useState<UserDocument | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                setUser(session.user)
                const userDoc = await getUserDocument(session.user.id)
                setUserDocument(userDoc)
            }
            setLoading(false)
        }

        getSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user)
                const userDoc = await getUserDocument(session.user.id)
                setUserDocument(userDoc)
            } else {
                setUser(null)
                setUserDocument(null)
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
            return { user: data.user, error: null }
        } catch (error: any) {
            return { user: null, error: error.message }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            return { user: data.user, error: null }
        } catch (error: any) {
            return { user: null, error: error.message }
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const value: AuthContextType = {
        user,
        userDocument,
        userId: user?.id || null,
        loading,
        signUp,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
