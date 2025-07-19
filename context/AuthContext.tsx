'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/supabase/client'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          console.log('Initial session found for user:', session.user.id)
          setUser(session.user)
        } else {
          console.log('No initial session found')
        }
      } catch (error) {
        console.error('Error loading initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in:', session.user.id)
          setUser(session.user)
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out')
          setUser(null)
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          console.log('Token refreshed for user:', session.user.id)
          setUser(session.user)
        } else if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      if (data.user) {
        if (data.user.email_confirmed_at) {
          toast.success('Account created and verified successfully!')
        } else {
          toast.success('Account created! Please check your email to verify your account.')
        }
      } else {
        throw new Error('User creation failed')
      }

      return { user: data.user, error: null }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create account'
      toast.error(errorMessage)
      return { user: null, error: errorMessage }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data.user && data.session) {
        toast.success('Signed in successfully!')
      } else {
        throw new Error('Sign in failed - no user or session returned')
      }

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
