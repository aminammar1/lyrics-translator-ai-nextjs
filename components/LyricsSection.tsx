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

                        <div className="flex min-h-[300px] flex-1 items-center justify-center">
                            {translatedLyrics === '' && !loading ? (
                                <div className="max-w-sm text-center">
                                    <div className="relative mx-auto mb-8 h-32 w-32 lg:h-36 lg:w-36">
                                        <div
                                            className="absolute inset-0 animate-spin rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl"
                                            style={{ animationDuration: '8s' }}
                                        >
                                            <div className="absolute inset-4 rounded-full border border-custom-orange/30 bg-gradient-to-br from-custom-orange/20 to-custom-pink/20">
                                                <div className="absolute inset-6 flex items-center justify-center rounded-full bg-black">
                                                    <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-custom-orange to-custom-pink" />
                                                </div>
                                            </div>
                                            <div className="absolute inset-8 rounded-full border border-white/10" />
                                            <div className="absolute inset-12 rounded-full border border-white/5" />
                                        </div>
                                        <div className="absolute -top-2 left-4 animate-float">
                                            <span className="animate-pulse text-2xl text-custom-orange">♪</span>
                                        </div>
                                        <div className="absolute -bottom-2 right-6 animate-float" style={{ animationDelay: '1s' }}>
                                            <span className="animate-pulse text-xl text-custom-pink">♫</span>
                                        </div>
                                        <div className="absolute top-4 -right-4 animate-float" style={{ animationDelay: '2s' }}>
                                            <span className="animate-pulse text-lg text-custom-orange">♬</span>
                                        </div>
                                        <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-custom-orange/10 to-custom-pink/10 blur-xl" />
                                    </div>
                                    <h4 className="mb-2 text-lg font-medium text-foreground/80 lg:text-xl">
                                        Ready to Translate
                                    </h4>
                                    <p className="mb-3 text-sm text-foreground/60 lg:text-base">
                                        Your translation will appear here
                                    </p>
                                    <p className="text-xs text-foreground/40 lg:text-sm">
                                        Select a language and click the translate button
                                    </p>
                                </div>
                            ) : loading ? (
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
        </div>
    )
}
