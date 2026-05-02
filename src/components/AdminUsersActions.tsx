"use client"

import { useState, useTransition } from 'react'
import { addAdminUser, deleteAdminUser } from '@/actions/admin'
import { Trash2 } from 'lucide-react'

export default function AdminUsersActions({ deleteId }: { deleteId?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  if (deleteId) {
    return (
      <button 
        onClick={() => startTransition(() => deleteAdminUser(deleteId))}
        disabled={isPending}
        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        title="Remove Admin"
      >
        <Trash2 size={18} />
      </button>
    )
  }

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/25"
      >
        + Add Admin
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl shadow-brand-red/10">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Admin</h2>
            {error && <div className="mb-4 text-brand-red text-sm font-semibold">{error}</div>}
            
            <form action={(data) => { 
              startTransition(async () => {
                setError('')
                const res = await addAdminUser(data)
                if (res?.error) setError(res.error)
                else setIsOpen(false)
              })
            }}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
                <input type="text" name="name" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Username</label>
                <input type="text" name="username" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Password</label>
                <input type="password" name="password" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Role</label>
                <select name="role" className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors">
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-white/5 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-brand-red/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
