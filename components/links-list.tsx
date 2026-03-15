"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Link,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  GripVertical,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  toggleLinkStatus,
  deleteLink,
  reorderLinks,
} from "@/app/actions/links";
import { toast } from "sonner";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  order: number;
}

interface LinksListProps {
  links: LinkItem[];
}

export function LinksList({ links: initialLinks }: LinksListProps) {
  const [links, setLinks] = useState(initialLinks);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, startReordering] = useTransition();

  const setLinkLoading = (linkId: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [linkId]: loading }));
  };

  const handleToggleStatus = async (linkId: string) => {
    setLinkLoading(linkId, true);
    try {
      const result = await toggleLinkStatus(linkId);
      if (result.success) {
        setLinks(
          links.map((link) =>
            link.id === linkId ? { ...link, isActive: !link.isActive } : link,
          ),
        );
        toast.success("Status do link atualizado");
      } else {
        toast.error(result.error || "Erro ao atualizar link");
      }
    } catch {
      toast.error("Erro inesperado");
    } finally {
      setLinkLoading(linkId, false);
    }
  };

  const handleDeleteLink = async () => {
    if (!linkToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteLink(linkToDelete);
      if (result.success) {
        setLinks(links.filter((link) => link.id !== linkToDelete));
        toast.success("Link removido com sucesso");
      } else {
        toast.error(result.error || "Erro ao remover link");
      }
    } catch {
      toast.error("Erro inesperado");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    }
  };

  const openDeleteDialog = (linkId: string) => {
    setLinkToDelete(linkId);
    setDeleteDialogOpen(true);
  };

  const moveLink = (linkId: string, direction: "up" | "down") => {
    const currentIndex = links.findIndex((link) => link.id === linkId);
    if (currentIndex === -1) {
      return;
    }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= links.length) {
      return;
    }

    const previousLinks = links;
    const nextLinks = [...links];
    const [movedLink] = nextLinks.splice(currentIndex, 1);
    nextLinks.splice(targetIndex, 0, movedLink);
    setLinks(nextLinks);

    startReordering(async () => {
      const result = await reorderLinks(nextLinks.map((link) => link.id));

      if (!result.success) {
        setLinks(previousLinks);
        toast.error(result.error || "Erro ao reordenar links");
        return;
      }

      toast.success("Ordem dos links atualizada");
    });
  };

  return (
    <>
      <div className="space-y-6">
        {links.map((link, index) => {
          const controlsDisabled =
            loadingStates[link.id] ||
            Object.values(loadingStates).some(Boolean) ||
            isDeleting ||
            isReordering;

          return (
            <Card
              key={link.id}
              className="group border-4 border-foreground shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center space-x-6 flex-1 min-w-0">
                    <div className="p-2 border-2 border-foreground bg-muted shadow-neo-sm">
                      <GripVertical className="h-6 w-6 text-foreground" />
                    </div>

                    <div className="w-16 h-16 bg-secondary border-4 border-foreground flex items-center justify-center shadow-neo shrink-0 transition-transform duration-100 group-hover:-rotate-3">
                      {link.icon ? (
                        <span className="text-3xl transition-transform duration-100 group-hover:scale-110">{link.icon}</span>
                      ) : (
                        <Link className="h-8 w-8 text-foreground transition-transform duration-100 group-hover:scale-110" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black uppercase tracking-tight truncate">
                          {link.title}
                        </h3>
                        <Badge
                          variant={link.isActive ? "default" : "secondary"}
                        >
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
                      <p className="text-sm font-bold opacity-60 truncate">
                        {link.url}
                      </p>
                      {link.description && (
                        <p className="text-sm font-medium mt-1 opacity-80 line-clamp-1">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </div>

                    <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 border-2"
                        disabled={controlsDisabled || index === 0}
                        onClick={() => moveLink(link.id, "up")}
                      >
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 border-2"
                        disabled={controlsDisabled || index === links.length - 1}
                        onClick={() => moveLink(link.id, "down")}
                      >
                        <ArrowDown className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 bg-muted border-2 border-foreground p-2 shadow-neo-sm h-12 transition-all duration-100 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none">
                      <span className="text-[10px] font-black uppercase tracking-tighter ml-1">
                        Status
                      </span>
                      <Switch
                        checked={link.isActive}
                        onCheckedChange={() => handleToggleStatus(link.id)}
                        disabled={controlsDisabled}
                      />
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="w-12 h-12 border-2"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-12 h-12 border-2"
                          disabled={controlsDisabled}
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-4 border-foreground p-2 shadow-neo"
                      >
                        <DropdownMenuItem
                          asChild
                          className="font-black uppercase text-xs focus:bg-primary focus:text-white p-3 cursor-pointer"
                        >
                          <a href={`/dashboard/links/${link.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(link.id)}
                          className="font-black uppercase text-xs text-red-600 focus:bg-red-600 focus:text-white p-3 cursor-pointer"
                          disabled={controlsDisabled}
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
          );
        })}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Link</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este link? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLink}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
