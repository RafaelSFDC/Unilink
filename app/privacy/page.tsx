import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-emerald-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm -rotate-1 w-fit">
            <Shield className="w-4 h-4 mr-2" />
            PROTEÇÃO TOTAL
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            SUA PRIVACIDADE
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              É SAGRADA
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
              NO UNILINK, LEVAMOS SUA PRIVACIDADE MUITO A SÉRIO. ESTA POLÍTICA
              EXPLICA COMO COLETAMOS, USAMOS E PROTEGEMOS SEUS DADOS COM
              SEGURANÇA MÁXIMA.
            </p>
            <div className="bg-foreground text-background p-4 border-4 border-foreground shadow-neo -rotate-1 shrink-0">
              <p className="text-xs font-black uppercase tracking-widest">
                ÚLTIMA ATUALIZAÇÃO
              </p>
              <p className="text-lg font-black uppercase tracking-tighter">
                24 JUN 2024
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-4 border-foreground shadow-neo bg-purple-100 rounded-none overflow-hidden hover:rotate-1 transition-transform">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 rotate-3">
                  <Lock className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  SEGURANÇA PRIMEIRO
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  CRIPTOGRAFIA DE PONTA E MELHORES PRÁTICAS DO MERCADO.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-emerald-100 rounded-none overflow-hidden hover:-rotate-1 transition-transform">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 -rotate-3">
                  <Eye className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  TRANSPARÊNCIA TOTAL
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  VOCÊ SABE TUDO O QUE COLETAMOS E COMO USAMOS.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-blue-100 rounded-none overflow-hidden hover:rotate-1 transition-transform">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 rotate-2">
                  <UserCheck className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  CONTROLE TOTAL
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  SEUS DADOS SÃO SEUS. EDITE, EXPORTE OU DELETE QUANDO QUISER.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Details Section */}
        <div className="max-w-5xl mx-auto space-y-16">
          {[
            {
              title: "QUAIS DADOS COLETAMOS",
              icon: Database,
              color: "bg-blue-400",
              items: [
                {
                  subtitle: "INFORMAÇÕES DE CONTA",
                  text: "NOME, EMAIL, FOTO DE PERFIL E DADOS DE AUTENTICAÇÃO (GOOGLE, GITHUB).",
                },
                {
                  subtitle: "DADOS DE USO",
                  text: "COMO VOCÊ INTERAGE COM O UNILINK. PÁGINAS, CLIQUES E TEMPO (ANONIMIZADOS).",
                },
                {
                  subtitle: "CONTEÚDO CRIADO",
                  text: "LINKS, BIOS, TEMAS E TUDO QUE VOCÊ ADICIONA À SUA PÁGINA.",
                },
              ],
            },
            {
              title: "COMO USAMOS SEUS DADOS",
              icon: Shield,
              color: "bg-emerald-400",
              items: [
                {
                  subtitle: "PROVER O SERVIÇO",
                  text: "MANTER SUA PÁGINA NO AR, PROCESSAR ANALYTICS E DAR SUPORTE.",
                },
                {
                  subtitle: "MELHORIAS",
                  text: "USAMOS DADOS TÉCNICOS PARA EVOLUIR NOSSOS RECURSOS.",
                },
                {
                  subtitle: "COMUNICAÇÃO",
                  text: "EMAILS CRÍTICOS DE CONTA E NOVIDADES (CASO VOCÊ QUEIRA).",
                },
              ],
            },
          ].map((section, i) => (
            <div key={i} className="reveal">
              <div className="flex items-center gap-6 mb-8">
                <div
                  className={`w-20 h-20 ${section.color} border-4 border-foreground shadow-neo flex items-center justify-center -rotate-3`}
                >
                  <section.icon className="w-10 h-10 text-white stroke-3" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                  {section.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {section.items.map((item, idx) => (
                  <Card
                    key={idx}
                    className="border-4 border-foreground shadow-neo bg-white rounded-none p-8"
                  >
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 italic">
                      {item.subtitle}
                    </h3>
                    <p className="font-bold uppercase tracking-tight opacity-70 leading-tight">
                      {item.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Special Notice */}
          <div className="bg-emerald-400 p-10 border-4 border-foreground shadow-neo rotate-1 flex items-center gap-8">
            <div className="w-24 h-24 bg-white border-4 border-foreground shadow-neo shrink-0 flex items-center justify-center -rotate-5">
              <Shield className="w-12 h-12 text-emerald-400 stroke-3" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">
                PROMESSA BRUTAL
              </h3>
              <p className="text-xl font-bold uppercase tracking-tight leading-tight">
                NÓS NUNCA, SOB NENHUMA HIPÓTESE, VENDEMOS SEUS DADOS PESSOAIS
                PARA TERCEIROS. PONTO FINAL.
              </p>
            </div>
          </div>

          {/* Rights & Security */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-4 border-foreground shadow-neo bg-blue-100 rounded-none p-10">
              <div className="flex items-center gap-4 mb-8">
                <UserCheck className="w-10 h-10 text-foreground stroke-3" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  SEUS DIREITOS
                </h3>
              </div>
              <ul className="grid grid-cols-2 gap-6">
                {["ACESSO", "CORREÇÃO", "EXPORTAÇÃO", "EXCLUSÃO"].map(
                  (right, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-4 border-4 border-foreground shadow-neo text-center font-black uppercase tracking-tighter rotate-1"
                    >
                      {right}
                    </li>
                  ),
                )}
              </ul>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-purple-100 rounded-none p-10 -rotate-1">
              <div className="flex items-center gap-4 mb-8">
                <Lock className="w-10 h-10 text-foreground stroke-3" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  SEGURANÇA
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 border-4 border-foreground shadow-neo">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary italic mb-2">
                    CRIPTOGRAFIA
                  </h4>
                  <p className="font-bold uppercase tracking-tight leading-none">
                    DADOS PROTEGIDOS EM TRÂNSITO E EM REPOUSO.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Banner */}
          <Card className="border-8 border-foreground shadow-neo bg-primary text-white rounded-none p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <Mail className="w-20 h-20 mx-auto mb-8 stroke-3 rotate-12 relative z-10" />
            <h3 className="text-5xl font-black uppercase tracking-tighter italic mb-4 relative z-10">
              DÚVIDAS?
            </h3>
            <p className="text-2xl font-bold uppercase tracking-tight mb-8 max-w-2xl mx-auto relative z-10">
              SE VOCÊ TIVER DÚVIDAS SOBRE PRIVACIDADE, ENTRE EM CONTATO COM
              NOSSO TIME.
            </p>
            <div className="inline-block bg-foreground text-background px-8 py-4 border-4 border-foreground shadow-neo -rotate-2 relative z-10">
              <p className="text-2xl font-black tracking-tighter whitespace-nowrap">
                PRIVACIDADE@UNILINK.IO
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
