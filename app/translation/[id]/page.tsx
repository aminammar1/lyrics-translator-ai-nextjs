'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getTranslation } from '@/supabase/data/translations'
import { Translation } from '@/supabase/data/translations'
import Background from '@/components/Background'
import Header from '@/components/Header'
import { Loader } from '@/components/Loader'
import LyricsSection from '@/components/LyricsSection'
import DeleteTranslation from '@/components/DeleteTranslation'
import toast from 'react-hot-toast'

export default function TranslationPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [translation, setTranslation] = useState<Translation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      toast.error('Please sign in to view translations')
      router.push('/')
      return
    }

    const fetchTranslation = async () => {
      const translationId = params.id as string

      if (!translationId) {
        toast.error('Invalid translation ID')
        router.push('/')
        return
      }

      const { data, error } = await getTranslation(translationId)

      if (error) {
        toast.error(error)
        router.push('/')
        return
      }

      setTranslation(data)
      setLoading(false)
    }

    fetchTranslation()
  }, [params.id, user, authLoading, router])

  const handleDelete = () => {
    router.push('/')
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

  if (!translation) {
    return (
      <div className="min-h-screen bg-background">
        <Background />
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-foreground/70">Translation not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Background />
      <Header />

      <main className="container mx-auto px-4 py-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="glass-effect rounded-2xl overflow-hidden border border-foreground/20 shadow-xl">
            <div className="relative bg-gradient-to-br from-custom-orange/15 to-custom-pink/15 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={translation.image_url}
                    alt={translation.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl object-cover shadow-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
                    {translation.title}
                  </h1>
                  <p className="text-base lg:text-lg text-foreground/80 font-medium mb-3">
                    by {translation.artist}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-custom-orange/20 text-custom-orange font-medium rounded-full">
                        {translation.original_language}
                      </span>
                      <span className="text-foreground/40">→</span>
                      <span className="px-2 py-1 bg-custom-pink/20 text-custom-pink font-medium rounded-full">
                        {translation.translation_language}
                      </span>
                    </div>
                    {translation.created_at && (
                      <span className="text-foreground/60">
                        Saved{' '}
                        {new Date(translation.created_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 self-start sm:self-center">
                  <DeleteTranslation
                    translationId={translation.id!}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-custom-orange shadow-sm"></div>
                    <h2 className="text-lg lg:text-xl font-bold text-foreground">
                      Original Lyrics
                    </h2>
                  </div>
                  <div className="bg-foreground/5 rounded-xl p-4 lg:p-5 border border-foreground/10 max-h-[70vh] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm lg:text-base leading-relaxed text-foreground/90 font-light">
                      {translation.original_lyrics}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-custom-pink shadow-sm"></div>
                    <h2 className="text-lg lg:text-xl font-bold text-foreground">
                      Translation
                    </h2>
                  </div>
                  <div className="bg-gradient-to-br from-custom-orange/5 to-custom-pink/5 rounded-xl p-4 lg:p-5 border border-foreground/10 max-h-[70vh] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm lg:text-base leading-relaxed text-foreground/90 font-light">
                      {translation.translated_lyrics}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
