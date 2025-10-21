'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void
  className?: string
  maxSize?: number // in MB
}

export function ImageUpload({
  onUploadComplete,
  className = '',
  maxSize = 10
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    setIsUploading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Try to upload to Supabase if configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL &&
          !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('demo')) {

        try {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
          const filePath = `posts/${fileName}`

          const { error } = await supabase.storage
            .from('post-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (error) throw error

          const { data: { publicUrl } } = supabase.storage
            .from('post-images')
            .getPublicUrl(filePath)

          onUploadComplete?.(publicUrl)
          toast.success('Image uploaded successfully!')
        } catch (storageError) {
          console.error('Storage error:', storageError)
          throw storageError
        }
      } else {
        // Demo mode - simulate upload
        await new Promise(resolve => setTimeout(resolve, 1000))
        const demoUrl = `demo-image-${Date.now()}.jpg`
        onUploadComplete?.(demoUrl)
        toast.success('Image ready! (Demo mode - configure Supabase for cloud storage)')
      }

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }, [maxSize, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    disabled: isUploading
  })

  const removePreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group"
          >
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={removePreview}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                  disabled={isUploading}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div
            {...getRootProps()}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200 ${
              isDragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-blue-400 animate-spin mb-4" />
              ) : (
                <Upload className={`h-12 w-12 mb-4 transition-colors ${
                  isDragActive ? 'text-blue-400' : 'text-gray-400'
                }`} />
              )}

              <div className="space-y-2">
                <p className={`text-lg font-medium ${
                  isDragActive ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {isDragActive ? 'Drop your image here' : 'Upload an image'}
                </p>
                <p className="text-sm text-gray-600">
                  {isDragActive ? 'Release to upload' : 'Drag & drop or click to browse'}
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WebP up to {maxSize}MB
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
