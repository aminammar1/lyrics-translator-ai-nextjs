import React, { memo, useCallback, useEffect, useState } from 'react'
import { Repeat } from 'lucide-react'
import { FaMagic } from 'react-icons/fa'
import { Copy } from 'lucide-react'
import { IoMdArrowDropdownCircle } from "react-icons/io"
import { SaveIcon } from 'lucide-react'

const languages = [
    "Arabic",
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Korean",
    "Portuguese",
    "Italian",
    "Turkish",
]

interface TranslateBarProps {
    language: string
    translate: (language: string) => void
    lyrics: string
    song: any
}

const TranslateBar: React.FC<TranslateBarProps> = memo(
    ({ language, translate, lyrics, song }) => {
        const [copyText, setCopyText] = useState<string>("Copy")
        const [selectedLanguage, setSelectedLanguage] = useState<string>("English")
        const [isDisabled, setIsDisabled] = useState(false)
        const [saveDisabled, setSaveDisabled] = useState(false)

        useEffect(() => {
            setIsDisabled(false)
            setCopyText("Copy")
            setSaveDisabled(false)
        }, [lyrics])

        const clickOnCopy = useCallback(() => {
            setIsDisabled(true)
            setCopyText("Copied")
            navigator.clipboard.writeText(lyrics)
        }, [lyrics])

        const clickOnSave = useCallback(() => {
            setSaveDisabled(true)
            // Logic to save the lyrics can be added here
        }, [])

        const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedLanguage(e.target.value)
        }, [])

        return (
            <div className="flex justify-between items-center z-[100]">
                <p className="bg-transparent rounded-full p-2 inline shadow-inner shadow-foreground opacity-75 text-xs md:text-s lg:text-base">
                    {language}
                </p>
                <div className="mx-5 flex items-center">
                    <Repeat size={40} />
                </div>
                <div className="flex justify-end gap-2 flex-wrap">
                    <div className="relative hover:opacity-[0.7]">
                        <select
                            className="bg-transparent text-xs md:text-s lg:text-base rounded-full p-2 pr-4 outline-none button shadow-inner shadow-foreground cursor-pointer appearance-none"
                            value={selectedLanguage}
                            onChange={handleChange}
                        >
                            {languages.map((language, i) => (
                                <option key={i} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <IoMdArrowDropdownCircle
                            size={18}
                            className="absolute right-2 top-0 bottom-0 m-auto cursor-pointer text-foreground"
                        />
                    </div>
                    <button
                        className="flex items-center gap-1 rounded-full shadow-inner button shadow-foreground p-2"
                        onClick={() => translate(selectedLanguage)}
                    >
                        <p className="text-xs md:text-s lg:text-base">Translate</p>
                        <FaMagic size={20} className="text-foreground" />
                    </button>
                    <button
                        className={
                            `flex items-center gap-1 rounded-full shadow-inner button shadow-foreground p-2` +
                            (isDisabled ? " opacity-50 !cursor-default" : " button")
                        }
                        onClick={clickOnCopy}
                        disabled={isDisabled}
                    >
                        <p className="text-xs md:text-s lg:text-base">{copyText}</p>
                        <Copy size={20} className="text-foreground" />
                    </button>
                    <button
                        className={
                            `flex items-center gap-1 rounded-full shadow-inner shadow-foreground p-2` +
                            (saveDisabled ? " opacity-50 !cursor-default" : " button")
                        }
                        //onClick={clickOnSave}
                        //disabled={saveDisabled}
                    >
                        <p className="text-xs md:text-s lg:text-base">
                            {saveDisabled ? "Saved" : "Save"}
                        </p>
                        <SaveIcon size={20} className="text-foreground" />
                    </button>
                </div>
            </div>
        )
    },
    (prevProps, nextProps) => {
        return (
            prevProps.language === nextProps.language &&
            prevProps.lyrics === nextProps.lyrics &&
            prevProps.song === nextProps.song
        )
    }
)

export default TranslateBar
