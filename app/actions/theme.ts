'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface UpdateThemeData {
  backgroundColor: string
  textColor: string
  linkColor: string
  buttonStyle: string
  fontFamily: string
  backgroundType: string
  gradientFrom?: string
  gradientTo?: string
}

export async function updateTheme(userId: string, data: UpdateThemeData) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        clerkId 
      },
      include: { theme: true }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const themeData = {
      backgroundColor: data.backgroundColor,
      textColor: data.textColor,
      linkColor: data.linkColor,
      buttonStyle: data.buttonStyle,
      fontFamily: data.fontFamily,
      backgroundType: data.backgroundType,
      gradientFrom: data.backgroundType === 'gradient' ? data.gradientFrom : null,
      gradientTo: data.backgroundType === 'gradient' ? data.gradientTo : null,
    }

    let theme
    if (user.theme) {
      // Atualizar tema existente
      theme = await prisma.theme.update({
        where: { userId: user.id },
        data: themeData
      })
    } else {
      // Criar novo tema
      theme = await prisma.theme.create({
        data: {
          ...themeData,
          userId: user.id
        }
      })
    }

    revalidatePath('/dashboard/theme')
    revalidatePath(`/${user.username}`)
    return { success: true, theme }
  } catch (error) {
    console.error('Erro ao atualizar tema:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function resetTheme(userId: string) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        clerkId 
      }
    })

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const defaultTheme = {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      linkColor: '#1a73e8',
      buttonStyle: 'rounded',
      fontFamily: 'Inter',
      backgroundType: 'solid',
      gradientFrom: null,
      gradientTo: null,
    }

    const theme = await prisma.theme.upsert({
      where: { userId: user.id },
      update: defaultTheme,
      create: {
        ...defaultTheme,
        userId: user.id
      }
    })

    revalidatePath('/dashboard/theme')
    revalidatePath(`/${user.username}`)
    return { success: true, theme }
  } catch (error) {
    console.error('Erro ao resetar tema:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}
