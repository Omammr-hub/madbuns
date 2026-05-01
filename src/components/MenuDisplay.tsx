"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  isAvailable: boolean
  categoryId: string
}

type Category = {
  id: string
  name: string
  order: number
  items: MenuItem[]
}

export default function MenuDisplay({ initialCategories }: { initialCategories: Category[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredCategories = initialCategories.map(category => {
    const filteredItems = category.items.filter(item => 
      (activeCategory === 'all' || category.id === activeCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    return { ...category, items: filteredItems }
  }).filter(category => category.items.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OUR <span className="text-brand-red">MENU</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Fresh ingredients, bold flavors. Explore our selection of smash burgers, fried chicken, and loaded sides.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        {/* Categories Filter */}
        <div className="flex overflow-x-auto w-full md:w-auto space-x-2 pb-2 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all ${
              activeCategory === 'all' ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25' : 'bg-brand-card border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            All Items
          </button>
          {initialCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all ${
                activeCategory === cat.id ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25' : 'bg-brand-card border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-brand-card border-2 border-white/10 text-white focus:border-brand-red outline-none transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>

      <div className="space-y-16">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-500">No items found</h3>
          </div>
        ) : (
          filteredCategories.map(category => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-black text-white mb-8 border-b-2 border-brand-red/20 pb-2 inline-block">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map(item => (
                  <motion.div 
                    key={item.id}
                    className="bg-brand-card border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-brand-red/5 hover:border-brand-red/30 transition-all flex flex-col h-full group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-56 overflow-hidden relative bg-white/5">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-xl">
                          MADBUNS
                        </div>
                      )}
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-xl px-4 py-2 border-2 border-white rounded-full transform -rotate-12">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <span className="text-xl font-black text-brand-red ml-4">${item.price.toFixed(2)}</span>
                      </div>
                      {item.description && (
                        <p className="text-gray-400 text-sm mt-2 flex-grow">{item.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
