import { prisma } from "./prisma";
import { getAuthSession } from "./auth-session";

const DAY_IN_MS = 86_400_000;

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
      plan: true,
    },
  });

  if (!user) {
    return null;
  }

  const isValid =
    user.stripePriceId &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return {
    ...user,
    isPro: !!isValid || user.plan === "PRO",
  };
}

export async function checkSubscription() {
  const subscription = await getSubscription();
  return !!subscription?.isPro;
}
