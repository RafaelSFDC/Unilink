'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { DEFAULT_THEME } from '@/lib/theme'
import { getAuthSession } from '@/lib/auth-session'
import { themeInputSchema } from '@/lib/contracts'

export async function updateTheme(userId: string, data: unknown) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return { success: false, error: 'Não autorizado' }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { theme: true }
    })

    if (!user || user.id !== session.user.id) {
      return { success: false, error: 'Usuário não encontrado' }
    }

    const parsed = themeInputSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'Configuração de tema inválida.' }
    }

    const input = parsed.data
    const themeData = {
      template: input.template || 'default',
      backgroundColor: input.backgroundColor,
      textColor: input.textColor,
      linkColor: input.linkColor,
      buttonStyle: input.buttonStyle,
      fontFamily: input.fontFamily,
      backgroundType: input.backgroundType,
      gradientFrom: input.backgroundType === 'gradient' ? input.gradientFrom || null : null,
      gradientTo: input.backgroundType === 'gradient' ? input.gradientTo || null : null,
      motionPreset: input.motionPreset,
      interactionPreset: input.interactionPreset,
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

    const defaultTheme = {
      template: DEFAULT_THEME.template,
      backgroundColor: DEFAULT_THEME.backgroundColor,
      textColor: DEFAULT_THEME.textColor,
      linkColor: DEFAULT_THEME.linkColor,
      buttonStyle: DEFAULT_THEME.buttonStyle,
      fontFamily: DEFAULT_THEME.fontFamily,
      backgroundType: DEFAULT_THEME.backgroundType,
      gradientFrom: DEFAULT_THEME.gradientFrom,
      gradientTo: DEFAULT_THEME.gradientTo,
      motionPreset: DEFAULT_THEME.motionPreset,
      interactionPreset: DEFAULT_THEME.interactionPreset,
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
