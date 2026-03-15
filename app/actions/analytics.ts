'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

function getAnalyticsDate(date = new Date()) {
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)
  return normalizedDate
}

export async function trackClick(linkId: string) {
  try {
    const analyticsDate = getAnalyticsDate()
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const forwarded = headersList.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || ''

    // Registrar o clique
    await prisma.click.create({
      data: {
        linkId,
        ipAddress,
        userAgent,
      }
    })

    // Atualizar analytics diárias
    const link = await prisma.link.findUnique({
      where: { id: linkId },
      select: { userId: true }
    })

    if (link) {
      await prisma.analytics.upsert({
        where: {
          userId_date: {
            userId: link.userId,
            date: analyticsDate
          }
        },
        update: {
          totalClicks: {
            increment: 1
          }
        },
        create: {
          userId: link.userId,
          date: analyticsDate,
          totalViews: 0,
          totalClicks: 1
        }
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao registrar clique:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function getAnalytics(userId: string, days: number = 30) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        clerkId,
      },
      select: { id: true }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const analytics = await prisma.analytics.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    const totalViews = analytics.reduce((sum, day) => sum + day.totalViews, 0)
    const totalClicks = analytics.reduce((sum, day) => sum + day.totalClicks, 0)

    // Analytics por link
    const linkAnalytics = await prisma.click.groupBy({
      by: ['linkId'],
      where: {
        link: {
          userId: user.id
        },
        clickedAt: {
          gte: startDate
        }
      },
      _count: {
        id: true
      }
    })

    const linksWithClicks = await Promise.all(
      linkAnalytics.map(async (item) => {
        const link = await prisma.link.findUnique({
          where: { id: item.linkId },
          select: { title: true, url: true }
        })
        return {
          linkId: item.linkId,
          title: link?.title || 'Link removido',
          url: link?.url || '',
          clicks: item._count.id
        }
      })
    )

    return {
      success: true,
      data: {
        totalViews,
        totalClicks,
        dailyAnalytics: analytics,
        linkAnalytics: linksWithClicks
      }
    }
  } catch (error) {
    console.error('Erro ao buscar analytics:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}
