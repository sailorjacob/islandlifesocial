'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PostCard } from './post-card'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/lib/supabase'

interface DayColumnProps {
  date: Date
  onAddPost: () => void
}

export function DayColumn({ date, onAddPost }: DayColumnProps) {
  const [posts, setPosts] = useState<Post[]>([])
  
  const isToday = new Date().toDateString() === date.toDateString()
  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

  useEffect(() => {
    fetchPosts()
  }, [date])

  const fetchPosts = async () => {
    try {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .gte('scheduled_date', startOfDay.toISOString())
        .lte('scheduled_date', endOfDay.toISOString())
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    }
  }

  return (
    <div className={`min-h-[400px] rounded-xl border transition-all duration-200 ${
      isToday
        ? 'border-blue-300 bg-blue-50 shadow-sm'
        : isPast
        ? 'border-gray-300 bg-gray-50'
        : 'border-gray-200 bg-white hover:bg-gray-50'
    }`}>
      {/* Day Header */}
      <div className={`p-3 border-b ${
        isToday
          ? 'border-blue-200 bg-blue-50'
          : 'border-gray-200'
      }`}>
        <div className={`text-sm font-medium ${
          isToday ? 'text-blue-700' : 'text-gray-600'
        }`}>
          {date.toLocaleDateString('en-US', { weekday: 'short' })}
        </div>
        <div className={`text-lg font-bold ${
          isToday ? 'text-blue-800' : 'text-gray-800'
        }`}>
          {date.getDate()}
        </div>
      </div>

      {/* Posts */}
      <div className="p-3 space-y-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}

        {/* Add Post Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddPost}
          className={`w-full h-20 rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center space-x-2 ${
            isToday
              ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <Plus className={`h-5 w-5 ${
            isToday ? 'text-blue-500' : 'text-gray-500'
          }`} />
          <span className={`text-sm font-medium ${
            isToday ? 'text-blue-600' : 'text-gray-600'
          }`}>
            Add Post
          </span>
        </motion.button>
      </div>
    </div>
  )
}
