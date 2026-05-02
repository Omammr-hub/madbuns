"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitContactMessage(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!firstName || !email || !message) {
    return { error: 'All fields are required.' }
  }

  await prisma.contactMessage.create({
    data: { firstName, email, message }
  })

  revalidatePath('/admin/contacts')
  return { success: true }
}

export async function markMessageRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { status: 'READ' }
  })
  revalidatePath('/admin/contacts')
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath('/admin/contacts')
}
