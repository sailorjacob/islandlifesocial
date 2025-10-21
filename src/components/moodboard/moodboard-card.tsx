'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
}

export function MoodboardCard({ post, viewMode }: MoodboardCardProps) {
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



        {/* Caption Overlay - only show if caption exists */}
        {post.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-sm text-white line-clamp-3">
              {post.caption}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}


