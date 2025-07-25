'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getUserTranslations } from '@/supabase/data/translations'
import { Translation } from '@/supabase/data/translations'
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
    setTranslations(prev => prev.filter(t => t.id !== deletedId))
  }

  return (
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
          <div className="text-center">
            <p className="text-lg text-foreground/70 mb-4">
              You haven't created any translations yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {translations.map(translation => (
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
  )
}
