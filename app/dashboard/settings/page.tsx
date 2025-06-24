import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsForm } from '@/components/settings-form'

async function getUserData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId }
  })

  return user
}

export default async function SettingsPage() {
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
          Configurações
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Gerencie as configurações do seu perfil
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link do Perfil</CardTitle>
            <CardDescription>
              Seu perfil público está disponível em:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <code className="text-sm break-all">
                {process.env.NODE_ENV === 'production'
                  ? `https://unilink.com/${user.username}`
                  : `http://localhost:3000/${user.username}`
                }
              </code>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Nome exibido:</strong> {user.firstName} {user.lastName}</p>
              {user.title && <p><strong>Título:</strong> {user.title}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
