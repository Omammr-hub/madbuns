import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getAdminUser } from '@/actions/auth'
import { Instagram, MapPin, Phone, MessageCircle } from 'lucide-react'

async function getSettings() {
  try {
    const settings = await prisma.setting.findMany()
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    return {}
  }
}

export default async function Footer() {
  const settings = await getSettings()
  const adminUser = await getAdminUser()

  return (
    <footer className="bg-[#111] border-t border-white/10 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <Link href="/" className="text-3xl font-bold text-brand-red tracking-tighter block mb-4">
              MADBUNS<span className="text-white">.</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              {settings['homepage_text'] || 'Premium smash burgers and hand-breaded fried chicken, made fresh every day.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="text-brand-red" size={20} />
                <span>{settings['address'] || '123 Burger St, Food City'}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="text-brand-red" size={20} />
                <span>{settings['phone'] || '+1234567890'}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MessageCircle className="text-brand-red" size={20} />
                <span>{settings['whatsapp'] || '+1234567890'}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Opening Hours</h3>
            <p className="text-gray-400 mb-6">
              {settings['opening_hours'] || 'Mon - Sun: 11:00 AM - 11:00 PM'}
            </p>
            <div className="flex space-x-4">
              {settings['instagram'] && (
                <a 
                  href={settings['instagram']} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-red/10 p-3 rounded-full hover:bg-brand-red transition-colors text-brand-red hover:text-brand-white"
                >
                  <Instagram size={24} />
                </a>
              )}
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Madbuns. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            {adminUser ? (
              <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Dashboard
              </Link>
            ) : (
              <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
