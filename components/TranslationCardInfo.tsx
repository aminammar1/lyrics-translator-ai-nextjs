'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash, ExternalLink } from 'lucide-react'
import { Translation } from '@/supabase/data/translations'
import { deleteTranslation } from '@/supabase/data/translations'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface TranslationCardInfoProps {
  translation: Translation
  onDelete?: (id: string) => void
}

export default function TranslationCardInfo({
  translation,
  onDelete,
}: TranslationCardInfoProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleView = () => {
    router.push(`/translation/${translation.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!confirm('Are you sure you want to delete this translation?')) {
      return
    }

    setIsDeleting(true)

    const { error } = await deleteTranslation(translation.id!)

    if (error) {
      toast.error(error)
      setIsDeleting(false)
      return
    }

    toast.success('Translation deleted successfully')

    if (onDelete) {
      onDelete(translation.id!)
    }
  }

  return (
    <div
      className="glass-effect rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all duration-300 border border-foreground/20 group"
      onClick={handleView}
    >
      <div className="flex items-start space-x-4">
        <Image
          src={translation.image_url}
          alt={`${translation.title} cover`}
          width={80}
          height={80}
          className="rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground font-semibold truncate text-lg">
                {translation.title}
              </h3>
              <p className="text-foreground/70 text-sm truncate">
                by {translation.artist}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <button
                onClick={handleView}
                className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                title="View translation"
              >
                <ExternalLink size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                title="Delete translation"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <span className="px-2 py-1 bg-custom-orange/20 text-custom-orange rounded-full text-xs">
              {translation.original_language}
            </span>
            <span className="text-foreground/50">→</span>
            <span className="px-2 py-1 bg-custom-pink/20 text-custom-pink rounded-full text-xs">
              {translation.translation_language}
            </span>
          </div>

          {translation.created_at && (
            <p className="text-foreground/40 text-xs mt-2">
              {new Date(translation.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
