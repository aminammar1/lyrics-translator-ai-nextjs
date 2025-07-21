import React from 'react'
import { Loader } from './Loader'

interface LyricsSectionProps {
    lyrics: string
    translatedLyrics?: string
    loading: boolean
}

export default function LyricsSection({
    lyrics,
    translatedLyrics,
    loading
}: LyricsSectionProps) {
    return (
        <div className="mt-2 mx-auto bg-black/50 p-[20px] shadow-foreground shadow-inner mb-10 rounded-[15px] flex justify-start gap-5 flex-wrap divide-x-[1px] z-[100] divide-foreground">
            <p className="whitespace-pre-line text-xs flex-1">
                {lyrics}
            </p>
            {translatedLyrics === "" && !loading ? (
                <p className="text-semibold text-2xl opacity-50 text-center flex-1">
                    Here will appear the translation
                </p>
            ) : loading ? (
                <div className="pt-10 *:mx-auto flex-1">
                    <Loader width={25} />
                </div>
            ) : (
                <p className="whitespace-pre-line text-xs pl-5 flex-1 min-w-[250px]">
                    {translatedLyrics}
                </p>
            )}
        </div>
    )
}