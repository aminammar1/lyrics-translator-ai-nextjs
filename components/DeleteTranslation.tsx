'use client'

import { useState } from 'react'
import { deleteTranslation } from '@/supabase/data/translations'
import { Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface DeleteTranslationProps {
  translationId: string
  onDelete: () => void
}

export default function DeleteTranslation({
  translationId,
  onDelete,
}: DeleteTranslationProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    const { error } = await deleteTranslation(translationId)

    if (error) {
      toast.error(error)
      setIsDeleting(false)
      return
    }

    toast.success('Translation deleted successfully')
    onDelete()
  }

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-xl p-2 border border-white/20">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center space-x-1 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check size={14} />
          <span>{isDeleting ? 'Deleting...' : 'Confirm'}</span>
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="flex items-center space-x-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
        >
          <X size={14} />
          <span>Cancel</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 border border-red-500/30 hover:border-red-500/50 group"
    >
      <Trash2
        size={16}
        className="group-hover:scale-110 transition-transform"
      />
      <span className="font-medium">Delete</span>
    </button>
  )
}
