import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMercadoPagoPreference } from "@/lib/mercadopago";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/dashboard/billing");

export async function GET() {
  try {
    const mpPreference = getMercadoPagoPreference();
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Se já é PRO, poderíamos redirecionar para a página de billing
    // O Mercado Pago não tem um "Customer Portal" igual ao Stripe,
    // então apenas redirecionamos se já for PRO.
    if (dbUser.plan === 'PRO') {
      return NextResponse.json({ url: settingsUrl });
    }

    // Criar preferência de pagamento no Mercado Pago
    const response = await mpPreference.create({
      body: {
        items: [
          {
            id: 'unilink_pro_monthly',
            title: 'Unilink PRO - Vitalício',
            description: "Acesso ilimitado a templates, analytics e remoção de marca d'água.",
            quantity: 1,
            unit_price: 10.00,
            currency_id: 'BRL'
          }
        ],
        payer: {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
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
