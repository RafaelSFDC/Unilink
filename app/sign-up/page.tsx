import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#d7f9f1_0%,#fff4d6_50%,#ffd6d6_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg border-4 border-foreground bg-background p-8 shadow-neo-lg">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Unilink</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Criar conta</h1>
          <p className="text-sm font-bold uppercase opacity-60">
            Crie sua conta e complete o onboarding para publicar sua pagina.
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
