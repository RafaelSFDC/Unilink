import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkSubscription } from "@/lib/subscription";
import BillingPageClient from "@/components/billing-page";

export default async function BillingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const isPro = await checkSubscription();
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      plan: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!user) {
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
