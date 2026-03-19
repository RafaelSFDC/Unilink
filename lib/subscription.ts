import { prisma } from "./prisma";
import { getAuthSession } from "./auth-session";

const DAY_IN_MS = 86_400_000;

export function hasActiveProAccess(user: {
  plan: "FREE" | "PRO";
  stripePriceId?: string | null;
  stripeCurrentPeriodEnd?: Date | null;
  mercadopagoCurrentPeriodEnd?: Date | null;
}) {
  const hasActiveStripe =
    !!user.stripePriceId &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  const hasActiveMercadoPago =
    !!user.mercadopagoCurrentPeriodEnd &&
    user.mercadopagoCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  const hasTrackedSubscription =
    !!user.stripePriceId ||
    !!user.stripeCurrentPeriodEnd ||
    !!user.mercadopagoCurrentPeriodEnd;

  if (hasTrackedSubscription) {
    return hasActiveStripe || hasActiveMercadoPago;
  }

  return user.plan === "PRO";
}

export async function getSubscription() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      mercadopagoCurrentPeriodEnd: true,
      plan: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    isPro: hasActiveProAccess(user),
  };
}

export async function checkSubscription() {
  const subscription = await getSubscription();
  return !!subscription?.isPro;
}
