import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Link, BarChart3, Palette, Eye } from 'lucide-react'

async function getUserData(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        links: {
          orderBy: { order: 'asc' }
        },
        theme: true,
        _count: {
          select: {
            links: true
          }
        }
      }
    })

    return user
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    return null
  }
}

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await getUserData(userId)

  if (!user) {
    // Usuário não existe no banco ou erro de conexão, vamos para onboarding
    redirect('/onboarding')
  }

  let totalClicks = 0
  try {
    totalClicks = await prisma.click.count({
      where: {
        link: {
          userId: user.id
        }
      }
    })
  } catch (error) {
    console.error('Erro ao buscar cliques:', error)
    // totalClicks permanece 0 se houver erro
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg -z-10"></div>
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie seus links e acompanhe suas estatísticas
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Links</CardTitle>
            <Link className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{user._count.links}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfil Público</CardTitle>
            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {user.isPublic ? 'Ativo' : 'Inativo'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Adicionar Link
            </CardTitle>
            <CardDescription>
              Adicione um novo link ao seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="/dashboard/links/new">Criar Link</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-indigo-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Personalizar Tema
            </CardTitle>
            <CardDescription>
              Customize a aparência do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950">
              <a href="/dashboard/theme">Editar Tema</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Ver Perfil
            </CardTitle>
            <CardDescription>
              Visualize como seu perfil aparece para outros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950">
              <a href={`/${user.username}`} target="_blank">
                Ver Perfil Público
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Links */}
      <Card className="border-t-4 border-t-gradient-to-r border-t-blue-500 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Links Recentes
          </CardTitle>
          <CardDescription>
            Seus links mais recentemente adicionados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.links.length === 0 ? (
            <div className="text-center py-8">
              <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum link ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comece adicionando seu primeiro link
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="/dashboard/links/new">Adicionar Primeiro Link</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {user.links.slice(0, 5).map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      link.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {link.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                    <Button asChild variant="outline" size="sm">
                      <a href={`/dashboard/links/${link.id}`}>Editar</a>
                    </Button>
                  </div>
                </div>
              ))}

              {user.links.length > 5 && (
                <div className="text-center pt-4">
                  <Button asChild variant="outline">
                    <a href="/dashboard/links">Ver Todos os Links</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
