import Link from 'next/link'
import { LayoutDashboard, Settings, Menu, LogOut, Users, MessageSquare } from 'lucide-react'
import { logout, getAdminUser } from '@/actions/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adminUser = await getAdminUser()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-white/10 text-white p-6 flex flex-col h-screen sticky top-0">
        <div className="mb-10">
          <Link href="/admin" className="text-2xl font-black text-brand-red tracking-tighter">
            MADBUNS<span className="text-white">.</span> Admin
          </Link>
        </div>
        
        {adminUser && (
          <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center font-bold text-lg">
              {adminUser.name?.charAt(0) || adminUser.username.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm">{adminUser.name || adminUser.username}</p>
              <p className="text-xs text-gray-400">{adminUser.role}</p>
            </div>
          </div>
        )}
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-semibold">Dashboard</span>
          </Link>
          <Link href="/admin/menu" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <Menu size={20} />
            <span className="font-semibold">Menu Items</span>
          </Link>
          <Link href="/admin/contacts" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <MessageSquare size={20} />
            <span className="font-semibold">Messages</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <Settings size={20} />
            <span className="font-semibold">Settings</span>
          </Link>
          {adminUser?.role === 'SUPER_ADMIN' && (
            <Link href="/admin/users" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
              <Users size={20} />
              <span className="font-semibold">Admin Users</span>
            </Link>
          )}
        </nav>

        <form action={logout}>
          <button type="submit" className="flex items-center space-x-3 text-brand-red hover:text-red-400 px-4 py-3 w-full transition-colors mt-auto font-bold bg-brand-red/10 rounded-xl mt-4">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a]">
        {children}
      </div>
    </div>
  )
}
