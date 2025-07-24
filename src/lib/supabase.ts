import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Intention {
  id: string
  user_id: string
  text: string
  type: 'manifest' | 'release'
  created_at: string
}

// Database functions
export const intentionService = {
  // Get all intentions for the current user
  async getIntentions(): Promise<Intention[]> {
    const { data, error } = await supabase
      .from('intentions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Add a new intention
  async addIntention(text: string, type: 'manifest' | 'release'): Promise<Intention> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('intentions')
      .insert({
        text,
        type,
        user_id: user.id
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete an intention
  async deleteIntention(id: string): Promise<void> {
    const { error } = await supabase
      .from('intentions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Auth functions
export const authService = {
  // Sign in with magic link
  async signInWithEmail(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })
    
    if (error) throw error
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_, session) => {
      callback(session?.user || null)
    })
  }
}