import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsForm } from '@/components/settings-form'
import { Settings, Link } from 'lucide-react'

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
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg -z-10"></div>
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Configurações
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie as configurações do seu perfil
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Informações do Perfil
            </CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm user={user} />
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Link do Perfil
            </CardTitle>
            <CardDescription>
              Seu perfil público está disponível em:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-800">
              <code className="text-sm break-all text-blue-700 dark:text-blue-300">
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
