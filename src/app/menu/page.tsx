import prisma from '@/lib/prisma'
import MenuDisplay from '@/components/MenuDisplay'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MenuPage() {
  let categories = []
  
  try {
    categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        items: {
          orderBy: { name: 'asc' }
        }
      }
    })
  } catch (error) {
    console.error("Failed to fetch menu", error)
  }

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <MenuDisplay initialCategories={categories} />
    </div>
  )
}
