"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleMenuItemAvailability(id: string, isAvailable: boolean) {
  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable: !isAvailable }
  })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({
    where: { id }
  })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}

export async function addCategory(data: FormData) {
  const name = data.get('name') as string
  if (!name) return
  await prisma.category.create({
    data: { name }
  })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}



export async function addMenuItem(data: FormData) {
  const name = data.get('name') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const categoryId = data.get('categoryId') as string
  const image = data.get('image') as File | null
  
  if (!name || isNaN(price) || !categoryId) return

  let imageUrl = null

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = image.type || 'image/jpeg'
    imageUrl = `data:${mimeType};base64,${base64}`
  }

  await prisma.menuItem.create({
    data: { name, description, price, categoryId, imageUrl }
  })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}

export async function updateSetting(key: string, value: string) {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  })
  revalidatePath('/')
  revalidatePath('/contact')
  revalidatePath('/admin/settings')
}
