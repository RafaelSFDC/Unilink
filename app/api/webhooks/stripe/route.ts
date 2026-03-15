import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  return (subscription as Stripe.Subscription & {
    current_period_end: number;
  }).current_period_end;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to verify webhook";
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.subscription || !session.metadata?.userId) {
      return new NextResponse("Missing subscription metadata", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as Stripe.Subscription;
    const periodEnd = getSubscriptionPeriodEnd(subscription);

    await prisma.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
        plan: "PRO",
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice & {
      subscription?: string;
    };

    if (!invoice.subscription) {
      return new NextResponse("Missing invoice subscription", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    ) as Stripe.Subscription;
    const periodEnd = getSubscriptionPeriodEnd(subscription);

    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
        plan: "PRO",
      },
    });
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const periodEnd = getSubscriptionPeriodEnd(subscription);
    const inactiveStatuses = new Set(["canceled", "unpaid", "incomplete_expired"]);

    await prisma.user.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: inactiveStatuses.has(subscription.status)
        ? {
            plan: "FREE",
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          }
        : {
            plan: "PRO",
            stripePriceId: subscription.items.data[0]?.price.id ?? null,
            stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
          },
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await prisma.user.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        plan: "FREE",
        stripePriceId: null,
        stripeSubscriptionId: null,
        stripeCurrentPeriodEnd: null,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
