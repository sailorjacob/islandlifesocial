'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid3X3, List, Search, Calendar } from 'lucide-react'
import { MoodboardCard } from './moodboard-card'

type ViewMode = 'grid' | 'list'
type FilterStatus = 'all' | 'draft' | 'scheduled' | 'published'

export function MoodboardGrid() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for demonstration - replace with real data fetching
  const posts = [
    {
      id: '1',
      caption: '',
      image_url: '',
      status: 'draft' as const,
      platform: 'all' as const,
      created_at: new Date().toISOString(),
    },
  ]

  const filteredPosts = posts.filter(post => {
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    const matchesSearch = searchQuery === '' ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Drafts</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* View Mode */}
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
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredPosts.length} of {posts.length} posts
        </span>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Sorted by newest first</span>
        </div>
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length > 0 ? (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredPosts.map((post, index) => (
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
          <div className="text-gray-600 text-lg mb-2">No posts found</div>
          <p className="text-gray-500">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Create your first post to get started'
            }
          </p>
        </div>
      )}
    </div>
  )
}
