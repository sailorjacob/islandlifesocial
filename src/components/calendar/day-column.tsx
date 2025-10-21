'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PostCard } from './post-card'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/lib/supabase'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DayColumnProps {
  date: Date
  onAddPost: () => void
  refreshTrigger?: number
}

// Sortable Post Card wrapper
function SortablePostCard({ post, onDelete }: { post: Post; onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <PostCard post={post} onDelete={onDelete} dragHandleProps={listeners} />
    </div>
  )
}

export function DayColumn({ date, onAddPost, refreshTrigger }: DayColumnProps) {
  const [posts, setPosts] = useState<Post[]>([])
  
  const isToday = new Date().toDateString() === date.toDateString()
  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before starting drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const fetchPosts = useCallback(async () => {
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
        .order('position', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    }
  }, [date])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts, refreshTrigger])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPosts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        const newItems = arrayMove(items, oldIndex, newIndex)

        // Update positions in database
        updatePositions(newItems)

        return newItems
      })
    }
  }

  const updatePositions = async (orderedPosts: Post[]) => {
    try {
      // Update each post with its new position
      const updates = orderedPosts.map((post, index) => 
        supabase
          .from('posts')
          .update({ position: index })
          .eq('id', post.id)
      )

      await Promise.all(updates)
    } catch (error) {
      console.error('Error updating positions:', error)
    }
  }

  return (
    <div className={`min-h-[500px] rounded-xl border transition-all duration-200 ${
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={posts} strategy={verticalListSortingStrategy}>
            {posts.map((post) => (
              <SortablePostCard
                key={post.id}
                post={post}
                onDelete={fetchPosts}
              />
            ))}
          </SortableContext>
        </DndContext>

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
