'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getUserTranslations } from '@/supabase/data/translations'
import { Translation } from '@/supabase/data/translations'
import Background from '@/components/Background'
import Header from '@/components/Header'
import { Loader } from '@/components/Loader'
import TranslationCardInfo from '@/components/TranslationCardInfo'
import toast from 'react-hot-toast'

export default function TranslationsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      toast.error('Please sign in to view your translations')
      router.push('/')
      return
    }

    const fetchTranslations = async () => {
      const { data, error } = await getUserTranslations()

      if (error) {
        toast.error(error)
        setLoading(false)
        return
      }

      setTranslations(data || [])
      setLoading(false)
    }

    fetchTranslations()
  }, [user, authLoading, router])

  const handleDelete = (deletedId: string) => {
    setTranslations((prev) => prev.filter((t) => t.id !== deletedId))
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Background />
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Background />
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-custom-orange to-custom-pink bg-clip-text text-transparent">
              My Translations
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-custom-orange to-custom-pink rounded-full mx-auto mb-6"></div>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Your collection of translated songs
            </p>
          </div>

          {translations.length === 0 ? (
            <div className="text-center py-16">
              <div className="glass-effect rounded-2xl p-8 max-w-lg mx-auto border border-foreground/20 shadow-xl">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-custom-orange/20 to-custom-pink/20 flex items-center justify-center border border-foreground/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-custom-orange/40 to-custom-pink/40 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-custom-orange to-custom-pink"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  No translations yet
                </h3>
                <p className="text-foreground/60 mb-6">
                  Start translating your favorite songs into any language
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-gradient-to-r from-custom-orange to-custom-pink text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Start Translating
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {translations.map((translation) => (
                <TranslationCardInfo
                  key={translation.id}
                  translation={translation}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
