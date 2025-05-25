'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function SupabaseAuthProvider() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // Simpan session ke localStorage atau cookie (optional)
      if (event === 'SIGNED_IN') {
        console.log('Login success:', session?.user)
      }
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return null
}
