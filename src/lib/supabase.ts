import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL and Anon Key must be provided as env variables'
  )
}

try {
  new URL(supabaseUrl)
} catch (err) {
  throw new Error('Invalid Supabase URL format. It should be like "https://your-project-ref.supabase.co"')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
