"use client"

import { useTransition } from 'react'
import { markMessageRead, deleteMessage } from '@/actions/contact'
import { Check, Trash2 } from 'lucide-react'

type Message = {
  id: string
  firstName: string
  email: string
  message: string
  status: string
  createdAt: Date
}

export default function ContactsTable({ messages }: { messages: Message[] }) {
  const [isPending, startTransition] = useTransition()

  const exportCSV = () => {
    const headers = ['Date,Name,Email,Message,Status']
    const rows = messages.map(m => `"${new Date(m.createdAt).toLocaleDateString()}","${m.firstName.replace(/"/g, '""')}","${m.email}","${m.message.replace(/"/g, '""')}","${m.status}"`)
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "contacts_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (messages.length === 0) {
    return <div className="text-gray-400 text-center py-12">No messages found.</div>
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={exportCSV} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10 text-gray-400">
            <th className="pb-4 font-semibold">Date</th>
            <th className="pb-4 font-semibold">Name</th>
            <th className="pb-4 font-semibold">Email</th>
            <th className="pb-4 font-semibold">Message</th>
            <th className="pb-4 font-semibold">Status</th>
            <th className="pb-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <td className="py-6 text-sm text-gray-400">
                {new Date(msg.createdAt).toLocaleDateString()}
              </td>
              <td className="py-6 text-white font-medium">{msg.firstName}</td>
              <td className="py-6 text-brand-red">{msg.email}</td>
              <td className="py-6 text-gray-300 max-w-xs truncate" title={msg.message}>{msg.message}</td>
              <td className="py-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${msg.status === 'UNREAD' ? 'bg-brand-red/20 text-brand-red' : 'bg-green-500/20 text-green-500'}`}>
                  {msg.status}
                </span>
              </td>
              <td className="py-6 flex justify-end gap-3">
                {msg.status === 'UNREAD' && (
                  <button 
                    onClick={() => startTransition(() => markMessageRead(msg.id))}
                    disabled={isPending}
                    className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
                <button 
                  onClick={() => startTransition(() => deleteMessage(msg.id))}
                  disabled={isPending}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
