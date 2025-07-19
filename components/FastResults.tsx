import React from 'react'
import Image from 'next/image'
import { Loader } from './Loader'
import { useRouter } from 'next/navigation'

interface FastResultsProps {
    results: any[]
    loading: boolean
    setShowResults: (show: boolean) => void
}

export default function FastResults({
    results,
    loading,
    setShowResults,
}: FastResultsProps) {
    const router = useRouter()

    const handleSongClick = (id: string, url: string) => {
        router.push(`/song/${id}?url=${encodeURIComponent(url)}`)
        setShowResults(false)
    }

    return (
        <div
            className="
                absolute w-full top-0 bg-background border border-foreground 
                rounded-[18px] z-[-1] pt-[60px] divide-y-[1px] divide-foreground 
                overflow-hidden search-shadow max-h-[300px] overflow-y-auto
            "
        >
            {loading ? (
                <div className="p-4 flex justify-center items-center">
                    <Loader width={24} />
                </div>
            ) : results.length > 0 ? (
                results.map((result: any) => (
                    <button
                        key={result.id}
                        onClick={() => handleSongClick(result.id, result.url)}
                        className="
                            p-3 flex justify-start items-center gap-[20px] 
                            hover:bg-foreground hover:bg-opacity-5 
                            transition-all w-full cursor-pointer text-left
                        "
                    >
                        <Image
                            src={result.image}
                            alt={result.title}
                            width={50}
                            height={50}
                            className="rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-left truncate">{result.title}</p>
                            <p className="text-xs text-left opacity-50 truncate">
                                {result.artist_name}
                            </p>
                        </div>
                    </button>
                ))
            ) : (
                <div className="p-4 text-center text-foreground/50">
                    No results found
                </div>
            )}
        </div>
    )
}
