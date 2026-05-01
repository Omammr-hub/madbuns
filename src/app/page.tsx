import Hero from '@/components/Hero'
import prisma from '@/lib/prisma'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  let introText = ''
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'homepage_text' }
    })
    if (setting) introText = setting.value
  } catch (error) {
    console.error("Failed to fetch settings", error)
  }

  return (
    <div>
      <Hero introText={introText} />
      {/* Featured Categories could be added here in the future */}
    </div>
  )
}
