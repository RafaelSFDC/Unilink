'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { updateUser, toggleUserVisibility } from '@/app/actions/user'
import { toast } from 'sonner'
import { Check, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false)
  const [username, setUsername] = useState(user.username)
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean
    available: boolean | null
    message: string
  }>({
    checking: false,
    available: null,
    message: ''
  })

  const checkUsername = useCallback(async (usernameToCheck: string) => {
    if (!usernameToCheck.trim() || usernameToCheck === user.username) {
      setUsernameStatus({
        checking: false,
        available: null,
        message: ''
      })
      return
    }

    setUsernameStatus(prev => ({ ...prev, checking: true }))

    try {
      const response = await fetch(`/api/check-username?username=${encodeURIComponent(usernameToCheck)}`)
      const data = await response.json()

      setUsernameStatus({
        checking: false,
        available: data.available,
        message: data.message
      })
    } catch (error) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Erro ao verificar disponibilidade'
      })
    }
  }, [user.username])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkUsername(username)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [username, checkUsername])

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
    setIsTogglingVisibility(true)
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
    } finally {
      setIsTogglingVisibility(false)
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
          <div className="relative">
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={cn(
                "mt-1 pr-24 transition-all duration-300",
                usernameStatus.checking && "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20",
                usernameStatus.available === true && "border-green-500 bg-green-50/50 dark:bg-green-950/20",
                usernameStatus.available === false && "border-red-500 bg-red-50/50 dark:bg-red-950/20"
              )}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {usernameStatus.checking && (
                <div className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-md">
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                    Verificando
                  </span>
                </div>
              )}
              {!usernameStatus.checking && usernameStatus.available === true && (
                <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-md">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-green-700 dark:text-green-300 font-medium">
                    Disponível
                  </span>
                </div>
              )}
              {!usernameStatus.checking && usernameStatus.available === false && (
                <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900 px-2 py-1 rounded-md">
                  <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                  <span className="text-xs text-red-700 dark:text-red-300 font-medium">
                    Indisponível
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <div className={cn(
              "text-sm p-3 rounded-lg border transition-all duration-300",
              usernameStatus.checking && "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800",
              usernameStatus.available === true && "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800",
              usernameStatus.available === false && "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 dark:from-red-950/20 dark:to-pink-950/20 dark:border-red-800",
              usernameStatus.available === null && "bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800"
            )}>
              <p className={cn(
                "font-medium",
                usernameStatus.checking && "text-blue-700 dark:text-blue-300",
                usernameStatus.available === true && "text-green-700 dark:text-green-300",
                usernameStatus.available === false && "text-red-700 dark:text-red-300",
                usernameStatus.available === null && "text-gray-700 dark:text-gray-300"
              )}>
                Seu link será: {process.env.NODE_ENV === 'production'
                  ? `https://unilink.com/${username}`
                  : `http://localhost:3000/${username}`}
              </p>
            </div>
            {usernameStatus.message && (
              <div className={cn(
                "text-sm p-2 rounded-md",
                usernameStatus.available === true && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                usernameStatus.available === false && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              )}>
                {usernameStatus.message}
              </div>
            )}
          </div>
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

        <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>

      <div className="border-t border-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 pt-6">
        <div className="bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Perfil Público
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quando ativo, seu perfil ficará visível para todos
              </p>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={handleToggleVisibility}
              disabled={isTogglingVisibility || isLoading}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
