import { createClient } from '@supabase/supabase-js'

// Check if environment variables are properly configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create real client if we have valid configuration
const isSupabaseConfigured = supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')

// Mock client for demo purposes when Supabase isn't configured
const mockSupabaseClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
    delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
    signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured - demo mode' } }),
    signOut: () => Promise.resolve({ data: null, error: null }),
  },
}

// Export the appropriate client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : mockSupabaseClient

// Database Types
export interface Post {
  id: string
  caption: string
  image_url?: string
  scheduled_date?: string
  status: 'draft' | 'scheduled' | 'published'
  platform: 'instagram' | 'facebook' | 'twitter' | 'all'
  created_at: string
  updated_at: string
  user_id: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}
