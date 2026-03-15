"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NewsletterBlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
}

export function NewsletterBlock({
  title = "Fique por dentro!",
  description = "Assine minha newsletter para receber novidades direto no seu e-mail.",
  buttonText = "ASSINAR",
  placeholder = "seu@email.com",
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      // Aqui integrariam com Resend/Mailchimp futuramente
      // Simulando delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setIsSubscribed(true);
      toast.success("Inscrito com sucesso!");
    } catch {
      toast.error("Erro ao assinar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="w-full bg-emerald-100 border-4 border-foreground p-6 shadow-neo animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center gap-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          <h3 className="font-black uppercase text-xl">VOCÊ ESTÁ INSCRITO!</h3>
          <p className="font-bold opacity-80">Obrigado pelo suporte.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-4 border-foreground p-6 shadow-neo">
      <div className="mb-4">
        <h3 className="font-black uppercase text-xl italic tracking-tighter">{title}</h3>
        <p className="font-bold opacity-70 text-sm">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input 
          type="email" 
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-4 border-foreground h-12 font-bold focus-visible:ring-0 shadow-neo-sm"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="h-12 bg-primary text-white font-black uppercase border-4 border-foreground shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all"
        >
          {isLoading ? "ENVIANDO..." : (
            <span className="flex items-center gap-2">
              {buttonText} <Send className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
