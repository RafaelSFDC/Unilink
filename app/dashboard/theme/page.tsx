import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeForm } from '@/components/theme-form'

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personalizar Tema
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customize a aparência do seu perfil com templates e cores
        </p>
      </div>

      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Tema</CardTitle>
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
