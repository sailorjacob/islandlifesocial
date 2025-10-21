import { createClient } from '@supabase/supabase-js'

// For demo purposes - in production you'd use real Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Create Supabase client with demo fallbacks
let supabaseClient: any = null

// Only create real client if we have valid configuration
if (process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('demo')) {

  const { createClient } = require('@supabase/supabase-js')
  supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  )
}

// Demo client for when Supabase isn't configured
const demoClient = {
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

export const supabase = supabaseClient || demoClient

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
