import Link from 'next/link'
import { LayoutDashboard, Settings, Menu, LogOut } from 'lucide-react'
import { logout } from '@/actions/auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-white/10 text-white p-6 flex flex-col h-screen sticky top-0">
        <div className="mb-10">
          <Link href="/admin" className="text-2xl font-black text-brand-red tracking-tighter">
            MADBUNS<span className="text-white">.</span> Admin
          </Link>
        </div>
        
        <nav className="flex-1 space-y-4">
          <Link href="/admin" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-semibold">Dashboard</span>
          </Link>
          <Link href="/admin/menu" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <Menu size={20} />
            <span className="font-semibold">Menu Items</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors">
            <Settings size={20} />
            <span className="font-semibold">Settings</span>
          </Link>
        </nav>

        <form action={logout}>
          <button type="submit" className="flex items-center space-x-3 text-brand-red hover:text-red-400 px-4 py-3 w-full transition-colors mt-auto font-bold">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
