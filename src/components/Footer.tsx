import Link from 'next/link'
import prisma from '@/lib/prisma'
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

  return (
    <footer className="bg-brand-blue text-brand-offwhite pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <Link href="/" className="text-3xl font-bold text-brand-red tracking-tighter block mb-4">
              MADBUNS<span className="text-brand-white">.</span>
            </Link>
            <p className="text-brand-offwhite/80 max-w-sm">
              {settings['homepage_text'] || 'Premium smash burgers and hand-breaded fried chicken, made fresh every day.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-brand-offwhite/80">
                <MapPin className="text-brand-red" size={20} />
                <span>{settings['address'] || '123 Burger St, Food City'}</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-offwhite/80">
                <Phone className="text-brand-red" size={20} />
                <span>{settings['phone'] || '+1234567890'}</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-offwhite/80">
                <MessageCircle className="text-brand-red" size={20} />
                <span>{settings['whatsapp'] || '+1234567890'}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand-white">Opening Hours</h3>
            <p className="text-brand-offwhite/80 mb-6">
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
        
        <div className="border-t border-brand-offwhite/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-offwhite/50">
          <p>&copy; {new Date().getFullYear()} Madbuns. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/admin" className="hover:text-brand-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
