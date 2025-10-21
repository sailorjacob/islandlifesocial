'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Grid3X3, List } from 'lucide-react'
import { MoodboardCard } from './moodboard-card'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/lib/supabase'

type ViewMode = 'grid' | 'list'

interface MoodboardGridProps {
  refreshTrigger?: number
}

export function MoodboardGrid({ refreshTrigger }: MoodboardGridProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [refreshTrigger])

  const fetchPosts = async () => {
    try {
      // Fetch ALL posts - both calendar posts (with dates) and moodboard posts (without dates)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    }
  }

  // No filtering - show all posts

  return (
    <div className="space-y-6">
      {/* Simple Controls - Just View Mode */}
      <div className="flex justify-end">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {/* Posts Grid/List */}
      {posts.length > 0 ? (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <MoodboardCard post={post} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-600 text-lg mb-2">No posts yet</div>
          <p className="text-gray-500">
            Create your first post to get started
          </p>
        </div>
      )}
    </div>
  )
}
