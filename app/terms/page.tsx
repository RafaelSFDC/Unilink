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
import {
  FileText,
  Scale,
  Shield,
  Users,
  AlertTriangle,
  Mail,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-left mb-16 border-b-8 border-foreground pb-16">
          <Badge className="mb-6 px-6 py-2 bg-emerald-400 text-white border-4 border-foreground shadow-neo font-black uppercase tracking-tighter text-sm rotate-1 w-fit">
            <Scale className="w-4 h-4 mr-2" />
            REGRAS DO JOGO
          </Badge>

          <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] mb-10 tracking-tighter uppercase italic">
            TERMOS DE
            <br />
            <span className="bg-primary text-white px-6 shadow-neo-lg -rotate-2 inline-block mt-4 not-italic border-4 border-foreground">
              USO
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-2xl lg:text-3xl font-bold max-w-3xl leading-tight uppercase tracking-tighter opacity-80">
              ESTES TERMOS ESTABELECEM AS REGRAS PARA O USO DO UNILINK. AO USAR
              NOSSO SERVIÇO, VOCÊ CONCORDA EM SER BRUTALMENTE HONESTO E SEGUIR
              NOSSAS DIRETRIZES.
            </p>
            <div className="bg-foreground text-background p-4 border-4 border-foreground shadow-neo rotate-1 shrink-0">
              <p className="text-xs font-black uppercase tracking-widest">
                ÚLTIMA ATUALIZAÇÃO
              </p>
              <p className="text-lg font-black uppercase tracking-tighter">
                24 JUN 2024
              </p>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-4 border-foreground shadow-neo bg-emerald-100 rounded-none overflow-hidden">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 -rotate-3">
                  <Users className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  USO RESPONSÁVEL
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  USE A PLATAFORMA DE FORMA ÉTICA E RESPEITE A COMUNIDADE.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-blue-100 rounded-none overflow-hidden">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 rotate-3">
                  <Shield className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  SEUS DIREITOS
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  VOCÊ É DONO DO SEU CONTEÚDO E PODE SAIR QUANDO QUISER.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-purple-100 rounded-none overflow-hidden">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-white border-4 border-foreground shadow-neo flex items-center justify-center mb-6 -rotate-2">
                  <FileText className="h-8 w-8 text-foreground stroke-3" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                  TRANSPARÊNCIA
                </CardTitle>
                <CardDescription className="text-sm font-bold uppercase opacity-60">
                  TERMORS CLAROS. SEM LETRAS MIÚDAS OU SURPRESAS RUINS.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Terms Content */}
        <div className="max-w-5xl mx-auto space-y-16">
          {[
            {
              id: "1",
              title: "ACEITAÇÃO DOS TERMOS",
              icon: Scale,
              color: "bg-emerald-400",
              content:
                "AO ACESSAR E USAR O UNILINK, VOCÊ ACEITA E CONCORDA EM FICAR VINCULADO AOS TERMOS E CONDIÇÕES DESTE ACORDO. SE VOCÊ NÃO CONCORDAR COM ALGUM DESTES TERMOS, NÃO USE NOSSO SERVIÇO. ESTES TERMOS SE APLICAM A TODOS OS VISITANTES, USUÁRIOS E OUTRAS PESSOAS QUE ACESSAM OU USAM O SERVIÇO.",
            },
            {
              id: "2",
              title: "DESCRIÇÃO DO SERVIÇO",
              icon: FileText,
              color: "bg-blue-400",
              content:
                "O UNILINK É UMA PLATAFORMA QUE PERMITE AOS USUÁRIOS CRIAR PÁGINAS PERSONALIZADAS PARA ORGANIZAR E COMPARTILHAR LINKS IMPORTANTES.",
              list: [
                "CRIAÇÃO DE PÁGINAS DE LINKS PERSONALIZADAS",
                "FERRAMENTAS DE PERSONALIZAÇÃO (CORES, FONTES, LAYOUT)",
                "ANALYTICS DE VISUALIZAÇÕES E CLIQUES",
                "GERENCIAMENTO DE LINKS E CONTEÚDO",
                "HOSPEDAGEM E MANUTENÇÃO DA PLATAFORMA",
              ],
            },
            {
              id: "3",
              title: "CONTAS DE USUÁRIO",
              icon: Users,
              color: "bg-purple-400",
              sections: [
                {
                  subtitle: "CRIAÇÃO DE CONTA",
                  text: "VOCÊ DEVE FORNECER INFORMAÇÕES PRECISAS E ATUALIZADAS. VOCÊ É RESPONSÁVEL POR MANTER A CONFIDENCIALIDADE DE SUA CONTA.",
                },
                {
                  subtitle: "RESPONSABILIDADE",
                  text: "VOCÊ É RESPONSÁVEL POR TODAS AS ATIVIDADES QUE OCORREM EM SUA CONTA.",
                },
                {
                  subtitle: "IDADE MÍNIMA",
                  text: "VOCÊ DEVE TER PELO MENOS 13 ANOS PARA USAR O UNILINK.",
                },
              ],
            },
            {
              id: "4",
              title: "USO ACEITÁVEL",
              icon: Shield,
              color: "bg-red-400",
              content:
                "VOCÊ CONCORDA EM USAR O UNILINK APENAS PARA FINS LEGAIS. VOCÊ NÃO PODE:",
              list: [
                "VIOLAR QUALQUER LEI LOCAL OU INTERNACIONAL",
                "TRANSMITIR MATERIAL DIFAMATÓRIO OU OFENSIVO",
                "ASSEDIAR OU PREJUDICAR OUTRAS PESSOAS",
                "DISTRIBUIR SPAM OU CONTEÚDO MALICIOSO",
                "VIOLAR DIREITOS DE PROPRIEDADE INTELECTUAL",
                "TENTAR HACKEAR NOSSOS SISTEMAS",
              ],
            },
          ].map((item, i) => (
            <div key={i} className="reveal">
              <div className="flex items-center gap-6 mb-8 group">
                <div
                  className={`w-20 h-20 ${item.color} border-4 border-foreground shadow-neo flex items-center justify-center group-hover:rotate-12 transition-transform`}
                >
                  <item.icon className="w-10 h-10 text-white stroke-3" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">
                  {item.id}. {item.title}
                </h2>
              </div>

              <Card className="border-4 border-foreground shadow-neo bg-white rounded-none p-10">
                <CardContent className="p-0 space-y-6">
                  {item.content && (
                    <p className="text-xl font-bold uppercase tracking-tight leading-relaxed opacity-80">
                      {item.content}
                    </p>
                  )}

                  {item.list && (
                    <ul className="space-y-4">
                      {item.list.map((li, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-4 text-lg font-black uppercase tracking-tighter"
                        >
                          <div className="w-3 h-3 bg-foreground rotate-45 shrink-0" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.sections && (
                    <div className="grid md:grid-cols-3 gap-8">
                      {item.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-sm font-black uppercase tracking-widest text-primary italic">
                            {sec.subtitle}
                          </h3>
                          <p className="text-lg font-bold uppercase tracking-tight opacity-70">
                            {sec.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Limitation & Disclaimers */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-4 border-foreground shadow-neo bg-yellow-400 rounded-none p-10 rotate-1">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-10 h-10 text-foreground stroke-3" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  LIMITAÇÕES
                </h3>
              </div>
              <p className="font-bold uppercase tracking-tight leading-tight mb-4">
                O UNILINK É FORNECIDO &ldquo;COMO ESTÁ&rdquo;. NÃO GARANTIMOS QUE O SERVIÇO
                SERÁ 100% LIVRE DE ERROS.
              </p>
              <p className="text-sm font-black uppercase opacity-60">
                NÃO SOMOS RESPONSÁVEIS POR DANOS INDIRETOS OU PERDA DE DADOS.
              </p>
            </Card>

            <Card className="border-4 border-foreground shadow-neo bg-foreground text-background rounded-none p-10 -rotate-1">
              <div className="flex items-center gap-4 mb-6">
                <Mail className="w-10 h-10 stroke-3" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  DÚVIDAS?
                </h3>
              </div>
              <p className="font-bold uppercase tracking-tight leading-tight mb-6">
                SE VOCÊ TIVER DÚVIDAS SOBRE NOSSOS TERMOS, MANDE UM EMAIL PARA O
                NOSSO TIME JURÍDICO.
              </p>
              <div className="space-y-1">
                <p className="text-xl font-black tracking-tighter">
                  LEGAL@UNILINK.COM
                </p>
                <p className="text-xs font-black opacity-50 uppercase tracking-widest">
                  SÃO PAULO, BRASIL
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
