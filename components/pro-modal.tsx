"use client";

import { Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProModal({ isOpen, onClose }: ProModalProps) {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-4 border-foreground shadow-neo-lg bg-white rotate-1">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center -mt-10">
            <div className="bg-primary p-4 border-4 border-foreground shadow-neo rotate-[-5deg]">
              <Zap className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-center">
            Precisa de mais?
          </DialogTitle>
          <DialogDescription className="text-center font-bold text-foreground">
            Desbloqueie templates premium, analytics avancados e mais controle visual com o plano PRO.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {[
            "Templates premium para sua pagina",
            "Analytics avancados com mais contexto",
            "Personalizacao extra de visual e experiencia",
            "Remocao da marca Unilink",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 p-3 border-2 border-foreground bg-muted shadow-neo-sm"
            >
              <Check className="h-5 w-5 text-green-500 stroke-3" />
              <span className="text-xs font-black uppercase">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase text-lg border-4 border-foreground shadow-neo cursor-pointer transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            onClick={() => {
              router.push("/dashboard/billing");
              onClose();
            }}
          >
            Assinar por R$ 10/mês
          </Button>
          <Button
            variant="ghost"
            className="font-bold uppercase text-xs opacity-50"
            onClick={onClose}
          >
            Talvez depois
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
