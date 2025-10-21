import { createClient } from '@supabase/supabase-js'

// For demo purposes - in production you'd use real Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Simple demo client that doesn't require authentication
export const supabase = {
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: (data: any) => {
      console.log('Demo mode - would insert:', data)
      return Promise.resolve({ data: { id: Date.now().toString() }, error: null })
    },
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Demo mode - configure Supabase for uploads' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ data: null, error: null }),
  },
}

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
