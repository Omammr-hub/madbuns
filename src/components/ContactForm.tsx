"use client"

import { useTransition, useState } from 'react'
import { submitContactMessage } from '@/actions/contact'

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await submitContactMessage(formData)
      if (res.success) {
        setSuccess(true)
      } else {
        alert(res.error || 'Something went wrong.')
      }
    })
  }

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
        <p className="text-gray-400">Thank you for reaching out. We will get back to you soon.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 text-brand-red hover:text-white transition-colors underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">First Name</label>
        <input name="firstName" required type="text" className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
        <input name="email" required type="email" className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2">Message</label>
        <textarea name="message" required rows={4} className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent resize-none"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
