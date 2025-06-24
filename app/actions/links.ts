'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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

    // Determinar a ordem do novo link
    const maxOrder = user.links.length > 0 
      ? Math.max(...user.links.map(link => link.order))
      : -1

    const link = await prisma.link.create({
      data: {
        title: data.title,
        url: data.url,
        description: data.description || null,
        icon: data.icon || null,
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

    const link = await prisma.link.update({
      where: { id: linkId },
      data: {
        title: data.title,
        url: data.url,
        description: data.description,
        icon: data.icon,
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
