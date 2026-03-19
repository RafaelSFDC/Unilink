"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm({
      name,
      email,
      subject,
      message,
    });

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error || "Não foi possível enviar sua mensagem.");
      return;
    }

    if (result.delivery === "mailto" && result.mailtoUrl) {
      window.location.href = result.mailtoUrl;
      toast.success("Abrimos seu app de email para finalizar o envio.");
      return;
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    toast.success("Mensagem enviada com sucesso!");
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label
            htmlFor="contact-name"
            className="text-xl font-black uppercase tracking-tighter"
          >
            Nome
          </label>
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="SEU NOME BRUTAL"
            autoComplete="name"
            required
            className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="contact-email"
            className="text-xl font-black uppercase tracking-tighter"
          >
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="SEU@EMAIL.COM"
            autoComplete="email"
            required
            className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="contact-subject"
          className="text-xl font-black uppercase tracking-tighter"
        >
          Assunto
        </label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="COMO PODEMOS AJUDAR?"
          required
          className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="contact-message"
          className="text-xl font-black uppercase tracking-tighter"
        >
          Mensagem
        </label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="DIGITE SUA MENSAGEM AQUI..."
          rows={6}
          required
          className="border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-20 text-2xl font-black uppercase tracking-tighter bg-primary text-white border-4 border-foreground shadow-neo-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
      >
        <Send className="w-8 h-8 mr-4 stroke-3" />
        {isSubmitting ? "ENVIANDO..." : "ENVIAR AGORA"}
      </Button>
    </form>
  );
}
