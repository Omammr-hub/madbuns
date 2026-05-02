import prisma from '@/lib/prisma'
import AdminUsersActions from '@/components/AdminUsersActions'
import { getAdminUser } from '@/actions/auth'
import { redirect } from 'next/navigation'

export default async function AdminUsersPage() {
  const currentUser = await getAdminUser()
  
  if (currentUser?.role !== 'SUPER_ADMIN') {
    redirect('/admin')
  }

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Admin Users</h1>
          <p className="text-gray-400">Manage who has access to the admin dashboard.</p>
        </div>
        <AdminUsersActions />
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="pb-4 font-semibold">Name</th>
              <th className="pb-4 font-semibold">Username</th>
              <th className="pb-4 font-semibold">Role</th>
              <th className="pb-4 font-semibold">Created At</th>
              <th className="pb-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-6 text-white font-medium">{admin.name}</td>
                <td className="py-6 text-brand-red">{admin.username}</td>
                <td className="py-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${admin.role === 'SUPER_ADMIN' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {admin.role}
                  </span>
                </td>
                <td className="py-6 text-gray-400 text-sm">{new Date(admin.createdAt).toLocaleDateString()}</td>
                <td className="py-6 text-right">
                  {currentUser.id !== admin.id && (
                    <AdminUsersActions deleteId={admin.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
