'use client'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface MoodboardCardProps {
  post: {
    id: string
    caption: string
    image_url?: string
    status: 'draft' | 'scheduled' | 'published'
    platform: 'instagram' | 'facebook' | 'twitter' | 'all'
    scheduled_date?: string
    created_at: string
  }
  viewMode: 'grid' | 'list'
  onDelete?: () => void
}

export function MoodboardCard({ post, viewMode, onDelete }: MoodboardCardProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)

      if (error) throw error

      toast.success('Post deleted successfully!')
      onDelete?.()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-32 h-24 flex-shrink-0">
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt="Post image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-xs">No image</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex flex-col">
              {/* Scheduled Date - only show if exists */}
              {post.scheduled_date && (
                <div className="mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    📅 {new Date(post.scheduled_date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}

              {/* Caption - only show if not empty */}
              {post.caption && (
                <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                  {post.caption}
                </p>
              )}

              {/* Show placeholder for empty caption */}
              {!post.caption && (
                <div className="h-8 flex items-center">
                  <span className="text-sm text-gray-400 italic">Add caption...</span>
                </div>
              )}
            </div>
          </div>

          {/* Delete Button for List View */}
          <div className="p-4 border-l border-gray-100">
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete post"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt="Post image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />



        {/* Delete Button for Grid View */}
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"
          title="Delete post"
        >
          <Trash2 className="h-3 w-3" />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Scheduled Date - only show if exists */}
          {post.scheduled_date && (
            <div className="mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                📅 {new Date(post.scheduled_date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}

          {/* Caption - only show if exists */}
          {post.caption && (
            <p className="text-sm text-white line-clamp-3">
              {post.caption}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}


