// Demo client for when Supabase isn't configured
const demoClient = {
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: (data: Record<string, unknown>) => {
      console.log(`Demo mode - would insert into ${table}:`, data)
      return Promise.resolve({ data: { id: Date.now().toString() }, error: null })
    },
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (_path: string, _file: File, _options?: Record<string, unknown>) => {
        console.log(`Demo mode - would upload to ${bucket}`)
        return Promise.resolve({ data: null, error: { message: 'Demo mode - configure Supabase for uploads' } })
      },
      getPublicUrl: (_path: string) => ({ data: { publicUrl: '' } }),
    }),
  },
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ data: null, error: null }),
  },
}

// Try to create real Supabase client if credentials are available
let supabaseClient: any = null

// Only create client if we have valid configuration and we're in browser
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('demo')) {

  try {
    // Dynamic import to avoid SSR issues and linting warnings
    import('@supabase/supabase-js').then(({ createClient }) => {
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
    }).catch(error => {
      console.warn('Supabase client initialization failed:', error)
    })
  } catch (error) {
    console.warn('Supabase client initialization failed:', error)
  }
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
