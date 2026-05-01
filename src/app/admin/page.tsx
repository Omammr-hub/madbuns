import prisma from '@/lib/prisma'

export default async function AdminDashboard() {
  const itemsCount = await prisma.menuItem.count()
  const categoriesCount = await prisma.category.count()

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111] p-8 rounded-3xl shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-gray-400 mb-2">Total Menu Items</h2>
          <p className="text-6xl font-black text-brand-red">{itemsCount}</p>
        </div>
        <div className="bg-[#111] p-8 rounded-3xl shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-gray-400 mb-2">Total Categories</h2>
          <p className="text-6xl font-black text-brand-red">{categoriesCount}</p>
        </div>
      </div>
    </div>
  )
}
