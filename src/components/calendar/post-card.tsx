'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface PostCardProps {
  post: {
    id: string
    caption: string
    image_url?: string
    status: 'draft' | 'scheduled' | 'published'
    platform: 'instagram' | 'facebook' | 'twitter' | 'all'
    scheduled_date?: string
  }
}

export function PostCard({ post }: PostCardProps) {

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Post Image - Much Bigger */}
      {post.image_url ? (
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={post.image_url}
            alt="Post image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Caption Overlay */}
          {post.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium line-clamp-3">
                  {post.caption}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* No Image Placeholder */
        <div className="aspect-square bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Add image</p>
            {post.caption && (
              <p className="text-xs text-gray-600 line-clamp-2">{post.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Caption Below Image (always visible when no image) */}
      {!post.image_url && post.caption && (
        <div className="p-3 border-t border-gray-100">
          <p className="text-sm text-gray-800 line-clamp-2">
            {post.caption}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!post.image_url && !post.caption && (
        <div className="p-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 italic">Add caption...</span>
        </div>
      )}
    </motion.div>
  )
}
