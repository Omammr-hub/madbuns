"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  let admin = await prisma.admin.findUnique({ where: { username } })

  // Seed default admin if no admins exist
  if (!admin) {
    const adminCount = await prisma.admin.count()
    if (adminCount === 0 && username === 'Karim' && password === 'Karim123') {
      admin = await prisma.admin.create({
        data: { username: 'Karim', password: 'Karim123', name: 'Omar marwan mostafa', role: 'SUPER_ADMIN' }
      })
    }
  }

  if (admin && admin.password === password) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })
    redirect('/admin')
  }

  return { error: 'Invalid credentials' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}

export async function getAdminUser() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('admin_session')?.value
  if (!sessionId) return null

  return await prisma.admin.findUnique({ 
    where: { id: sessionId },
    select: { id: true, username: true, name: true, role: true }
  })
}
