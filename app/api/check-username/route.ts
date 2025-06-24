import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'Username é obrigatório' }, { status: 400 })
    }

    // Verificar se o username já existe (excluindo o usuário atual)
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId }
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
