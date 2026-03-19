import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMercadoPagoPreference } from "@/lib/mercadopago";
import { absoluteUrl } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth-session";

const settingsUrl = absoluteUrl("/dashboard/billing");

export async function GET() {
  try {
    const mpPreference = getMercadoPagoPreference();
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

    // O Mercado Pago entra como fluxo secundário.
    // Se o usuário já é PRO, mantemos a pessoa na página de billing.
    if (dbUser.plan === 'PRO') {
      return NextResponse.json({ url: settingsUrl });
    }

    // Criar preferência de pagamento no Mercado Pago
    const response = await mpPreference.create({
      body: {
        items: [
          {
            id: 'unilink_pro_monthly',
            title: 'Unilink PRO - Pagamento alternativo',
            description: "Acesso ao Unilink PRO via Mercado Pago como alternativa ao Stripe.",
            quantity: 1,
            unit_price: 10.00,
            currency_id: 'BRL'
          }
        ],
        payer: {
          email: dbUser.email,
          name: [dbUser.firstName, dbUser.lastName].filter(Boolean).join(' ').trim() || dbUser.name,
        },
        metadata: {
          user_id: dbUser.id
        },
        external_reference: 'unilink_pro_subscription',
        back_urls: {
          success: settingsUrl,
          failure: settingsUrl,
          pending: settingsUrl
        },
        auto_return: 'approved',
      }
    });

    // O sandbox_init_point é para testes, init_point para produção
    // Usamos init_point e deixamos o controle de sandbox via Access Token
    return NextResponse.json({ url: response.init_point });
  } catch (error) {
    console.error("[MERCADOPAGO_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
