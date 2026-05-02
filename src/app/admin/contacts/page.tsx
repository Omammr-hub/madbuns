import prisma from '@/lib/prisma'
import ContactsTable from '@/components/ContactsTable'

export default async function ContactsPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Client Messages</h1>
          <p className="text-gray-400">View and manage messages submitted through the contact form.</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <ContactsTable messages={messages} />
      </div>
    </div>
  )
}
