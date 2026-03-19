import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProfilePage } from '@/components/profile-page'
import { TEMPLATE_OPTIONS, type TemplateId } from '@/components/profile-templates'
import { hasActiveProAccess } from '@/lib/subscription'

interface ProfilePageProps {
  params: Promise<{ username: string }>
  searchParams: Promise<{ preview?: string }>
}

const templateIds = new Set<string>(TEMPLATE_OPTIONS.map((template) => template.id))

async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { 
      username,
      isPublic: true 
    },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { order: 'asc' }
      },
      theme: true
    }
  })

  if (!user) return null

  // Adicionando flag isPro baseada no plano ou assinatura ativa
  const isPro = hasActiveProAccess(user)

  return {
    ...user,
    username: user.username ?? username,
    isPro
  }
}

function getAnalyticsDate(date = new Date()) {
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)
  return normalizedDate
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    return {
      title: 'Usuário não encontrado - Unilink',
      description: 'Este perfil não existe ou não está público.'
    }
  }

  return {
    title: `${user.firstName} ${user.lastName} - ${user.title || 'Unilink'}`,
    description: user.bio || `Confira os links de ${user.firstName} ${user.lastName}`,
    openGraph: {
      title: `${user.firstName} ${user.lastName}`,
      description: user.bio || `Confira os links de ${user.firstName} ${user.lastName}`,
      images: user.imageUrl ? [user.imageUrl] : [],
    },
  }
}

export default async function UserProfilePage({ params, searchParams }: ProfilePageProps) {
  const { username } = await params
  const { preview } = await searchParams
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  const previewTemplateId =
    preview && templateIds.has(preview) ? (preview as TemplateId) : null

  // Incrementar visualização
  if (!previewTemplateId) {
    const analyticsDate = getAnalyticsDate()
    await prisma.analytics.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: analyticsDate
        }
      },
      update: {
        totalViews: {
          increment: 1
        }
      },
      create: {
        userId: user.id,
        date: analyticsDate,
        totalViews: 1,
        totalClicks: 0
      }
    })
  }

  return (
    <ProfilePage
      user={user}
      preview={!!previewTemplateId}
      previewTemplateId={previewTemplateId}
    />
  )
}
