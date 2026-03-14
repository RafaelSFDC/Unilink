import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.subscription || !session.metadata?.userId) {
      return new NextResponse("Missing subscription metadata", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as Stripe.Subscription;

    const periodEnd = (subscription as Stripe.Subscription & {
      current_period_end: number;
    }).current_period_end;

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

    const periodEnd = (subscription as Stripe.Subscription & {
      current_period_end: number;
    }).current_period_end;

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

  return new NextResponse(null, { status: 200 });
}
