import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Eye, MousePointer, TrendingUp } from 'lucide-react'

async function getAnalyticsData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (!user) return null

  // Últimos 30 dias
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const analytics = await prisma.analytics.findMany({
    where: {
      userId: user.id,
      date: {
        gte: thirtyDaysAgo
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  const totalViews = analytics.reduce((sum, day) => sum + day.totalViews, 0)
  const totalClicks = analytics.reduce((sum, day) => sum + day.totalClicks, 0)

  // Analytics por link
  const linkClicks = await prisma.click.groupBy({
    by: ['linkId'],
    where: {
      link: {
        userId: user.id
      },
      clickedAt: {
        gte: thirtyDaysAgo
      }
    },
    _count: {
      id: true
    }
  })

  const topLinks = await Promise.all(
    linkClicks
      .sort((a, b) => b._count.id - a._count.id)
      .slice(0, 5)
      .map(async (item) => {
        const link = await prisma.link.findUnique({
          where: { id: item.linkId },
          select: { title: true, url: true }
        })
        return {
          title: link?.title || 'Link removido',
          url: link?.url || '',
          clicks: item._count.id
        }
      })
  )

  return {
    totalViews,
    totalClicks,
    dailyAnalytics: analytics,
    topLinks
  }
}

export default async function AnalyticsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const data = await getAnalyticsData(userId)

  if (!data) {
    redirect('/onboarding')
  }

  const clickRate = data.totalViews > 0
    ? ((data.totalClicks / data.totalViews) * 100).toFixed(1)
    : '0'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg -z-10"></div>
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Acompanhe o desempenho do seu perfil nos últimos 30 dias
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{data.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              Pessoas que visitaram seu perfil
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{data.totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              Cliques nos seus links
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Clique</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              Porcentagem de visitantes que clicaram
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links Mais Clicados</CardTitle>
            <CardDescription>
              Seus links com melhor performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.topLinks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum clique registrado ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.topLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {link.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {link.url}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {link.clicks} cliques
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Visualizações e cliques dos últimos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.dailyAnalytics.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma atividade registrada ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.dailyAnalytics.slice(0, 7).map((day) => (
                  <div key={day.date.toISOString()} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {day.date.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>{day.totalViews} visualizações</span>
                      <span>{day.totalClicks} cliques</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
