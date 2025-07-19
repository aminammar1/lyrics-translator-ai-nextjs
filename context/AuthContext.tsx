'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/supabase/client'
import { UserDocument, getUserDocument } from '@/data/userDocument'
import toast from 'react-hot-toast'

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [userDocument, setUserDocument] = useState<UserDocument | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        const userDoc = await getUserDocument(session.user.id)
        setUserDocument(userDoc)
      }
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
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
      toast.success('Account created successfully!')
      return { user: data.user, error: null }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create account'
      toast.error(errorMessage)
      return { user: null, error: errorMessage }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success('Welcome back!')
      return { user: data.user, error: null }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in'
      toast.error(errorMessage)
      return { user: null, error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error('Failed to sign out')
    }
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
