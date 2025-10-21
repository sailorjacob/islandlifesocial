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
      className="bg-white rounded-lg border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Post Image */}
      {post.image_url && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={post.image_url}
            alt="Post image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Post Content */}
      <div className="p-3">
        {/* Caption - only show if not empty */}
        {post.caption && (
          <p className="text-sm text-gray-800 line-clamp-3 mb-2">
            {post.caption}
          </p>
        )}

        {/* Show placeholder text for empty caption */}
        {!post.caption && (
          <div className="h-12 flex items-center justify-center">
            <span className="text-sm text-gray-400 italic">Add caption...</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
