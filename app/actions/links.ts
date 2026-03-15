'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { isValidHttpUrl, validateRequired } from '@/lib/form-utils'

interface CreateLinkData {
  title: string
  url: string
  description?: string
  icon?: string
}

export async function createLink(data: CreateLinkData) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { links: true }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const title = data.title.trim()
    const url = data.url.trim()
    const description = data.description?.trim() || null
    const icon = data.icon?.trim() || null

    const titleError = validateRequired(title, 'Titulo e obrigatorio')
    if (titleError) {
      return { success: false, error: titleError }
    }

    const urlError = validateRequired(url, 'URL e obrigatoria')
    if (urlError) {
      return { success: false, error: urlError }
    }

    if (!isValidHttpUrl(url)) {
      return { success: false, error: 'URL invalida. Use http:// ou https://.' }
    }

    // Verificar limite de links para usuários Free
    const DAY_IN_MS = 86_400_000;
    const isPro = 
      user.plan === "PRO" || 
      (!!user.stripePriceId && !!user.stripeCurrentPeriodEnd && (user.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()));

    if (!isPro && user.links.length >= 5) {
      return { 
        success: false, 
        error: 'Voce atingiu o limite de 5 links do plano FREE. Faca upgrade para o PRO e desbloqueie links ilimitados.' 
      }
    }

    // Determinar a ordem do novo link
    const maxOrder = user.links.length > 0 
      ? Math.max(...user.links.map(link => link.order))
      : -1

    const link = await prisma.link.create({
      data: {
        title,
        url,
        description,
        icon,
        order: maxOrder + 1,
        userId: user.id
      }
    })

    revalidatePath('/dashboard/links')
    revalidatePath(`/${user.username}`)
    return { success: true, link }
  } catch (error) {
    console.error('Erro ao criar link:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function updateLink(linkId: string, data: Partial<CreateLinkData>) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    // Verificar se o link pertence ao usuário
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: user.id
      }
    })

    if (!existingLink) {
      return { success: false, error: 'Link não encontrado' }
    }

    const nextTitle = data.title?.trim()
    const nextUrl = data.url?.trim()
    const nextDescription = data.description === undefined
      ? undefined
      : data.description.trim() || null
    const nextIcon = data.icon === undefined ? undefined : data.icon.trim() || null

    if (nextTitle !== undefined) {
      const titleError = validateRequired(nextTitle, 'Titulo e obrigatorio')
      if (titleError) {
        return { success: false, error: titleError }
      }
    }

    if (nextUrl !== undefined) {
      const urlError = validateRequired(nextUrl, 'URL e obrigatoria')
      if (urlError) {
        return { success: false, error: urlError }
      }

      if (!isValidHttpUrl(nextUrl)) {
        return { success: false, error: 'URL invalida. Use http:// ou https://.' }
      }
    }

    const link = await prisma.link.update({
      where: { id: linkId },
      data: {
        title: nextTitle,
        url: nextUrl,
        description: nextDescription,
        icon: nextIcon,
      }
    })

    revalidatePath('/dashboard/links')
    revalidatePath(`/${user.username}`)
    return { success: true, link }
  } catch (error) {
    console.error('Erro ao atualizar link:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function toggleLinkStatus(linkId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    // Verificar se o link pertence ao usuário
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: user.id
      }
    })

    if (!existingLink) {
      return { success: false, error: 'Link não encontrado' }
    }

    const link = await prisma.link.update({
      where: { id: linkId },
      data: {
        isActive: !existingLink.isActive
      }
    })

    revalidatePath('/dashboard/links')
    revalidatePath(`/${user.username}`)
    return { success: true, link }
  } catch (error) {
    console.error('Erro ao alterar status do link:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function deleteLink(linkId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    // Verificar se o link pertence ao usuário
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: user.id
      }
    })

    if (!existingLink) {
      return { success: false, error: 'Link não encontrado' }
    }

    await prisma.link.delete({
      where: { id: linkId }
    })

    revalidatePath('/dashboard/links')
    revalidatePath(`/${user.username}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao remover link:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function reorderLinks(linkIds: string[]) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const uniqueLinkIds = [...new Set(linkIds)]
    if (uniqueLinkIds.length === 0) {
      return { success: false, error: 'Nenhum link foi enviado para reordenacao.' }
    }

    if (uniqueLinkIds.length !== linkIds.length) {
      return { success: false, error: 'A lista enviada para reordenacao contem IDs duplicados.' }
    }

    const ownedLinks = await prisma.link.findMany({
      where: {
        id: { in: uniqueLinkIds },
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    if (ownedLinks.length !== uniqueLinkIds.length) {
      return { success: false, error: 'Nao foi possivel validar a ordem dos links enviados.' }
    }

    // Atualizar a ordem dos links
    await Promise.all(
      linkIds.map((linkId, index) =>
        prisma.link.updateMany({
          where: {
            id: linkId,
            userId: user.id
          },
          data: {
            order: index
          }
        })
      )
    )

    revalidatePath('/dashboard/links')
    revalidatePath(`/${user.username}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao reordenar links:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}
