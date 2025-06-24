import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProfilePage } from '@/components/profile-page'
import { trackClick } from '@/app/actions/analytics'

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

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

  return user
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

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  // Incrementar visualização
  await prisma.analytics.upsert({
    where: {
      userId_date: {
        userId: user.id,
        date: new Date()
      }
    },
    update: {
      totalViews: {
        increment: 1
      }
    },
    create: {
      userId: user.id,
      date: new Date(),
      totalViews: 1,
      totalClicks: 0
    }
  })

  return <ProfilePage user={user} />
}
