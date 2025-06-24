'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createUser } from '@/app/actions/user'
import { toast } from 'sonner'

interface OnboardingFormProps {
  clerkId: string
  email: string
  firstName: string
  lastName: string
  imageUrl: string
}

export function OnboardingForm({ clerkId, email, firstName, lastName, imageUrl }: OnboardingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createUser({
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
        title: formData.get('title') as string,
      })

      if (result.success) {
        toast.success('Perfil criado com sucesso!')
        router.push('/dashboard')
      } else {
        // Mostrar erro específico retornado pela action
        toast.error(result.error || 'Erro ao criar perfil')
      }
    } catch (error) {
      console.error('Erro no formulário:', error)
      toast.error('Erro inesperado ao criar perfil. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="username">Nome de usuário</Label>
        <Input
          id="username"
          name="username"
          placeholder="seunome"
          required
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Seu link será: unilink.com/seunome
        </p>
      </div>

      <div>
        <Label htmlFor="title">Título/Profissão</Label>
        <Input
          id="title"
          name="title"
          placeholder="Desenvolvedor, Designer, etc."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Conte um pouco sobre você..."
          rows={3}
          className="mt-1"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Criando perfil...' : 'Criar meu perfil'}
      </Button>
    </form>
  )
}
