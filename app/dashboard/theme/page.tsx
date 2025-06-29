import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeForm } from '@/components/theme-form'
import { Palette } from 'lucide-react'

async function getUserData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      theme: true
    }
  })

  return user
}

export default async function ThemePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await getUserData(userId)

  if (!user) {
    redirect('/onboarding')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg -z-10"></div>
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Personalizar Tema
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize a aparência do seu perfil com templates e cores
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <Card className="border-t-4 border-t-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Configurações de Tema
            </CardTitle>
            <CardDescription>
              Escolha um template e personalize as cores do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
