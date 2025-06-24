'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  Link, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink, 
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react'
import { toggleLinkStatus, deleteLink, reorderLinks } from '@/app/actions/links'
import { toast } from 'sonner'

interface LinkItem {
  id: string
  title: string
  url: string
  description: string | null
  icon: string | null
  isActive: boolean
  order: number
}

interface LinksListProps {
  links: LinkItem[]
}

export function LinksList({ links: initialLinks }: LinksListProps) {
  const [links, setLinks] = useState(initialLinks)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async (linkId: string) => {
    setIsLoading(true)
    try {
      const result = await toggleLinkStatus(linkId)
      if (result.success) {
        setLinks(links.map(link => 
          link.id === linkId 
            ? { ...link, isActive: !link.isActive }
            : link
        ))
        toast.success('Status do link atualizado')
      } else {
        toast.error(result.error || 'Erro ao atualizar link')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteLink = async () => {
    if (!linkToDelete) return
    
    setIsLoading(true)
    try {
      const result = await deleteLink(linkToDelete)
      if (result.success) {
        setLinks(links.filter(link => link.id !== linkToDelete))
        toast.success('Link removido com sucesso')
      } else {
        toast.error(result.error || 'Erro ao remover link')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setLinkToDelete(null)
    }
  }

  const openDeleteDialog = (linkId: string) => {
    setLinkToDelete(linkId)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    {link.icon ? (
                      <span className="text-xl">{link.icon}</span>
                    ) : (
                      <Link className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {link.title}
                      </h3>
                      <Badge variant={link.isActive ? 'default' : 'secondary'}>
                        {link.isActive ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Ativo
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Inativo
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {link.url}
                    </p>
                    {link.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={link.isActive}
                    onCheckedChange={() => handleToggleStatus(link.id)}
                    disabled={isLoading}
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <a href={`/dashboard/links/${link.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => openDeleteDialog(link.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Link</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este link? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteLink}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Removendo...' : 'Remover'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
