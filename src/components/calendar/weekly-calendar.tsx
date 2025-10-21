'use client'

import { motion } from 'framer-motion'
import { formatDate, getDaysInWeek } from '@/lib/utils'
import { DayColumn } from './day-column'
import { CreatePostModal } from '@/components/posts/create-post-modal'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

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

  const handlePostCreated = () => {
    setIsCreateModalOpen(false)
    setRefreshTrigger(prev => prev + 1)
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
            <DayColumn date={day} onAddPost={() => handleAddPost(day)} refreshTrigger={refreshTrigger} />
          </motion.div>
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedDate={selectedDate}
        onSuccess={handlePostCreated}
      />
    </div>
  )
}
