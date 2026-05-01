import prisma from '@/lib/prisma'
import { MapPin, Phone, MessageCircle, Instagram, Clock } from 'lucide-react'

export const revalidate = 60

export default async function ContactPage() {
  let settings: Record<string, string> = {}

  try {
    const data = await prisma.setting.findMany()
    settings = data.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    console.error("Failed to fetch settings", error)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        <div className="bg-brand-red text-white p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/50 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-4">Contact<br />Information</h1>
            <p className="text-white/80 mb-12 font-medium">Say something to start a live chat or hit us up on our socials.</p>

            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Phone size={24} className="text-white" />
                <span className="font-semibold text-lg">{settings['phone'] || '+1234567890'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <MessageCircle size={24} className="text-white" />
                <span className="font-semibold text-lg">{settings['whatsapp'] || '+1234567890'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin size={24} className="text-white" />
                <span className="font-semibold text-lg">{settings['address'] || '123 Burger St, Food City'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock size={24} className="text-white" />
                <span className="font-semibold text-lg">{settings['opening_hours'] || 'Mon - Sun: 11:00 AM - 11:00 PM'}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex space-x-6 mt-16">
            {settings['instagram'] && (
              <a href={settings['instagram']} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Instagram size={28} />
              </a>
            )}
          </div>
        </div>

        <div className="p-12 md:w-3/5">
          <h2 className="text-3xl font-bold text-white mb-8">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">First Name</label>
              <input type="text" className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Message</label>
              <textarea rows={4} className="w-full border-b-2 border-white/20 text-white py-2 focus:outline-none focus:border-brand-red transition-colors bg-transparent resize-none"></textarea>
            </div>
            <button type="button" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red transition-colors shadow-lg">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
