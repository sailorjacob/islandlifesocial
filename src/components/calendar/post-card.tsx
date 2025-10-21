'use client'

import { motion } from 'framer-motion'
import { Trash2, Download, Copy, Share } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface PostCardProps {
  post: {
    id: string
    caption: string
    image_url?: string
    status: 'draft' | 'scheduled' | 'published'
    platform: 'instagram' | 'facebook' | 'twitter' | 'all'
    scheduled_date?: string
  }
  onDelete?: () => void
}

export function PostCard({ post, onDelete }: PostCardProps) {
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

  const handleCopyCaption = async () => {
    if (!post.caption) {
      toast.error('No caption to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(post.caption)
      toast.success('Caption copied to clipboard!')
    } catch (error) {
      console.error('Error copying caption:', error)
      toast.error('Failed to copy caption')
    }
  }

  const handleDownload = async () => {
    if (!post.image_url) {
      toast.error('No image to download')
      return
    }

    try {
      const response = await fetch(post.image_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `island-life-post-${post.id}.${post.image_url.split('.').pop()}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Download started!')
    } catch (error) {
      console.error('Error downloading image:', error)
      toast.error('Failed to download image')
    }
  }

  const handleShare = async () => {
    if (!post.image_url) {
      toast.error('No image to share')
      return
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Island Life Post',
          text: post.caption || 'Check out this post from Island Life Hostel',
          url: post.image_url,
        })
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(post.image_url)
        toast.success('Image URL copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error('Failed to share')
    }
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Post Media - Much Bigger */}
      {post.image_url ? (
        <div className="relative aspect-square overflow-hidden">
          {/* Check if it's a video file */}
          {post.image_url.match(/\.(mp4|mov|avi|webm)$/i) ? (
            <video
              src={post.image_url}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              muted
              loop
              preload="metadata"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          ) : (
            <Image
              src={post.image_url}
              alt="Post image"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {/* Overlay with Actions and Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex space-x-1">
              {post.image_url && (
                <>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 bg-gray-400 hover:bg-gray-500 rounded-full text-white transition-colors"
                    title="Download image"
                  >
                    <Download className="h-3 w-3" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-1.5 bg-gray-400 hover:bg-gray-500 rounded-full text-white transition-colors"
                    title="Share image"
                  >
                    <Share className="h-3 w-3" />
                  </button>
                </>
              )}
              {post.caption && (
                <button
                  onClick={handleCopyCaption}
                  className="p-1.5 bg-gray-400 hover:bg-gray-500 rounded-full text-white transition-colors"
                  title="Copy caption"
                >
                  <Copy className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-1.5 bg-gray-400 hover:bg-gray-500 rounded-full text-white transition-colors"
                title="Delete post"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium line-clamp-3">
                  {post.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* No Image Placeholder */
        <div className="aspect-square bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative group">
          {/* Delete Button for No Image */}
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-1.5 bg-gray-400 hover:bg-gray-500 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"
            title="Delete post"
          >
            <Trash2 className="h-3 w-3" />
          </button>

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
