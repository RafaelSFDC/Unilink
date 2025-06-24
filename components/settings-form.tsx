'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { updateUser, toggleUserVisibility } from '@/app/actions/user'
import { toast } from 'sonner'

interface User {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  email: string
  bio: string | null
  title: string | null
  isPublic: boolean
}

interface SettingsFormProps {
  user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(user.isPublic)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    
    try {
      const data = {
        username: formData.get('username') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        bio: formData.get('bio') as string,
        title: formData.get('title') as string,
      }

      // Validação básica
      if (!data.username.trim()) {
        toast.error('Nome de usuário é obrigatório')
        return
      }

      if (!data.firstName.trim()) {
        toast.error('Nome é obrigatório')
        return
      }

      const result = await updateUser(user.id, data)

      if (result.success) {
        toast.success('Perfil atualizado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      toast.error('Erro inesperado ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleVisibility() {
    try {
      const result = await toggleUserVisibility(user.id)
      
      if (result.success) {
        setIsPublic(!isPublic)
        toast.success(
          !isPublic 
            ? 'Perfil tornado público' 
            : 'Perfil tornado privado'
        )
      } else {
        toast.error(result.error || 'Erro ao alterar visibilidade')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    }
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Nome *</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={user.firstName || ''}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={user.lastName || ''}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="username">Nome de usuário *</Label>
          <Input
            id="username"
            name="username"
            defaultValue={user.username}
            required
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            Seu link será: /{user.username}
          </p>
        </div>

        <div>
          <Label htmlFor="title">Título/Profissão</Label>
          <Input
            id="title"
            name="title"
            placeholder="Desenvolvedor, Designer, etc."
            defaultValue={user.title || ''}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Conte um pouco sobre você..."
            defaultValue={user.bio || ''}
            rows={3}
            className="mt-1"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Perfil Público
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quando ativo, seu perfil ficará visível para todos
            </p>
          </div>
          <Switch
            checked={isPublic}
            onCheckedChange={handleToggleVisibility}
          />
        </div>
      </div>
    </div>
  )
}
