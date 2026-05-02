import prisma from '@/lib/prisma'
import { getAdminUser } from '@/actions/auth'
import { Package, FolderTree, MessageSquare, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const adminUser = await getAdminUser()
  const itemsCount = await prisma.menuItem.count()
  const categoriesCount = await prisma.category.count()
  const unreadMessagesCount = await prisma.contactMessage.count({ where: { status: 'UNREAD' } })
  const adminsCount = await prisma.admin.count()

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Welcome back, {adminUser?.name?.split(' ')[0] || 'Admin'}!</h1>
        <p className="text-gray-400">Here's what's happening with your restaurant today.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111] p-6 rounded-3xl shadow-xl border border-white/10 hover:border-brand-red/50 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Menu Items</h2>
            <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl"><Package size={20} /></div>
          </div>
          <p className="text-5xl font-black text-white">{itemsCount}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-3xl shadow-xl border border-white/10 hover:border-brand-red/50 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Categories</h2>
            <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl"><FolderTree size={20} /></div>
          </div>
          <p className="text-5xl font-black text-white">{categoriesCount}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-3xl shadow-xl border border-white/10 hover:border-brand-red/50 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Unread Msgs</h2>
            <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl"><MessageSquare size={20} /></div>
          </div>
          <p className="text-5xl font-black text-white">{unreadMessagesCount}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-3xl shadow-xl border border-white/10 hover:border-brand-red/50 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Admin Users</h2>
            <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl"><Users size={20} /></div>
          </div>
          <p className="text-5xl font-black text-white">{adminsCount}</p>
        </div>
      </div>
    </div>
  )
}
