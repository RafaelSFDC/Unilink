import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkSubscription } from "@/lib/subscription";
import BillingPageClient from "@/components/billing-page";
import { requireAuthSession } from "@/lib/auth-session";

export default async function BillingPage() {
  const session = await requireAuthSession();

  const isPro = await checkSubscription();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      username: true,
      plan: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!user || !user.username) {
    redirect("/onboarding");
  }

  const billingProvider = user.stripeCustomerId ? "stripe" : user.plan === "PRO" ? "mercadopago" : "free";

  return (
    <BillingPageClient
      isPro={isPro}
      billingProvider={billingProvider}
      stripeCurrentPeriodEnd={user.stripeCurrentPeriodEnd?.toISOString() ?? null}
      isStripeConfigured={!!process.env.STRIPE_SECRET_KEY}
      isMercadoPagoConfigured={!!process.env.MERCADOPAGO_ACCESS_TOKEN}
    />
  );
}
