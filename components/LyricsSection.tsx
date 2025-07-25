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
        <div
            className="mt-6 mx-auto bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm border border-foreground/20 shadow-2xl shadow-custom-orange/20 mb-12 rounded-2xl overflow-hidden z-[100] fade-in"
        >
            <div className="flex flex-col xl:flex-row min-h-[500px]">
                <div className="flex-1 p-6 lg:p-8 xl:p-10 border-b xl:border-b-0 xl:border-r border-foreground/20 slide-in-left">
                    <div className="h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3 flex items-center">
                                <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-custom-orange to-custom-pink mr-3 shadow-lg" />
                                Original Lyrics
                            </h3>
                            <div className="h-px bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <div className="min-h-[300px] flex items-start">
                                <p className="whitespace-pre-line text-sm lg:text-base xl:text-lg leading-relaxed text-foreground/90 selection:bg-custom-orange/30 tracking-wide">
                                    {lyrics}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 lg:p-8 xl:p-10 slide-in-right">
                    <div className="h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3 flex items-center">
                                <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-custom-pink to-custom-orange mr-3 shadow-lg" />
                                Translation
                            </h3>
                            <div className="h-px bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                        </div>

                        <div className="flex-1 flex items-center justify-center min-h-[300px]">
                            {translatedLyrics === '' && !loading ? (
                                <div className="text-center max-w-sm">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-foreground/10 to-custom-orange/10 flex items-center justify-center border border-foreground/20 shadow-lg">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-custom-orange/30 to-custom-pink/30 flex items-center justify-center">
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-custom-orange/60 to-custom-pink/60" />
                                        </div>
                                    </div>
                                    <h4 className="text-foreground/80 text-lg lg:text-xl font-medium mb-2">
                                        Ready to Translate
                                    </h4>
                                    <p className="text-foreground/60 text-sm lg:text-base mb-3">
                                        Your translation will appear here
                                    </p>
                                    <p className="text-foreground/40 text-xs lg:text-sm">
                                        Select a language and click the translate button
                                    </p>
                                </div>
                            ) : loading ? (
                                <div className="text-center">
                                    <div className="mb-6">
                                        <Loader width={36} />
                                    </div>
                                    <p className="text-foreground/70 text-base lg:text-lg font-medium mb-2">
                                        Translating lyrics...
                                    </p>
                                    <p className="text-foreground/50 text-sm">
                                        This may take a few moments
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full overflow-y-auto custom-scrollbar pr-2">
                                    <div className="min-h-[300px] flex items-start">
                                        <p className="whitespace-pre-line text-sm lg:text-base xl:text-lg leading-relaxed text-foreground/90 selection:bg-custom-pink/30 tracking-wide">
                                            {translatedLyrics}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
