import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUsername } from '@/lib/form-utils'
import { getAuthSession } from '@/lib/auth-session'

export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')?.trim().toLowerCase()

    if (!username) {
      return NextResponse.json({ error: 'Username é obrigatório' }, { status: 400 })
    }

    const usernameError = validateUsername(username)
    if (usernameError) {
      return NextResponse.json({
        available: false,
        message: usernameError,
      })
    }

    // Verificar se o username já existe (excluindo o usuário atual)
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    const isAvailable = !existingUser || (currentUser && existingUser.id === currentUser.id)

    return NextResponse.json({ 
      available: isAvailable,
      message: isAvailable ? 'Username disponível' : 'Username já está em uso'
    })
  } catch (error) {
    console.error('Erro ao verificar username:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
