import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LinksList } from '@/components/links-list'
import { Plus } from 'lucide-react'

async function getUserLinks(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      links: {
        orderBy: { order: 'asc' }
      }
    }
  })

  return user
}

export default async function LinksPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await getUserLinks(userId)

  if (!user) {
    redirect('/onboarding')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meus Links
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie todos os seus links em um só lugar
          </p>
        </div>

        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <a href="/dashboard/links/new">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Link
          </a>
        </Button>
      </div>

      {user.links.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Nenhum link ainda</CardTitle>
            <CardDescription>
              Comece adicionando seu primeiro link para compartilhar com o mundo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="/dashboard/links/new">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Link
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <LinksList links={user.links} />
      )}
    </div>
  )
}
