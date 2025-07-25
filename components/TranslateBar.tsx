import React, { memo, useCallback, useEffect, useState } from 'react'
import { Repeat, Copy, SaveIcon, Languages, Sparkles } from 'lucide-react'
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { useAuth } from '@/context/AuthContext'
import { saveTranslation } from '@/supabase/data/translations'
import toast from 'react-hot-toast'

const languages = [
  'Arabic',
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Russian',
  'Korean',
  'Portuguese',
  'Italian',
  'Turkish',
]

interface TranslateBarProps {
  language: string
  translate: (language: string) => void
  lyrics: string
  song: any
  originalLyrics: string
}

const TranslateBar: React.FC<TranslateBarProps> = memo(
  ({ language, translate, lyrics, song, originalLyrics }) => {
    const { user } = useAuth()
    const [copyText, setCopyText] = useState<string>('Copy')
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English')
    const [isDisabled, setIsDisabled] = useState(false)
    const [saveDisabled, setSaveDisabled] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
      setIsDisabled(false)
      setCopyText('Copy')
      setSaveDisabled(false)
    }, [lyrics])

    const clickOnCopy = useCallback(() => {
      setIsDisabled(true)
      setCopyText('Copied')
      navigator.clipboard.writeText(lyrics)
      setTimeout(() => {
        setIsDisabled(false)
        setCopyText('Copy')
      }, 2000)
    }, [lyrics])

    const clickOnSave = useCallback(async () => {
      if (!user) {
        toast.error('Please sign in to save translations')
        return
      }

      if (!lyrics || !originalLyrics) {
        toast.error('No translation to save')
        return
      }

      setIsSaving(true)
      setSaveDisabled(true)

      const translationData = {
        song_id: song.id?.toString() || '',
        title: song.title || '',
        artist: song.artist_name || '',
        image_url: song.image || '',
        original_language: language || 'Unknown',
        translation_language: selectedLanguage,
        original_lyrics: originalLyrics,
        translated_lyrics: lyrics,
        user_id: user.id,
      }

      const { data, error } = await saveTranslation(translationData)

      if (error) {
        toast.error(error)
        setSaveDisabled(false)
        setIsSaving(false)
        return
      }

      toast.success('Translation saved successfully!')

      setTimeout(() => {
        setSaveDisabled(false)
        setIsSaving(false)
      }, 2000)
    }, [user, lyrics, originalLyrics, song, language, selectedLanguage])

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value)
      },
      []
    )

    return (
      <div className="glass-effect rounded-2xl p-4 lg:p-6 mb-6 shadow-2xl shadow-custom-orange/10 fade-in border border-foreground/20">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3 bg-gradient-to-r from-custom-orange/20 to-custom-pink/20 rounded-full px-4 py-2.5 border border-foreground/30 shadow-lg">
              <Languages size={18} className="text-foreground/80" />
              <span className="text-sm lg:text-base font-medium text-foreground whitespace-nowrap">
                {language || 'Unknown'}
              </span>
            </div>
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-custom-orange/30 to-custom-pink/30 border border-foreground/30 shadow-lg">
              <Repeat size={20} className="text-foreground/80 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative group w-full sm:w-auto">
              <select
                className="w-full sm:w-auto bg-gradient-to-br from-black/70 to-black/50 text-sm lg:text-base rounded-xl px-4 py-3 pr-12 outline-none border border-foreground/30 cursor-pointer appearance-none hover:border-foreground/50 transition-all duration-300 min-w-[160px] focus:ring-2 focus:ring-custom-orange/50 shadow-lg"
                value={selectedLanguage}
                onChange={handleChange}
              >
                {languages.map((language, i) => (
                  <option
                    key={i}
                    value={language}
                    className="bg-background text-foreground py-2"
                  >
                    {language}
                  </option>
                ))}
              </select>
              <IoMdArrowDropdownCircle
                size={22}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 pointer-events-none group-hover:text-foreground/80 transition-colors duration-200"
              />
            </div>
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-custom-orange/90 to-custom-pink/90 hover:from-custom-orange hover:to-custom-pink px-6 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl border border-foreground/30 font-medium"
              onClick={() => translate(selectedLanguage)}
            >
              <Sparkles size={18} className="text-white" />
              <span className="text-sm lg:text-base text-white whitespace-nowrap">
                Translate
              </span>
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl px-4 py-3 transition-all duration-300 transform border border-foreground/30 shadow-lg ${
                  isDisabled
                    ? 'bg-green-500/20 text-green-400 cursor-default shadow-green-500/20'
                    : 'bg-black/50 hover:bg-black/70 hover:scale-105 active:scale-95 text-foreground hover:border-foreground/50'
                }`}
                onClick={clickOnCopy}
                disabled={isDisabled}
              >
                <Copy size={16} />
                <span className="text-sm font-medium whitespace-nowrap">
                  {copyText}
                </span>
              </button>
              <button
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl px-4 py-3 transition-all duration-300 transform border border-foreground/30 shadow-lg ${
                  saveDisabled || isSaving
                    ? 'bg-blue-500/20 text-blue-400 cursor-default shadow-blue-500/20'
                    : 'bg-black/50 hover:bg-black/70 hover:scale-105 active:scale-95 text-foreground hover:border-foreground/50'
                }`}
                onClick={clickOnSave}
                disabled={saveDisabled || isSaving}
              >
                <SaveIcon size={16} />
                <span className="text-sm font-medium whitespace-nowrap">
                  {isSaving ? 'Saving...' : saveDisabled ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.language === nextProps.language &&
      prevProps.lyrics === nextProps.lyrics &&
      prevProps.song === nextProps.song &&
      prevProps.originalLyrics === nextProps.originalLyrics
    )
  }
)

export default TranslateBar
