'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Smile } from 'lucide-react'

// Lista de emojis/ícones populares para links
const POPULAR_ICONS = [
  '🌐', '📱', '💻', '📧', '📞', '📍',
  '🎵', '🎥', '📸', '🎨', '✍️', '📝',
  '🛒', '💼', '🎓', '🏠', '❤️', '⭐',
  '🔗', '📊', '📈', '💡', '🚀', '🎯',
  '👤', '👥', '🌟', '🔥', '💎', '🎪',
  '📚', '🎮', '🏆', '🎁', '🌈', '☀️',
  '🌙', '⚡', '🎭', '🎪', '🎨', '🎯',
  '📢', '📣', '📻', '📺', '🎬', '🎤'
]

interface IconSelectorProps {
  value?: string
  onChange: (value: string) => void
  name: string
}

export function IconSelector({ value = '', onChange, name }: IconSelectorProps) {
  const [hasIcon, setHasIcon] = useState(!!value)
  const [selectedIcon, setSelectedIcon] = useState(value)
  const [customIcon, setCustomIcon] = useState(value && !POPULAR_ICONS.includes(value) ? value : '')

  const handleIconToggle = (checked: boolean) => {
    setHasIcon(checked)
    if (!checked) {
      setSelectedIcon('')
      setCustomIcon('')
      onChange('')
    }
  }

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
    setCustomIcon('')
    onChange(icon)
  }

  const handleCustomIconChange = (icon: string) => {
    setCustomIcon(icon)
    setSelectedIcon('')
    onChange(icon)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="has-icon"
          checked={hasIcon}
          onCheckedChange={handleIconToggle}
        />
        <Label htmlFor="has-icon">Adicionar ícone ao link</Label>
      </div>

      {hasIcon && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 w-16">
                  {selectedIcon || customIcon || <Smile className="h-4 w-4" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Escolha um ícone</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {POPULAR_ICONS.map((icon) => (
                      <Button
                        key={icon}
                        variant={selectedIcon === icon ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleIconSelect(icon)}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex-1">
              <Input
                placeholder="Ou digite um emoji personalizado"
                value={customIcon}
                onChange={(e) => handleCustomIconChange(e.target.value)}
                maxLength={2}
                className="text-center"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Clique no botão para escolher um ícone popular ou digite um emoji personalizado
          </p>

          {/* Hidden input para o formulário */}
          <input
            type="hidden"
            name={name}
            value={selectedIcon || customIcon}
          />
        </div>
      )}

      {!hasIcon && (
        <input
          type="hidden"
          name={name}
          value=""
        />
      )}
    </div>
  )
}
