import React from 'react'
import ISO6391 from 'iso-639-1'
import TranslateBar from './TranslateBar'
import LyricsSection from './LyricsSection'
import { useState } from 'react'

interface TranslateSectionProps {
  lyrics: string
  language: string
  song: any
}

export default function TranslateSection({
  language,
  lyrics,
  song,
}: TranslateSectionProps) {
  const languageName = ISO6391.getName(language)
  const [translatedLyrics, setTranslatedLyrics] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const translate = async (targetLanguage: string) => {
    setIsLoading(true)
    setTranslatedLyrics('')

    try {
      const response = await fetch('/api/openrouter/translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: targetLanguage,
          lyrics: lyrics,
        }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      setTranslatedLyrics(data.data || 'Translation failed')
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedLyrics('Translation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-w-[320px] w-full max-w-[1400px] mt-16 mx-auto px-4 lg:px-6 z-[100]">
      <div className="mb-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-custom-orange to-custom-pink bg-clip-text text-transparent">
            Lyrics Translation
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-custom-orange to-custom-pink rounded-full mx-auto"></div>
        </div>
        <p className="text-center text-foreground/70 text-sm lg:text-base max-w-2xl mx-auto">
          Experience your favorite songs in any language with our AI-powered
          translation
        </p>
      </div>

      <TranslateBar
        language={languageName}
        translate={translate}
        lyrics={translatedLyrics}
        song={song}
        originalLyrics={lyrics}
      />

      <LyricsSection
        lyrics={lyrics}
        translatedLyrics={translatedLyrics}
        loading={isLoading}
      />
    </div>
  )
}
