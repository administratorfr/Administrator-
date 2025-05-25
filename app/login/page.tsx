'use client'
import { supabase } from '../../lib/supabaseClient'
import { useEffect } from 'react'

export default function LoginPage() {
  useEffect(() => {
    const login = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) {
        alert('Login gagal: ' + error.message)
      }
    }
    login()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Mengarahkan ke login Google...</p>
    </div>
  )
}
