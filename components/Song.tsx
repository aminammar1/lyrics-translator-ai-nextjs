import React from 'react'
import Image from 'next/image'
import { Loader } from './Loader'
import TranslateSection from './TranslateSection'
interface SongProps {
    song: any
    loading: boolean
}

export default function SongPage({ song, loading }: SongProps) {
    if (loading || !song.id) {
        return (
            <div className="w-fit mx-auto mt-40">
                <Loader width={32} />
            </div>
        )
    }

    return (
        <div className="mx-[20px] z-[100] mt-40">
            <div className="min-w-[332px] w-[50vw] max-w-[760px] mx-auto bg-black/50 p-[20px] shadow-foreground shadow-inner rounded-[15px]">
                <h2 className="text-center text-3xl font-medium">
                    {song.title}
                </h2>
                <h3 className="text-center text-xl opacity-50">
                    {song.artist_name}
                </h3>

                <div className="flex gap-5 mt-4 flex-wrap">
                    <div className="grow-0 mx-auto">
                        <Image
                            alt=""
                            src={song.image}
                            width={200}
                            height={200}
                            className="rounded-[15px]"
                        />
                    </div>

                    <div className="grow">
                        <div className="w-full h-full relative flex flex-col justify-between gap-5">
                            <div className="flex justify-between flex-wrap gap-5">
                                <div>
                                    <p className="text-base opacity-50">
                                        Language
                                    </p>
                                    <p className="text-l">
                                        {song.language}
                                    </p>
                                </div>
                                <div className="basis-[50%]">
                                    <p className="text-base opacity-50">
                                        Release date
                                    </p>
                                    <p className="text-l">
                                        {song.release_date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between w-full flex-wrap gap-5">
                                <div>
                                    <p className="text-base opacity-50">
                                        Primary artist
                                    </p>
                                    <div className="flex flex-col items-center mt-2 w-fit">
                                        <Image
                                            src={song.primary_artist.image || ''}
                                            alt=""
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                        <p className="text-xs text-center">
                                            {song.primary_artist.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="basis-[50%]">
                                    <p className="text-base opacity-50">
                                        Featured artists
                                    </p>
                                    <div className="flex gap-2 justify-start flex-wrap">
                                        {song.featured_artists.map((artist: any) => (
                                            <div
                                                className="flex flex-col items-center mt-2 w-fit"
                                                key={artist.id}
                                            >
                                                <Image
                                                    src={artist.image}
                                                    alt=""
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full"
                                                />
                                                <p className="text-xs text-center">
                                                    {artist.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                <TranslateSection
                    lyrics={song.lyrics}
                    language={song.language}
                    song={song}
                />
            }
        </div>
    )
}
