"use client"

import { updateSetting } from '@/actions/menu'
import { useState } from 'react'

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async (key: string) => {
    setSaving(true)
    await updateSetting(key, settings[key] || '')
    setSaving(false)
    alert(`Saved ${key}!`)
  }

  const fields = [
    { key: 'phone', label: 'Phone Number' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'address', label: 'Address' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'opening_hours', label: 'Opening Hours' },
  ]

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="bg-[#111] p-8 rounded-3xl shadow-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">General Info</h2>
        <div className="space-y-6">
          {fields.map(field => (
            <div key={field.key} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-400 mb-2">{field.label}</label>
                <input
                  type="text"
                  value={settings[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-white/10 px-4 py-2 rounded-xl focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <button 
                onClick={() => handleSave(field.key)}
                disabled={saving}
                className="bg-[#222] border border-white/10 text-white px-6 py-2 h-11 rounded-xl font-bold hover:bg-brand-red transition-colors"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111] p-8 rounded-3xl shadow-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Homepage Intro Text</h2>
        <div className="space-y-4">
          <textarea
            rows={4}
            value={settings['homepage_text'] || ''}
            onChange={e => handleChange('homepage_text', e.target.value)}
            className="w-full bg-[#0a0a0a] text-white border-2 border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors resize-none"
          ></textarea>
          <button 
            onClick={() => handleSave('homepage_text')}
            disabled={saving}
            className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors w-full shadow-md"
          >
            Save Homepage Text
          </button>
        </div>
      </div>
      <div className="bg-[#111] p-8 rounded-3xl shadow-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Security</h2>
        <form action={async (formData) => {
          setSaving(true)
          const { changePassword } = await import('@/actions/admin')
          const res = await changePassword(formData)
          setSaving(false)
          if (res?.error) alert(res.error)
          else alert("Password changed successfully!")
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Current Password</label>
            <input type="password" name="currentPassword" required className="w-full bg-[#0a0a0a] text-white border-2 border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">New Password</label>
            <input type="password" name="newPassword" required minLength={6} className="w-full bg-[#0a0a0a] text-white border-2 border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-red transition-colors" />
          </div>
          <button 
            type="submit"
            disabled={saving}
            className="bg-[#222] border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-red transition-colors w-full shadow-md disabled:opacity-50"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
