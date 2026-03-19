'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { validateRequired, validateUsername } from '@/lib/form-utils'
import { getAuthSession } from '@/lib/auth-session'

interface CreateUserData {
  email: string
  firstName: string
  lastName: string
  imageUrl: string
  username: string
  bio?: string
  title?: string
}

export async function createUser(data: CreateUserData) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return { success: false, error: 'Sessao invalida. Entre novamente para continuar.' }
    }

    const normalizedUsername = data.username.trim().toLowerCase()
    const usernameError = validateUsername(normalizedUsername)
    if (usernameError) {
      return { success: false, error: usernameError }
    }

    const email = data.email.trim().toLowerCase()
    const firstName = data.firstName.trim()
    const lastName = data.lastName.trim()
    const nameError = validateRequired(firstName, 'Nome e obrigatorio')
    if (nameError) {
      return { success: false, error: nameError }
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!existingUser) {
      return { success: false, error: 'Nao foi possivel localizar sua conta.' }
    }

    if (existingUser.username) {
      return { success: false, error: 'Seu perfil ja existe. Acesse o dashboard para continuar.' }
    }

    const conflictingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername }
    })

    if (conflictingUser && conflictingUser.id !== existingUser.id) {
      return { success: false, error: 'Nome de usuário já está em uso' }
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: [firstName, lastName].filter(Boolean).join(' ').trim(),
        email,
        username: normalizedUsername,
        displayUsername: normalizedUsername,
        firstName,
        lastName: lastName || null,
        imageUrl: data.imageUrl,
        bio: data.bio?.trim() || null,
        title: data.title?.trim() || null,
      }
    })

    await prisma.theme.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
      }
    })

    revalidatePath('/dashboard')
    return { success: true, user }
  } catch (error) {
    console.error('Erro ao criar usuário:', error)

    // Verificar se é erro de conexão com banco
    if (error instanceof Error && (
      error.message.includes('Can\'t reach database server') ||
      error.message.includes('connection') ||
      error.message.includes('timeout')
    )) {
      return {
        success: false,
        error: 'Banco de dados temporariamente indisponível. Tente novamente em alguns minutos ou entre em contato com o suporte.'
      }
    }

    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function updateUser(userId: string, data: Partial<CreateUserData>) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return { success: false, error: 'Não autorizado' }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!existingUser || existingUser.id !== session.user.id) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const nextUsername = data.username?.trim().toLowerCase()
    if (nextUsername) {
      const usernameError = validateUsername(nextUsername)
      if (usernameError) {
        return { success: false, error: usernameError }
      }

      const conflictingUser = await prisma.user.findUnique({
        where: { username: nextUsername },
      })

      if (conflictingUser && conflictingUser.id !== existingUser.id) {
        return { success: false, error: 'Nome de usuario ja esta em uso' }
      }
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        username: nextUsername,
        displayUsername: nextUsername,
        name: [data.firstName?.trim(), data.lastName?.trim()].filter(Boolean).join(' ').trim() || existingUser.name,
        firstName: data.firstName?.trim(),
        lastName: data.lastName?.trim() || null,
        bio: data.bio?.trim() || null,
        title: data.title?.trim() || null,
        imageUrl: data.imageUrl,
      }
    })

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/settings')
    if (existingUser.username !== user.username) {
      revalidatePath(`/${existingUser.username}`)
    }
    revalidatePath(`/${user.username}`)
    return { success: true, user }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function toggleUserVisibility(userId: string) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user || user.id !== session.user.id) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isPublic: !user.isPublic
      }
    })

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/settings')
    revalidatePath(`/${updatedUser.username}`)
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Erro ao alterar visibilidade:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}
