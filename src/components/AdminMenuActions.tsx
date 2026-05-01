"use client"

import { useState, useTransition } from 'react'
import { addCategory, addMenuItem } from '@/actions/menu'

export default function AdminMenuActions({ categories }: { categories: { id: string, name: string }[] }) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
  const [isItemModalOpen, setItemModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => setCategoryModalOpen(true)}
        className="bg-brand-card border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors shadow-lg"
      >
        + Add Category
      </button>
      <button 
        onClick={() => setItemModalOpen(true)}
        className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/25"
      >
        + Add New Item
      </button>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl shadow-brand-red/10">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Category</h2>
            <form action={(data) => { 
              startTransition(async () => {
                await addCategory(data)
                setCategoryModalOpen(false)
              })
            }}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setCategoryModalOpen(false)} className="flex-1 bg-white/5 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-brand-red/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl shadow-brand-red/10">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Item</h2>
            <form action={(data) => { 
              startTransition(async () => {
                await addMenuItem(data)
                setItemModalOpen(false)
              })
            }}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Item Name</label>
                <input type="text" name="name" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Description</label>
                <textarea name="description" className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors resize-none"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Price ($)</label>
                <input type="number" step="0.01" name="price" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Item Image (Optional)</label>
                <input type="file" name="image" accept="image/*" className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Category</label>
                <select name="categoryId" required className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors">
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setItemModalOpen(false)} className="flex-1 bg-white/5 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
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
