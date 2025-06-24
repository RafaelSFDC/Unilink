'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateTheme } from '@/app/actions/theme'
import { toast } from 'sonner'

interface User {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  title: string | null
  theme: {
    id: string
    backgroundColor: string
    textColor: string
    linkColor: string
    buttonStyle: string
    fontFamily: string
    backgroundType: string
    backgroundImage: string | null
    gradientFrom: string | null
    gradientTo: string | null
  } | null
}

interface ThemeFormProps {
  user: User
}

export function ThemeForm({ user }: ThemeFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const theme = user.theme || {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    linkColor: '#1a73e8',
    buttonStyle: 'rounded',
    fontFamily: 'Inter',
    backgroundType: 'solid',
    backgroundImage: null,
    gradientFrom: null,
    gradientTo: null,
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    
    try {
      const data = {
        backgroundColor: formData.get('backgroundColor') as string,
        textColor: formData.get('textColor') as string,
        linkColor: formData.get('linkColor') as string,
        buttonStyle: formData.get('buttonStyle') as string,
        fontFamily: formData.get('fontFamily') as string,
        backgroundType: formData.get('backgroundType') as string,
        gradientFrom: formData.get('gradientFrom') as string,
        gradientTo: formData.get('gradientTo') as string,
      }

      const result = await updateTheme(user.id, data)

      if (result.success) {
        toast.success('Tema atualizado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao atualizar tema')
      }
    } catch (error) {
      toast.error('Erro inesperado ao atualizar tema')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="backgroundType">Tipo de Fundo</Label>
        <Select name="backgroundType" defaultValue={theme.backgroundType}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Cor Sólida</SelectItem>
            <SelectItem value="gradient">Gradiente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Cor de Fundo</Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input
            id="backgroundColor"
            name="backgroundColor"
            type="color"
            defaultValue={theme.backgroundColor}
            className="w-16 h-10 p-1 border rounded"
          />
          <Input
            type="text"
            defaultValue={theme.backgroundColor}
            className="flex-1"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gradientFrom">Gradiente - Cor Inicial</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="gradientFrom"
              name="gradientFrom"
              type="color"
              defaultValue={theme.gradientFrom || '#3b82f6'}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              defaultValue={theme.gradientFrom || '#3b82f6'}
              className="flex-1"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gradientTo">Gradiente - Cor Final</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="gradientTo"
              name="gradientTo"
              type="color"
              defaultValue={theme.gradientTo || '#8b5cf6'}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              defaultValue={theme.gradientTo || '#8b5cf6'}
              className="flex-1"
              placeholder="#8b5cf6"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="textColor">Cor do Texto</Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input
            id="textColor"
            name="textColor"
            type="color"
            defaultValue={theme.textColor}
            className="w-16 h-10 p-1 border rounded"
          />
          <Input
            type="text"
            defaultValue={theme.textColor}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="linkColor">Cor dos Links/Botões</Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input
            id="linkColor"
            name="linkColor"
            type="color"
            defaultValue={theme.linkColor}
            className="w-16 h-10 p-1 border rounded"
          />
          <Input
            type="text"
            defaultValue={theme.linkColor}
            className="flex-1"
            placeholder="#1a73e8"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="buttonStyle">Estilo dos Botões</Label>
        <Select name="buttonStyle" defaultValue={theme.buttonStyle}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rounded">Arredondado</SelectItem>
            <SelectItem value="square">Quadrado</SelectItem>
            <SelectItem value="pill">Pílula</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="fontFamily">Fonte</Label>
        <Select name="fontFamily" defaultValue={theme.fontFamily}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Open Sans">Open Sans</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Salvando...' : 'Salvar Tema'}
      </Button>
    </form>
  )
}
