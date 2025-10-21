'use client'

import { motion } from 'framer-motion'
import { formatDate, getDaysInWeek } from '@/lib/utils'
import { DayColumn } from './day-column'
import { CreatePostModal } from '@/components/posts/create-post-modal'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const days = getDaysInWeek(currentDate)

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentDate(newDate)
  }

  const handleAddPost = (date?: Date) => {
    setSelectedDate(date)
    setIsCreateModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <div className="text-gray-900">
            <h2 className="text-xl font-semibold">
              Week of {formatDate(days[0])}
            </h2>
            <p className="text-sm text-gray-600">
              {days[0].toLocaleDateString()} - {days[6].toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigateWeek('next')}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => handleAddPost()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Post</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <motion.div
            key={day.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DayColumn date={day} onAddPost={() => handleAddPost(day)} />
          </motion.div>
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  )
}
