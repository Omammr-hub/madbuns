import prisma from '@/lib/prisma'
import SettingsForm from '@/components/SettingsForm'

export default async function AdminSettingsPage() {
  const settingsData = await prisma.setting.findMany()
  const settings = settingsData.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black text-brand-blue mb-8">Content Settings</h1>
      <SettingsForm initialSettings={settings} />
    </div>
  )
}
