'use client'

import { motion } from 'framer-motion'
import { Calendar, Grid3X3, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// Check if Supabase is properly configured
const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project-id') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('your-anon-key')

const navigation = [
  { name: 'Calendar', href: '/', icon: Calendar },
  { name: 'Moodboard', href: '/moodboard', icon: Grid3X3 },
  { name: 'Create', href: '/create', icon: Plus },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Header() {
  const pathname = usePathname()

  return (
    <>
      {/* Demo Banner */}
      {!isSupabaseConfigured && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-blue-500 text-white text-center py-2 px-4 text-sm"
        >
          <span className="font-medium">Demo Mode:</span> Configure Supabase in .env.local for full functionality
        </motion.div>
      )}

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm"
      >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-sm font-bold text-white">IL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Island Life Social</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {navigation.slice(0, 3).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.header>
    </>
  )
}
