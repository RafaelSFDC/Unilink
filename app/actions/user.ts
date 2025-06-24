'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
    // Verificar se o username já existe
    const existingUser = await prisma.user.findUnique({
      where: { username: data.username }
    })

    if (existingUser) {
      return { success: false, error: 'Nome de usuário já está em uso' }
    }

    // Verificar se o email já existe
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingEmail) {
      return { success: false, error: 'Email já está em uso' }
    }

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        imageUrl: data.imageUrl,
        bio: data.bio || null,
        title: data.title || null,
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
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        title: data.title,
        imageUrl: data.imageUrl,
      }
    })

    revalidatePath('/dashboard')
    revalidatePath(`/${user.username}`)
    return { success: true, user }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function toggleUserVisibility(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
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
    revalidatePath(`/${updatedUser.username}`)
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Erro ao alterar visibilidade:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}
