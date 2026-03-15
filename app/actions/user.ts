'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { validateRequired, validateUsername } from '@/lib/form-utils'

interface CreateUserData {
  clerkId: string
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
    const { userId: sessionClerkId } = await auth()
    if (!sessionClerkId || sessionClerkId !== data.clerkId) {
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

    const existingByClerkId = await prisma.user.findUnique({
      where: { clerkId: sessionClerkId }
    })

    if (existingByClerkId) {
      return { success: false, error: 'Seu perfil ja existe. Acesse o dashboard para continuar.' }
    }

    // Verificar se o username já existe
    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername }
    })

    if (existingUser) {
      return { success: false, error: 'Nome de usuário já está em uso' }
    }

    // Verificar se o email já existe
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return { success: false, error: 'Email já está em uso' }
    }

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        clerkId: sessionClerkId,
        email,
        username: normalizedUsername,
        firstName,
        lastName: lastName || null,
        imageUrl: data.imageUrl,
        bio: data.bio?.trim() || null,
        title: data.title?.trim() || null,
      }
    })

    // Criar tema padrão para o usuário
    await prisma.theme.create({
      data: {
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
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return { success: false, error: 'Não autorizado' }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
        clerkId,
      },
    })

    if (!existingUser) {
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
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        clerkId,
      }
    })

    if (!user) {
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
