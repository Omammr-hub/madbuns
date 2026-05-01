import prisma from '@/lib/prisma'
import MenuItemList from '@/components/MenuItemList'
import AdminMenuActions from '@/components/AdminMenuActions'

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: { categoryId: 'asc' }
  })

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-white">Menu Items</h1>
        <AdminMenuActions categories={categories} />
      </div>

      <MenuItemList initialItems={items} />
    </div>
  )
}
