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
    song
}: TranslateSectionProps) {
    const languageName = ISO6391.getName(language)
    const [translatedLyrics, setTranslatedLyrics] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const translate = async (language: string) => {
        // call openai api to translate lyrics
    }

    return (
        <div className="min-w-[332px] w-[80vw] max-w-[1280px] mt-10 mx-auto z-[100]">
            <TranslateBar
                language={languageName}
                translate={translate}
                lyrics={translatedLyrics}
                song={song}
            />
            <LyricsSection
                lyrics={lyrics}
                translatedLyrics={translatedLyrics}
                loading={isLoading}
            />
        </div>
    )
}
