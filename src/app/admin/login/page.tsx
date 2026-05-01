"use client"

import { login } from '@/actions/auth'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    const res = await login(formData)
    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#111] border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-white mb-8 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-brand-red/10 text-brand-red p-3 rounded-lg mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Username</label>
            <input 
              type="text" 
              name="username" 
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] text-white border-2 border-white/10 focus:outline-none focus:border-brand-red transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] text-white border-2 border-white/10 focus:outline-none focus:border-brand-red transition-colors" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-brand-red/90 transition-colors shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
