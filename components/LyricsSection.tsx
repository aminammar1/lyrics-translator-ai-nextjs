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
    loading,
}: LyricsSectionProps) {
    return (
        <div className="mt-6 mx-auto bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm border border-foreground/20 shadow-2xl shadow-custom-orange/20 mb-12 rounded-2xl overflow-hidden z-[100] fade-in">
            <div className="flex min-h-[500px] flex-col xl:flex-row">
                {/* Original Lyrics Column */}
                <div className="flex-1 border-b border-foreground/20 p-6 slide-in-left lg:p-8 xl:border-b-0 xl:border-r xl:p-10">
                    <div className="flex h-full flex-col">
                        <div className="mb-6">
                            <h3 className="mb-3 flex items-center text-lg font-semibold text-foreground lg:text-xl">
                                <div className="mr-3 h-4 w-4 rounded-full bg-gradient-to-br from-custom-orange to-custom-pink shadow-lg lg:h-5 lg:w-5" />
                                Original Lyrics
                            </h3>
                            <div className="h-px bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="flex min-h-[300px] items-start">
                                <p className="whitespace-pre-line text-sm leading-relaxed tracking-wide text-white selection:bg-custom-orange/30 lg:text-base xl:text-lg">
                                    {lyrics}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Translation Column */}
                <div className="flex-1 p-6 slide-in-right lg:p-8 xl:p-10">
                    <div className="flex h-full flex-col">
                        <div className="mb-6">
                            <h3 className="mb-3 flex items-center text-lg font-semibold text-foreground lg:text-xl">
                                <div className="mr-3 h-4 w-4 rounded-full bg-gradient-to-br from-custom-pink to-custom-orange shadow-lg lg:h-5 lg:w-5" />
                                Translation
                            </h3>
                            <div className="h-px bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                        </div>

                            {loading ? (
                                <div className="text-center">
                                    <div className="mb-6">
                                        <Loader width={36} />
                                    </div>
                                    <p className="mb-2 text-base font-medium text-foreground/70 lg:text-lg">
                                        Translating lyrics...
                                    </p>
                                    <p className="text-sm text-foreground/50">
                                        This may take a few moments
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="flex min-h-[300px] items-start">
                                        <p className="whitespace-pre-line text-sm leading-relaxed tracking-wide text-white selection:bg-custom-pink/30 lg:text-base xl:text-lg">
                                            {translatedLyrics}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}
