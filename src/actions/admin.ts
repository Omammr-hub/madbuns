"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addAdminUser(formData: FormData) {
  const name = formData.get('name') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!name || !username || !password || !role) return { error: "All fields are required" }

  const existing = await prisma.admin.findUnique({ where: { username } })
  if (existing) return { error: "Username already exists" }

  await prisma.admin.create({
    data: { name, username, password, role }
  })
  
  revalidatePath('/admin/users')
  return { success: true }
}

export async function deleteAdminUser(id: string) {
  await prisma.admin.delete({ where: { id } })
  revalidatePath('/admin/users')
}

import { getAdminUser } from '@/actions/auth'

export async function changePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string

  const adminUser = await getAdminUser()
  if (!adminUser) return { error: 'Not authenticated' }

  const admin = await prisma.admin.findUnique({ where: { id: adminUser.id } })
  if (!admin || admin.password !== currentPassword) {
    return { error: 'Incorrect current password' }
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: newPassword }
  })

  return { success: true }
}
