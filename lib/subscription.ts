import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription() {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
}
