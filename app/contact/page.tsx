import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-accent text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <MessageCircle className="w-4 h-4 mr-2 fill-current" />
            VAMOS CONVERSAR
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            DIGA UM
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              HELLO!
            </span>
          </h1>

          <p className="text-2xl lg:text-3xl font-bold max-w-4xl leading-tight uppercase tracking-tighter opacity-80">
            DÚVIDAS, SUGESTÕES OU APENAS QUER FALAR SOBRE DESIGN BRUTAL? NOSSA
            EQUIPE ESTÁ PRONTA PARA ATENDER VOCÊ RAPIDAMENTE.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="reveal animate-stagger-1">
            <Card className="border-8 border-foreground shadow-neo-lg bg-white rounded-none overflow-hidden">
              <CardHeader className="bg-foreground text-background p-10 border-b-8 border-foreground">
                <CardTitle className="text-4xl font-black uppercase tracking-tighter italic">
                  ENVIE SUA MENSAGEM
                </CardTitle>
                <CardDescription className="text-lg font-bold uppercase opacity-60">
                  RESPOSTAS RÁPIDAS E DIRETAS AO PONTO
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xl font-black uppercase tracking-tighter">
                      NOME
                    </label>
                    <Input
                      placeholder="SEU NOME BRUTAL"
                      className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xl font-black uppercase tracking-tighter">
                      EMAIL
                    </label>
                    <Input
                      type="email"
                      placeholder="SEU@EMAIL.COM"
                      className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-black uppercase tracking-tighter">
                    ASSUNTO
                  </label>
                  <Input
                    placeholder="COMO PODEMOS AJUDAR?"
                    className="h-16 border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-black uppercase tracking-tighter">
                    MENSAGEM
                  </label>
                  <Textarea
                    placeholder="DIGITE SUA MENSAGEM AQUI..."
                    rows={6}
                    className="border-4 border-foreground shadow-neo text-lg font-bold uppercase placeholder:opacity-30 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all"
                  />
                </div>

                <Button className="w-full h-20 text-2xl font-black uppercase tracking-tighter bg-primary text-white border-4 border-foreground shadow-neo-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                  <Send className="w-8 h-8 mr-4 stroke-3" />
                  ENVIAR AGORA
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            {/* Contact Methods */}
            <div className="grid gap-8">
              {[
                {
                  label: "Email",
                  value: "contato@unilink.io",
                  icon: Mail,
                  color: "bg-emerald-400",
                  sub: "RESPOSTA EM ATÉ 24H",
                },
                {
                  label: "Telefone",
                  value: "+55 (11) 9999-9999",
                  icon: Phone,
                  color: "bg-red-400",
                  sub: "SEG A SEX, 9H ÀS 18H",
                },
                {
                  label: "Local",
                  value: "SÃO PAULO, BRASIL",
                  icon: MapPin,
                  color: "bg-yellow-400",
                  sub: "ATENDIMENTO GLOBAL",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-8 border-4 border-foreground bg-white shadow-neo hover:-rotate-1 transition-transform"
                >
                  <div
                    className={`w-16 h-16 ${item.color} border-4 border-foreground flex items-center justify-center shadow-neo rotate-[-5deg]`}
                  >
                    <item.icon className="w-8 h-8 text-white stroke-3" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">
                      {item.label}
                    </h3>
                    <div className="text-2xl font-black uppercase tracking-tighter">
                      {item.value}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-40">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="p-10 border-4 border-foreground bg-accent shadow-neo relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/10 rotate-45 translate-x-16 -translate-y-16" />
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 italic relative z-10">
                REDES BRUTAIS
              </h3>
              <div className="flex flex-wrap gap-6 relative z-10">
                {[
                  { icon: Twitter, color: "bg-blue-400", label: "Twitter" },
                  { icon: Instagram, color: "bg-pink-400", label: "Instagram" },
                  { icon: Linkedin, color: "bg-blue-600", label: "LinkedIn" },
                  { icon: Github, color: "bg-gray-800", label: "GitHub" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-16 h-16 ${s.color} border-4 border-foreground shadow-neo flex items-center justify-center hover:scale-110 transition-transform`}
                    aria-label={s.label}
                  >
                    <s.icon className="w-8 h-8 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Support Message */}
            <div className="bg-primary p-10 border-4 border-foreground shadow-neo text-white rotate-1">
              <div className="flex items-center gap-6 mb-4">
                <Heart className="w-12 h-12 fill-white" />
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  SUPORTE REAL
                </h3>
              </div>
              <p className="font-bold uppercase tracking-tight leading-tight">
                NÃO SOMOS ROBÔS. SOMOS CRIADORES COMO VOCÊ. CADA TICKER É LIDO E
                RESPONDIDO COM ATENÇÃO TOTAL.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
