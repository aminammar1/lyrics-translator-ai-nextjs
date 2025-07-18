import React from 'react'
import Image from 'next/image'
import { Loader } from './Loader'
import { useRouter } from 'next/navigation'

interface FastResultsProps {
    results: any[]
    loading: boolean
    setShowResults: (show: boolean) => void
}

export default function FastResults({ results, loading, setShowResults }: FastResultsProps) {
    const router = useRouter()

    const handleSongClick = (id: string, url: string) => {
        router.push(`/song/${id}?url=${url}`)
        setShowResults(false)
    }

    return (
        <div
            className="
                absolute w-full top-0 bg-background border border-foreground 
                rounded-[18px] z-[-1] pt-[37px] divide-y-[1px] divide-foreground 
                overflow-hidden search-shadow
            "
        >
            {loading ? (
                <div className="p-2 flex justify-start items-center gap-[20px]">
                    <Loader />
                </div>
            ) : (
                results.map((result: any) => (
                    <button
                        key={result.id}
                        onClick={() => handleSongClick(result.id, result.url)}
                        className="
                            p-2 flex justify-start items-center gap-[20px] 
                            hover:bg-transparentforeground hover:bg-opacity-25 
                            transition-all w-full cursor-pointer
                        "
                    >
                        <Image
                            src={result.image}
                            alt={result.title}
                            width={50}
                            height={50}
                            className="rounded-lg"
                        />
                        <div>
                            <p className="text-left">{result.title}</p>
                            <p className="text-xs text-left opacity-50">
                                {result.artist_name}
                            </p>
                        </div>
                    </button>
                ))
            )}
        </div>
    )
}