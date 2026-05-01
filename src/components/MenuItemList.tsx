"use client"

import { toggleMenuItemAvailability, deleteMenuItem } from '@/actions/menu'
import { useState } from 'react'

type MenuItem = {
  id: string
  name: string
  price: number
  isAvailable: boolean
  category: { name: string }
}

export default function MenuItemList({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState(initialItems)

  const handleToggle = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setItems(items.map(item => item.id === id ? { ...item, isAvailable: !currentStatus } : item))
    await toggleMenuItemAvailability(id, currentStatus)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id))
      await deleteMenuItem(id)
    }
  }

  return (
    <div className="bg-brand-card rounded-3xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-gray-400 border-b border-white/10">
            <th className="p-4 font-bold">Name</th>
            <th className="p-4 font-bold">Category</th>
            <th className="p-4 font-bold">Price</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="p-4 font-semibold text-white">{item.name}</td>
              <td className="p-4 text-gray-400">{item.category.name}</td>
              <td className="p-4 font-bold text-brand-red">${item.price.toFixed(2)}</td>
              <td className="p-4">
                <button 
                  onClick={() => handleToggle(item.id, item.isAvailable)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-brand-red'}`}
                >
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </button>
              </td>
              <td className="p-4 text-right space-x-2">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-lg text-sm font-bold hover:bg-brand-red hover:text-white transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
