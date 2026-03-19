import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth-session";

const settingsUrl = absoluteUrl("/dashboard/billing");

export async function GET() {
  try {
    const stripe = getStripe();
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Se já é PRO, redireciona para o portal do cliente (billing) do Stripe
    if (dbUser.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: settingsUrl,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    // Se não é PRO, inicia checkout
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: dbUser.email,
      line_items: [
        {
          price_data: {
            currency: "BRL",
            product_data: {
              name: "Unilink PRO",
              description: "Acesso ilimitado a templates, analytics e remoção de marca d'água.",
            },
            unit_amount: 1000, // R$ 10,00
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: dbUser.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
