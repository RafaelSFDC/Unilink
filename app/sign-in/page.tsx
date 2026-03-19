import { SignInForm } from "@/components/auth/sign-in-form";

interface SignInPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirectTo } = await searchParams;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff3b0_0%,#f5f1ff_45%,#d7f9f1_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md border-4 border-foreground bg-background p-8 shadow-neo-lg">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Better Auth</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Entrar</h1>
          <p className="text-sm font-bold uppercase opacity-60">
            Acesse seu painel para continuar editando sua pagina.
          </p>
        </div>
        <SignInForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
