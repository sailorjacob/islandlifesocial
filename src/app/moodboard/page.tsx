'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { MoodboardGrid } from '@/components/moodboard/moodboard-grid'
import { CreatePostModal } from '@/components/posts/create-post-modal'
import { Plus } from 'lucide-react'

export default function MoodboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handlePostCreated = () => {
    setIsCreateModalOpen(false)
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Moodboard</h1>
            <p className="text-gray-600 text-lg">
              Visual organization of your social media content
            </p>
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Post</span>
          </button>
        </div>

        <MoodboardGrid refreshTrigger={refreshTrigger} />
        
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handlePostCreated}
          selectedDate={undefined}
        />
      </main>
    </div>
  )
}
